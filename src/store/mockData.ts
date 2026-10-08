import { 
  Lead, Opportunity, SurveySubmission, User, Campaign, PropertyUnit, 
  Activity, Task, Intake, AttributionTouch, Quote, StageTransition, Sale
} from '../domain/schemas';

export const users: User[] = [
  { id: '11111111-1111-1111-1111-111111111111', organization_id: 'org1', name: 'Admin Quirá', role: 'ADMIN', active: true, email: 'admin@quira.com' },
  { id: '22222222-2222-2222-2222-222222222222', organization_id: 'org1', name: 'Laura Asesora', role: 'ASESORA', active: true, email: 'laura@quira.com' },
  { id: '33333333-3333-3333-3333-333333333333', organization_id: 'org1', name: 'TriMind Analytics', role: 'TRIMIND', active: true, email: 'analytics@trimind.com' },
];

export const campaigns: Campaign[] = [
  { id: 'cmp_01', name: 'Espacio_Octubre_Meta', source: 'meta', spend: 450000 },
  { id: 'cmp_02', name: 'Precio_Flex_Meta', source: 'meta', spend: 320000 },
];

export const units: PropertyUnit[] = [
  { id: 'u-T1-101', tower_id: 'T1', code: '101', type: 'A', area_m2: 65, published_price_cop: 350000000, inventory_state: 'AVAILABLE', price_updated_at: new Date().toISOString() },
  { id: 'u-T1-201', tower_id: 'T1', code: '201', type: 'A', area_m2: 65, published_price_cop: 355000000, inventory_state: 'AVAILABLE', price_updated_at: new Date().toISOString() },
  { id: 'u-T1-305', tower_id: 'T1', code: '305', type: 'B', area_m2: 85, published_price_cop: 480000000, inventory_state: 'RESERVED', price_updated_at: new Date().toISOString() },
  { id: 'u-T2-102', tower_id: 'T2', code: '102', type: 'C', area_m2: 70, published_price_cop: 380000000, inventory_state: 'SOLD', price_updated_at: new Date().toISOString() },
];

const now = new Date().toISOString();
const twoDaysAgo = new Date(Date.now() - 86400000 * 2).toISOString();
const fiveDaysAgo = new Date(Date.now() - 86400000 * 5).toISOString();

export const leads: Lead[] = [
  { id: 'l-1111-1111', name: 'Carlos Mendoza', phone_e164: '+573001234567', email_normalized: 'carlos@example.com', city: 'Bogotá', person_status: 'ACTIVE', merge_into_id: null, created_at: twoDaysAgo, updated_at: twoDaysAgo },
  { id: 'l-2222-2222', name: 'Ana Sofía Rojas', phone_e164: '+573109876543', email_normalized: 'ana@example.com', city: 'Medellín', person_status: 'ACTIVE', merge_into_id: null, created_at: fiveDaysAgo, updated_at: fiveDaysAgo },
];

export const intakes: Intake[] = [
  { id: 'in-1', lead_id: leads[0].id, channel: 'SURVEY', occurred_at: twoDaysAgo, raw_source: 'fb_ad', attribution_status: 'IDENTIFIED', related_submission_id: 'sub-1' },
  { id: 'in-2', lead_id: leads[1].id, channel: 'WEB', occurred_at: fiveDaysAgo, raw_source: 'organic', attribution_status: 'UNKNOWN', related_submission_id: null },
];

export const opportunities: Opportunity[] = [
  { id: 'opp-1', lead_id: leads[0].id, project_id: 'prj-quira', cycle_key: '2026-Q4', stage: 'QUALIFIED', disposition: 'ACTIVE', assignee_id: users[1].id, score_status: 'QUALIFIED', score_total: 85, priority: 'HIGH', created_from_intake_id: intakes[0].id, next_action_due_at: now, created_at: twoDaysAgo, updated_at: now },
  { id: 'opp-2', lead_id: leads[1].id, project_id: 'prj-quira', cycle_key: '2026-Q4', stage: 'QUOTED', disposition: 'ACTIVE', assignee_id: users[1].id, score_status: 'QUALIFIED', score_total: 65, priority: 'NORMAL', created_from_intake_id: intakes[1].id, next_action_due_at: null, created_at: fiveDaysAgo, updated_at: now },
];

export const stageTransitions: StageTransition[] = [
  { id: 'st-1', opportunity_id: opportunities[0].id, old_stage: 'NEW', new_stage: 'CONTACTING', actor_id: users[1].id, occurred_at: twoDaysAgo, override_reason: null },
  { id: 'st-2', opportunity_id: opportunities[0].id, old_stage: 'CONTACTING', new_stage: 'CONTACTED', actor_id: users[1].id, occurred_at: twoDaysAgo, override_reason: null },
  { id: 'st-3', opportunity_id: opportunities[0].id, old_stage: 'CONTACTED', new_stage: 'QUALIFIED', actor_id: users[1].id, occurred_at: now, override_reason: null },
];

export const submissions: SurveySubmission[] = [
  { 
    id: 'sub-1', survey_version_id: 'v1', lead_id: leads[0].id, session_id: 'sess1', submitted_at: twoDaysAgo, payload_hash: 'hash', idempotency_key: 'idk1', valid: true,
    answers: { purpose: 'Para vivir', timeframe: '0-3 meses', priorities: ['Mayor espacio', 'Ubicación'], budget: '300-400M', finance: 'Crédito hipotecario', visit: 'Sí, cuanto antes' }
  }
];

export const activities: Activity[] = [];
export const tasks: Task[] = [];
export const quotes: Quote[] = [];
export const attributions: AttributionTouch[] = [
  { id: 'attr-1', intake_id: intakes[0].id, session_id: 'sess1', lead_id: leads[0].id, campaign_id: 'cmp_01', creative_id: null, utm_json: { utm_source: 'meta', utm_campaign: 'Espacio_Octubre_Meta' }, source: 'meta', medium: 'social', occurred_at: twoDaysAgo, confidence: 'HIGH' }
];
export const sales: Sale[] = [];

export const initialMockData = {
  users, campaigns, units, leads, intakes, opportunities, 
  stageTransitions, submissions, activities, tasks, quotes, attributions, sales
};
