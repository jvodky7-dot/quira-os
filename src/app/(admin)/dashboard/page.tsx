"use client";

import { useStore } from "@/store/useStore";
import { Users, KanbanSquare, ClipboardList, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const { leads, opportunities, submissions } = useStore();

  const totalLeads = leads.length;
  const totalOpps = opportunities.length;
  const wonOpps = opportunities.filter(o => o.stage === 'Venta').length;
  const conversionRate = totalLeads ? ((wonOpps / totalLeads) * 100).toFixed(1) : 0;

  const chartData = [
    { name: '1 Oct', leads: 2, opps: 1 },
    { name: '2 Oct', leads: 4, opps: 3 },
    { name: '3 Oct', leads: 3, opps: 2 },
    { name: '4 Oct', leads: 7, opps: 4 },
    { name: '5 Oct', leads: 5, opps: 5 },
    { name: 'Hoy', leads: totalLeads, opps: totalOpps },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Resumen comercial</h2>
          <p className="text-muted-foreground mt-1 text-sm">Rendimiento de marketing y ventas.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard title="Total Leads" value={totalLeads} icon={Users} />
        <MetricCard title="Oportunidades" value={totalOpps} icon={KanbanSquare} />
        <MetricCard title="Encuestas completadas" value={submissions.length} icon={ClipboardList} />
        <MetricCard title="Tasa de Cierre" value={`${conversionRate}%`} icon={TrendingUp} />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4 bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4 text-foreground">Tendencia temporal</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7F927B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7F927B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#7F927B" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4 text-foreground">Atención requerida</h3>
          <div className="space-y-4">
            {opportunities.filter(o => o.status === 'active').slice(0, 4).map(opp => {
              const lead = leads.find(l => l.id === opp.lead_id);
              return (
                <div key={opp.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-sm text-foreground">{lead?.name}</p>
                    <p className="text-xs text-muted-foreground">{opp.next_action || 'Sin acción'}</p>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-surface-elevated rounded text-muted-foreground">
                    {opp.stage}
                  </div>
                </div>
              )
            })}
            {opportunities.length === 0 && <p className="text-sm text-muted-foreground">No hay tareas pendientes.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon }: { title: string, value: string | number, icon: any }) {
  return (
    <div className="p-6 bg-surface border border-border rounded-xl shadow-sm">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
    </div>
  )
}
