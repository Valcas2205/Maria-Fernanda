"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, ArrowLeft, Loader2, Tablet, BookOpen, CreditCard, Lock } from "lucide-react"

export function CheckoutClient() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [bcvRate, setBcvRate] = useState<number | null>(null)

  useEffect(() => {
    async function fetchBcv() {
      try {
        const res = await fetch("/api/bcv")
        if (res.ok) {
          const data = await res.json()
          if (data.rate) setBcvRate(data.rate)
        }
      } catch (e) {
        console.error("Error loading BCV rate", e)
      }
    }
    fetchBcv()
  }, [])

  const hasPhysical = items.some((i) => i.product.type === "physical")

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    agency: "",
    deliveryType: "barquisimeto", // "barquisimeto" | "nacional"
    country: "Venezuela",
    paymentMethod: "pago_movil",
    paymentReference: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.paymentReference) {
      setError("Por favor completa tu nombre, correo electrónico y referencia de pago.")
      return
    }
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/checkout/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          customerInfo: form,
        }),
      })
      const data = await res.json()
      if (data.url) {
        clearCart()
        router.push(data.url)
      } else {
        setError("Ocurrió un error al procesar el pago. Intenta de nuevo.")
      }
    } catch {
      setError("No se pudo conectar al servidor. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <section className="px-6 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-4">
          Tu carrito está vacío
        </h1>
        <Link href="/tienda" className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-base font-bold text-white hover:opacity-90">
          Ir a la tienda
        </Link>
      </section>
    )
  }

  return (
    <section className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/tienda/carrito" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5c4b32]/70 transition-colors hover:text-[#A7895C]">
          <ArrowLeft size={16} />
          Volver al carrito
        </Link>

        <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-10 md:text-5xl">
          Finalizar compra
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 lg:col-span-3"
            >
              {/* Contact info */}
              <div className="rounded-3xl bg-card p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-5">
                  Información de contacto
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="name">
                      Nombre completo *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="email">
                      Correo electrónico *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@correo.com"
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="phone">
                      Teléfono (WhatsApp)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+58 424 0000000"
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping — only if physical product */}
              {hasPhysical && (
                <div className="rounded-3xl bg-card p-6 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-5">
                    Información de Envío
                  </h2>
                  
                  <div className="mb-6 flex gap-4">
                    <label className={`flex-1 cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
                      form.deliveryType === "barquisimeto" ? "border-[#A7895C] bg-[#A7895C]/10 text-[#A7895C]" : "border-border text-[#5c4b32]/70 hover:border-[#A7895C]/40"
                    }`}>
                      <input type="radio" name="deliveryType" value="barquisimeto" checked={form.deliveryType === "barquisimeto"} onChange={handleChange} className="sr-only" />
                      <span className="text-sm font-bold">Delivery en Barquisimeto</span>
                    </label>
                    <label className={`flex-1 cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
                      form.deliveryType === "nacional" ? "border-[#A7895C] bg-[#A7895C]/10 text-[#A7895C]" : "border-border text-[#5c4b32]/70 hover:border-[#A7895C]/40"
                    }`}>
                      <input type="radio" name="deliveryType" value="nacional" checked={form.deliveryType === "nacional"} onChange={handleChange} className="sr-only" />
                      <span className="text-sm font-bold">Envío Nacional (MRW/Zoom)</span>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {form.deliveryType === "barquisimeto" ? (
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="address">
                          Dirección exacta para el delivery *
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          required={hasPhysical}
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Ej: Urb. del Este, Calle 2, Edificio Los Robles, Apto 4"
                          className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="state">
                            Estado *
                          </label>
                          <input
                            id="state"
                            name="state"
                            type="text"
                            required={hasPhysical}
                            value={form.state}
                            onChange={handleChange}
                            placeholder="Ej: Carabobo"
                            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="city">
                            Ciudad *
                          </label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            required={hasPhysical}
                            value={form.city}
                            onChange={handleChange}
                            placeholder="Ej: Valencia"
                            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="agency">
                            Nombre/Código de Agencia MRW o Zoom *
                          </label>
                          <input
                            id="agency"
                            name="agency"
                            type="text"
                            required={hasPhysical}
                            value={form.agency}
                            onChange={handleChange}
                            placeholder="Ej: MRW Agencia Centro o Zoom Av. Bolívar"
                            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <p className="mt-5 flex items-center gap-2 rounded-xl bg-[#A7895C]/10 px-4 py-3 text-xs text-[#5c4b32]">
                    <span>📦</span>
                    {form.deliveryType === "barquisimeto" 
                      ? "El costo del delivery se coordinará contigo por WhatsApp después de la compra."
                      : "Los envíos nacionales se realizan con Cobro en Destino (COD) por la agencia indicada."}
                  </p>
                </div>
              )}

              {/* Payment method */}
              <div className="rounded-3xl bg-card p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-5">
                  Métodos de Pago
                </h2>
                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                  {/* Pago Movil */}
                  <label className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                    form.paymentMethod === "pago_movil" ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/40"
                  }`}>
                    <input type="radio" name="paymentMethod" value="pago_movil" checked={form.paymentMethod === "pago_movil"} onChange={handleChange} className="sr-only" />
                    <div className="font-bold text-[#1a1a1a] mb-2 text-sm">Pago Móvil</div>
                    <div className="text-xs text-[#5c4b32]">
                      <p>Banco Plaza</p>
                      <p>V-26.540.635</p>
                      <p>0424-5414804</p>
                    </div>
                  </label>

                  {/* Zelle */}
                  <label className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                    form.paymentMethod === "zelle" ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/40"
                  }`}>
                    <input type="radio" name="paymentMethod" value="zelle" checked={form.paymentMethod === "zelle"} onChange={handleChange} className="sr-only" />
                    <div className="font-bold text-[#1a1a1a] mb-2 text-sm">Zelle</div>
                    <div className="text-xs text-[#5c4b32] break-all">
                      <p>mafeazcunes@gmail.com</p>
                      <p>Maria Azcunes</p>
                    </div>
                  </label>

                  {/* PayPal */}
                  <label className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                    form.paymentMethod === "paypal" ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/40"
                  }`}>
                    <input type="radio" name="paymentMethod" value="paypal" checked={form.paymentMethod === "paypal"} onChange={handleChange} className="sr-only" />
                    <div className="font-bold text-[#1a1a1a] mb-2 text-sm">PayPal</div>
                    <div className="text-xs text-[#5c4b32] break-all">
                      <p>mafeazcunes@gmail.com</p>
                      <p>Maria Azcunes</p>
                    </div>
                  </label>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="paymentReference">
                    Número de referencia o recibo *
                  </label>
                  <input
                    id="paymentReference"
                    name="paymentReference"
                    type="text"
                    required
                    value={form.paymentReference}
                    onChange={handleChange}
                    placeholder="Ej: 12345678"
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                  <p className="text-xs text-[#5c4b32]/60 mt-1">
                    Realiza el pago al método seleccionado y coloca el número de referencia aquí.
                  </p>
                </div>
              </div>

              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}
            </motion.div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-28 rounded-3xl bg-card p-6 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-5">
                  Tu pedido
                </h2>
                <div className="flex flex-col gap-3 mb-5">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                        {item.product.type === "digital" ? (
                          <Tablet className="h-5 w-5 text-secondary" strokeWidth={1.5} />
                        ) : (
                          <BookOpen className="h-5 w-5 text-[#A7895C]" strokeWidth={1.5} />
                        )}
                      </div>
                      <div className="flex flex-1 justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#1a1a1a] leading-tight truncate">
                            {item.product.name}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-[#5c4b32]/60">×{item.quantity}</p>
                          )}
                        </div>
                        <span className="text-sm font-bold text-[#A7895C] shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/50 pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-[#5c4b32]">Total</span>
                    <div className="flex flex-col items-end">
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-3xl font-bold text-[#A7895C]">
                          ${total.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#5c4b32]/50">USD</span>
                      </div>
                      {form.paymentMethod === "pago_movil" && bcvRate && (
                        <div className="text-sm font-semibold text-secondary mt-1 animate-in fade-in zoom-in-95 duration-300">
                          {(total * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs
                          <span className="text-[10px] text-[#5c4b32]/50 ml-1 font-normal">(Tasa BCV)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-4 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Confirmar pedido
                    </>
                  )}
                </button>

                <div className="mt-4 flex flex-col gap-1 items-center justify-center text-xs text-[#5c4b32]/70 text-center">
                  <p>Al confirmar el pedido, revisaremos tu pago manualmente.</p>
                  <p>Recibirás un correo de confirmación y tus productos.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </section>
  )
}
