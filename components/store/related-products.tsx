"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ShoppingBag, Tablet, BookOpen } from "lucide-react"
import { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface Props {
  products: Product[]
}

export function RelatedProducts({ products }: Props) {
  const { addToCart } = useCart()
  const [addedIds, setAddedIds] = useState<string[]>([])

  function handleAdd(product: Product) {
    addToCart(product)
    setAddedIds((prev) => [...prev, product.id])
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id))
    }, 2000)
  }

  if (!products.length) return null

  return (
    <section className="px-6 py-12 md:py-16 border-t border-border/40">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl">
          También te puede interesar
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/tienda/${product.slug}`} className="group block">
                <div className="overflow-hidden rounded-3xl bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15">
                    {product.type === "digital" ? (
                      <Tablet className="h-5 w-5 text-secondary" strokeWidth={1.5} />
                    ) : (
                      <BookOpen className="h-5 w-5 text-[#A7895C]" strokeWidth={1.5} />
                    )}
                  </div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#5c4b32]/60">
                    {product.badge}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-[#1a1a1a] group-hover:text-[#A7895C] transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#5c4b32] leading-relaxed line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-[#A7895C]">
                      ${product.price.toFixed(2)} <span className="text-xs text-[#5c4b32]/50">USD</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleAdd(product)
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                    >
                      <ShoppingBag size={13} />
                      {addedIds.includes(product.id) ? "✓" : "Agregar"}
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
