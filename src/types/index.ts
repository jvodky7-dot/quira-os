export type Stage = 'Nuevo' | 'Contactado' | 'Calificado' | 'Visita agendada' | 'Visita realizada' | 'Cotización' | 'Separación' | 'Venta' | 'Perdido';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  consent: boolean;
  created_at: string;
}

export interface Opportunity {
  id: string;
  lead_id: string;
  stage: Stage;
  assignee_id?: string;
  score: number;
  next_action?: string;
  status: 'active' | 'won' | 'lost';
  created_at: string;
}

export interface SurveySubmission {
  id: string;
  version_id: string;
  lead_id: string;
  session_id: string;
  received_at: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  campaign_id?: string;
  ad_id?: string;
  answers: Record<string, string | string[]>;
}

export interface Campaign {
  id: string;
  name: string;
  source: string;
  spend: number;
  clicks: number;
  impressions: number;
}

export interface PropertyUnit {
  id: string;
  tower: string;
  unit: string;
  area: number;
  type: string;
  price: number;
  status: 'disponible' | 'en_negociacion' | 'separada' | 'vendida';
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'asesora' | 'trimind';
}
