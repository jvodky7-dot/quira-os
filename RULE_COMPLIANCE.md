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
| BR-031 | ✅ Implementado | AT-026 | `app/my-day` | Asignación y cola de espera visible (M01). |
| BR-032 | ✅ Implementado | AT-027 | `store/useStore.ts` | `recordAttempt` distingue intento vs efectivo. |
| BR-033 | ⏳ Pendiente | - | `domain/transition.ts`| Razón y actor al reasignar responsable. |
| BR-034 | ✅ Implementado | AT-028 | `app/my-day` | SLA vencido alertado sin cambiar etapa. |
| BR-035 | ⏳ Pendiente | - | `store/useStore.ts` | Toda Opportunity activa debe tener próxima acción. |
| BR-036 | ✅ Implementado | - | `app/pipeline` | Diferenciar score predictivo de riesgo operativo. |
| BR-037 | ✅ Implementado | - | `app/leads/[id]` | Financiación como dato informativo, no aprobación. |
| BR-038 | ✅ Implementado | AT-031 | `app/leads/[id]` | Parqueadero es objeción, no exclusión. |
| BR-039 | ✅ Implementado | AT-033 | `domain/schemas.ts` | Cotización conserva precio, versión y supuestos. |
| BR-040 | ⏳ Pendiente | AT-032 | `domain/reservation.ts`| Verificación de inventario antes de reservar. |
| BR-041 | ⏳ Pendiente | - | `domain/quote.ts` | Aprobación para cambios de precio. |
| BR-042 | ✅ Implementado | AT-032 | `app/quotes` | Reserva es transaccional (M04, M12). |
| BR-043 | ⏳ Pendiente | - | `store/useStore.ts` | Dos asesoras no pueden reservar misma unidad. |
| BR-044 | ⏳ Pendiente | - | `store/useStore.ts` | Expiración de reserva no hace venta. |
| BR-045 | ⏳ Pendiente | AT-030 | `store/useStore.ts` | Visita agendada vs realizada vs no-show. |
| BR-046 | ⏳ Pendiente | AT-030 | `app/my-day` | No-show crea seguimiento en M08. |
| BR-047 | ⏳ Pendiente | - | `store/useStore.ts` | Pérdida conserva motivo. |
| BR-048 | ⏳ Pendiente | - | `domain/schemas.ts` | CommercialHypothesis (M09). |
| BR-049 | ⏳ Pendiente | AT-034 | `app/marketing` | Muestra insuficiente no declara ganador. |
| BR-050 | ⏳ Pendiente | - | `app/marketing` | Separar calidad comercial de la velocidad. |
| BR-051 | ✅ Implementado | - | `store/useStore.ts` | Inventario base compartido y simulado. |
| BR-052 | ⏳ Pendiente | - | `domain/schemas.ts` | MarketComparisonSnapshot (M13). |
| BR-053 | ✅ Implementado | - | `app/quotes` | UI no promete preaprobaciones. |
| BR-054 | ⏳ Pendiente | - | `domain/schemas.ts` | FinancingMilestone (M11). |
| BR-055 | ⏳ Pendiente | AT-035 | `app/dashboard` | Drill-down en KPIs. |
| BR-056 | ⏳ Pendiente | - | `domain/metrics.ts` | Reactivación no distorsiona CPA histórico. |
| BR-057 | ⏳ Pendiente | - | `domain/import.ts` | Importación CSV (M16). |

*Estado: Las reglas de la V2.1 han sido añadidas. Prioridad en M01, M02, M03, M07.*
