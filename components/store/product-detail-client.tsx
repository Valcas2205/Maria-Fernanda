"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Check, Download, Truck, Tablet, BookOpen, ArrowLeft } from "lucide-react"
import { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface Props {
  product: Product
}

export function ProductDetailClient({ product }: Props) {
  const { addToCart, openCart } = useCart()
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  function handleAdd() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const isPhysical = product.type === "physical"

  return (
    <section className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          href="/tienda"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5c4b32]/70 transition-colors hover:text-[#A7895C]"
        >
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>

        <div className="flex flex-col gap-8">
        {/* Mobile-only header: Badge + Title + Subtitle — shown before image */}
        <div className="md:hidden flex flex-col gap-3">
          <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${
            isPhysical ? "bg-[#A7895C]/15 text-[#A7895C]" : "bg-secondary/15 text-secondary"
          }`}>
            {product.badge}
          </span>
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] leading-tight">
              {product.name}
            </h1>
            <p className="mt-1.5 font-serif text-lg italic text-[#5c4b32]">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* ── ROW 1: Image | Title + Description ── */}
        <div className="grid gap-10 items-start md:grid-cols-2 md:gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Main image */}
            <div className={`relative overflow-hidden rounded-3xl shadow-xl flex items-center justify-center ${
              isPhysical ? "bg-gradient-to-br from-[#fdebdd] to-[#e8d4c0]" : "bg-gradient-to-br from-primary/10 to-secondary/10"
            } min-h-[320px] lg:min-h-[420px]`}>
              {product.images?.[0] ? (
                <div className="relative h-64 w-48 md:h-72 md:w-52 lg:h-80 lg:w-60 my-10 transition-transform duration-700 hover:scale-105 hover:-translate-y-2 hover:rotate-1">
                  {/* Shadow */}
                  <div className="absolute -bottom-4 left-1/2 w-[80%] -translate-x-1/2 h-6 bg-black/15 blur-md rounded-[100%]" />
                  
                  {/* Book Cover */}
                  <div className="relative h-full w-full overflow-hidden rounded-md shadow-2xl ring-1 ring-black/5">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 192px, (max-width: 1024px) 208px, 240px"
                    />
                    {/* Glossy overlay and spine */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/5 via-transparent to-white/20" />
                    <div className="absolute left-0 top-0 bottom-0 w-2 pointer-events-none bg-gradient-to-r from-white/40 to-transparent mix-blend-overlay" />
                    <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-black/5 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
                  <Image
                    src="/images/sello.png"
                    alt="Todo es un balance"
                    width={100}
                    height={100}
                    className="h-20 w-20"
                  />
                  <p className="font-serif text-3xl font-bold italic text-[#A7895C]">
                    {product.name}
                  </p>
                  <p className="text-sm font-medium text-[#5c4b32]/70 uppercase tracking-widest">
                    {product.tagline}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-xs font-semibold text-[#5c4b32]">
                    {isPhysical ? <BookOpen size={12} /> : <Tablet size={12} />}
                    {product.badge}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-3 md:order-2 flex flex-col gap-4"
          >
            {/* Badge + Title — Desktop only */}
            <div className="hidden md:flex flex-col gap-3">
              <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${
                isPhysical ? "bg-[#A7895C]/15 text-[#A7895C]" : "bg-secondary/15 text-secondary"
              }`}>
                {product.badge}
              </span>
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl lg:text-5xl leading-tight">
                  {product.name}
                </h1>
                <p className="mt-1.5 font-serif text-lg italic text-[#5c4b32]">
                  {product.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="text-[#5c4b32] leading-relaxed">
              {product.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="mb-2 text-sm md:text-base">{para}</p>
              ))}
            </div>

          </motion.div>
        </div>{/* end row 1 */}

        {/* ── ROW 2: Features | Action box — same column template ── */}
        <div className="grid gap-5 items-start md:grid-cols-2 md:gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">

          {/* Left: ¿Qué incluye? — aligns under the image */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-bold text-[#1a1a1a]">
              ¿Qué incluye?
            </h3>
            <ul className="flex flex-col gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                  <span className="text-sm text-[#5c4b32]">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Price + Quantity + Button — aligns under the description */}
          <div className="rounded-2xl border border-[#A7895C]/15 bg-[#A7895C]/5 p-5 flex flex-col gap-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-4xl font-bold text-[#A7895C]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-[#5c4b32]/60">USD</span>
            </div>

            {isPhysical && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#5c4b32]">Cantidad:</span>
                <div className="flex items-center overflow-hidden rounded-full border border-[#A7895C]/30 bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-9 w-9 items-center justify-center text-[#5c4b32] transition-colors hover:bg-muted">−</button>
                  <span className="w-8 text-center text-sm font-bold text-[#1a1a1a]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="flex h-9 w-9 items-center justify-center text-[#5c4b32] transition-colors hover:bg-muted">+</button>
                </div>
              </div>
            )}

            <button
              onClick={handleAdd}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 ${
                added ? "bg-primary" : isPhysical ? "bg-[#A7895C]" : "bg-secondary"
              }`}
            >
              {added ? <><Check size={18} /> ¡Agregado!</> : <><ShoppingBag size={18} /> Agregar al carrito</>}
            </button>

            <button onClick={openCart} className="w-full text-center text-sm font-semibold text-[#5c4b32]/60 underline-offset-2 transition-colors hover:text-[#A7895C] hover:underline">
              Ver carrito →
            </button>
          </div>

        </div>{/* end row 2 */}
        </div>{/* end flex col */}
      </div>
    </section>
  )
}
