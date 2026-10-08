import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Lead, Opportunity, SurveySubmission, Campaign, PropertyUnit, 
  User, StageTransition, Intake, AttributionTouch, Activity, Task, Quote, OpportunityStage
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

  // CQRS Commands
  submitSurvey: (payload: CommandSubmitSurveyPayload) => Promise<{ submissionId: string; leadId: string; opportunityId: string }>;
  transitionOpportunity: (payload: CommandTransitionStagePayload) => Promise<Opportunity>;
  
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

        // Implementación de BR-006: StageTransition append-only
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

      resetToDemo: () => set(initialMockData),
    }),
    {
      name: 'quira-os-v2-storage',
    }
  )
);
