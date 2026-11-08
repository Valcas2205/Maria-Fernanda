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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid gap-10 items-start md:grid-cols-2 md:gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          
          {/* LEFT COLUMN: Image & Features */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              {/* Main image */}
              <div className={`relative overflow-hidden rounded-3xl shadow-xl flex items-center justify-center ${
                isPhysical ? "bg-gradient-to-br from-[#fdebdd] to-[#e8d4c0]" : "bg-gradient-to-br from-primary/10 to-secondary/10"
              } min-h-[360px] md:min-h-[450px] lg:min-h-[550px]`}>
                {product.images?.[currentImageIndex] ? (
                  <div className="relative h-64 w-48 md:h-80 md:w-60 lg:h-[28rem] lg:w-[21rem] my-10 transition-transform duration-700 hover:scale-105 hover:-translate-y-2 hover:rotate-1">
                    {/* Shadow */}
                    <div className="absolute -bottom-4 left-1/2 w-[80%] -translate-x-1/2 h-6 bg-black/15 blur-md rounded-[100%]" />
                    
                    {/* Book Cover */}
                    <div className="relative h-full w-full overflow-hidden rounded-md shadow-2xl ring-1 ring-black/5">
                      <Image
                        src={product.images[currentImageIndex]}
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
              
              {/* Gallery Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 justify-center md:justify-start mt-2 flex-wrap">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative h-20 w-16 overflow-hidden rounded-lg shadow-sm transition-all hover:opacity-100 ${
                        idx === currentImageIndex ? "ring-2 ring-[#A7895C] opacity-100" : "ring-1 ring-black/10 opacity-60"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - vista ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Features (¿Qué incluye?) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm border border-white/50"
            >
              <h3 className={`font-serif text-xl font-bold text-[#1a1a1a] ${isPhysical ? 'mb-2' : 'mb-5'}`}>
                {isPhysical ? '✨ Este producto te va a aportar:' : '¿Para quién es?'}
              </h3>
              {isPhysical && (
                <p className="mb-5 text-sm md:text-base text-[#5c4b32] font-medium">
                  Una herramienta teórico-práctica que te ayudará con:
                </p>
              )}
              <ul className="flex flex-col gap-4">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#A7895C]" strokeWidth={3} />
                    <span className="text-sm md:text-base font-medium text-[#5c4b32]/90">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Title, Action Box & Description */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Badge + Title — Desktop only */}
            <div className="hidden md:flex flex-col gap-3">
              <span className={`self-start rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase ${
                isPhysical ? "bg-[#A7895C]/15 text-[#A7895C]" : "bg-secondary/15 text-secondary"
              }`}>
                {product.badge}
              </span>
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl lg:text-5xl leading-tight">
                  {product.name}
                </h1>
                <p className="mt-2 font-serif text-lg md:text-xl italic text-[#5c4b32]">
                  {product.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="text-[#3d311e] font-sans leading-relaxed bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm border border-white/50">
              {product.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="mb-4 text-base md:text-[17px]">
                  {para.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < para.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Action box: Price + Quantity + Button */}
            <div className="rounded-3xl border-2 border-[#A7895C]/15 bg-white/60 backdrop-blur-md p-6 md:p-8 flex flex-col gap-6 shadow-sm">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl md:text-5xl font-bold text-[#A7895C]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-base text-[#5c4b32]/60 font-medium">USD</span>
              </div>

              {isPhysical && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-[#5c4b32] uppercase tracking-wider">Cantidad:</span>
                  <div className="flex items-center overflow-hidden rounded-full border-2 border-[#A7895C]/20 bg-white">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-10 w-10 items-center justify-center text-[#5c4b32] transition-colors hover:bg-[#A7895C]/10 font-bold text-lg">−</button>
                    <span className="w-10 text-center text-sm font-bold text-[#1a1a1a]">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="flex h-10 w-10 items-center justify-center text-[#5c4b32] transition-colors hover:bg-[#A7895C]/10 font-bold text-lg">+</button>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={handleAdd}
                  className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-md hover:shadow-lg ${
                    added ? "bg-primary" : isPhysical ? "bg-[#A7895C]" : "bg-secondary"
                  }`}
                >
                  {added ? <><Check size={20} /> ¡Agregado!</> : <><ShoppingBag size={20} /> Agregar al carrito</>}
                </button>

                <button onClick={openCart} className="w-full text-center text-sm font-bold text-[#5c4b32]/60 underline-offset-4 transition-colors hover:text-[#A7895C] hover:underline">
                  Ver carrito →
                </button>
              </div>
            </div>

          </motion.div>
        </div>
        </div>{/* end flex col */}
      </div>
    </section>
  )
}
