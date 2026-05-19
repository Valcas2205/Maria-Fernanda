"use client"

import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, PackageOpen, Tablet, BookOpen } from "lucide-react"

export function CartPageClient() {
  const { items, total, itemCount, removeFromCart, updateQuantity } = useCart()

  if (items.length === 0) {
    return (
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <PackageOpen className="h-12 w-12 text-[#5c4b32]/40" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-[#5c4b32] mb-8 text-lg">
            Aún no has agregado ningún producto. ¡Descubre nuestros recursos!
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            <ShoppingBag size={18} />
            Ir a la tienda
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-10 md:text-5xl">
          Tu carrito
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Items list */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-4 rounded-3xl bg-card p-5 shadow-sm">
                    {/* Product icon */}
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary/15">
                      {item.product.type === "digital" ? (
                        <Tablet className="h-8 w-8 text-secondary" strokeWidth={1.5} />
                      ) : (
                        <BookOpen className="h-8 w-8 text-[#A7895C]" strokeWidth={1.5} />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#5c4b32]/60">
                        {item.product.badge}
                      </p>
                      <Link
                        href={`/tienda/${item.product.slug}`}
                        className="font-serif text-lg font-bold text-[#1a1a1a] leading-tight hover:text-[#A7895C] transition-colors truncate"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-[#5c4b32]/70 leading-snug line-clamp-1">
                        {item.product.tagline}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        {/* Quantity */}
                        {item.product.type === "physical" ? (
                          <div className="flex items-center gap-0 overflow-hidden rounded-full border border-border">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center text-[#5c4b32] transition-colors hover:bg-muted"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-[#1a1a1a]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center text-[#5c4b32] transition-colors hover:bg-muted"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                            Descarga digital
                          </span>
                        )}

                        <div className="flex items-center gap-3">
                          <span className="font-serif text-xl font-bold text-[#A7895C]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[#5c4b32]/40 transition-colors hover:bg-red-50 hover:text-red-400"
                            aria-label="Eliminar"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl bg-card p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-6">
                Resumen
              </h2>

              <div className="flex flex-col gap-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-[#5c4b32] truncate mr-2">
                      {item.product.name}
                      {item.quantity > 1 && <span className="ml-1 text-[#5c4b32]/60">×{item.quantity}</span>}
                    </span>
                    <span className="font-semibold text-[#1a1a1a] shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-[#5c4b32]">Total</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-bold text-[#A7895C]">
                      ${total.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#5c4b32]/50">USD</span>
                  </div>
                </div>
              </div>

              <Link
                href="/tienda/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                Proceder al pago
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/tienda"
                className="mt-3 block text-center text-sm font-semibold text-[#5c4b32]/60 transition-colors hover:text-[#A7895C]"
              >
                ← Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
