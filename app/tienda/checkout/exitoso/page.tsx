import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundShapes } from "@/components/background-shapes"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Download, MessageCircle, ShoppingBag } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "¡Compra exitosa! Gracias por tu confianza",
  description: "Tu compra fue procesada con éxito.",
}

export default function ExitosoPage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />
      <Header />
      <main className="relative z-10 pt-24 min-h-screen">
        <section className="py-20 px-6">
          <div className="mx-auto max-w-2xl text-center">
            {/* Icon */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-12 w-12 text-primary" strokeWidth={1.5} />
            </div>

            {/* Seal */}
            <div className="mx-auto mb-6 flex justify-center">
              <Image
                src="/images/sello.png"
                alt="Todo es un balance"
                width={80}
                height={80}
                className="h-16 w-16 opacity-80"
              />
            </div>

            <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] md:text-5xl mb-4">
              ¡Gracias por tu confianza!
            </h1>
            <p className="text-lg text-[#5c4b32] leading-relaxed mb-12">
              Tu compra fue procesada exitosamente. Recibirás un correo electrónico
              con los detalles de tu pedido en breve.
            </p>

            {/* Info cards */}
            <div className="grid gap-6 sm:grid-cols-2 mb-12 text-left">
              <div className="rounded-3xl bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15">
                  <Download className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">
                  Recursos digitales
                </h3>
                <p className="text-sm text-[#5c4b32] leading-relaxed">
                  Recibirás un enlace de descarga en tu correo electrónico.
                  Puedes descargarlo las veces que necesites.
                </p>
              </div>
              <div className="rounded-3xl bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15">
                  <MessageCircle className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">
                  Libro físico
                </h3>
                <p className="text-sm text-[#5c4b32] leading-relaxed">
                  Te contactaremos por WhatsApp para coordinar los detalles
                  del envío a tu dirección.
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/tienda"
                className="flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                <ShoppingBag size={18} />
                Seguir comprando
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-primary px-8 py-3.5 text-base font-bold text-primary transition-colors hover:bg-primary/10"
              >
                Ir al inicio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
