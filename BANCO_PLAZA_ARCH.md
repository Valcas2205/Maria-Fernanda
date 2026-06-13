# Arquitectura Futura: Integración de Verificación Automática (Ej. Banco Plaza)

Este documento describe la arquitectura a implementar cuando se integre un sistema de conciliación de pagos automático en background (como Banco Plaza u otros bancos mediante número de referencia), permitiendo verificar referencias en tiempo real y con reintentos sin bloquear al usuario.

## 1. El Nuevo Estado: `verifying`

Se debe agregar un nuevo estado al ciclo de vida del pago en WaaS:
- **`verifying`**: El usuario acaba de enviar su referencia. WaaS encola el trabajo de verificación en background. En el Dashboard del administrador, este pago aparece bloqueado visualmente (con un *spinner*) para evitar conciliación manual cruzada.
- **`approved`**: El banco confirmó la referencia exitosamente (automático) o el admin lo aprobó a mano.
- **`pending`**: El sistema agotó todos sus intentos de búsqueda automática en el banco. Ahora requiere que un humano lo revise.
- **`rejected`**: Pago declinado.

## 2. La Cola de Background (Exponential Backoff)

Para WaaS (basado en NestJS), se debe implementar un sistema de colas robusto usando **BullMQ** apoyado en **Redis**.

1. **Encolado**: Cuando entra el pago, WaaS encola un *Job* (ej: `verify_bank_transfer`).
2. **Reintentos Inteligentes**: BullMQ intenta la primera validación al instante. Si el banco no encuentra la referencia, BullMQ vuelve a encolar el trabajo con un *exponential backoff* (intentar a los 30 segs, luego a los 2 min, luego a los 5 min, luego a los 15 min).
3. **Escenario Éxito**: Si encuentra coincidencia en algún reintento -> WaaS cambia el estado a `approved` y emite el evento webhook `payment_approved`.
4. **Escenario Fracaso**: Si pasan los intentos máximos (ej. timeout de 30 minutos) -> WaaS cambia el estado a `pending` y emite el evento webhook `payment_pending` para forzar revisión manual.

## 3. El Flujo de Webhooks y Correos (Storefront)

El webhook receptor (`app/api/webhooks/payments/route.ts`) deberá procesar los eventos así:

**Paso 0 (Global - Ya implementado):**
- Guardar el contacto en Resend siempre de primero, independientemente del evento.

**Paso 1 (Evento `payment_verifying`):**
- **Cliente**: Recibe un correo de "Tu pago está siendo verificado con el banco ⏳".
- **Admin**: No se le notifica para evitar ruido.

**Paso 2 (Evento `payment_approved`):**
- **Cliente**: Recibe el correo de "¡Confirmado! Aquí tienes tus productos 🎉".
- **Admin**: Si fue aprobado de forma automática (revisar bandera de metadatos), recibe un WhatsApp/Correo especial: *"✅ Venta Automática Exitosa - Orden #xyz"*.

**Paso 3 (Evento `payment_pending`):**
- **Cliente**: Opcional. Notificación de retraso bancario.
- **Admin**: Recibe alerta de WhatsApp/Correo *"🚨 Orden requiere revisión manual"* para que entre al Dashboard y la resuelva a mano.
