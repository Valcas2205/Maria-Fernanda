"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, BookOpen, Star, Truck } from "lucide-react"
import { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface Props {
  product: Product
}

export function FeaturedProduct({ product }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section id="productos" className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-[1050px]">
        {/* Section label */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A7895C]/20">
            <Star className="h-4 w-4 text-[#A7895C]" fill="currentColor" />
          </div>
          <span className="font-semibold text-[#A7895C] uppercase tracking-widest text-sm">
            Protagonista
          </span>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#A7895C]/10 via-card to-secondary/10 px-5 py-8 md:px-10 md:py-8 lg:px-12 lg:py-10 shadow-lg">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-12">
            
            {/* Mobile Header (Badges + Title + Subtitle) - Only visible on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex w-full flex-col gap-4 text-center md:hidden"
            >
              <div className="flex gap-2 flex-wrap justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A7895C]/15 px-3 py-1 text-xs font-semibold text-[#A7895C]">
                  <BookOpen size={12} />
                  {product.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  <Truck size={12} />
                  Envíos a toda Venezuela.
                </span>
              </div>
              <div>
                <h2 className="font-serif text-[32px] leading-[1.15] font-bold text-[#1a1a1a]">
                  {product.name}
                </h2>
              </div>
            </motion.div>

            {/* Book image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex-shrink-0 flex flex-col items-center md:items-start gap-8 lg:gap-10"
            >
              <div className="relative h-64 w-52 md:h-80 md:w-64 lg:h-96 lg:w-72 mx-auto">
                {/* Decorative shadow */}
                <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-[#A7895C]/20 blur-xl" />
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={product.images[0] || "/images/sello.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 208px, (max-width: 1024px) 256px, 288px"
                  />
                </div>
              </div>

              {/* Features (moved below image) */}
              <div className="w-full max-w-[280px] mx-auto md:mx-0 px-2">
                <ul className="flex flex-col gap-3">
                  {product.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm md:text-[15px] font-sans font-medium text-[#2a2215]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A7895C]" />
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-1 flex-col gap-5"
            >
              {/* Desktop Header (Badges + Title + Subtitle) - Hidden on mobile */}
              <div className="hidden md:flex flex-col gap-5">
                <div className="flex gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A7895C]/15 px-3 py-1 text-xs font-semibold text-[#A7895C]">
                    <BookOpen size={12} />
                    {product.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    <Truck size={12} />
                    Envíos a toda Venezuela.
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-4xl font-bold text-[#1a1a1a] md:text-5xl lg:text-6xl">
                    {product.name}
                  </h2>
                </div>
              </div>

              <div className="text-base leading-relaxed text-[#2a2215] font-sans font-medium md:text-[17px]">
                {product.description.split('\n').map((line, i) => (
                  <p key={i} className={line.trim() === '' ? 'mb-4' : ''}>{line}</p>
                ))}
              </div>

              {/* Features removed from here */}

              {/* Price & CTA */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold text-[#A7895C]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-[#5c4b32]/60">USD</span>
                </div>
                <div className="flex w-full flex-col sm:w-auto sm:flex-row gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-[#A7895C] px-7 py-3.5 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95"
                  >
                    <ShoppingBag size={18} />
                    {added ? "¡Agregado! ✓" : "Agregar al carrito"}
                  </button>
                  <Link
                    href={`/tienda/${product.slug}`}
                    className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border-2 border-[#A7895C] px-7 py-3.5 text-base font-bold text-[#A7895C] transition-colors hover:bg-[#A7895C]/10"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
