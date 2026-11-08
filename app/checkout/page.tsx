import Link from "next/link"
import type { Metadata } from "next"
import type { CheckoutSurface } from "@/lib/payments/types"
import { CheckoutFlow } from "./checkout-flow"

export const metadata: Metadata = {
  title: "Checkout | Todo es un Balance",
  description: "Reserva y paga tu sesión de terapia de forma segura.",
}

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function firstValue(value: string | string[] | undefined): string {
  if (typeof value === "string") return value
  if (Array.isArray(value)) return value[0] ?? ""
  return ""
}

function normalizeSurface(value: string): CheckoutSurface {
  if (value === "pricing" || value === "cart" || value === "product") {
    return value
  }
  return "other"
}

export default async function CheckoutPage({ searchParams }: Props) {
  const qp = await searchParams
  const subscriptionId = firstValue(qp.id).trim()
  const timePeriod = firstValue(qp.timePeriod).trim() || "one-time"
  const surface = normalizeSurface(firstValue(qp.surface))

  return (
    <main className="min-h-screen bg-background py-10 md:py-16">
      <div className="mx-auto max-w-2xl px-6">
        <Link
          href="/#inversion"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Volver a servicios
        </Link>

        <h1 className="mb-2 font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl">
          Reserva tu sesión
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-[#333333]">
          Completa tus datos y reporta tu pago. Nuestro equipo lo validará y te
          contactará para coordinar la cita.
        </p>

        {subscriptionId ? (
          <CheckoutFlow
            subscriptionId={subscriptionId}
            timePeriod={timePeriod}
            surface={surface}
          />
        ) : (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            Falta el parámetro del servicio. Vuelve a la sección de{" "}
            <Link href="/#inversion" className="font-semibold underline">
              servicios
            </Link>{" "}
            y elige una opción.
          </div>
        )}
      </div>
    </main>
  )
}
