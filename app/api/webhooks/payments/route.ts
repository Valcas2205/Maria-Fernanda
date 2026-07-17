import { NextRequest, NextResponse } from "next/server"
import { createHmac, timingSafeEqual } from "crypto"
import { resend } from "@/lib/resend"
import { OrderPendingEmail } from "@/components/emails/order-pending"
import { OrderApprovedEmail } from "@/components/emails/order-approved"
import { AdminNewOrderEmail } from "@/components/emails/admin-new-order"
import { products } from "@/lib/products"
import fs from "fs/promises"
import path from "path"


export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-signature")
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }

    const rawBody = await req.text()
    const secret = process.env.CHECKOUT_SIGNING_SECRET
    if (!secret) {
      console.error("Missing CHECKOUT_SIGNING_SECRET env var")
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    // Verify signature
    const expectedSignature = createHmac("sha256", secret).update(rawBody).digest("hex")
    const expectedBuffer = Buffer.from(expectedSignature, "utf8")
    const signatureBuffer = Buffer.from(signature, "utf8")

    if (
      expectedBuffer.length !== signatureBuffer.length ||
      !timingSafeEqual(expectedBuffer, signatureBuffer)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
    }

    const payload = JSON.parse(rawBody)

    console.log("=========================================")
    console.log(`✅ WEBHOOK RECIBIDO: ${payload.event} ✅`)
    console.log("=========================================")
    console.log("Payload:", JSON.stringify(payload, null, 2))

    // Paso 0 Global: Guardar/Actualizar SIEMPRE al cliente en la Audiencia de Resend
    if (payload.customer?.email && process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: payload.customer.email,
          firstName: payload.customer.firstName || '',
          lastName: payload.customer.lastName || '',
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        })
        console.log(`[Webhook] Cliente agregado a la Audiencia de Resend exitosamente.`)
      } catch (e) {
        console.error(`[Webhook] Error guardando cliente en la Audiencia:`, e)
      }
    }

    if (payload.event === "payment_pending") {
      if (payload.customer?.email) {
        // Notificar al cliente
        await resend.emails.send({
          from: "Maria Fernanda <hola@todoesunbalance.com>",
          to: payload.customer.email,
          subject: "Hemos recibido tu orden - Todo es un Balance",
          react: OrderPendingEmail({
            firstName: payload.customer.firstName || 'Cliente',
            orderId: payload.paymentId,
            items: payload.metadata?.items || [],
            amountUsd: payload.amountUsd,
            amountVes: payload.amountVes,
          }) as React.ReactElement,
        })
      }

      const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'ladevhouse.com';
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
      const baseUrl = process.env.NODE_ENV === 'development' ? `${payload.tenant}.localhost:3001` : `${payload.tenant}.${domain}`;
      const adminUrl = `${protocol}://${baseUrl}/admin/payments?paymentId=${payload.paymentId}`;

      // Notificar al admin
      await resend.emails.send({
        from: "Notificaciones Tienda <hola@todoesunbalance.com>",
        to: "jparis@ladevhouse.com",
        subject: `🚨 Nuevo Pago Pendiente - Orden #${payload.paymentId.split('-')[0]}`,
        react: AdminNewOrderEmail({
          orderId: payload.paymentId,
          customerName: payload.customer ? `${payload.customer.firstName} ${payload.customer.lastName}` : 'Desconocido',
          customerEmail: payload.customer?.email || 'N/A',
          customerPhone: payload.customer?.phone || 'N/A',
          paymentMethod: payload.method,
          amountUsd: payload.amountUsd,
          amountVes: payload.amountVes,
          items: payload.metadata?.items || [],
          paymentReference: payload.metadata?.reference || payload.metadata?.paymentReference || 'N/A',
          adminUrl,
        }) as React.ReactElement,
      })

      console.log(`[Webhook] Evento pending: Correos enviados al admin y al cliente.`)

    } else if (payload.event === "payment_approved") {
      if (payload.customer?.email) {
        const items = payload.metadata?.items || [];
        const attachments = [];
        let hasDigitalAttachments = false;
        let hasPhysicalItems = false;

        for (const item of items) {
          const product = products.find(p => p.id === item.id);
          if (product) {
            if (product.type === "digital" && product.fileName) {
              try {
                const filePath = path.join(process.cwd(), "private/resources", product.fileName);
                const fileBuffer = await fs.readFile(filePath);
                attachments.push({
                  filename: product.fileName,
                  content: fileBuffer,
                });
                hasDigitalAttachments = true;
              } catch (err) {
                console.error(`[Webhook] Error al leer archivo ${product.fileName}:`, err);
              }
            } else if (product.type === "physical") {
              hasPhysicalItems = true;
            }
          }
        }

        await resend.emails.send({
          from: "Maria Fernanda <hola@todoesunbalance.com>",
          to: payload.customer.email,
          subject: "¡Tu pago ha sido aprobado! - Todo es un Balance",
          react: OrderApprovedEmail({
            firstName: payload.customer.firstName || 'Cliente',
            orderId: payload.paymentId,
            items: items,
            hasDigitalAttachments,
            hasPhysicalItems,
          }) as React.ReactElement,
          attachments: attachments.length > 0 ? attachments : undefined,
        })
      }

      console.log(`[Webhook] Evento approved: Correo de aprobación enviado al cliente con ${payload.metadata?.items?.length || 0} items.`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    )
  }
}
