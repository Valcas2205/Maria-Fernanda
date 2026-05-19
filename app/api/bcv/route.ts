import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch("https://ve.dolarapi.com/v1/dolares/oficial", {
      next: { revalidate: 3600 }, // Cachear por 1 hora
    })
    
    if (!res.ok) {
      throw new Error("No se pudo obtener la tasa de cambio")
    }

    const data = await res.json()
    
    return NextResponse.json({
      rate: data.promedio,
      date: data.fechaActualizacion,
    })
  } catch (error) {
    console.error("Error fetching BCV rate:", error)
    return NextResponse.json(
      { error: "Error al obtener la tasa de BCV" },
      { status: 500 }
    )
  }
}
