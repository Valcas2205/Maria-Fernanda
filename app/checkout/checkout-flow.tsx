"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  issueCheckoutTokenAction,
  getCheckoutContextAction,
  upsertCheckoutCustomerAction,
  submitCheckoutPaymentAction,
} from "@/lib/payments/actions"
import type {
  CheckoutContext,
  CheckoutSurface,
  ContactPayload,
  PaymentMethod,
} from "@/lib/payments/types"

type Props = {
  subscriptionId: string
  timePeriod: string
  surface: CheckoutSurface
}

const METHOD_LABELS: Record<PaymentMethod, string> = {
  zelle: "Zelle",
  pagomovil: "Pago Móvil",
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
const ves = new Intl.NumberFormat("es-VE", {
  style: "currency",
  currency: "VES",
})

export function CheckoutFlow({ subscriptionId, timePeriod, surface }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<1 | 2>(1)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [context, setContext] = useState<CheckoutContext | null>(null)
  const [customerId, setCustomerId] = useState<string | null>(null)

  const [contact, setContact] = useState<ContactPayload>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  })
  const [method, setMethod] = useState<PaymentMethod>("zelle")
  const [reference, setReference] = useState("")

  useEffect(() => {
    let cancelled = false
    async function init() {
      setLoading(true)
      setError(null)
      try {
        const issued = await issueCheckoutTokenAction({
          subscriptionId,
          timePeriod,
          surface,
        })
        if (cancelled) return
        const ctx = await getCheckoutContextAction(issued.token)
        if (cancelled) return
        setToken(issued.token)
        setContext(ctx)
        const enabled = ctx.checkout.methodsEnabled
        if (enabled.length > 0 && !enabled.includes(method)) {
          setMethod(enabled[0])
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudo iniciar el checkout.",
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    init()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId, timePeriod, surface])

  const methodEnabled = useMemo(
    () => ({
      zelle: context?.checkout.methodsEnabled.includes("zelle") ?? false,
      pagomovil:
        context?.checkout.methodsEnabled.includes("pagomovil") ?? false,
    }),
    [context],
  )

  const contactComplete =
    contact.firstName.trim() &&
    contact.lastName.trim() &&
    contact.email.trim() &&
    contact.phone.trim() &&
    contact.location.trim()

  const submitContact = () => {
    startTransition(async () => {
      try {
        setError(null)
        if (!token) throw new Error("Checkout no inicializado. Recarga la página.")
        const out = await upsertCheckoutCustomerAction(token, contact)
        setCustomerId(out.customerId)
        setStep(2)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "No se pudo guardar el contacto.",
        )
      }
    })
  }

  const submitPayment = () => {
    startTransition(async () => {
      try {
        setError(null)
        if (!token || !customerId)
          throw new Error("Faltan datos del checkout. Reintenta.")
        await submitCheckoutPaymentAction(token, {
          customerId,
          method,
          metadata: { reference, source: "todoesunbalance_checkout_v1" },
        })
        router.push("/thank-you")
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "No se pudo enviar el pago.",
        )
      }
    })
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Iniciando checkout seguro…
      </div>
    )
  }

  if (error && !context) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    )
  }

  const productName =
    context?.checkout.product?.name ?? context?.checkout.subscriptionId ?? ""
  const amountUsd = context?.checkout.amountUsd ?? null
  const amountVes = context?.checkout.amountVes ?? null

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">Servicio</p>
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <span className="font-serif text-xl font-bold text-card-foreground">
            {productName}
          </span>
          {amountUsd != null ? (
            <span className="font-serif text-2xl font-bold text-secondary">
              {usd.format(amountUsd)}
            </span>
          ) : null}
        </div>
      </div>

      {step === 1 ? (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-bold text-card-foreground">
            1 · Tus datos
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                value={contact.firstName}
                onChange={(e) =>
                  setContact((s) => ({ ...s, firstName: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                value={contact.lastName}
                onChange={(e) =>
                  setContact((s) => ({ ...s, lastName: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={contact.email}
                onChange={(e) =>
                  setContact((s) => ({ ...s, email: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={contact.phone}
                onChange={(e) =>
                  setContact((s) => ({ ...s, phone: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-1.5 md:col-span-2">
              <Label htmlFor="location">Ciudad / país</Label>
              <Input
                id="location"
                value={contact.location}
                onChange={(e) =>
                  setContact((s) => ({ ...s, location: e.target.value }))
                }
              />
            </div>
          </div>
          <Button
            className="mt-5 w-full md:w-auto"
            disabled={isPending || !contactComplete}
            onClick={submitContact}
          >
            {isPending ? "Guardando…" : "Continuar al pago"}
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-bold text-card-foreground">
            2 · Reporta tu pago
          </h2>

          <div className="mb-4 flex flex-wrap gap-3">
            {(["zelle", "pagomovil"] as PaymentMethod[]).map((m) => (
              <button
                key={m}
                type="button"
                disabled={!methodEnabled[m]}
                onClick={() => setMethod(m)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  method === m
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border text-foreground hover:bg-muted"
                }`}
              >
                {METHOD_LABELS[m]}
              </button>
            ))}
          </div>

          <div className="mb-4 rounded-xl bg-muted/50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Monto a pagar</span>
              <span className="font-semibold text-foreground">
                {amountUsd != null ? usd.format(amountUsd) : "—"}
              </span>
            </div>
            {method === "pagomovil" && amountVes != null ? (
              <div className="mt-1 flex items-center justify-between">
                <span className="text-muted-foreground">
                  Equivalente (tasa oficial)
                </span>
                <span className="font-semibold text-foreground">
                  {ves.format(amountVes)}
                </span>
              </div>
            ) : null}
          </div>

          {context?.checkout.instructions[method] ? (
            <div
              className="mb-4 rounded-xl border border-border p-4 text-sm text-[#333333] [&_p]:mb-1"
              dangerouslySetInnerHTML={{
                __html: context.checkout.instructions[method],
              }}
            />
          ) : null}

          <div className="grid gap-1.5">
            <Label htmlFor="reference">Referencia / comprobante</Label>
            <Input
              id="reference"
              placeholder="Nro. de referencia de tu transferencia"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              Volver
            </Button>
            <Button
              disabled={isPending || !reference.trim()}
              onClick={submitPayment}
            >
              {isPending ? "Enviando…" : "Enviar pago pendiente"}
            </Button>
          </div>
        </div>
      )}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}
