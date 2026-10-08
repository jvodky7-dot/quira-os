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
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Centro de control", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { name: "Contactos", href: "/leads", icon: Users },
  { name: "Encuestas", href: "/surveys", icon: ClipboardList },
  { name: "Marketing Intelligence", href: "/marketing", icon: LineChart },
  { name: "Agenda", href: "/agenda", icon: CalendarDays },
  { name: "Inventario", href: "/inventory", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 flex-shrink-0 bg-surface flex flex-col h-full border-r border-border">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <h1 className="font-semibold text-lg tracking-tight text-foreground">
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
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/settings"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-surface-elevated hover:text-foreground transition-colors"
        >
          <Settings className="mr-3 h-5 w-5 text-muted-foreground" />
          Configuración
        </Link>
      </div>
    </div>
  );
}
