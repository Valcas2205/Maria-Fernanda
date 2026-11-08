"use client"

import { createContext, useContext, useReducer, useEffect, useState, ReactNode } from "react"
import { Product, products as dbProducts } from "./products"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        if (action.product.type === "digital") {
          return state
        }
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.product.id !== action.productId) }
    case "UPDATE":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) }
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    case "CLEAR":
      return { items: [] }
    case "HYDRATE":
      return { items: action.items }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  total: number
  itemCount: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("teub-cart")
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]
        // Sync with current database to get latest names, prices, and images
        const syncedItems = parsed
          .map((item) => {
            const currentProduct = dbProducts.find((p) => p.id === item.product.id)
            if (currentProduct) {
              return { ...item, product: currentProduct }
            }
            // If product no longer exists in DB, we could filter it out by returning null
            return null
          })
          .filter(Boolean) as CartItem[]
          
        dispatch({ type: "HYDRATE", items: syncedItems })
      }
    } catch {}
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem("teub-cart", JSON.stringify(state.items))
  }, [state.items])

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total,
        itemCount,
        addToCart: (product) => {
          dispatch({ type: "ADD", product })
          setIsCartOpen(true)
        },
        removeFromCart: (productId) => dispatch({ type: "REMOVE", productId }),
        updateQuantity: (productId, quantity) =>
          dispatch({ type: "UPDATE", productId, quantity }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
