import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lead, Opportunity, SurveySubmission, Campaign, PropertyUnit, User, Stage } from '../types';
import { initialMockData } from './mockData';

interface AppState {
  leads: Lead[];
  opportunities: Opportunity[];
  submissions: SurveySubmission[];
  campaigns: Campaign[];
  units: PropertyUnit[];
  users: User[];
  
  // Actions
  addLead: (lead: Lead) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  addOpportunity: (opp: Opportunity) => void;
  updateOpportunity: (id: string, opp: Partial<Opportunity>) => void;
  addSubmission: (sub: SurveySubmission) => void;
  resetToDemo: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialMockData,
      
      addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
      updateLead: (id, lead) => set((state) => ({
        leads: state.leads.map(l => l.id === id ? { ...l, ...lead } : l)
      })),
      addOpportunity: (opp) => set((state) => ({ opportunities: [...state.opportunities, opp] })),
      updateOpportunity: (id, opp) => set((state) => ({
        opportunities: state.opportunities.map(o => o.id === id ? { ...o, ...opp } : o)
      })),
      addSubmission: (sub) => set((state) => ({ submissions: [...state.submissions, sub] })),
      resetToDemo: () => set(initialMockData),
    }),
    {
      name: 'quira-os-storage',
    }
  )
);
