"use client";

import { useStore } from "@/store/useStore";

export default function MarketingPage() {
  const { campaigns, attributions, intakes, opportunities } = useStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Marketing Intelligence V2</h2>
          <p className="text-muted-foreground mt-1 text-sm">Atribución y rendimiento de campañas basados en toques.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-elevated/30 flex justify-between">
          <h3 className="font-semibold text-foreground">Rendimiento por Campaña</h3>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-medium">DEMO: Datos No Conectados a Meta</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-surface-elevated/50">
              <tr>
                <th className="px-6 py-3 font-medium">Campaña</th>
                <th className="px-6 py-3 font-medium text-right">Inversión (COP)</th>
                <th className="px-6 py-3 font-medium text-right">Intakes Atribuidos</th>
                <th className="px-6 py-3 font-medium text-right">Oportunidades</th>
                <th className="px-6 py-3 font-medium text-right">Ventas Confirmadas</th>
                <th className="px-6 py-3 font-medium text-right">CPL (Intake)</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((cmp) => {
                // Buscamos atribuciones que coincidan con esta campaña (ID o nombre en UTM)
                const cmpAttrs = attributions.filter(a => a.campaign_id === cmp.id || a.utm_json?.utm_campaign === cmp.name);
                const intakeIds = cmpAttrs.map(a => a.intake_id);
                
                // Oportunidades creadas desde esos intakes
                const opps = opportunities.filter(o => intakeIds.includes(o.created_from_intake_id));
                const won = opps.filter(o => o.stage === 'WON').length;
                
                // CPL basado en Intakes válidos
                const cpl = cmpAttrs.length > 0 ? cmp.spend / cmpAttrs.length : 0;

                return (
                  <tr key={cmp.id} className="border-b border-border last:border-0 hover:bg-surface-elevated/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{cmp.name}</td>
                    <td className="px-6 py-4 text-right">${cmp.spend.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-primary font-medium">{cmpAttrs.length}</td>
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
