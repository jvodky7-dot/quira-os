# Plan de Implementación Quirá OS V2

## Priorización P0 (24 horas)
Verticales completas que demuestran el flujo de punta a punta.

1. **Infraestructura y Persistencia (Iniciado)**
   - Modelo de datos Zod y persistencia unificada (Zustand simulando backend transaccional con persistencia local robusta).
   - Generación del seed demo de 150+ contactos garantizando relaciones complejas.

2. **Captura (Encuesta Pública)**
   - Formulario de múltiples pasos (`/e/quira`) publicable y accesible.
   - Captura de UTMs, session_id e idempotency.
   - `submitSurvey` comando para persistir `SurveySubmission`, `Intake` y enlazar a `Lead` y `Opportunity`.

3. **Resolución de Identidad**
   - Deduplicación básica por teléfono E.164.
   - Si existe Lead, vincular nuevo Intake. Evitar duplicar Oportunidades en el mismo ciclo.

4. **Operación Comercial (Workbench & Inspector 360°)**
   - Vista de "Atención requerida" (SLA, tareas vencidas, próximas visitas).
   - Ficha 360° en `/leads/:id` con pestañas interactivas (diagnóstico, timeline, agenda, etc.).
   - Commands: `recordSuccessfulContact`, `scheduleVisit`, `qualifyOpportunity`.

5. **Pipeline & Máquina de Estados**
   - Drag & Drop con Guards (ej. no mover a VISIT_COMPLETED sin fecha/resultado).
   - Registro en `StageTransition` (append-only) para histórico auditable.

6. **Transaccional Básico (Cotización, Reserva, Venta)**
   - Emitir `Quote` (versionada).
   - Crear `Reservation` afectando el estado de la `PropertyUnit`.
   - `confirmSale` auditada. `markOpportunityLost` exigiendo razón.

7. **Analítica y Métricas**
   - Re-cablear el Dashboard y Marketing Intelligence para leer de las entidades base (submissions, stage transitions, etc.) y no de valores pre-agregados hardcodeados.

## Pendiente a P1 / P2 (NO en alcance de 24h)

Estas funcionalidades se representarán como "No disponibles en Demo" o UI deshabilitada:

**P1 (Refinamiento)**:
- Versionado dinámico de encuestas (editor visual AB testing).
- Matrix de objeciones interactiva predictiva.
- Exportaciones granulares CSV controladas por RLS.
- Búsqueda global avanzada (Command Palette con indexación full-text).

**P2 (Producción/Backend Real)**:
- Integración real con Meta Conversions API y WhatsApp Business API.
- Motor de base de datos relacional transaccional (PostgreSQL/Supabase) con RLS (Row Level Security).
- Autenticación multitenant con JWT.
- Integración con ERP de Quirá para sincronización bidireccional de inventario.
