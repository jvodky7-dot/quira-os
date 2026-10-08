# Quirá OS - Design System

Este documento define la estética, componentes y reglas visuales para Quirá OS, basado en el sistema **TriMind Visual (Liquid Glass & Shell)**. Los agentes de IA (incluyendo herramientas de generación de UI y copilotos) deben usar estas pautas para mantener la consistencia visual del sistema.

## 1. Identidad y Tema Principal
- **Estética Base**: "Liquid Glass" y "Shell", caracterizados por paneles flotantes, fondos oscuros estructurados y sombras profundas.
- **Modos**: Soporta modo claro (Warm Porcelain) y oscuro (Dark Graphite). El modo oscuro es el tema por defecto en la interfaz administrativa.
- **Formas**: Radios de borde amplios (18px a 20px) para ventanas y paneles principales, dando un aspecto orgánico y moderno.

## 2. Paleta de Colores (Dark Graphite - Default)
- **Background / Workspace**: `#111114` - Fondo general de la aplicación.
- **Shell / Surface**: `#18181D` - Fondo de las tarjetas, barras laterales y paneles principales.
- **Surface Elevated**: `#212128` - Elementos interactivos, modales o secciones que resaltan sobre el Surface.
- **Border**: `#2A2A33` - Bordes sutiles para tarjetas y separadores.
- **Foreground / Text**: `#EDEDF2` - Texto principal.
- **Text Muted**: `#72727D` - Texto secundario o descriptivo.
- **Primary / Accent**: `#6C72FF` - Marca principal, botones primarios, focus rings.

## 3. Tipografía
- **Fuente Principal**: Geist (y derivados), Inter, o system-ui.
- **Fuente Mono**: Geist Mono para datos tabulares, IDs o código.
- **Jerarquía**: Encabezados con tracking (letter-spacing) ligeramente negativo (`tracking-tight`), textos limpios con contraste moderado.

## 4. Sombras y Efectos "Liquid Glass"
- **Ventanas (`shadow-tm-window`)**: Una sombra profunda y difuminada que da la ilusión de que el componente principal (main content) flota sobre el fondo: `0 0 0 1px rgba(255,255,255,0.08), 0 24px 56px -12px rgba(0,0,0,0.8)`.
- **Tarjetas (`shadow-tm-card`)**: Sombra media para paneles internos: `0 0 0 1px rgba(255,255,255,0.05), 0 4px 14px -6px rgba(0,0,0,0.4)`.

## 5. Componentes Clave
- **Botones**: Suaves, con fondo `bg-primary` y esquinas redondeadas (`rounded-lg`). En hover, deben mantener una transición sutil de color (`transition-colors`).
- **Sidebar**: Debe integrarse suavemente con el fondo (`bg-background`), sin borde derecho si es posible, y los ítems activos resaltados con `bg-primary/10 text-primary`.
- **Main Content (Shell)**: Se envuelve en un contenedor con `bg-surface rounded-tl-[20px] shadow-tm-window border-t border-l border-border`.

## 6. Prácticas para Agentes de Código
- **Tailwind**: Utilizar clases base definidas en `@theme` (ej. `bg-surface`, `text-foreground`, `border-border`). Evitar colores *hardcoded* (`bg-[#111114]`).
- **Estados**:
  - Exito: `#34C759`
  - Error/Bloqueo: `#FF453A`
  - Progreso: `#4F8DF2`
  - Revisión: `#A56EF2`
- **Iconografía**: Utilizar la librería Lucide React.
