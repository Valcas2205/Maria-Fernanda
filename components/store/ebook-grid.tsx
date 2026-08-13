"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Download, Tablet } from "lucide-react"
import { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

const ebookColors = [
  { bg: "bg-primary/15", text: "text-primary", dot: "bg-primary", icon: "text-primary" },
  { bg: "bg-accent/15", text: "text-accent", dot: "bg-accent", icon: "text-accent" },
  { bg: "bg-secondary/15", text: "text-secondary", dot: "bg-secondary", icon: "text-secondary" },
]

interface EbookCardProps {
  product: Product
  index: number
}

function EbookCard({ product, index }: EbookCardProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const colors = ebookColors[index % ebookColors.length]

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/tienda/${product.slug}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* Image / cover */}
          <div className={`relative flex h-56 lg:h-72 w-full items-center justify-center overflow-hidden ${colors.bg}`}>
            {product.images?.[0] ? (
              <div className="relative h-44 w-36 lg:h-56 lg:w-44 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-2">
                {/* Shadow */}
                <div className="absolute -bottom-3 left-1/2 w-[80%] -translate-x-1/2 h-4 bg-black/15 blur-md rounded-[100%]" />
                
                {/* Book Cover */}
                <div className="relative h-full w-full overflow-hidden rounded-md shadow-lg ring-1 ring-black/5">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 144px, 144px"
                  />
                  {/* Glossy overlay and spine */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/5 via-transparent to-white/20" />
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 pointer-events-none bg-gradient-to-r from-white/40 to-transparent mix-blend-overlay" />
                  <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-black/5 pointer-events-none" />
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center justify-center gap-2 p-6 text-center">
                <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70`}>
                  <Tablet className={`h-6 w-6 ${colors.icon}`} strokeWidth={1.5} />
                </div>
                <p className={`font-serif text-lg font-bold ${colors.text}`}>
                  {product.name}
                </p>
                <p className="text-xs text-[#5c4b32]/60 font-medium">
                  María Fernanda Azcunes
                </p>
              </div>
            )}
            {/* Digital badge */}
            <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold text-[#5c4b32] backdrop-blur-sm shadow-sm">
              <Download size={10} />
              Digital
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-3 p-6">
            <span className={`self-start rounded-full ${colors.bg} px-3 py-1 text-xs font-semibold ${colors.text}`}>
              {product.badge}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1a1a1a] group-hover:text-[#A7895C] transition-colors">
              {product.name}
            </h3>
            <div className="text-sm leading-relaxed text-[#5c4b32] flex-1 flex flex-col gap-3">
              {(() => {
                const parts = product.description.split(/(?:💖|💗|🤎)\s*¿Para quién es\?/);
                const mainDesc = parts[0];
                const forWhomList = parts.length > 1 ? parts[1].trim().split('\n') : [];
                return (
                  <>
                    <div className="space-y-2">
                      {mainDesc.split('\n').map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </div>
                    {forWhomList.length > 0 && (
                      <div className="mt-2 rounded-2xl bg-[#A7895C]/5 p-4 border border-[#A7895C]/10">
                        <h4 className="font-serif text-sm font-bold text-[#A7895C] mb-3 flex items-center gap-1.5">
                           ¿Para quién es?
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                          {forWhomList.slice(0, 2).map((item, k) => (
                            <li key={k} className="flex items-start gap-2 text-[13px] md:text-sm">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A7895C]" />
                              <span className="leading-snug text-[#3d311e]">{item.replace(/^- /, '')}</span>
                            </li>
                          ))}
                          {forWhomList.length > 2 && (
                            <li className="mt-1 text-[13px] font-medium text-[#A7895C] italic">
                              + Clic para ver todos los detalles...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Price + CTA */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-bold text-[#A7895C]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-[#5c4b32]/50">USD</span>
              </div>
              <button
                onClick={handleAdd}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 ${
                  added ? "bg-primary" : "bg-secondary"
                }`}
              >
                <ShoppingBag size={14} />
                {added ? "✓" : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface Props {
  products: Product[]
}

export function EbookGrid({ products }: Props) {
  return (
    <section className="px-6 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="font-serif text-4xl font-bold text-[#1a1a1a] md:text-5xl mb-2">
            Recursos digitales
          </h2>
          <p className="text-[#5c4b32] text-base md:text-lg">
            Descarga inmediata · Acceso permanente
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
          {products.map((product, i) => (
            <EbookCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
