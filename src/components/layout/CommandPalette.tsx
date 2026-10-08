"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Search, User, FileText, Home, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { leads, opportunities, units } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const results = [];
  const q = query.toLowerCase();

  if (q.length > 1) {
    // Buscar leads
    leads.filter(l => l.name.toLowerCase().includes(q) || l.phone_e164?.includes(q) || l.email_normalized?.toLowerCase().includes(q))
      .slice(0, 5).forEach(l => results.push({ type: 'lead', data: l }));

    // Buscar oportunidades (ej: por ID o estado)
    opportunities.filter(o => o.id.toLowerCase().includes(q) || o.stage.toLowerCase().includes(q))
      .slice(0, 3).forEach(o => results.push({ type: 'opp', data: o }));

    // Buscar unidades
    units.filter(u => u.code.toLowerCase().includes(q) || u.tower_id.toLowerCase().includes(q))
      .slice(0, 3).forEach(u => results.push({ type: 'unit', data: u }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-background/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Buscar contactos, unidades o comandos... (Ej: Carlos, T1-102)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex px-2 py-0.5 text-xs text-muted-foreground bg-surface-elevated rounded border border-border">ESC</kbd>
        </div>

        {query.length > 1 && (
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">No se encontraron resultados.</p>
            ) : (
              <div className="space-y-1">
                {results.map((res, i) => {
                  if (res.type === 'lead') {
                    const l = res.data;
                    return (
                      <button 
                        key={i} 
                        onClick={() => { setIsOpen(false); router.push(`/leads/${l.id}`); }}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-elevated transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 text-primary rounded-lg"><User className="w-4 h-4" /></div>
                          <div>
                            <div className="font-medium text-sm text-foreground">{l.name}</div>
                            <div className="text-xs text-muted-foreground">{l.phone_e164} • {l.email_normalized}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )
                  }
                  if (res.type === 'unit') {
                    const u = res.data;
                    return (
                      <button 
                        key={i} 
                        onClick={() => { setIsOpen(false); router.push(`/inventory`); }}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-elevated transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Home className="w-4 h-4" /></div>
                          <div>
                            <div className="font-medium text-sm text-foreground">{u.tower_id}-{u.code}</div>
                            <div className="text-xs text-muted-foreground">{u.type} • {u.area_m2} m² • {u.inventory_state}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        )}
        
        {query.length <= 1 && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Escribe al menos 2 caracteres para buscar en Quirá OS.
          </div>
        )}
      </div>
    </div>
  );
}
