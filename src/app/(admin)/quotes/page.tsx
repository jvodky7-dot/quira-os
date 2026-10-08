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
        {/* Generador de Escenarios (M04) */}
        <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex flex-col col-span-1 lg:col-span-2 mb-4">
          <div className="p-4 border-b border-border flex justify-between items-center bg-surface-elevated/30">
            <h3 className="font-semibold text-foreground flex items-center">Cotizador Multiescenario (M04)</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Demo Interactiva</span>
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Unidad Seleccionada</label>
                <select className="w-full p-2 border border-border rounded bg-background text-sm">
                  <option>T1-102 (Tipo A - 65m²)</option>
                  <option>T1-205 (Tipo B - 85m²)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Precio Lista (v1.2)</label>
                  <input type="text" disabled value="$350,000,000" className="w-full p-2 border border-border rounded bg-surface-elevated text-sm opacity-70" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">% Cuota Inicial</label>
                  <select className="w-full p-2 border border-border rounded bg-background text-sm">
                    <option>30% ($105M)</option>
                    <option>40% ($140M)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex-1 border-l border-border pl-6">
              <h4 className="text-sm font-semibold mb-3">Escenarios de Pago Generados</h4>
              <div className="space-y-3">
                <div className="p-3 border border-primary/50 bg-primary/5 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm text-primary">Escenario A: Tradicional</div>
                    <div className="text-xs text-muted-foreground mt-0.5">24 cuotas de $4.3M + Separación $2M</div>
                  </div>
                  <button className="text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded">Elegir</button>
                </div>
                <div className="p-3 border border-border rounded-lg flex justify-between items-center hover:bg-surface-elevated transition-colors">
                  <div>
                    <div className="font-medium text-sm">Escenario B: Flex/Cesantías</div>
                    <div className="text-xs text-muted-foreground mt-0.5">18 cuotas de $3.5M + 2 Primas de $21M</div>
                  </div>
                  <button className="text-xs font-medium border border-border bg-surface px-3 py-1.5 rounded">Elegir</button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
