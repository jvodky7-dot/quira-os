"use client";

import { useStore } from "@/store/useStore";
import { Clock, PhoneCall, AlertTriangle, ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function MyDayPage() {
  const { opportunities, leads, tasks, contactAttempts, users } = useStore();
  
  // Asumimos que el usuario actual es la asesora (users[1])
  const currentUser = users[1];

  const myOpps = opportunities.filter(o => o.assignee_id === currentUser.id && o.disposition !== 'CLOSED');
  const unassignedOpps = opportunities.filter(o => o.assignee_id === null && o.disposition !== 'CLOSED');
  
  const requiresFirstContact = myOpps.filter(o => {
    const attempts = contactAttempts.filter(a => a.opportunity_id === o.id);
    return attempts.length === 0 && o.stage === 'NEW';
  });

  const dueTasks = tasks.filter(t => t.assignee_id === currentUser.id && t.status === 'PENDING');

  const getLeadName = (oppId: string) => {
    const opp = opportunities.find(o => o.id === oppId);
    if (!opp) return 'Desconocido';
    return leads.find(l => l.id === opp.lead_id)?.name || 'Desconocido';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Mi Día Comercial</h2>
          <p className="text-muted-foreground mt-1 text-sm">Priorización automática según SLA y compromisos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Cola e Inmediatos */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <UserPlus className="w-4 h-4 mr-2 text-primary" /> 
              Cola de Asignación 
              <span className="ml-auto bg-surface-elevated text-xs px-2 py-0.5 rounded-full">{unassignedOpps.length}</span>
            </h3>
            {unassignedOpps.length === 0 ? (
              <p className="text-sm text-muted-foreground">La cola está vacía.</p>
            ) : (
              <div className="space-y-3">
                {unassignedOpps.slice(0, 5).map(o => (
                  <div key={o.id} className="p-3 border border-border rounded-lg bg-background">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">{getLeadName(o.id)}</span>
                      <span className="text-[10px] text-muted-foreground">{format(parseISO(o.created_at), 'HH:mm')}</span>
                    </div>
                    <button className="w-full mt-2 text-xs font-medium bg-primary/10 text-primary py-1.5 rounded hover:bg-primary/20 transition-colors">
                      Tomar Lead
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-red-600 mb-4 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" /> 
              SLA Crítico (Primer Contacto)
            </h3>
            {requiresFirstContact.length === 0 ? (
              <p className="text-sm text-red-500/70">Estás al día con el primer contacto.</p>
            ) : (
              <div className="space-y-3">
                {requiresFirstContact.map(o => (
                  <div key={o.id} className="p-3 border border-red-500/20 rounded-lg bg-background">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">{getLeadName(o.id)}</span>
                    </div>
                    <Link href={`/leads/${o.lead_id}`} className="w-full flex items-center justify-center text-xs font-medium bg-red-500 text-white py-1.5 rounded hover:bg-red-600 transition-colors">
                      Gestionar ahora
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Columna Central: Agenda de Hoy */}
        <div className="bg-surface border border-border rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-primary" /> 
            Mis Tareas Pendientes
          </h3>
          {dueTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tienes tareas pendientes para hoy.</p>
          ) : (
            <div className="space-y-3">
              {dueTasks.map(t => (
                <div key={t.id} className="p-3 border border-border rounded-lg bg-background flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">
                      {t.kind === 'VISIT' ? 'Visita presencial' : 'Seguimiento'}
                    </span>
                    <span className="text-[10px] bg-surface-elevated px-2 py-0.5 rounded text-muted-foreground">
                      {t.priority}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Con: {getLeadName(t.opportunity_id)}
                  </span>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-medium text-primary">{format(parseISO(t.due_at), 'HH:mm')}</span>
                    <Link href={`/leads/${opportunities.find(o=>o.id===t.opportunity_id)?.lead_id}`} className="text-xs hover:underline flex items-center text-muted-foreground">
                      Ver Ficha <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna Derecha: Recuperación (No-show, etc) */}
        <div className="bg-surface border border-border rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <PhoneCall className="w-4 h-4 mr-2 text-primary" /> 
            No-Show & Seguimientos Vencidos
          </h3>
          <p className="text-sm text-muted-foreground">Módulo P1 de reactivación de contactos fríos.</p>
          <div className="mt-4 p-4 border border-dashed border-border rounded-lg text-center text-sm text-muted-foreground">
            No hay contactos vencidos en tu portafolio actual.
          </div>
        </div>

      </div>
    </div>
  );
}
