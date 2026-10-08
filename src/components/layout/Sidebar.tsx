"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Users, 
  ClipboardList, 
  LineChart, 
  CalendarDays, 
  Building2,
  Settings,
  FileText,
  Sun,
  Swords,
  UploadCloud
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Mi Día", href: "/my-day", icon: Sun },
  { name: "Centro de control", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { name: "Contactos", href: "/leads", icon: Users },
  { name: "Encuestas", href: "/surveys", icon: ClipboardList },
  { name: "Marketing Intelligence", href: "/marketing", icon: LineChart },
  { name: "Agenda", href: "/agenda", icon: CalendarDays },
  { name: "Inventario", href: "/inventory", icon: Building2 },
  { name: "Transaccional", href: "/quotes", icon: FileText },
  { name: "Competencia", href: "/competitors", icon: Swords },
  { name: "Importar CSV", href: "/import", icon: UploadCloud },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[248px] flex-shrink-0 bg-background flex flex-col h-full border-r-0">
      <div className="h-[60px] flex items-center px-6 mt-2">
        <h1 className="font-semibold text-[15px] tracking-tight text-foreground">
          Quirá OS
        </h1>
        <span className="ml-2 text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
          Demo
        </span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-[13.5px] font-medium rounded-lg transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
              )}
            >
              <item.icon className={cn("mr-3 h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <Link
          href="/settings"
          className="flex items-center px-3 py-2 text-[13.5px] font-medium rounded-lg text-muted-foreground hover:bg-surface-elevated hover:text-foreground transition-colors"
        >
          <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
          Configuración
        </Link>
      </div>
    </div>
  );
}
