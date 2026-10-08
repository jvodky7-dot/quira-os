# Plan de Implementación Quirá OS V2

## Priorización P0 (24 horas) - ✅ COMPLETADO
Verticales completas que demuestran el flujo de punta a punta.

1. **Infraestructura y Persistencia (✅ Completado)**
   - Modelo de datos Zod y persistencia unificada (Zustand CQRS).
   - Generación del seed demo de 150+ contactos garantizando relaciones complejas.

2. **Captura (Encuesta Pública) (✅ Completado)**
   - Formulario publicable. Captura de UTMs, session_id. Comando `submitSurvey`.

3. **Resolución de Identidad (✅ Completado)**
   - Deduplicación básica por teléfono E.164 e Intake vinculado.

4. **Operación Comercial (Workbench & Inspector 360°) (✅ Completado)**
   - Vista de "Atención requerida" y Ficha 360° interactiva con 7 pestañas.
   - Commands: `recordContact`, `scheduleVisit`.

5. **Pipeline & Máquina de Estados (✅ Completado)**
   - Drag & Drop interactuando con comandos de dominio en `StageTransition`.

6. **Transaccional Básico (Cotización, Reserva, Venta) (✅ Completado)**
   - Tabla de Quotes interactiva y registros de `Sale` (`confirmSale`).
   
7. **Analítica y Métricas (✅ Completado)**
   - Dashboard y Marketing Intelligence re-cableados leyendo eventos P0.

## Pendiente a P1 / P2

Estas funcionalidades se representarán como "No disponibles en Demo" o UI deshabilitada:

**P1 (Refinamiento)**:
- ✅ Búsqueda global avanzada (Command Palette `CMD+K`).
- ✅ Matrix de objeciones interactiva predictiva (Ficha 360).
- ⏳ Versionado dinámico de encuestas (editor visual AB testing).
- ⏳ Exportaciones granulares CSV controladas por RLS.

**P2 (Producción/Backend Real)**:
- Integración real con Meta Conversions API y WhatsApp Business API.
- Motor de base de datos relacional transaccional (PostgreSQL/Supabase) con RLS (Row Level Security).
- Autenticación multitenant con JWT.
- Integración con ERP de Quirá para sincronización bidireccional de inventario.
