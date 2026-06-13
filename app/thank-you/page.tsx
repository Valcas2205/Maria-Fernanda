import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Gracias | Todo es un Balance",
  description: "Recibimos tu reporte de pago.",
}

export default async function ThankYouPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const status = searchParams?.status
  const isApproved = status === "approved"

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="mb-3 font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl">
          ¡Gracias!
        </h1>
        <p className="mb-6 text-[15px] leading-relaxed text-[#333333]">
          {isApproved ? (
            <>
              ¡Tu pago ha sido <strong>validado exitosamente</strong>! Te enviaremos un correo pronto con tus productos y próximos pasos.
            </>
          ) : (
            <>
              Recibimos tu reporte de pago y quedó <strong>pendiente de validación</strong>.
              Revisaremos el comprobante y te contactaremos para coordinar tu sesión.
            </>
          )}
        </p>
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  )
}
