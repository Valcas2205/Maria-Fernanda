"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "Por fin entiendo mi ansiedad y tengo herramientas reales para gestionarla. Ya no me controla, yo la gestiono. El proceso me devolvio una tranquilidad que pense que habia perdido para siempre.",
    author: "Sofia R.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "Empece a valorarme y a entender que merezco amor propio. Las sesiones fueron un antes y un despues en mi vida. Hoy me miro al espejo y veo a alguien que merece ser feliz.",
    author: "Andrea P.",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "Trabajar el duelo con Maria Fernanda me permitio sanar a mi ritmo, sin presiones. Encontre paz en el proceso. Me dio espacio para sentir y herramientas para seguir adelante.",
    author: "Miguel A.",
    dotColor: "bg-secondary/70",
    blobColor: "bg-secondary/15",
    nameColor: "text-secondary",
  },
  {
    quote:
      "Aprendi a poner limites sin sentir culpa. El proceso con Maria Fernanda cambio mi forma de relacionarme conmigo misma y con los demas. Siento que recupere mi voz.",
    author: "Laura M.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "La terapia de parejas nos ayudo a comunicarnos de una manera completamente diferente. Estamos mas unidos que nunca. Aprendimos a escucharnos de verdad.",
    author: "Carlos y Andrea",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "Nunca pense que podria gestionar mi ansiedad de esta forma. Hoy tengo herramientas reales para mis dias dificiles y la confianza de que puedo con lo que venga.",
    author: "Valentina G.",
    dotColor: "bg-secondary/70",
    blobColor: "bg-secondary/15",
    nameColor: "text-secondary",
  },
  {
    quote:
      "Maria Fernanda me ayudo a entender que pedir ayuda no es debilidad. Hoy vivo con mucha mas claridad emocional. Cada sesion fue un paso hacia una version mas autentica de mi.",
    author: "Daniel P.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "El acompanamiento fue increible desde el primer dia. Siento que encontre un espacio seguro donde puedo ser yo misma sin miedo a ser juzgada. Gracias infinitas.",
    author: "Camila T.",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "Despues de anos de cargar con inseguridades, por fin pude trabajar mi autoestima de raiz. Estoy muy agradecida por este proceso transformador.",
    author: "Ana L.",
    dotColor: "bg-secondary/70",
    blobColor: "bg-secondary/15",
    nameColor: "text-secondary",
  },
  {
    quote:
      "La terapia online me dio la flexibilidad que necesitaba sin perder la calidad del acompanamiento. Desde cualquier lugar me senti contenida y escuchada.",
    author: "Marco R.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "Me ayudo a sanar heridas que no sabia que seguian abiertas. Hoy me siento mas liviana y en paz conmigo misma. La terapia fue un regalo que me di.",
    author: "Isabella F.",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "Empece la terapia con muchas dudas y hoy puedo decir que fue la mejor decision que he tomado en mucho tiempo. Mi vida cambio de una forma que no imaginaba.",
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
    const timer = setInterval(goNext, 7000)
    return () => clearInterval(timer)
  }, [goNext])

  const startIdx = currentIndex * slidesPerView
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + slidesPerView)

  while (visibleTestimonials.length < slidesPerView) {
    visibleTestimonials.push(testimonials[visibleTestimonials.length % testimonials.length])
  }

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl text-balance">
            Historias de Balance
          </h2>
        </div>

        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={goPrev}
            className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/10 bg-white/90 text-secondary/70 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-secondary hover:shadow-md md:-left-6 lg:-left-12"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/10 bg-white/90 text-secondary/70 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-secondary hover:shadow-md md:-right-4 lg:-right-12"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTestimonials.map((t, i) => (
              <div
                key={`${currentIndex}-${i}`}
                className="relative flex flex-col overflow-hidden rounded-3xl bg-card p-8 shadow-sm transition-all duration-500 animate-in fade-in slide-in-from-right-4"
              >
                {/* Top colored dot */}
                <div className={`mb-8 h-10 w-10 rounded-full ${t.dotColor}`} />

                {/* Bottom-right blob decoration */}
                <div
                  className={`pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full ${t.blobColor} blur-xl`}
                />

                {/* Quote */}
                <p className="relative z-10 mb-8 flex-1 font-serif text-base leading-relaxed text-[#333333] md:text-lg">
                  {`"${t.quote}"`}
                </p>

                {/* Author */}
                <p className={`relative z-10 text-base font-bold ${t.nameColor}`}>
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
