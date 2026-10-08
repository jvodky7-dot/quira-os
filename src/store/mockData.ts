import { 
  Lead, Opportunity, SurveySubmission, User, Campaign, PropertyUnit, 
  Activity, Task, Intake, AttributionTouch, Quote, StageTransition, Sale, OpportunityStage,
  ContactAttempt, SalesQueueEntry
} from '../domain/schemas';

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

export function generateSeedData() {
  const users: User[] = [
    { id: '11111111-1111-1111-1111-111111111111', organization_id: 'org1', name: 'Admin Quirá', role: 'ADMIN', active: true, email: 'admin@quira.com' },
    { id: '22222222-2222-2222-2222-222222222222', organization_id: 'org1', name: 'Laura Asesora', role: 'ASESORA', active: true, email: 'laura@quira.com' },
  ];

  const campaigns: Campaign[] = [
    { id: 'cmp_01', name: 'Espacio_Octubre_Meta', source: 'meta', spend: 2500000 },
    { id: 'cmp_02', name: 'Precio_Flex_Meta', source: 'meta', spend: 1800000 },
    { id: 'cmp_03', name: 'Busqueda_Organica_Google', source: 'google', spend: 800000 },
  ];

  const units: PropertyUnit[] = [];
  for(let i=1; i<=20; i++) {
    const isSold = Math.random() > 0.8;
    units.push({
      id: `u-T1-${100+i}`, tower_id: 'T1', code: `${100+i}`, type: i%2===0?'A':'B', area_m2: i%2===0?65:85, 
      published_price_cop: i%2===0?350000000:480000000, 
      inventory_state: isSold ? 'SOLD' : 'AVAILABLE', 
      price_updated_at: new Date().toISOString()
    });
  }

  const leads: Lead[] = [];
  const intakes: Intake[] = [];
  const opportunities: Opportunity[] = [];
  const submissions: SurveySubmission[] = [];
  const attributions: AttributionTouch[] = [];
  const stageTransitions: StageTransition[] = [];
  const activities: Activity[] = [];
  const tasks: Task[] = [];
  const quotes: Quote[] = [];
  const sales: Sale[] = [];

  const stages: OpportunityStage[] = ['NEW', 'CONTACTING', 'CONTACTED', 'QUALIFIED', 'VISIT_SCHEDULED', 'VISIT_COMPLETED', 'QUOTED', 'RESERVED', 'WON', 'LOST'];
  
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);

  // Generate 150 leads
  for(let i=0; i<150; i++) {
    const leadId = generateId('l');
    const createdAt = randomDate(thirtyDaysAgo, now);
    
    leads.push({
      id: leadId,
      name: `Cliente Potencial ${i+1}`,
      phone_e164: `+57300${Math.floor(1000000 + Math.random() * 9000000)}`,
      email_normalized: `cliente${i+1}@example.com`,
      city: Math.random() > 0.5 ? 'Bogotá' : 'Medellín',
      person_status: 'ACTIVE',
      merge_into_id: null,
      created_at: createdAt,
      updated_at: createdAt
    });

    const intakeId = generateId('in');
    const submissionId = generateId('sub');
    
    intakes.push({
      id: intakeId, lead_id: leadId, channel: 'SURVEY', occurred_at: createdAt, raw_source: 'Facebook Ad', 
      attribution_status: 'IDENTIFIED', related_submission_id: submissionId
    });

    submissions.push({
      id: submissionId, survey_version_id: 'v1', session_id: generateId('sess'), lead_id: leadId, 
      submitted_at: createdAt, payload_hash: 'hash', idempotency_key: generateId('idk'), valid: true,
      answers: { budget: '300-400M', purpose: 'Vivienda' }
    });

    const cmp = campaigns[Math.floor(Math.random() * campaigns.length)];
    attributions.push({
      id: generateId('attr'), intake_id: intakeId, session_id: submissionId, lead_id: leadId, campaign_id: cmp.id,
      creative_id: null, utm_json: { utm_campaign: cmp.name, utm_source: cmp.source }, source: cmp.source, medium: 'cpc',
      occurred_at: createdAt, confidence: 'HIGH'
    });

    const stageIdx = Math.floor(Math.random() * stages.length);
    const stage = stages[stageIdx];
    const oppId = generateId('opp');

    opportunities.push({
      id: oppId, lead_id: leadId, project_id: 'prj-quira', cycle_key: '2026-Q4', stage: stage, 
      disposition: stage === 'WON' || stage === 'LOST' ? 'CLOSED' : 'ACTIVE', 
      assignee_id: Math.random() > 0.2 ? users[1].id : null, score_status: 'QUALIFIED', score_total: Math.floor(40 + Math.random()*50), 
      priority: Math.random() > 0.8 ? 'URGENT' : 'NORMAL', created_from_intake_id: intakeId, 
      next_action_due_at: (stage !== 'WON' && stage !== 'LOST' && Math.random() > 0.5) ? randomDate(thirtyDaysAgo, now) : null,
      created_at: createdAt, updated_at: createdAt
    });

    if (stage === 'WON') {
      const soldUnit = units.find(u => u.inventory_state === 'SOLD') || units[0];
      sales.push({
        id: generateId('sl'), opportunity_id: oppId, unit_id: soldUnit.id, reservation_id: null, 
        value_cop: soldUnit.published_price_cop, verification_status: 'VERIFIED', verified_by: users[0].id,
        confirmed_at: createdAt, voided_at: null, evidence_reference: 'BankReceipt-001'
      });
    }
  }

  return { 
    users, campaigns, units, leads, intakes, opportunities, 
    stageTransitions, submissions, activities, tasks, quotes, 
    attributions, sales, contactAttempts: [] as ContactAttempt[], 
    queueEntries: [] as SalesQueueEntry[] 
  };
}

export const initialMockData = generateSeedData();
