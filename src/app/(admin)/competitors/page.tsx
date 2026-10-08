"use client";

import { Building2, Search, ArrowRightLeft, Calendar, FileCheck2, AlertTriangle } from "lucide-react";

export default function CompetitorsPage() {
  const competitors = [
    {
      id: 1, name: "Torres del Sol", distance: "1.2 km", date: "2026-09-15",
      price: "$380M", area: "70m²", valM2: "$5.4M", 
      parking: "Incluido", payment: "30% a 18 meses", status: "VERIFIED"
    },
    {
      id: 2, name: "Reserva del Bosque", distance: "0.8 km", date: "2026-09-20",
      price: "$340M", area: "62m²", valM2: "$5.48M", 
      parking: "No incluido ($25M adic.)", payment: "20% a 12 meses", status: "VERIFIED"
    },
    {
      id: 3, name: "Altos de la Colina", distance: "2.5 km", date: "2026-08-10",
      price: "$410M", area: "85m²", valM2: "$4.8M", 
      parking: "Incluido (x2)", payment: "Desconocido", status: "UNVERIFIED"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Comparador de Competencia (M13)</h2>
          <p className="text-muted-foreground mt-1 text-sm">Registro de proyectos competidores con atributos verificables.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
          <Building2 className="w-4 h-4 mr-2" /> Nuevo Competidor
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4 bg-surface-elevated/30">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Buscar proyecto..." className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="px-4 py-2 border border-border bg-surface rounded-lg text-sm font-medium hover:bg-surface-elevated flex items-center">
            <ArrowRightLeft className="w-4 h-4 mr-2" /> Comparar
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-surface-elevated/50">
              <tr>
                <th className="px-6 py-4 font-medium">Proyecto (Competidor)</th>
                <th className="px-6 py-4 font-medium">Área vs Precio</th>
                <th className="px-6 py-4 font-medium">Condiciones (Parqueadero/Pagos)</th>
                <th className="px-6 py-4 font-medium">Validación</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp) => (
                <tr key={comp.id} className="border-b border-border last:border-0 hover:bg-surface-elevated/20">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{comp.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{comp.distance} de distancia</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{comp.price} <span className="text-muted-foreground font-normal">({comp.area})</span></div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">{comp.valM2}/m²</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{comp.parking}</div>
                    <div className="text-xs text-muted-foreground mt-1">Facilidades: {comp.payment}</div>
                  </td>
                  <td className="px-6 py-4">
                    {comp.status === 'VERIFIED' ? (
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center text-xs font-medium text-green-600 bg-green-500/10 px-2 py-1 rounded w-fit">
                          <FileCheck2 className="w-3 h-3 mr-1" /> Verificado
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center"><Calendar className="w-3 h-3 mr-1" /> {comp.date}</span>
                      </div>
                    ) : (
                      <span className="flex items-center text-xs font-medium text-yellow-600 bg-yellow-500/10 px-2 py-1 rounded w-fit">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Requiere actualización
                      </span>
                    )}
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
