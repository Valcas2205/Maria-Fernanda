# Automatización de Pagos con Banco Plaza (Revisión Final)

Este documento presenta la propuesta arquitectónica definitiva para la validación automática de pagos.

## Open Questions

> [!TIP]
> **Paginación en Banco Plaza:** La documentación actual de las APIs de Banco Plaza no menciona esquemas de paginación explícitos (ej. `page=1`, `limit=50`). Para la gran mayoría de operaciones en Venezuela, el banco retorna todo el bloque en un arreglo si la ventana de tiempo es corta. Como diseñaremos el Worker para que pida ventanas de tiempo ultra-cortas (ver abajo), no deberíamos chocar con límites de paginación. Si en el futuro sobrepasamos los límites del banco por un volumen monstruoso de transacciones, se hablará con ellos para implementar paginación (si la soportan) o reducir la ventana a nivel de segundos.

---

## Proposed Changes

### 1. Dinámica del Cron (Velocidad y Tiempos de Espera)
Sobre tu pregunta de si el primer chequeo espera 2 minutos:
- En esta estrategia de conciliación, **el CronJob se ejecutará exactamente cada 1 minuto**.
- El "Backoff Exponencial" ya no es necesario a nivel de llamadas HTTP porque no hacemos una llamada por cada pago, sino una sola llamada maestra.
- **Experiencia de Usuario**: Si el usuario envía el formulario a las `12:00:45`, y el cron corre a las `12:01:00`, el usuario esperará en la pantalla de carga solo **15 segundos** para su primera validación. Si el banco aún no ha reflejado la operación internamente, el cron de las `12:02:00` volverá a descargar el estado de cuenta y lo encontrará (espera total ~1m 15s).
- Un minuto es el balance ideal entre una experiencia de usuario rápida y no hostigar al servidor del banco.

### 2. Rango de Fechas Inteligente (Dynamic Window Fetching)
Trajiste un punto crítico: ¿Qué pasa con los pagos de ayer a las 11:59 PM? Si descargamos "el día de hoy", ese pago jamás será conciliado.
Para solucionarlo de forma elegante sin traer data inútil de meses atrás, el Worker usará una **Ventana de Búsqueda Dinámica**:

1. El Worker busca en Directus todos los pagos en estado `verifying`.
2. Calcula la fecha de creación más antigua entre esos pagos (`oldest_verifying_date`).
3. Al llamar a la API del Banco Plaza, enviará como parámetros:
   - `fechaInicio`: `oldest_verifying_date - 1 hora` (por seguridad de zona horaria / desfase bancario).
   - `fechaFin`: `NOW()`.
4. **Ventaja**: Si todos tus usuarios pagaron hace 5 minutos, la consulta al banco solo trae los movimientos de los últimos 5 minutos. Pero si hay un pago "huérfano" de hace 2 días que aún sigue en `verifying`, la ventana se abre automáticamente a 48 horas para intentar encontrarlo.
5. **Ahorro Absoluto**: Si la tabla en Directus NO tiene ningún pago en estado `verifying`, el Worker **no llama a las APIs de Banco Plaza**. Se duerme.

### 3. Frontend (Maria-Fernanda)
- **Nuevo Campo de Cédula**: Añadiremos el campo `sender_id` (Cédula de Identidad del emisor) al formulario de Pago Móvil y Transferencias. Esto permitirá un nivel de *matching* blindado en el backend.
- **Pantalla de Carga**: El short-polling consultará nuestro backend cada 3-4 segundos. Si el estado cambia a `approved`, muestra éxito. Si después de cierto tiempo el frontend no ve respuesta, cambia a mensaje informativo sin cancelar el pago, el backend seguirá trabajando de fondo hasta que alcance el límite máximo (48h) momento en que degradará el pago a `pending`.

### 4. Directus
- Extender la colección `tenants` con `banco_plaza_rif` y `banco_plaza_account`.
- Colección `payments` con estados: `verifying` -> `approved` | `pending`.
- Campos nuevos en `payments`: `verification_expires_at` y `banco_plaza_match_log`.

### 5. Backend (ladevhouse-waas/apps/api)
- `ReconciliationWorkerModule` usando `@nestjs/schedule` (1 min) + Optimistic Locking (transacciones de DB seguras) para evitar colisiones si escalamos la infraestructura a varios pods en Kubernetes.
