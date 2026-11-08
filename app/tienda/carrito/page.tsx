import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundShapes } from "@/components/background-shapes"
import { CartPageClient } from "@/components/store/cart-page-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carrito de compras",
  description: "Revisa los productos en tu carrito y procede al pago.",
}

export default function CartPage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />
      <Header />
      <main className="relative z-10 pt-24 min-h-screen">
        <CartPageClient />
      </main>
      <Footer />
    </div>
  )
}
