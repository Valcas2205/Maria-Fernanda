import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { items, customerInfo } = data

    // Aquí es donde se conectará con la base de datos (por ejemplo, DatoCMS)
    // para guardar la orden, y donde se configurará el envío de correos (Resend/Nodemailer)
    // para notificar a Mafer y al cliente.
    
    console.log("=== NUEVA ORDEN RECIBIDA ===")
    console.log("Cliente:", customerInfo)
    console.log("Productos:", items)
    console.log("============================")

    // Simulamos un retraso para mostrar el loader
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Redirigimos al usuario a la página de éxito
    return NextResponse.json({
      url: `${req.nextUrl.origin}/tienda/checkout/exitoso?session=manual`,
    })
  } catch (error) {
    console.error("Error procesando pago manual:", error)
    return NextResponse.json(
      { error: "Error al procesar el pedido manual" },
      { status: 500 }
    )
  }
}
