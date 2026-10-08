import { Sidebar } from "@/components/layout/Sidebar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Suspense fallback={null}><CommandPalette /></Suspense>
      <Suspense fallback={<div className="w-[248px] flex-shrink-0 bg-background border-r"></div>}><Sidebar /></Suspense>
      <main className="flex-1 overflow-y-auto bg-surface p-6 sm:p-10 rounded-tl-[20px] border-t border-l border-border shadow-tm-window relative z-0 mt-2 ml-2">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
