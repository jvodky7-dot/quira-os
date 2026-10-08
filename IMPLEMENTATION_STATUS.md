# Estado de Implementación Quirá OS

| Módulo | Fase | Estado actual | Limitaciones documentadas |
|---|---|---|---|
| **Dominio y Core** | Arquitectura | ⏳ Pendiente refactor a V2 | Se reescribirán las interfaces a esquemas Zod estrictos. |
| **Persistencia** | Core | ⏳ Pendiente | Zustand se reconfigurará como event-store mock. |
| **Encuesta Externa** | Captación | ⏳ Pendiente V2 | Completitud y UTMs. Validación de server simulado requerida. |
| **Resolución de Identidad**| Core | ⏳ Pendiente | Falta deduplicación y vinculación de Intakes múltiples a Lead. |
| **Pipeline (Kanban)** | Conversión | ⏳ Pendiente refactor | Guards estrictos para el Drag&Drop (Ej: no a VENTA sin `confirmSale`). |
| **Ficha 360° / Contactos**| Atención | ✅ Implementado V2 | 6 pestañas funcionales (Resumen, Diagnóstico, Actividad, Agenda, Cotizaciones, Atribución) + Objeciones P1. |
| **Transaccional** | Cierre | ✅ Implementado V2 | Comandos `confirmSale` y tabla Quotes implementada. |
| **Agenda y Visitas** | Atención | ✅ Implementado V2 | Distinción explícita de `Task` vs `Appointment`. |
| **Dashboard y Marketing**| Analítica | ✅ Implementado V2 | Recalcula KPIs sobre la estructura de eventos en lugar de propiedades estáticas. |
| **Búsqueda Global (CMD+K)**| Utilidad | ✅ Implementado P1 | Command Palette con acceso a inventario y contactos. |
| **Matriz de Objeciones**| IA | ✅ Implementado P1 | Mockup de recomendaciones predictivas incrustado en Ficha 360°. |
| **Constructor Encuestas**| Captación | ✅ Implementado P1 | Editor visual de bloques con soporte simulado para A/B testing. |
| **Inventario Visual M05**| Cierre | ✅ Implementado P1 | Torre, Pisos y Estados de Unidad interactivos. |
| **Cotizador M04**| Cierre | ✅ Implementado P1 | Escenarios de pago Múltiples (A/B) y Cuota Inicial. |
| **Comparador Competencia M13**| Estrategia | ✅ Implementado P1 | Registro y validación contra referentes del mercado. |
| **Sala de Ventas Digital M06**| Captación | ✅ Implementado P1 | Kiosko interactivo para atención no intrusiva en sitio (`/kiosk`). |
| **Importador Histórico M16**| Core | ✅ Implementado P1 | Drag&Drop UI para recuperación de base de datos. |

*(Fase P0 y Fase P1 Completada en Front-end y Zustand CQRS).*
