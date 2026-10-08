"use client";

import { useStore } from "@/store/useStore";
import { Calendar as CalendarIcon, CheckCircle2, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function AgendaPage() {
  const { opportunities, leads, users } = useStore();

  const tasks = opportunities
    .filter(o => o.disposition !== 'CLOSED' && o.next_action_due_at)
    .map(o => {
      const lead = leads.find(l => l.id === o.lead_id);
      const assignee = users.find(u => u.id === o.assignee_id);
      return {
        id: o.id,
        title: 'Acción Pendiente', // Simplified since we don't store text action on opp anymore, it should be in Task
        leadName: lead?.name,
        assigneeName: assignee?.name,
        date: parseISO(o.next_action_due_at!), 
        stage: o.stage,
      };
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Agenda Comercial</h2>
          <p className="text-muted-foreground mt-1 text-sm">Próximos seguimientos y tareas.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm">Próximas tareas</button>
          <button className="px-4 py-2 text-muted-foreground hover:bg-surface-elevated rounded-lg font-medium text-sm">Completadas</button>
        </div>
        
        <div className="divide-y divide-border">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 flex items-center justify-between hover:bg-surface-elevated/20 transition-colors">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{task.title}</h4>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <span className="font-medium text-primary">{task.leadName}</span>
                    <span>•</span>
                    <span className="text-xs bg-surface-elevated px-2 py-0.5 rounded">{task.stage}</span>
                    <span>•</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {format(task.date, 'dd/MM/yyyy')}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <button className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-border rounded-lg px-3 py-1.5 bg-background">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Completar
                </button>
              </div>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No hay tareas programadas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
