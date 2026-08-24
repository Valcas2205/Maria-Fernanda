import { Pool } from 'pg';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(request: Request) {
  // Authentication check for cron job
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const client = await pool.connect();
    let rows: { email: string; created_at: string | Date }[] = [];
    try {
      const result = await client.query(`
        SELECT email, created_at
        FROM leads
        WHERE created_at >= NOW() - INTERVAL '7 days'
        ORDER BY created_at DESC;
      `);
      rows = result.rows;
    } finally {
      client.release();
    }

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Sin nuevos leads esta semana' });
    }

    const leadListHtml = rows
      .map(
        (lead) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.email}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(
          lead.created_at,
        ).toLocaleDateString()}</td>
      </tr>
    `,
      )
      .join('');

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

    await resend.emails.send({
      from: 'Maria Fernanda <noreply@todoesunbalance.com>',
      to: [process.env.NOTIFICATION_EMAIL || 'todoesunbalance@gmail.com'],
      subject: 'Resumen Semanal: Botiquín de Emergencia Emocional',
      html: emailHtml,
    });

    return NextResponse.json({
      message: 'Resumen enviado',
      count: rows.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error in cron job:', message);
    return NextResponse.json(
      { error: 'Error al procesar el cron job', detail: message },
      { status: 500 },
    );
  }
}
