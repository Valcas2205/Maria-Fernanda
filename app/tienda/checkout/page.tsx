import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundShapes } from "@/components/background-shapes"
import { CheckoutClient } from "@/components/store/checkout-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finalizar compra",
  description: "Completa tu compra de forma segura.",
}

export default function CheckoutPage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />
      <Header />
      <main className="relative z-10 pt-24 min-h-screen">
        <CheckoutClient />
      </main>
      <Footer />
    </div>
  )
}
