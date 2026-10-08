# Estado de Implementación Quirá OS

| Módulo | Fase | Estado actual | Limitaciones documentadas |
|---|---|---|---|
| **Dominio y Core** | Arquitectura | ⏳ Pendiente refactor a V2 | Se reescribirán las interfaces a esquemas Zod estrictos. |
| **Persistencia** | Core | ⏳ Pendiente | Zustand se reconfigurará como event-store mock. |
| **Encuesta Externa** | Captación | ⏳ Pendiente V2 | Completitud y UTMs. Validación de server simulado requerida. |
| **Resolución de Identidad**| Core | ⏳ Pendiente | Falta deduplicación y vinculación de Intakes múltiples a Lead. |
| **Pipeline (Kanban)** | Conversión | ⏳ Pendiente refactor | Guards estrictos para el Drag&Drop (Ej: no a VENTA sin `confirmSale`). |
| **Ficha 360° / Contactos**| Atención | ⏳ Pendiente | Crear las 9 pestañas requeridas de inspector de Contacto. |
| **Transaccional** | Cierre | ⏳ Pendiente | Módulo Quotes, Reservations y validación contra Inventory. |
| **Agenda y Visitas** | Atención | ⏳ Pendiente | Distinción explícita de `Task` vs `Appointment`. |
| **Dashboard y Marketing**| Analítica | ⏳ Pendiente V2 | Recalcular KPIs sobre la estructura de eventos en lugar de propiedades estáticas. |

*(Documento generado al iniciar la V2. Se actualizará conforme avancen los componentes).*
