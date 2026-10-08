"use client";

import { useStore } from "@/store/useStore";

export default function MarketingPage() {
  const { campaigns, submissions, leads, opportunities } = useStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Marketing Intelligence</h2>
          <p className="text-muted-foreground mt-1 text-sm">Atribución y rendimiento de campañas.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-elevated/30">
          <h3 className="font-semibold text-foreground">Rendimiento por Campaña</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-surface-elevated/50">
              <tr>
                <th className="px-6 py-3 font-medium">Campaña</th>
                <th className="px-6 py-3 font-medium text-right">Inversión</th>
                <th className="px-6 py-3 font-medium text-right">Clics</th>
                <th className="px-6 py-3 font-medium text-right">Leads Encuesta</th>
                <th className="px-6 py-3 font-medium text-right">Oportunidades</th>
                <th className="px-6 py-3 font-medium text-right">Ventas</th>
                <th className="px-6 py-3 font-medium text-right">CPL</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((cmp) => {
                const cmpSubmissions = submissions.filter(s => s.campaign_id === cmp.id || s.utm_campaign === cmp.name);
                const leadIds = cmpSubmissions.map(s => s.lead_id);
                const opps = opportunities.filter(o => leadIds.includes(o.lead_id));
                const won = opps.filter(o => o.stage === 'Venta').length;
                const cpl = cmpSubmissions.length > 0 ? cmp.spend / cmpSubmissions.length : 0;

                return (
                  <tr key={cmp.id} className="border-b border-border last:border-0 hover:bg-surface-elevated/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{cmp.name}</td>
                    <td className="px-6 py-4 text-right">${cmp.spend.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">{cmp.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-primary font-medium">{cmpSubmissions.length}</td>
                    <td className="px-6 py-4 text-right">{opps.length}</td>
                    <td className="px-6 py-4 text-right text-foreground font-semibold">{won}</td>
                    <td className="px-6 py-4 text-right">${cpl.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
