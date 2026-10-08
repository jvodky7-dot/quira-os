"use client";

import { useStore } from "@/store/useStore";
import { Search, Filter } from "lucide-react";

export default function InventoryPage() {
  const { units } = useStore();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'AVAILABLE': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'IN_NEGOTIATION': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'RESERVED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'SOLD': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'OFF_MARKET': return 'bg-surface-elevated text-muted-foreground';
      default: return 'bg-surface-elevated text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Inventario V2</h2>
          <p className="text-muted-foreground mt-1 text-sm">Disponibilidad y precios de unidades.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-surface-elevated/30">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar unidad..." 
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-surface-elevated transition-colors text-foreground">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-surface-elevated/50">
              <tr>
                <th className="px-6 py-3 font-medium">Torre / Unidad</th>
                <th className="px-6 py-3 font-medium text-right">Área (m²)</th>
                <th className="px-6 py-3 font-medium text-center">Tipología</th>
                <th className="px-6 py-3 font-medium text-right">Precio Vigente (COP)</th>
                <th className="px-6 py-3 font-medium text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id} className="border-b border-border last:border-0 hover:bg-surface-elevated/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {unit.tower_id} - <span className="text-primary">{unit.code}</span>
                  </td>
                  <td className="px-6 py-4 text-right">{unit.area_m2} m²</td>
                  <td className="px-6 py-4 text-center">{unit.type}</td>
                  <td className="px-6 py-4 text-right font-medium text-foreground">
                    ${unit.published_price_cop.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(unit.inventory_state)}`}>
                      {getStatusLabel(unit.inventory_state)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
