"use client";

import { useStore } from "@/store/useStore";
import { Search, Plus, FileText, CheckCircle } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function QuotesPage() {
  const { quotes, sales, opportunities, leads, units } = useStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Gestión Transaccional V2</h2>
          <p className="text-muted-foreground mt-1 text-sm">Cotizaciones, Separaciones y Ventas (BR-004, BR-017).</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Cotización
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Panel Cotizaciones */}
        <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-surface-elevated/30">
            <h3 className="font-semibold text-foreground flex items-center"><FileText className="w-4 h-4 mr-2" /> Cotizaciones Activas</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            {quotes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No hay cotizaciones registradas.</p>
            ) : (
              <div className="space-y-3">
                {quotes.map(q => {
                  const opp = opportunities.find(o => o.id === q.opportunity_id);
                  const lead = leads.find(l => l.id === opp?.lead_id);
                  const unit = units.find(u => u.id === q.unit_id);
                  
                  return (
                    <div key={q.id} className="p-4 border border-border rounded-lg bg-background hover:border-primary/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium text-foreground">{q.quote_number} (v{q.revision})</span>
                          <span className="ml-2 text-xs text-muted-foreground bg-surface-elevated px-2 py-0.5 rounded">{q.status}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">${q.commercial_total_cop?.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Vence: {format(parseISO(q.valid_until), 'dd/MM/yyyy')}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {lead?.name || 'Cliente Desconocido'} {unit ? `• Unidad: ${unit.code}` : ''}
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <button className="text-xs font-medium px-3 py-1.5 border border-border rounded bg-surface hover:bg-surface-elevated transition-colors text-foreground">
                          Actualizar
                        </button>
                        <button className="text-xs font-medium px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors">
                          Convertir a Separación
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Panel Ventas Confirmadas */}
        <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-surface-elevated/30">
            <h3 className="font-semibold text-foreground flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Ventas Verificadas</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            {sales.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No hay ventas verificadas (BR-004).</p>
            ) : (
              <div className="space-y-3">
                {sales.map(s => {
                  const opp = opportunities.find(o => o.id === s.opportunity_id);
                  const lead = leads.find(l => l.id === opp?.lead_id);
                  const unit = units.find(u => u.id === s.unit_id);

                  return (
                    <div key={s.id} className="p-4 border border-green-500/20 bg-green-500/5 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium text-foreground">{unit?.tower_id}-{unit?.code}</span>
                          <span className="ml-2 text-xs text-green-600 bg-green-500/10 px-2 py-0.5 rounded font-semibold">{s.verification_status}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">${s.value_cop?.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{format(parseISO(s.confirmed_at), 'dd/MM/yyyy')}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {lead?.name || 'Cliente Desconocido'}
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground font-mono">
                        Evidencia: {s.evidence_reference || 'N/A'}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
