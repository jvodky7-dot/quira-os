"use client";

import { useStore } from "@/store/useStore";
import { format, parseISO } from "date-fns";
import { Search, UserPlus } from "lucide-react";

export default function LeadsPage() {
  const { leads, opportunities } = useStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Contactos</h2>
          <p className="text-muted-foreground mt-1 text-sm">Directorio de leads e interesados.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
          <UserPlus className="w-4 h-4 mr-2" />
          Nuevo Contacto
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-surface-elevated/30">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o teléfono..." 
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-surface-elevated/50">
              <tr>
                <th className="px-6 py-3 font-medium">Nombre</th>
                <th className="px-6 py-3 font-medium">Teléfono</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium text-center">Fecha Ingreso</th>
                <th className="px-6 py-3 font-medium text-center">Estado Pipeline</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const opp = opportunities.find(o => o.lead_id === lead.id);
                
                return (
                  <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-surface-elevated/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.phone}</td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.email || '-'}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">
                      {format(parseISO(lead.created_at), 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {opp ? (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface-elevated text-foreground border border-border">
                          {opp.stage}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">Sin oportunidad</span>
                      )}
                    </td>
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
