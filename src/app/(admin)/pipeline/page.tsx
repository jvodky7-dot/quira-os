"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { OpportunityStage } from "@/domain/schemas";
import { MoreHorizontal, Calendar, User, AlertCircle } from "lucide-react";

// Mapeo amigable de etapas
const STAGES: { id: OpportunityStage; label: string }[] = [
  { id: 'NEW', label: 'Nuevo' },
  { id: 'CONTACTING', label: 'Contactando' },
  { id: 'CONTACTED', label: 'Contactado' },
  { id: 'QUALIFIED', label: 'Calificado' },
  { id: 'VISIT_SCHEDULED', label: 'Visita Agendada' },
  { id: 'VISIT_COMPLETED', label: 'Visita Realizada' },
  { id: 'QUOTED', label: 'Cotización' },
  { id: 'RESERVED', label: 'Separación' },
  { id: 'WON', label: 'Venta' }
];

export default function PipelinePage() {
  const { opportunities, leads, users, transitionOpportunity } = useStore();
  const [draggedOpp, setDraggedOpp] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, oppId: string) => {
    setDraggedOpp(oppId);
    e.dataTransfer.setData("text/plain", oppId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStage: OpportunityStage) => {
    e.preventDefault();
    const oppId = e.dataTransfer.getData("text/plain");
    if (oppId && draggedOpp === oppId) {
      try {
        const adminId = users.find(u => u.role === 'ADMIN')?.id || 'sys';
        // En V2 el guard se implementaría en el servicio o un modal contextual
        await transitionOpportunity({
          opportunityId: oppId,
          newStage,
          actorId: adminId
        });
      } catch (err) {
        alert("Transición no válida o faltan datos requeridos para esta etapa (BR-006).");
      }
    }
    setDraggedOpp(null);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Pipeline V2</h2>
          <p className="text-muted-foreground mt-1 text-sm">Arrastra tarjetas, las transiciones generarán eventos inmutables.</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {STAGES.map((stageInfo) => {
            const stageOpps = opportunities.filter(o => o.stage === stageInfo.id && o.disposition !== 'CLOSED' && o.disposition !== 'DISQUALIFIED');
            return (
              <div 
                key={stageInfo.id} 
                className="w-[280px] flex flex-col bg-surface/50 border border-border rounded-xl p-3"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stageInfo.id)}
              >
                <div className="flex justify-between items-center mb-3 px-1">
                  <h3 className="font-semibold text-sm text-foreground">{stageInfo.label}</h3>
                  <span className="text-xs bg-surface-elevated text-muted-foreground px-2 py-0.5 rounded-full">
                    {stageOpps.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3">
                  {stageOpps.map(opp => {
                    const lead = leads.find(l => l.id === opp.lead_id);
                    const assignee = users.find(u => u.id === opp.assignee_id);
                    
                    return (
                      <div 
                        key={opp.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, opp.id)}
                        className="bg-surface border border-border p-3 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm text-foreground">{lead?.name || 'Desconocido'}</h4>
                          <button className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <User className="w-3 h-3 mr-1" />
                            {assignee?.name || 'Cola: Sin Asignar'}
                          </div>
                          {opp.next_action_due_at && (
                            <div className="flex items-center text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span className="truncate">Acción Pdte.</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center pt-1">
                            {opp.priority === 'URGENT' ? (
                              <span className="text-red-500"><AlertCircle className="w-4 h-4" /></span>
                            ) : <span></span>}
                            <div className="text-[10px] font-medium text-right text-muted-foreground">
                              {opp.score_status === 'PENDING' ? 'Score Pndte.' : `Score: ${opp.score_total || '-'}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
