import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params

  try {
    const apiUrl = process.env.WAAS_API_URL?.replace(/\/$/, "")
    if (!apiUrl) {
      return NextResponse.json({ error: "Missing API URL" }, { status: 500 })
    }

    const res = await fetch(`${apiUrl}/payments/${id}/status`, {
      headers: {
        "x-waas-internal-secret": process.env.WAAS_INTERNAL_SECRET || "",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return NextResponse.json({ error: "API Error" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
