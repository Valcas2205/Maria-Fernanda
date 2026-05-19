import { getProductBySlug, getRelatedProducts, products } from "@/lib/products"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundShapes } from "@/components/background-shapes"
import { ProductDetailClient } from "@/components/store/product-detail-client"
import { RelatedProducts } from "@/components/store/related-products"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.id)

  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />
      <Header />
      <main className="relative z-10 pt-24 min-h-screen">
        <ProductDetailClient product={product} />
        <RelatedProducts products={related} />
      </main>
      <Footer />
    </div>
  )
}
