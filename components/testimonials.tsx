"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "Estar en terapia contigo ha sido un regalo de la vida, en cada consulta descubro un poco más de mí mientras me acompañas en el proceso del amor propio y el cómo manejar mi ansiedad, me enseñaste que todos las emociones son válidas y en lo bonito que es pasar tiempo consigo mismo. Con tu apoyo y las herramientas que me regalas en cada consulta, se que cada día es una bendición. Gracias Mafe.",
    author: "M.R.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "La terapia con Mafe para mi tuvo un antes y un después en mi vida, empecé en un momento muy bajo y desde ahí todo fue maravilloso. Mafe es demasiado tranquila, empática y por más que sea una psicóloga termina siendo una amiga y de las mejores, trabajar mis problemas y pensamientos con mafe es más fácil de lo que en algún momento fue. Creo que todo el mundo necesita tener un lugar seguro como lo es el consultorio de mafe y una persona especial como lo es ella❤️.",
    author: "E.B.H.",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "La terapia contigo doc ha sido un subí y baja de emociones, pero sobre todo me ha ayudado a sobrellevar esas situaciones donde me sentia perdida y sola, conseguí mi lugar seguro donde puedo expresarme y sentir todas las emociones que me invaden❤️.",
    author: "A.A.",
    dotColor: "bg-secondary/70",
    blobColor: "bg-secondary/15",
    nameColor: "text-secondary",
  },
  {
    quote:
      "La terapia contigo fue fundamental, en ese periodo de mi vida donde necesitaba entender y reconstruirme emocionalmente. Escucharte, hacer las asignaciones para aprender y sanar poco a poco, me logró hacer entender que mi salud mental es valiosa. Siempre agradecida por tu ayuda, eres una excelente profesional!",
    author: "M.L.",
    dotColor: "bg-[#b8d4e3]",
    blobColor: "bg-[#b8d4e3]/20",
    nameColor: "text-accent",
  },
  {
    quote:
      "Me ha ayudado a identificar cada vez más rápido y de manera más consciente los errores que no quiero volver a cometer. Me han ayudado las herramientas que me has dado, a salir de las crisis yo sola, me han ayudado a calmarme. La terapia contigo me ha dado siempre una dirección, que se siente acompañada y segura.",
    author: "Anónimo.",
    dotColor: "bg-primary/60",
    blobColor: "bg-primary/15",
    nameColor: "text-primary",
  },
  {
    quote:
      "El primer momento que compartí en terapia contigo, me invadió la sensación de paz y seguridad que sentí. Aprendí a que yo no soy mi enemigo, si cometo un error es porque soy humano y puedo aprender y mejorar. Aprendí a no tratarme mal, aprendí a controlar la voz en mi cabeza, aprendí que si perdono y doy oportunidades es por mi capacidad de amar tan grande y sincera, y que no debo castigarme por eso.",
    author: "J.L.",
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
    const timer = setInterval(goNext, 22000)
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
                className="relative flex h-[350px] flex-col overflow-hidden rounded-3xl bg-card p-6 shadow-sm duration-700 animate-in fade-in lg:h-[380px] lg:p-8"
              >
                {/* Top colored dot */}
                <div className={`mb-6 h-8 w-8 shrink-0 rounded-full lg:mb-8 lg:h-10 lg:w-10 ${t.dotColor}`} />

                {/* Bottom-right blob decoration */}
                <div
                  className={`pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full ${t.blobColor} blur-xl`}
                />

                {/* Quote */}
                <div className="relative z-10 mb-4 flex-1 overflow-y-auto pr-2 pb-2">
                  <p className="font-serif text-[15px] leading-relaxed text-[#333333] lg:text-base">
                    {`"${t.quote}"`}
                  </p>
                </div>

                {/* Author */}
                <p className={`relative z-10 shrink-0 text-base font-bold ${t.nameColor}`}>
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
