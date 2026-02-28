"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "Por fin entiendo mi ansiedad y tengo herramientas reales para gestionarla. Ya no me controla, yo la gestiono.",
    author: "Sofia R.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "Empece a valorarme y a entender que merezco amor propio. Las sesiones fueron un antes y un despues en mi vida.",
    author: "Andrea P.",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "Trabajar el duelo con Maria Fernanda me permitio sanar a mi ritmo, sin presiones. Encontre paz en el proceso.",
    author: "Miguel A.",
    dotColor: "bg-secondary/70",
    blobColor: "bg-secondary/15",
    nameColor: "text-secondary",
  },
  {
    quote:
      "Aprendi a poner limites sin sentir culpa. El proceso con Maria Fernanda cambio mi forma de relacionarme conmigo misma.",
    author: "Laura M.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "La terapia de parejas nos ayudo a comunicarnos de una manera completamente diferente. Estamos mas unidos que nunca.",
    author: "Carlos y Andrea",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "Nunca pense que podria gestionar mi ansiedad de esta forma. Hoy tengo herramientas reales para mis dias dificiles.",
    author: "Valentina G.",
    dotColor: "bg-secondary/70",
    blobColor: "bg-secondary/15",
    nameColor: "text-secondary",
  },
  {
    quote:
      "Maria Fernanda me ayudo a entender que pedir ayuda no es debilidad. Hoy vivo con mucha mas claridad emocional.",
    author: "Daniel P.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "El acompanamiento fue increible desde el primer dia. Siento que encontre un espacio seguro donde puedo ser yo misma.",
    author: "Camila T.",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "Despues de anos de cargar con inseguridades, por fin pude trabajar mi autoestima de raiz. Estoy muy agradecida.",
    author: "Ana L.",
    dotColor: "bg-secondary/70",
    blobColor: "bg-secondary/15",
    nameColor: "text-secondary",
  },
  {
    quote:
      "La terapia online me dio la flexibilidad que necesitaba sin perder la calidad del acompanamiento. 100% recomendable.",
    author: "Marco R.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "Me ayudo a sanar heridas que no sabia que seguian abiertas. Hoy me siento mas liviana y en paz conmigo misma.",
    author: "Isabella F.",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "Empece la terapia con muchas dudas y hoy puedo decir que fue la mejor decision que he tomado en mucho tiempo.",
    author: "Gabriela S.",
    dotColor: "bg-secondary/70",
    blobColor: "bg-secondary/15",
    nameColor: "text-secondary",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setSlidesPerView(1)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(3)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalPages = Math.ceil(testimonials.length / slidesPerView)

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [goNext])

  const startIdx = currentIndex * slidesPerView
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + slidesPerView)

  while (visibleTestimonials.length < slidesPerView) {
    visibleTestimonials.push(testimonials[visibleTestimonials.length % testimonials.length])
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-light tracking-tight text-[#1a1a1a] md:text-4xl lg:text-5xl text-balance">
            Historias de Balance
          </h2>
        </div>

        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={goPrev}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 text-secondary/60 transition-colors hover:text-secondary md:-left-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-8 w-8" strokeWidth={1.5} />
          </button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 text-secondary/60 transition-colors hover:text-secondary md:-right-10"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-8 w-8" strokeWidth={1.5} />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTestimonials.map((t, i) => (
              <div
                key={`${currentIndex}-${i}`}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-card p-7 shadow-sm transition-all duration-500 animate-in fade-in slide-in-from-right-4"
              >
                {/* Top colored dot */}
                <div className={`mb-6 h-8 w-8 rounded-full ${t.dotColor}`} />

                {/* Bottom-right blob decoration */}
                <div
                  className={`pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full ${t.blobColor} blur-xl`}
                />

                {/* Quote */}
                <p className="relative z-10 mb-6 flex-1 font-serif text-base leading-relaxed text-[#1a1a1a]/80">
                  {`"${t.quote}"`}
                </p>

                {/* Author */}
                <p className={`relative z-10 text-sm font-medium ${t.nameColor}`}>
                  {`— ${t.author}`}
                </p>
              </div>
            ))}
          </div>

          {/* Page dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-primary/25 hover:bg-primary/40"
                }`}
                aria-label={`Ir a pagina ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
