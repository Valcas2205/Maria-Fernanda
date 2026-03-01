"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const areas = [
  {
    icon: "/images/brand-figure.png",
    iconAlt: "Icono amor propio",
    title: "Amor Propio",
    blobColor: "bg-[#8fb299]/20",
    iconBg: "bg-white",
    items: [
      "Autoestima y autoconcepto",
      "Evaluación psicométrica",
      "Informes psicológicos",
    ],
  },
  {
    icon: "/images/brand-ellipses.png",
    iconAlt: "Icono terapia de pareja",
    title: "Terapia de Pareja",
    blobColor: "bg-[#e5a697]/20",
    iconBg: "bg-white",
    items: [
      "Vínculos interpersonales",
      "Resolución de conflictos",
      "Duelos y pérdidas",
    ],
  },
  {
    icon: "/ISOTIPO-98.png",
    iconAlt: "Icono espiritualidad",
    title: "Espiritualidad",
    blobColor: "bg-[#7db1c3]/20",
    iconBg: "bg-[#7db1c3]/40", // Contrast for white icon
    items: [
      "Propósito de vida",
      "Crecimiento personal",
      "Manejo de emociones",
    ],
  },
  {
    icon: "/images/brand-balance.png",
    iconAlt: "Icono Ansiedad y Depresión",
    title: "Ansiedad y Depresión",
    blobColor: "bg-[#f3a683]/20",
    iconBg: "bg-white",
    items: [
      "Control de ansiedad",
      "Estado de ánimo",
      "Técnicas de regulación",
    ],
  },
  {
    icon: "/images/brand-ellipses.png",
    iconAlt: "Icono Conducta Alimentaria",
    title: "Conducta Alimentaria",
    blobColor: "bg-[#cfa87b]/20",
    iconBg: "bg-white",
    items: [
      "Trastornos de la conducta alimentaria",
      "Relación con la comida",
      "Imagen corporal",
    ],
  },
]

export function Areas() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    dragFree: true,
  })

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <section id="areas" className="relative overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 text-center md:mb-12">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-[#4a5d4e] md:text-4xl lg:text-5xl">
            Áreas de trabajo
          </h2>
        </div>

        <div className="relative group/arrows">
          {/* Navigation Arrows */}
          <button
            className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/10 bg-white/90 text-secondary/70 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-secondary hover:shadow-md disabled:opacity-20 md:-left-6 lg:-left-12"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/10 bg-white/90 text-secondary/70 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-secondary hover:shadow-md disabled:opacity-20 md:-right-6 lg:-right-12"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {areas.map((area, index) => (
                <div
                  key={index}
                  className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="group relative h-full overflow-hidden rounded-3xl bg-white/60 p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
                    {/* Background blob */}
                    <div
                      className={cn(
                        "pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-2xl transition-transform group-hover:scale-125",
                        area.blobColor
                      )}
                    />

                    <div className="relative z-10 flex h-full flex-col items-center text-center md:items-start md:text-left">
                      <div className={cn(
                        "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl p-3 shadow-sm group-hover:scale-110 transition-transform duration-300",
                        area.iconBg
                      )}>
                        <Image
                          src={area.icon}
                          alt={area.iconAlt}
                          width={64}
                          height={64}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <h3 className="mb-2 font-serif text-xl font-bold text-[#4a5d4e] md:text-2xl">
                        {area.title}
                      </h3>

                      <ul className="mt-0 flex flex-col gap-2 items-start w-fit mx-auto md:mx-0">
                        {area.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-base leading-relaxed text-[#5a6b5e]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8fb299]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "w-8 bg-[#8fb299]"
                  : "w-2 bg-[#8fb299]/30 hover:bg-[#8fb299]/50"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
