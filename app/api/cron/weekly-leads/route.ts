import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // Add authentication check for cron job (optional but recommended)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Get leads from the last 7 days
    const { rows } = await sql`
      SELECT email, created_at
      FROM leads
      WHERE created_at >= NOW() - INTERVAL '7 days'
      ORDER BY created_at DESC;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ message: "Sin nuevos leads esta semana" });
    }

    const leadListHtml = (rows as { email: string; created_at: string | Date }[])
      .map(
        (lead) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.email}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(
          lead.created_at
        ).toLocaleDateString()}</td>
      </tr>
    `
      )
      .join("");

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #DF9A8F;">Resumen de Leads Semanales</h2>
        <p>Hola Maria-Fernanda, aquí tienes la lista de personas que descargaron el <strong>Botiquín de Emergencia Emocional</strong> esta semana:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #FAEBE6; text-align: left;">
              <th style="padding: 8px; border-bottom: 2px solid #DF9A8F;">Email</th>
              <th style="padding: 8px; border-bottom: 2px solid #DF9A8F;">Fecha</th>
            </tr>
          </thead>
          <tbody>
            ${leadListHtml}
          </tbody>
        </table>
        <p style="margin-top: 20px; font-size: 0.8em; color: #777;">
          Total de nuevos leads esta semana: <strong>${rows.length}</strong>
        </p>
      </div>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.log("--- MODO PRUEBA (Sin Resend API Key) ---");
      console.log("Destinatario:", process.env.NOTIFICATION_EMAIL || "admin@example.com");
      console.log("Contenido del Email:", emailHtml);
      return NextResponse.json({ message: "Lead list logged to console (Mock mode)", count: rows.length });
    }

    await resend.emails.send({
      from: "Maria Fernanda <hola@todoesunbalance.com>",
      to: [process.env.NOTIFICATION_EMAIL || "admin@example.com"],
      subject: "Resumen Semanal: Botiquín de Emergencia Emocional",
      html: emailHtml,
    });

    return NextResponse.json({ message: "Resumen enviado", count: rows.length });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json({ error: "Error al procesar el cron job" }, { status: 500 });
  }
}
