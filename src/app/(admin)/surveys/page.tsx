"use client";

import { useStore } from "@/store/useStore";
import { Link2, Eye, MousePointerClick, ClipboardCheck } from "lucide-react";
import Link from "next/link";

export default function SurveysPage() {
  const { submissions } = useStore();

  const totalViews = 1450; // Mock data
  const totalStarts = 850;
  const totalSubmissions = submissions.length + 45; // Mock history
  const conversionRate = ((totalSubmissions / totalViews) * 100).toFixed(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Encuestas y Captación</h2>
          <p className="text-muted-foreground mt-1 text-sm">Rendimiento de los formularios públicos.</p>
        </div>
        <Link 
          href="/e/quira" 
          target="_blank"
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Link2 className="w-4 h-4 mr-2" />
          Ver encuesta pública
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <MetricCard title="Vistas" value={totalViews} icon={Eye} />
        <MetricCard title="Inicios" value={totalStarts} icon={MousePointerClick} />
        <MetricCard title="Envíos Válidos" value={totalSubmissions} icon={ClipboardCheck} />
        <MetricCard title="Tasa Vista → Envío" value={`${conversionRate}%`} icon={ClipboardCheck} />
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm p-6">
        <div className="mb-6 flex justify-between items-center border-b border-border pb-4">
          <h3 className="font-semibold text-foreground">Versiones Activas</h3>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
          <div>
            <h4 className="font-medium text-foreground text-lg">Diagnóstico Comercial v1.0</h4>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-4">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Publicada</span>
              <span>•</span>
              <span>/e/quira</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded bg-surface-elevated transition-colors">
              Editar
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              Copiar Enlace UTM
            </button>
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
