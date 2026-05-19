"use client"

import { useCart } from "@/lib/cart-context"
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, total } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-black/20"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-[101] flex w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <ShoppingBag size={24} />
                Tu Carrito
              </h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Cerrar carrito"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <div className="rounded-full bg-secondary/10 p-6 text-secondary">
                    <ShoppingBag size={48} />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    Tu carrito está vacío
                  </p>
                  <button
                    onClick={closeCart}
                    className="rounded-full bg-secondary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-4">
                      <div className="relative h-24 w-20 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-md border bg-muted">
                        {item.product.images && item.product.images.length > 0 ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            src="/images/sello.png"
                            alt="Sin imagen"
                            width={40}
                            height={40}
                            className="h-10 w-10 opacity-40"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-sm font-medium text-secondary">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          {item.product.type === "physical" ? (
                            <div className="flex items-center rounded-full border">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-3 py-1 hover:text-secondary"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-3 py-1 hover:text-secondary"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="text-sm font-medium text-muted-foreground px-2">
                              1 ud. (Digital)
                            </div>
                          )}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Eliminar item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t bg-muted/30 px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-secondary">${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/tienda/checkout"
                  onClick={closeCart}
                  className="block w-full rounded-full bg-secondary px-6 py-4 text-center font-bold text-white transition-opacity hover:opacity-90"
                >
                  Finalizar Compra
                </Link>
                <button
                  onClick={closeCart}
                  className="mt-4 block w-full text-center text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
