import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundShapes } from "@/components/background-shapes"
import { products } from "@/lib/products"
import { StoreHero } from "@/components/store/store-hero"
import { FeaturedProduct } from "@/components/store/featured-product"
import { EbookGrid } from "@/components/store/ebook-grid"
import { StoreTrustBadges } from "@/components/store/store-trust-badges"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tienda | Libros y recursos de bienestar emocional",
  description:
    "Descubre los libros y recursos digitales de la Psic. María Fernanda Azcunes. Herramientas prácticas para tu bienestar emocional y crecimiento personal.",
}

export default function TiendaPage() {
  const featuredProduct = products.find((p) => p.featured)!
  const ebooks = products.filter((p) => p.type === "digital")

  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />
      <Header />
      <main className="relative z-10 pt-24">
        <StoreHero />
        <FeaturedProduct product={featuredProduct} />
        <EbookGrid products={ebooks} />
        <StoreTrustBadges />
      </main>
      <Footer />
    </div>
  )
}
