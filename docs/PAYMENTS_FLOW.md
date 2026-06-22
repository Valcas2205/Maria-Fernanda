# Flujo de Pagos Semi-Automáticos (Frontend)

Este documento describe el flujo de pagos actual entre el Frontend (Maria-Fernanda) y el Backend (WaaS API + Directus).

## 1. Inicio del Checkout
1. El usuario agrega productos al carrito (`useCart`).
2. Al proceder al pago, el frontend solicita un **Checkout Token** al backend (`POST /payments/checkout/token`), pasando el monto total en USD.
3. El servidor responde con un JWT cifrado y firmado que contiene el `amountUsd` y la validez del intento de pago. Este token asegura que los montos no puedan ser alterados en el navegador.

## 2. Formulario de Pago
1. Con el token, el frontend carga el contexto de checkout (`GET /payments/checkout/context`), que trae los métodos habilitados y las instrucciones bancarias.
2. El usuario visualiza el monto en USD y su conversión a VES.
3. El usuario realiza el pago manual (Pago Móvil, Zelle o Transferencia) y llena el formulario con el número de referencia, teléfono, etc.

## 3. Envío del Pago
1. El frontend envía la data (método, referencia, teléfono, etc.) más el token a la acción `submitCheckoutPaymentAction` en Next.js.
2. Esta Server Action se comunica con la API de WaaS (`POST /payments/checkout`) enviando los datos.
3. Se incluyen cabeceras de seguridad (`x-waas-internal-secret`) para atravesar el Bot Fight Mode de Cloudflare.

## 4. Finalización y Notificaciones
1. El backend responde con éxito y un `paymentId`.
2. El frontend redirige a la página de `/thank-you` mostrando que el pago está "Pendiente de Validación".
3. **Webhooks:** Directus recibe la inserción del pago y dispara un webhook hacia `api/webhooks/payments/route.ts` en el frontend, el cual usa **Resend** para enviar un correo de confirmación al cliente y al administrador informando sobre la nueva orden.
