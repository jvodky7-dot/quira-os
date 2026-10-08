import { z } from 'zod';

// Base types
export const IdSchema = z.string().uuid();
export const DateStringSchema = z.string().datetime();

export const OpportunityStageEnum = z.enum([
  'NEW', 'CONTACTING', 'CONTACTED', 'QUALIFIED',
  'VISIT_SCHEDULED', 'VISIT_COMPLETED', 'QUOTED',
  'RESERVED', 'WON', 'LOST'
]);

export const OpportunityDispositionEnum = z.enum([
  'ACTIVE', 'NO_RESPONSE', 'NURTURE', 'DISQUALIFIED', 'ON_HOLD', 'CLOSED'
]);

export const PriorityEnum = z.enum(['URGENT', 'HIGH', 'NORMAL', 'LOW']);

// Entidades Core
export const LeadSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  phone_e164: z.string().nullable(),
  email_normalized: z.string().email().nullable(),
  city: z.string().nullable(),
  person_status: z.string(),
  merge_into_id: IdSchema.nullable(),
  created_at: DateStringSchema,
  updated_at: DateStringSchema
});

export const IntakeSchema = z.object({
  id: IdSchema,
  lead_id: IdSchema,
  channel: z.enum(['SURVEY', 'WEB', 'WHATSAPP', 'MANUAL']),
  occurred_at: DateStringSchema,
  raw_source: z.string(),
  attribution_status: z.enum(['IDENTIFIED', 'PARTIAL', 'UNKNOWN']),
  related_submission_id: IdSchema.nullable()
});

export const OpportunitySchema = z.object({
  id: IdSchema,
  lead_id: IdSchema,
  project_id: z.string(),
  cycle_key: z.string(),
  stage: OpportunityStageEnum,
  disposition: OpportunityDispositionEnum,
  assignee_id: IdSchema.nullable(),
  score_status: z.enum(['PENDING', 'QUALIFIED', 'NOT_QUALIFIED', 'REVIEW_REQUIRED']),
  score_total: z.number().nullable(),
  priority: PriorityEnum,
  created_from_intake_id: IdSchema,
  next_action_due_at: DateStringSchema.nullable(),
  created_at: DateStringSchema,
  updated_at: DateStringSchema
});

export const StageTransitionSchema = z.object({
  id: IdSchema,
  opportunity_id: IdSchema,
  old_stage: OpportunityStageEnum,
  new_stage: OpportunityStageEnum,
  actor_id: z.string(),
  occurred_at: DateStringSchema,
  reason: z.string().optional(),
  override_reason: z.string().nullable()
});

export const SurveySubmissionSchema = z.object({
  id: IdSchema,
  survey_version_id: z.string(),
  session_id: z.string(),
  lead_id: IdSchema,
  submitted_at: DateStringSchema,
  payload_hash: z.string(),
  idempotency_key: z.string(),
  valid: z.boolean(),
  answers: z.record(z.string(), z.any())
});

export const AttributionTouchSchema = z.object({
  id: IdSchema,
  intake_id: IdSchema,
  session_id: z.string().nullable(),
  lead_id: IdSchema.nullable(),
  campaign_id: z.string().nullable(),
  creative_id: z.string().nullable(),
  utm_json: z.record(z.string(), z.string()).nullable(),
  source: z.string().nullable(),
  medium: z.string().nullable(),
  occurred_at: DateStringSchema,
  confidence: z.enum(['HIGH', 'MEDIUM', 'LOW'])
});

export const ActivitySchema = z.object({
  id: IdSchema,
  opportunity_id: IdSchema,
  type: z.enum([
    'FIRST_CONTACT_ATTEMPT', 'CALL', 'WHATSAPP_NOTE', 'EMAIL_NOTE', 
    'MEETING', 'NOTE', 'QUALIFICATION', 'VISIT_RESULT', 
    'QUOTE_SENT', 'OBJECTION_HANDLED', 'STATUS_CHANGE', 'ASSIGNMENT'
  ]),
  subject: z.string(),
  body: z.string().nullable(),
  occurred_at: DateStringSchema,
  actor_id: z.string(),
  outcome: z.string().nullable()
});

export const TaskSchema = z.object({
  id: IdSchema,
  opportunity_id: IdSchema,
  assignee_id: IdSchema.nullable(),
  kind: z.string(),
  due_at: DateStringSchema,
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'OVERDUE']),
  priority: PriorityEnum,
  completed_at: DateStringSchema.nullable()
});

export const PropertyUnitSchema = z.object({
  id: IdSchema,
  tower_id: z.string(),
  code: z.string(),
  type: z.string(),
  area_m2: z.number(),
  published_price_cop: z.number(),
  inventory_state: z.enum(['AVAILABLE', 'IN_NEGOTIATION', 'RESERVED', 'SOLD', 'OFF_MARKET']),
  price_updated_at: DateStringSchema
});

export const QuoteSchema = z.object({
  id: IdSchema,
  opportunity_id: IdSchema,
  unit_id: IdSchema.nullable(),
  quote_number: z.string(),
  revision: z.number(),
  commercial_total_cop: z.number().nullable(),
  status: z.enum(['DRAFT', 'ISSUED', 'SENT', 'ACCEPTED', 'EXPIRED', 'CANCELLED']),
  issued_at: DateStringSchema,
  valid_until: DateStringSchema,
  created_by: z.string()
});

export const ReservationSchema = z.object({
  id: IdSchema,
  opportunity_id: IdSchema,
  unit_id: IdSchema,
  quote_id: IdSchema.nullable(),
  status: z.enum(['PENDING_VERIFICATION', 'ACTIVE', 'EXPIRED', 'CANCELLED', 'CONVERTED_TO_SALE']),
  reserved_at: DateStringSchema,
  expires_at: DateStringSchema.nullable(),
  verified_by: z.string().nullable()
});

export const SaleSchema = z.object({
  id: IdSchema,
  opportunity_id: IdSchema,
  unit_id: IdSchema.nullable(),
  reservation_id: IdSchema.nullable(),
  value_cop: z.number().nullable(),
  verification_status: z.enum(['PENDING', 'VERIFIED', 'REJECTED']),
  verified_by: z.string().nullable(),
  confirmed_at: DateStringSchema,
  voided_at: DateStringSchema.nullable(),
  evidence_reference: z.string().nullable()
});

export const LossEventSchema = z.object({
  id: IdSchema,
  opportunity_id: IdSchema,
  reason_code: z.enum([
    'NO_BUDGET', 'PARKING_REQUIRED', 'FINANCING_NOT_AVAILABLE', 
    'CHOSE_COMPETITOR', 'NO_RESPONSE', 'LOCATION', 'TIMELINE', 
    'PRODUCT_MISMATCH', 'DUPLICATE', 'OTHER'
  ]),
  detail: z.string().nullable(),
  occurred_at: DateStringSchema
});

export const UserSchema = z.object({
  id: IdSchema,
  organization_id: z.string(),
  name: z.string(),
  role: z.enum(['ADMIN', 'ASESORA', 'TRIMIND', 'DIRECTOR']),
  active: z.boolean(),
  email: z.string().email()
});

export const CampaignSchema = z.object({
  id: z.string(),
  source: z.string(),
  name: z.string(),
  spend: z.number()
});

export type Lead = z.infer<typeof LeadSchema>;
export type Intake = z.infer<typeof IntakeSchema>;
export type Opportunity = z.infer<typeof OpportunitySchema>;
export type StageTransition = z.infer<typeof StageTransitionSchema>;
export type SurveySubmission = z.infer<typeof SurveySubmissionSchema>;
export type AttributionTouch = z.infer<typeof AttributionTouchSchema>;
export type Activity = z.infer<typeof ActivitySchema>;
export type Task = z.infer<typeof TaskSchema>;
export type PropertyUnit = z.infer<typeof PropertyUnitSchema>;
export type Quote = z.infer<typeof QuoteSchema>;
export type Reservation = z.infer<typeof ReservationSchema>;
export type Sale = z.infer<typeof SaleSchema>;
export type LossEvent = z.infer<typeof LossEventSchema>;
export type User = z.infer<typeof UserSchema>;
export type OpportunityStage = z.infer<typeof OpportunityStageEnum>;
export type Campaign = z.infer<typeof CampaignSchema>;
