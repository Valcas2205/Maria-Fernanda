"use client"

import { useState, useEffect, useCallback } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "Aprendi a poner limites sin sentir culpa. El proceso con Maria Fernanda cambio mi forma de relacionarme conmigo misma.",
    author: "Laura M.",
  },
  {
    quote:
      "La terapia de parejas nos ayudo a comunicarnos de una manera completamente diferente. Estamos mas unidos que nunca.",
    author: "Carlos y Andrea",
  },
  {
    quote:
      "Nunca pense que podria gestionar mi ansiedad de esta forma. Hoy tengo herramientas reales para mis dias dificiles.",
    author: "Sofia R.",
  },
  {
    quote:
      "Gracias a la terapia encontre el equilibrio que tanto buscaba. Me siento mas segura de mis decisiones y mas conectada conmigo.",
    author: "Valentina G.",
  },
  {
    quote:
      "Maria Fernanda me ayudo a entender que pedir ayuda no es debilidad. Hoy vivo con mucha mas claridad emocional.",
    author: "Daniel P.",
  },
  {
    quote:
      "El acompanamiento fue increible desde el primer dia. Siento que encontre un espacio seguro donde puedo ser yo misma.",
    author: "Camila T.",
  },
  {
    quote:
      "Despues de anos de cargar con inseguridades, por fin pude trabajar mi autoestima de raiz. Estoy muy agradecida.",
    author: "Ana L.",
  },
  {
    quote:
      "La terapia online me dio la flexibilidad que necesitaba sin perder la calidad del acompanamiento. 100% recomendable.",
    author: "Marco R.",
  },
  {
    quote:
      "Me ayudo a sanar heridas que no sabia que seguian abiertas. Hoy me siento mas liviana y en paz conmigo misma.",
    author: "Isabella F.",
  },
  {
    quote:
      "El enfoque de Maria Fernanda es muy humano y profesional. Cada sesion me daba herramientas concretas para mi dia a dia.",
    author: "Andres V.",
  },
  {
    quote:
      "Logre reconectar con mi pareja despues de meses de distancia emocional. Estoy profundamente agradecida por el proceso.",
    author: "Patricia y Luis",
  },
  {
    quote:
      "Empece la terapia con muchas dudas y hoy puedo decir que fue la mejor decision que he tomado en mucho tiempo.",
    author: "Gabriela S.",
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

  // Auto-play
  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [goNext])

  // Get current visible testimonials
  const startIdx = currentIndex * slidesPerView
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + slidesPerView)

  // Pad if last page has fewer cards
  while (visibleTestimonials.length < slidesPerView) {
    visibleTestimonials.push(testimonials[visibleTestimonials.length % testimonials.length])
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Historias de Balance
          </h2>
        </div>

        {/* Slider container */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground/60 shadow-md transition-colors hover:text-primary md:-left-5"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground/60 shadow-md transition-colors hover:text-primary md:-right-5"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Cards grid - always shows 3 (or 2/1 on smaller screens) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTestimonials.map((t, i) => (
              <div
                key={`${currentIndex}-${i}`}
                className="flex h-full flex-col gap-5 rounded-3xl bg-card p-7 shadow-sm transition-all duration-500 animate-in fade-in slide-in-from-right-4"
              >
                <Quote className="h-7 w-7 flex-shrink-0 text-primary/30" />
                <p className="flex-1 text-sm leading-relaxed text-card-foreground/80 italic">
                  {`"${t.quote}"`}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 flex-shrink-0 rounded-full bg-primary/15" />
                  <span className="text-sm font-semibold text-card-foreground">
                    {t.author}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Page dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-7 bg-primary"
                    : "w-2.5 bg-primary/25 hover:bg-primary/40"
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
