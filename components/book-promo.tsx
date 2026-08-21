'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Tablet, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { products } from '@/lib/products';

const ebooks = [
  {
    id: '2',
    title: '¿Cómo regulo mi ansiedad?',
    tagline: 'Entiende tu ansiedad y recupera tu paz',
    color: 'from-[#8dbda2]/20 to-[#8dbda2]/5',
    accent: '#8dbda2',
    href: '/tienda/guia-ansiedad',
    image: '/images/Portada-miAnsiedad.png',
    price: '$0.03',
  },
  {
    id: '3',
    title: 'Guía teórico-práctica sobre la asertividad',
    tagline: 'Comunícate con confianza y respeto',
    color: 'from-[#e8aea3]/20 to-[#e8aea3]/5',
    accent: '#e8aea3',
    href: '/tienda/guia-asertividad',
    image: '/images/Portada-asertividad.png',
    price: '$0.03',
  },
];

export function BookPromo() {
  const { addToCart } = useCart();
  return (
    <section
      id="tienda-promo"
      className="relative overflow-hidden py-20 md:py-32"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#8dbda2]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#e8aea3]/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Herramientas para tu bienestar
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-foreground/80">
            Recursos creados desde la experiencia clínica para acompañarte en tu
            proceso de autoconocimiento, tanto si estás en terapia como si
            empiezas tu camino solo.
          </p>
        </motion.div>

        {/* Main layout: Book + Ebooks */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* --- LIBRO FÍSICO (izquierda, más ancho) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <Link
              href="/tienda/conocete-y-comienza-a-quererte"
              className="group block h-full"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#A7895C]/20 via-[#A7895C]/10 to-transparent p-8 shadow-sm transition-shadow duration-500 hover:shadow-xl">
                {/* Badge */}
                <div className="order-1 mb-6 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A7895C]/20">
                    <BookOpen size={18} className="text-[#A7895C]" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-[#A7895C]">
                    Pack de Fichas
                  </span>
                </div>

                {/* Title (Mobile: before image. Desktop: after image) */}
                <h3 className="order-2 mb-6 lg:mb-0 lg:mt-auto lg:order-3 font-serif text-2xl font-bold leading-tight text-[#1a1a1a] md:text-3xl">
                  Conócete y comienza a quererte
                </h3>

                {/* Book cover */}
                <div className="order-3 lg:order-2 relative mb-8 lg:mb-6 lg:mt-4 flex justify-center">
                  {/* Decorative glow */}
                  <div className="absolute inset-0 rounded-2xl bg-[#A7895C]/10 blur-2xl" />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10"
                  >
                    <Image
                      src="/images/pack-fichas-3.png"
                      alt="Conócete y comienza a quererte"
                      width={220}
                      height={300}
                      className="rounded-2xl shadow-2xl shadow-[#A7895C]/30 transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                </div>

                {/* Description & Price */}
                <div className="order-4 lg:order-4 mt-auto lg:mt-2">
                  <p className="text-sm leading-relaxed text-[#5c4b32]/80">
                    Un viaje hacia tu bienestar emocional. Acompañamiento desde
                    la psicología aplicada a tu vida cotidiana.
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-[#A7895C]">
                      $0.08
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A7895C] px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 group-hover:gap-3 group-hover:bg-[#A7895C]/90">
                      Ver fichas
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* --- EBOOKS (derecha, grid 3) --- */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            {/* Ebooks header */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/20">
                <Tablet size={18} className="text-secondary" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-secondary">
                Recursos digitales — Descarga inmediata
              </span>
            </motion.div>

            {/* Ebook cards */}
            {ebooks.map((ebook, i) => (
              <motion.div
                key={ebook.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              >
                <div className="group flex items-center gap-5 rounded-2xl bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  {/* Cover — links to product page */}
                  <Link
                    href={ebook.href}
                    className="relative flex h-20 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${ebook.color}`}
                    />
                    <Image
                      src={ebook.image}
                      alt={ebook.title}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Info — links to product page */}
                  <Link
                    href={ebook.href}
                    className="flex flex-1 flex-col gap-0.5 min-w-0"
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: ebook.accent }}
                    >
                      E-Book
                    </p>
                    <h4 className="font-serif text-lg font-bold text-foreground leading-tight">
                      {ebook.title}
                    </h4>
                    <p className="text-sm text-foreground/60 line-clamp-1">
                      {ebook.tagline}
                    </p>
                  </Link>

                  {/* Price & Add to Cart */}
                  <div className="flex flex-shrink-0 flex-col items-end gap-2">
                    <span className="font-serif text-xl font-bold text-[#A7895C]">
                      {ebook.price}
                    </span>
                    <button
                      onClick={() => {
                        const product = products.find((p) => p.id === ebook.id);
                        if (product) addToCart(product);
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1.5 text-xs font-bold text-secondary transition-all duration-300 hover:bg-secondary hover:text-white"
                    >
                      <ShoppingCart size={12} />
                      Añadir
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA Tienda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-2"
            >
              <Link
                href="/tienda"
                className="group flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#A7895C]/30 py-4 text-sm font-semibold text-[#A7895C] transition-all duration-300 hover:border-[#A7895C] hover:bg-[#A7895C]/5"
              >
                Ver toda la tienda
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
