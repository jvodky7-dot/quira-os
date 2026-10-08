# Cumplimiento de Reglas de Negocio (BRs)

| ID | Estado | Aceptación (AT) | Archivo Responsable | Descripción |
|---|---|---|---|---|
| BR-001 | ⏳ Pendiente | AT-03, AT-04 | `domain/lead.ts` | Identidad única por teléfono E.164. |
| BR-002 | ✅ Implementado | AT-24 | `store/useStore.ts` | Cada captura persiste fuente y fecha. |
| BR-003 | ✅ Implementado | - | `domain/schemas.ts` | Separación de Lead y Opportunity. |
| BR-004 | ✅ Implementado | AT-12 | `domain/sale.ts` | Venta exige comando autorizado, no select UI. |
| BR-005 | ⏳ Pendiente | AT-10 | `domain/reservation.ts` | Separación no es venta en métricas. |
| BR-006 | ✅ Implementado | AT-06 | `store/useStore.ts`| Etapas guardan fecha, actor y motivo. |
| BR-007 | ⏳ Pendiente | AT-13 | `domain/opportunity.ts` | Pérdida requiere causa tipificada. |
| BR-008 | ⏳ Pendiente | AT-14 | `domain/opportunity.ts` | Reactivar crea evento de reapertura y conserva pérdida. |
| BR-009 | ⏳ Pendiente | - | `domain/attribution.ts` | Origen no identificado si faltan UTMs, nunca inventado. |
| BR-010 | 🔜 P1 | AT-20 | `domain/survey.ts` | Versiones inmutables de encuestas. |
| BR-011 | ⏳ Pendiente | AT-01 | `api/surveys/submit.ts` | Sin éxito de envío antes de persistir. |
| BR-012 | ⏳ Pendiente | AT-02 | `api/surveys/submit.ts` | Idempotencia en submissions. |
| BR-013 | ✅ Implementado | AT-15 | `store/useStore.ts` | Cola `SIN_ASIGNAR` si no hay asesor. |
| BR-014 | ⏳ Pendiente | - | `domain/task.ts` | Cambio de etapa no auto-completa tareas. |
| BR-015 | ⏳ Pendiente | AT-08 | `domain/visit.ts` | Cita agendada != realizada. |
| BR-016 | ⏳ Pendiente | AT-09 | `domain/quote.ts` | Cotización versionada al cambiar valor. |
| BR-017 | ✅ Implementado | AT-11 | `domain/unit.ts` | Bloqueo de inventario tras separación/venta. |
| BR-018 | ⏳ Pendiente | AT-16 | `domain/metrics.ts` | KPIs calculados de fuente única. |
| BR-019 | ⏳ Pendiente | AT-18 | `domain/metrics.ts` | Manejo seguro de división por cero en KPIs. |
| BR-020 | ⏳ Pendiente | AT-17 | `domain/metrics.ts` | Diferenciar cohortes de eventos actuales. |
| BR-021 | ⏳ Pendiente | AT-05 | `domain/attribution.ts` | First-touch no se sobrescribe. |
| BR-022 | ⏳ Pendiente | - | `domain/scoring.ts` | Score desglosado explicable. |
| BR-023 | ⏳ Pendiente | AT-19 | `application/commands` | Permisos en capa de servicio. |
| BR-024 | ⏳ Pendiente | AT-21 | `ui/components` | UI con etiquetas DEMO evidentes. |
| BR-025 | ⏳ Pendiente | - | `domain/intake.ts` | Intake genérico para múltiples canales. |
| BR-026 | ⏳ Pendiente | - | `domain/transition.ts`| Deshacer respeta eventos previos (compensación). |
| BR-027 | ⏳ Pendiente | - | `domain/metrics.ts` | Informes diferencian influencia vs causalidad publicitaria. |
| BR-028 | ⏳ Pendiente | - | `domain/consent.ts` | ConsentRecord individual. |
| BR-029 | ⏳ Pendiente | - | `domain/unit.ts` | Inventario DEMO sin prometer precios reales. |
| BR-030 | ✅ Implementado | AT-25 | `store/useStore.ts` | Persistencia compartida entre ventanas. |

*Estado: Todos Pendientes para reescritura en V2 siguiendo la estricta persistencia en dominio.*
