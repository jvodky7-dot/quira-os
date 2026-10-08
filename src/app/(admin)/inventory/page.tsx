"use client";

import { useStore } from "@/store/useStore";
import { Building2, Search, Filter, AlertCircle, Home } from "lucide-react";
import { useState } from "react";

export default function InventoryPage() {
  const { units, quotes, sales } = useStore();
  const [filter, setFilter] = useState('ALL');

  // Group units by tower and then by floor (assuming code format like "101" -> floor 1)
  const towers = Array.from(new Set(units.map(u => u.tower_id))).sort();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Inventario Visual (M05)</h2>
          <p className="text-muted-foreground mt-1 text-sm">Estado en tiempo real de unidades y disponibilidad.</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none"
          >
            <option value="ALL">Todas las unidades</option>
            <option value="AVAILABLE">Disponibles</option>
            <option value="SOLD">Vendidas</option>
            <option value="RESERVED">Reservadas (Hold)</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Más Filtros
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {towers.map(tower => {
          const towerUnits = units.filter(u => u.tower_id === tower);
          // Get floors
          const floors = Array.from(new Set(towerUnits.map(u => Math.floor(parseInt(u.code) / 100)))).sort((a,b)=>b-a);

          return (
            <div key={tower} className="min-w-[300px] flex-1 bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-surface-elevated/50 p-4 border-b border-border text-center">
                <h3 className="font-bold text-lg">Torre {tower}</h3>
                <p className="text-xs text-muted-foreground">{towerUnits.length} unidades totales</p>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                {floors.map(floor => {
                  const floorUnits = towerUnits.filter(u => Math.floor(parseInt(u.code)/100) === floor);
                  return (
                    <div key={floor} className="flex flex-col gap-2 relative">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90">Piso {floor}</div>
                      <div className="grid grid-cols-2 gap-3 pl-4">
                        {floorUnits.map(unit => {
                          if (filter !== 'ALL' && unit.inventory_state !== filter) return <div key={unit.id} className="opacity-0"></div>;

                          const isAvailable = unit.inventory_state === 'AVAILABLE';
                          const isSold = unit.inventory_state === 'SOLD';
                          
                          return (
                            <div 
                              key={unit.id} 
                              className={`p-3 rounded-lg border flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                                isAvailable ? 'bg-background border-green-500/30 hover:border-green-500 text-foreground' : 
                                isSold ? 'bg-surface-elevated border-red-500/20 text-muted-foreground opacity-75' : 
                                'bg-yellow-500/10 border-yellow-500/30 text-yellow-700'
                              }`}
                            >
                              <div className="font-bold text-sm">{unit.code}</div>
                              <div className="text-[10px] uppercase mt-1">{unit.type} • {unit.area_m2}m²</div>
                              {isAvailable && (
                                <div className="text-xs font-semibold text-green-600 dark:text-green-400 mt-2">
                                  ${(unit.published_price_cop / 1000000).toFixed(0)}M
                                </div>
                              )}
                              {!isAvailable && (
                                <div className="text-[10px] uppercase font-bold mt-2">
                                  {unit.inventory_state}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
