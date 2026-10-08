"use client";

export default function SettingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Configuración</h2>
          <p className="text-muted-foreground mt-1 text-sm">Administración del sistema Quirá OS.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm p-8 text-center text-muted-foreground">
        <p>Panel de configuración disponible en la versión completa.</p>
        <p className="text-sm mt-2">Roles, permisos, etapas y orígenes de atribución.</p>
      </div>
    </div>
  );
}
