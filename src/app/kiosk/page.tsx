"use client";

import { useStore } from "@/store/useStore";
import { Building2, Home, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function DigitalSalesRoom() {
  const { units } = useStore();
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const availableUnits = units.filter(u => u.inventory_state === 'AVAILABLE').slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="p-6 bg-surface border-b border-border flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Quirá Reservado</h1>
        </div>
        <div className="text-sm font-medium text-muted-foreground bg-surface-elevated px-4 py-2 rounded-full border border-border">
          Modo Kiosco / Sala de Ventas
        </div>
      </header>

      <main className="flex-1 flex p-6 gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden h-[400px]">
            <div className="absolute inset-0 bg-primary/5"></div>
            <Home className="w-24 h-24 text-primary/20 mb-4 relative z-10" />
            <h2 className="text-3xl font-bold relative z-10 mb-2">Descubre tu próximo hogar</h2>
            <p className="text-muted-foreground max-w-md relative z-10">
              Explora los planos interactivos y disponibilidad en tiempo real sin presión comercial.
            </p>
            <div className="mt-8 flex gap-4 relative z-10">
              <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:bg-primary/90 transition-transform hover:scale-105">
                Ver Planos 3D
              </button>
              <button className="px-6 py-3 bg-surface-elevated border border-border text-foreground font-semibold rounded-xl hover:bg-border transition-colors">
                Recorrido Virtual
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" /> Disponibilidad Destacada</h3>
            <div className="grid grid-cols-3 gap-4">
              {availableUnits.map(unit => (
                <div 
                  key={unit.id} 
                  onClick={() => setSelectedUnit(unit.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedUnit === unit.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border bg-surface hover:border-primary/50'}`}
                >
                  <div className="font-bold text-lg">{unit.tower_id}-{unit.code}</div>
                  <div className="text-sm text-muted-foreground mt-1">Tipo {unit.type} • {unit.area_m2}m²</div>
                  <div className="mt-4 font-semibold text-green-600 dark:text-green-400">
                    ${(unit.published_price_cop / 1000000).toFixed(0)} Millones
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[400px] bg-surface border border-border rounded-2xl shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-6 text-center">¿Te interesa algún modelo?</h3>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Ingresa tus datos y recibe inmediatamente el brochure interactivo y una cotización preliminar por WhatsApp.
          </p>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Nombre Completo</label>
              <input type="text" className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:border-primary focus:outline-none" placeholder="Ej: Carlos Gómez" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Teléfono Móvil (WhatsApp)</label>
              <input type="tel" className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:border-primary focus:outline-none" placeholder="+57 300 000 0000" />
            </div>
            <div className="p-3 bg-surface-elevated border border-border rounded-lg flex gap-3 mt-2">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <p className="text-[10px] text-muted-foreground leading-tight">
                Autorizo el tratamiento de mis datos personales según la política de privacidad de Quirá para recibir información comercial.
              </p>
            </div>
            <button className="w-full py-4 mt-6 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-transform hover:translate-y-[-2px]">
              <Send className="w-5 h-5 mr-2" /> Enviar Información
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
