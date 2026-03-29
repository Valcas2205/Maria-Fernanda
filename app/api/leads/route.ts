import { Pool } from "pg";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      // Create table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Insert lead (ON CONFLICT to avoid errors on duplicate emails)
      await client.query(
        `INSERT INTO leads (email)
         VALUES ($1)
         ON CONFLICT (email) DO UPDATE SET created_at = CURRENT_TIMESTAMP;`,
        [email]
      );
    } finally {
      client.release();
    }

    return NextResponse.json({ message: "Lead registrado con éxito" }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error saving lead:", message);
    return NextResponse.json(
      { error: "Error al guardar el lead", detail: message },
      { status: 500 }
    );
  }
}
