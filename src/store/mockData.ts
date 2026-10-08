import { Lead, Opportunity, SurveySubmission, Campaign, PropertyUnit, User } from '../types';

export const users: User[] = [
  { id: 'u1', name: 'Admin Quirá', role: 'admin' },
  { id: 'u2', name: 'Laura Asesora', role: 'asesora' },
  { id: 'u3', name: 'TriMind Analytics', role: 'trimind' },
];

export const campaigns: Campaign[] = [
  { id: 'cmp_01', name: 'Espacio_Octubre_Meta', source: 'meta', spend: 450000, clicks: 1200, impressions: 45000 },
  { id: 'cmp_02', name: 'Precio_Flex_Meta', source: 'meta', spend: 320000, clicks: 800, impressions: 30000 },
];

export const units: PropertyUnit[] = [
  { id: 'T1-101', tower: 'Torre 1', unit: '101', area: 65, type: 'A', price: 350000000, status: 'disponible' },
  { id: 'T1-201', tower: 'Torre 1', unit: '201', area: 65, type: 'A', price: 355000000, status: 'disponible' },
  { id: 'T1-305', tower: 'Torre 1', unit: '305', area: 85, type: 'B', price: 480000000, status: 'en_negociacion' },
  { id: 'T2-102', tower: 'Torre 2', unit: '102', area: 70, type: 'C', price: 380000000, status: 'separada' },
];

export const leads: Lead[] = [
  { id: 'l1', name: 'Carlos Mendoza', phone: '3001234567', email: 'carlos@example.com', city: 'Bogotá', consent: true, created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'l2', name: 'Ana Sofía Rojas', phone: '3109876543', email: 'ana@example.com', city: 'Medellín', consent: true, created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
];

export const opportunities: Opportunity[] = [
  { id: 'o1', lead_id: 'l1', stage: 'Calificado', assignee_id: 'u2', score: 85, next_action: 'Agendar visita presencial', status: 'active', created_at: leads[0].created_at },
  { id: 'o2', lead_id: 'l2', stage: 'Cotización', assignee_id: 'u2', score: 65, next_action: 'Enviar opciones de pago', status: 'active', created_at: leads[1].created_at },
];

export const submissions: SurveySubmission[] = [
  { 
    id: 's1', version_id: 'v1', lead_id: 'l1', session_id: 'sess1', received_at: leads[0].created_at,
    utm_source: 'meta', utm_campaign: 'Espacio_Octubre_Meta', campaign_id: 'cmp_01',
    answers: { purpose: 'Para vivir', timeframe: '0-3 meses', priorities: ['Mayor espacio', 'Ubicación'], budget: '300-400M', finance: 'Crédito hipotecario', visit: 'Sí, cuanto antes' }
  }
];

export const initialMockData = {
  leads,
  opportunities,
  submissions,
  campaigns,
  units,
  users,
};
