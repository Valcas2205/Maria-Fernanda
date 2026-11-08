import { NextRequest, NextResponse } from "next/server"

// Stripe Checkout API Route
// To activate: add STRIPE_SECRET_KEY to your .env.local
// npm install stripe

export async function POST(req: NextRequest) {
  try {
    const { items, successUrl, cancelUrl } = await req.json()

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      // Stripe not configured yet — return mock session for testing
      return NextResponse.json({
        url: `${req.nextUrl.origin}/tienda/checkout/exitoso?session=demo`,
      })
    }

    // Dynamic import so the app works even without stripe installed
    const Stripe = (await import("stripe")).default
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2026-04-22.dahlia" })

    const lineItems = items.map((item: {
      name: string
      price: number
      quantity: number
      image?: string
    }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl || `${req.nextUrl.origin}/tienda/checkout/exitoso?session={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.nextUrl.origin}/tienda/carrito`,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json(
      { error: "Error al procesar el pago" },
      { status: 500 }
    )
  }
}
