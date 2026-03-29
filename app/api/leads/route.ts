import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert lead (using ON CONFLICT to avoid errors on duplicate emails)
    await sql`
      INSERT INTO leads (email)
      VALUES (${email})
      ON CONFLICT (email) DO UPDATE SET created_at = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({ message: "Lead registrado con éxito" }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ error: "Error al guardar el lead" }, { status: 500 });
  }
}
