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

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "")
  if (!digits) return ""

  if (digits.startsWith("58")) {
    const phone = digits.slice(0, 12)
    if (phone.length <= 2) return `+${phone}`
    if (phone.length <= 5) return `+${phone.slice(0, 2)} ${phone.slice(2)}`
    if (phone.length <= 8) return `+${phone.slice(0, 2)} ${phone.slice(2, 5)}-${phone.slice(5)}`
    return `+${phone.slice(0, 2)} ${phone.slice(2, 5)}-${phone.slice(5, 8)}-${phone.slice(8)}`
  } else if (digits.startsWith("1")) {
    const phone = digits.slice(0, 11)
    if (phone.length <= 1) return `+${phone}`
    if (phone.length <= 4) return `+${phone.slice(0, 1)} (${phone.slice(1)}`
    if (phone.length <= 7) return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4)}`
    return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`
  } else {
    const phone = digits.slice(0, 15)
    if (phone.length <= 3) return `+${phone}`
    if (phone.length <= 6) return `+${phone.slice(0, 3)} ${phone.slice(3)}`
    return `+${phone.slice(0, 3)} ${phone.slice(3, 6)}-${phone.slice(6)}`
  }
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
  const [docType, setDocType] = useState("V")
  const [docNumber, setDocNumber] = useState("")

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
    if (!isValidEmail(contact.email)) {
      setError("Por favor ingresa un correo electrónico válido. (ej: nombre@dominio.com)")
      return
    }
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
        const out = await submitCheckoutPaymentAction(token, {
          customerId,
          method,
          metadata: { 
            reference, 
            senderId: `${docType}${docNumber}`,
            source: "todoesunbalance_checkout_v1" 
          },
          status: "verifying",
        })
        router.push(`/thank-you?paymentId=${out.paymentId}&status=verifying`)
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
                onChange={(e) => {
                  let value = e.target.value

                  if (!value) {
                    setContact((s) => ({ ...s, phone: "" }))
                    return
                  }

                  if (value.startsWith("+")) {
                    const formatted = formatPhoneNumber(value)
                    setContact((s) => ({ ...s, phone: formatted }))
                    return
                  }

                  let digits = value.replace(/\D/g, "")

                  if (digits.startsWith("0")) {
                    digits = digits.slice(1)
                  }

                  if (!digits) {
                    setContact((s) => ({ ...s, phone: "" }))
                    return
                  }

                  if (digits.startsWith("1")) {
                    value = "+1" + digits.slice(1)
                  } else if (digits.startsWith("58")) {
                    value = "+58" + digits.slice(2)
                  } else if (digits.startsWith("4")) {
                    value = "+58" + digits
                  }

                  const formatted = formatPhoneNumber(value)
                  setContact((s) => ({ ...s, phone: formatted }))
                }}
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

          <div className="grid gap-1.5 mb-4">
            <Label htmlFor="docNumber">Cédula de Identidad (Titular de la cuenta) *</Label>
            <div className="flex h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
              <select
                className="h-full bg-transparent pl-3 pr-1 text-base outline-none text-foreground border-r border-input"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
              >
                <option value="V">V</option>
                <option value="E">E</option>
                <option value="J">J</option>
                <option value="G">G</option>
                <option value="P">P</option>
                <option value="C">C</option>
              </select>
              <input
                id="docNumber"
                type="text"
                className="h-full flex-1 bg-transparent px-3 py-1 text-base outline-none placeholder:text-muted-foreground"
                placeholder="12345678"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="reference">Referencia / comprobante *</Label>
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
              disabled={isPending || !reference.trim() || !docNumber.trim()}
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
