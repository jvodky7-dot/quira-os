import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Lead, Opportunity, SurveySubmission, Campaign, PropertyUnit, 
  User, StageTransition, Intake, AttributionTouch, Activity, Task, Quote, OpportunityStage, Sale
} from '../domain/schemas';
import { initialMockData } from './mockData';

interface CommandSubmitSurveyPayload {
  answers: Record<string, any>;
  utmParams: Record<string, string>;
  campaignId?: string;
}

interface CommandTransitionStagePayload {
  opportunityId: string;
  newStage: OpportunityStage;
  actorId: string;
  overrideReason?: string;
}

interface CommandContactPayload {
  opportunityId: string;
  channel: string;
  notes: string;
  actorId: string;
}

interface CommandVisitPayload {
  opportunityId: string;
  scheduledAt: string;
  location: string;
  assigneeId: string;
}

interface CommandQuotePayload {
  opportunityId: string;
  unitId?: string;
  amount: number;
  actorId: string;
}

interface CommandSalePayload {
  opportunityId: string;
  unitId: string;
  amount: number;
  evidenceRef: string;
  actorId: string;
}

interface AppState {
  users: User[];
  campaigns: Campaign[];
  units: PropertyUnit[];
  leads: Lead[];
  intakes: Intake[];
  opportunities: Opportunity[];
  stageTransitions: StageTransition[];
  submissions: SurveySubmission[];
  activities: Activity[];
  tasks: Task[];
  quotes: Quote[];
  attributions: AttributionTouch[];
  sales: Sale[];

  // CQRS Commands
  submitSurvey: (payload: CommandSubmitSurveyPayload) => Promise<{ submissionId: string; leadId: string; opportunityId: string }>;
  transitionOpportunity: (payload: CommandTransitionStagePayload) => Promise<Opportunity>;
  recordContact: (payload: CommandContactPayload) => Promise<Activity>;
  scheduleVisit: (payload: CommandVisitPayload) => Promise<Task>;
  issueQuote: (payload: CommandQuotePayload) => Promise<Quote>;
  confirmSale: (payload: CommandSalePayload) => Promise<Sale>;
  
  // Resets
  resetToDemo: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialMockData,

      submitSurvey: async (payload) => {
        // En una app real esto es un POST a un backend que hace una transacción.
        // Aquí simulamos la transacción atómica con Zustand.
        
        // 1. Normalizar identidad (teléfono ficticio)
        const name = payload.answers.name || 'Desconocido';
        const phone = payload.answers.phone || '';
        
        // 2. ¿Existe Lead?
        const state = get();
        let leadId = `l-${Date.now()}`;
        let lead = state.leads.find(l => l.phone_e164 === phone);
        
        const now = new Date().toISOString();

        if (!lead) {
          lead = {
            id: leadId,
            name,
            phone_e164: phone,
            email_normalized: payload.answers.email || null,
            city: null,
            person_status: 'ACTIVE',
            merge_into_id: null,
            created_at: now,
            updated_at: now
          };
          set(s => ({ leads: [...s.leads, lead!] }));
        } else {
          leadId = lead.id;
        }

        // 3. Crear Intake
        const intakeId = `in-${Date.now()}`;
        const submissionId = `sub-${Date.now()}`;
        
        const intake: Intake = {
          id: intakeId,
          lead_id: leadId,
          channel: 'SURVEY',
          occurred_at: now,
          raw_source: 'Survey Submission',
          attribution_status: payload.campaignId ? 'IDENTIFIED' : 'UNKNOWN',
          related_submission_id: submissionId
        };

        // 4. Crear SurveySubmission
        const submission: SurveySubmission = {
          id: submissionId,
          survey_version_id: 'v1',
          session_id: `sess-${Date.now()}`,
          lead_id: leadId,
          submitted_at: now,
          payload_hash: 'mock-hash',
          idempotency_key: `idmp-${Date.now()}`,
          valid: true,
          answers: payload.answers
        };

        // 5. Attribution Touch
        const attribution: AttributionTouch = {
          id: `attr-${Date.now()}`,
          intake_id: intakeId,
          session_id: submission.session_id,
          lead_id: leadId,
          campaign_id: payload.campaignId || null,
          creative_id: null,
          utm_json: payload.utmParams,
          source: payload.utmParams.utm_source || null,
          medium: payload.utmParams.utm_medium || null,
          occurred_at: now,
          confidence: 'HIGH'
        };

        // 6. Oportunidad (Buscar si existe activa, si no crear)
        let opp = state.opportunities.find(o => o.lead_id === leadId && o.disposition !== 'CLOSED' && o.disposition !== 'DISQUALIFIED');
        let oppId = opp?.id || `opp-${Date.now()}`;

        if (!opp) {
          opp = {
            id: oppId,
            lead_id: leadId,
            project_id: 'prj-quira',
            cycle_key: '2026-Q4',
            stage: 'NEW',
            disposition: 'ACTIVE',
            assignee_id: null, // Pasa a cola sin asignar
            score_status: 'PENDING',
            score_total: null,
            priority: 'NORMAL',
            created_from_intake_id: intakeId,
            next_action_due_at: null,
            created_at: now,
            updated_at: now
          };
          set(s => ({ opportunities: [...s.opportunities, opp!] }));
        }

        // Ejecutar "Transacción"
        set(s => ({
          intakes: [...s.intakes, intake],
          submissions: [...s.submissions, submission],
          attributions: [...s.attributions, attribution]
        }));

        return { submissionId, leadId, opportunityId: oppId };
      },

      transitionOpportunity: async ({ opportunityId, newStage, actorId, overrideReason }) => {
        const state = get();
        const opp = state.opportunities.find(o => o.id === opportunityId);
        
        if (!opp) throw new Error("Opportunity not found");
        if (opp.stage === newStage) return opp;

        const transition: StageTransition = {
          id: `st-${Date.now()}`,
          opportunity_id: opportunityId,
          old_stage: opp.stage,
          new_stage: newStage,
          actor_id: actorId,
          occurred_at: new Date().toISOString(),
          override_reason: overrideReason || null
        };

        const updatedOpp = { ...opp, stage: newStage, updated_at: new Date().toISOString() };

        set(s => ({
          opportunities: s.opportunities.map(o => o.id === opportunityId ? updatedOpp : o),
          stageTransitions: [...s.stageTransitions, transition]
        }));

        return updatedOpp;
      },

      recordContact: async ({ opportunityId, channel, notes, actorId }) => {
        const activity: Activity = {
          id: `act-${Date.now()}`,
          opportunity_id: opportunityId,
          type: channel === 'CALL' ? 'CALL' : 'NOTE',
          subject: `Contacto vía ${channel}`,
          body: notes,
          occurred_at: new Date().toISOString(),
          actor_id: actorId,
          outcome: 'SUCCESS'
        };
        set(s => ({ activities: [...s.activities, activity] }));
        return activity;
      },

      scheduleVisit: async ({ opportunityId, scheduledAt, location, assigneeId }) => {
        const task: Task = {
          id: `tsk-${Date.now()}`,
          opportunity_id: opportunityId,
          assignee_id: assigneeId,
          kind: 'VISIT',
          due_at: scheduledAt,
          status: 'PENDING',
          priority: 'HIGH',
          completed_at: null
        };
        
        const state = get();
        const opp = state.opportunities.find(o => o.id === opportunityId);
        if (opp) {
          const updatedOpp = { ...opp, next_action_due_at: scheduledAt, updated_at: new Date().toISOString() };
          set(s => ({
            opportunities: s.opportunities.map(o => o.id === opportunityId ? updatedOpp : o),
            tasks: [...s.tasks, task]
          }));
        } else {
          set(s => ({ tasks: [...s.tasks, task] }));
        }

        return task;
      },

      issueQuote: async ({ opportunityId, unitId, amount, actorId }) => {
        const quote: Quote = {
          id: `qt-${Date.now()}`,
          opportunity_id: opportunityId,
          unit_id: unitId || null,
          quote_number: `Q-${Math.floor(Math.random()*10000)}`,
          revision: 1,
          commercial_total_cop: amount,
          status: 'ISSUED',
          issued_at: new Date().toISOString(),
          valid_until: new Date(Date.now() + 86400000 * 15).toISOString(), // 15 días
          created_by: actorId
        };
        set(s => ({ quotes: [...s.quotes, quote] }));
        return quote;
      },

      confirmSale: async ({ opportunityId, unitId, amount, evidenceRef, actorId }) => {
        const sale: Sale = {
          id: `sl-${Date.now()}`,
          opportunity_id: opportunityId,
          unit_id: unitId,
          reservation_id: null,
          value_cop: amount,
          verification_status: 'VERIFIED', // Autoverificado en demo
          verified_by: actorId,
          confirmed_at: new Date().toISOString(),
          voided_at: null,
          evidence_reference: evidenceRef
        };

        const state = get();
        const opp = state.opportunities.find(o => o.id === opportunityId);
        
        set(s => ({
          sales: [...(s.sales || []), sale],
          units: s.units.map(u => u.id === unitId ? { ...u, inventory_state: 'SOLD' as const } : u),
          opportunities: s.opportunities.map(o => o.id === opportunityId ? { ...o, stage: 'WON' as const, updated_at: new Date().toISOString() } : o)
        }));

        if (opp && opp.stage !== 'WON') {
          get().transitionOpportunity({ opportunityId, newStage: 'WON', actorId });
        }

        return sale;
      },

      resetToDemo: () => set(initialMockData),
    }),
    {
      name: 'quira-os-v2-storage',
    }
  )
);
