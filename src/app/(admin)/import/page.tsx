"use client";

import { UploadCloud, FileSpreadsheet, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

export default function ImportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Importación Histórica (M16)</h2>
        <p className="text-muted-foreground mt-1 text-sm">Carga de contactos desde Excel preservando procedencia y calidad.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm p-8 text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-lg mb-2">Arrastra tu archivo CSV o Excel</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          El sistema normalizará los teléfonos E.164, buscará duplicados y generará entidades <code>Lead</code> e <code>Intake</code> con la etiqueta de origen.
        </p>
        <button className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
          Seleccionar Archivo
        </button>
      </div>

      <h4 className="font-semibold text-foreground mb-4">Historial de Importaciones</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-surface-elevated rounded-lg"><FileSpreadsheet className="w-5 h-5 text-green-600" /></div>
            <div>
              <div className="font-medium text-sm">contactos_feria_vivienda_2025.csv</div>
              <div className="text-xs text-muted-foreground">Importado por Admin • Hace 2 meses</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-foreground">450</div>
              <div className="text-[10px] text-muted-foreground uppercase">Procesados</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600 flex items-center justify-center"><CheckCircle className="w-3 h-3 mr-1" /> 412</div>
              <div className="text-[10px] text-muted-foreground uppercase">Insertados</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-600 flex items-center justify-center"><AlertTriangle className="w-3 h-3 mr-1" /> 38</div>
              <div className="text-[10px] text-muted-foreground uppercase">Duplicados</div>
            </div>
          </div>
          <button className="text-xs font-medium text-primary hover:underline flex items-center">
            Ver detalle <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
