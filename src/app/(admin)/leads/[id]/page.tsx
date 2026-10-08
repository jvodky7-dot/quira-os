"use client";

import { useStore } from "@/store/useStore";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";

export default function LeadProfilePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const store = useStore();
  
  const lead = store.leads.find(l => l.id === id);
  const opp = store.opportunities.find(o => o.lead_id === id && o.disposition !== 'CLOSED');
  const submissions = store.submissions.filter(s => s.lead_id === id);
  const activities = store.activities.filter(a => a.opportunity_id === opp?.id);
  const tasks = store.tasks.filter(t => t.opportunity_id === opp?.id);
  const quotes = store.quotes.filter(q => q.opportunity_id === opp?.id);
  const attributions = store.attributions.filter(a => a.lead_id === id || store.intakes.some(i => i.id === a.intake_id && i.lead_id === id));

  const [activeTab, setActiveTab] = useState('resumen');
  const [newNote, setNewNote] = useState('');

  if (!lead) return <div className="p-8">Lead no encontrado.</div>;

  const handleAddNote = async () => {
    if (!opp || !newNote.trim()) return;
    await store.recordContact({
      opportunityId: opp.id,
      channel: 'NOTE',
      notes: newNote,
      actorId: 'sys' // in a real app, from auth session
    });
    setNewNote('');
  };

  const TABS = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'actividad', label: 'Línea de Tiempo' },
    { id: 'agenda', label: 'Agenda & Tareas' },
    { id: 'cotizaciones', label: 'Cotizaciones' },
    { id: 'objeciones', label: 'Matriz Objeciones' },
    { id: 'atribucion', label: 'Atribución' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header Profile */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="p-2 hover:bg-surface-elevated rounded-full transition-colors text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{lead.name}</h2>
          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone_e164 || 'Sin teléfono'}</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email_normalized || 'Sin correo'}</span>
          </div>
        </div>
        <div className="ml-auto flex gap-3 text-sm">
          {opp ? (
            <div className="bg-surface border border-border px-4 py-2 rounded-xl text-right">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Oportunidad Actual</div>
              <div className="font-medium text-primary mt-0.5">{opp.stage}</div>
            </div>
          ) : (
            <div className="bg-surface border border-border px-4 py-2 rounded-xl text-right flex items-center text-muted-foreground">
              Sin Oportunidad
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6 mb-6 px-2 overflow-x-auto shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'resumen' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Registro rápido de contacto</h3>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Detalles de la llamada o nota..."
                  className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-primary mb-3 min-h-[100px]"
                />
                <div className="flex justify-end gap-3">
                  <button onClick={handleAddNote} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                    Guardar Nota
                  </button>
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Datos del cliente</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block mb-1">Ciudad</span>
                    <span className="font-medium text-foreground">{lead.city || '-'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Fecha Ingreso</span>
                    <span className="font-medium text-foreground">{format(parseISO(lead.created_at), 'PPP')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4 flex items-center"><AlertCircle className="w-4 h-4 mr-2 text-yellow-500" /> Alertas / SLA</h3>
                {opp?.next_action_due_at ? (
                  <div className="text-sm">
                    Próxima acción requerida para: 
                    <span className="block font-medium mt-1">{format(parseISO(opp.next_action_due_at), 'PPP')}</span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Sin tareas urgentes.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'diagnostico' && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-6">Respuestas Recientes (Encuestas)</h3>
            {submissions.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay envíos de encuestas registrados.</p>
            ) : (
              <div className="space-y-8">
                {submissions.map(sub => (
                  <div key={sub.id} className="border-l-2 border-primary/20 pl-4">
                    <div className="text-xs text-muted-foreground mb-3">{format(parseISO(sub.submitted_at), 'PPpp')} • Versión {sub.survey_version_id}</div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                      {Object.entries(sub.answers).map(([key, val]) => {
                        if(key === 'consent' || key === 'name' || key === 'phone' || key === 'email') return null;
                        return (
                          <div key={key}>
                            <span className="text-muted-foreground block mb-1 capitalize">{key}</span>
                            <span className="font-medium text-foreground">{Array.isArray(val) ? val.join(', ') : val?.toString()}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'actividad' && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-6">Línea de tiempo comercial</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {activities.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center relative z-10 bg-surface py-2">No hay actividad registrada.</div>
              ) : (
                activities.map(act => (
                  <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface-elevated text-muted-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-background shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm text-foreground">{act.subject}</h4>
                        <time className="text-xs text-muted-foreground">{format(parseISO(act.occurred_at), 'MMM d, HH:mm')}</time>
                      </div>
                      <p className="text-sm text-muted-foreground">{act.body}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'agenda' && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-6">Tareas y Visitas</h3>
            {tasks.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay tareas programadas.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map(t => (
                  <li key={t.id} className="flex justify-between items-center p-4 border border-border rounded-lg bg-background">
                    <div>
                      <div className="font-medium text-sm text-foreground">{t.kind === 'VISIT' ? 'Visita en sala' : 'Tarea de seguimiento'}</div>
                      <div className="text-xs text-muted-foreground mt-1">Vence: {format(parseISO(t.due_at), 'PPpp')}</div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-surface-elevated text-muted-foreground border border-border">
                      {t.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'cotizaciones' && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-6">Cotizaciones Emitidas</h3>
            {quotes.length === 0 ? (
              <p className="text-muted-foreground text-sm">No se han emitido cotizaciones aún.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-surface-elevated/50">
                    <tr>
                      <th className="px-4 py-2 font-medium">Nº Cotización</th>
                      <th className="px-4 py-2 font-medium text-right">Valor Total</th>
                      <th className="px-4 py-2 font-medium text-center">Estado</th>
                      <th className="px-4 py-2 font-medium text-right">Emitida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((q) => (
                      <tr key={q.id} className="border-b border-border last:border-0 hover:bg-surface-elevated/20">
                        <td className="px-4 py-3 font-medium text-foreground">{q.quote_number} (v{q.revision})</td>
                        <td className="px-4 py-3 text-right">${q.commercial_total_cop?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">{q.status}</span>
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{format(parseISO(q.issued_at), 'dd/MM/yyyy')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'objeciones' && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-foreground">Matriz Predictiva de Objeciones (P1 Demo)</h3>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-medium">Recomendaciones IA</span>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 border border-border rounded-lg bg-surface-elevated">
                <h4 className="font-medium text-sm text-foreground mb-2 flex items-center"><AlertCircle className="w-4 h-4 mr-2 text-yellow-500" /> Objeción detectada en interacciones previas: <strong>"Presupuesto Ajustado"</strong></h4>
                <p className="text-sm text-muted-foreground mb-4">El cliente indicó en la encuesta un presupuesto de 300M, pero se interesó por unidades de 350M.</p>
                <div className="bg-background border border-border p-3 rounded text-sm">
                  <span className="block font-medium mb-1">Estrategia sugerida:</span>
                  Plantear flexibilización de la cuota inicial a 24 meses. Preguntar si cuentan con subsidio pre-aprobado o cesantías. Enviar cotización con plan de pagos proyectado.
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg bg-background">
                <h4 className="font-medium text-sm text-foreground mb-3">Registrar nueva objeción</h4>
                <div className="flex gap-3">
                  <select className="p-2 border border-border rounded bg-surface-elevated text-sm flex-1 focus:outline-none">
                    <option>Precio Alto</option>
                    <option>Ubicación lejana</option>
                    <option>Tiempos de entrega</option>
                    <option>Falta de parqueadero</option>
                  </select>
                  <button className="px-4 py-2 bg-surface border border-border hover:bg-surface-elevated text-sm font-medium rounded transition-colors">
                    Registrar y pedir sugerencia
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'atribucion' && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-6">Modelo de Atribución (First/Last Touch)</h3>
            {attributions.length === 0 ? (
              <p className="text-muted-foreground text-sm">Origen orgánico o desconocido.</p>
            ) : (
              <div className="space-y-4">
                {attributions.map((attr, index) => (
                  <div key={attr.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {index === 0 ? 'First Touch' : 'Touchpoint'}
                      </span>
                      <span className="text-sm text-muted-foreground">{format(parseISO(attr.occurred_at), 'PPpp')}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                      <div><span className="text-muted-foreground">Source:</span> <span className="font-medium text-foreground">{attr.source || 'N/A'}</span></div>
                      <div><span className="text-muted-foreground">Medium:</span> <span className="font-medium text-foreground">{attr.medium || 'N/A'}</span></div>
                      <div><span className="text-muted-foreground">Campaña (UTM):</span> <span className="font-medium text-foreground">{attr.utm_json?.utm_campaign || 'N/A'}</span></div>
                      <div><span className="text-muted-foreground">Campaña (ID):</span> <span className="font-medium text-foreground">{attr.campaign_id || 'N/A'}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
