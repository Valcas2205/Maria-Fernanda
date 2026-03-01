import Image from "next/image"

const areas = [
  {
    icon: "/images/Amor.propio.png",
    iconAlt: "Icono amor propio",
    title: "Amor Propio",
    blobColor: "bg-[#8fb299]/20",
    items: [
      "Autoestima y autoconcepto",
      "Evaluacion psicometrica",
      "Informes psicologicos",
    ],
  },
  {
    icon: "/images/Relaciones.png",
    iconAlt: "Icono relaciones",
    title: "Relaciones",
    blobColor: "bg-[#e5a697]/20",
    items: [
      "Terapia de parejas",
      "Duelos y perdidas",
      "Vinculos interpersonales",
    ],
  },
  {
    icon: "/images/Espiritualidad.png",
    iconAlt: "Icono espiritualidad",
    title: "Espiritualidad y Salud",
    blobColor: "bg-[#7db1c3]/20",
    items: [
      "Ansiedad and depresion",
      "Proposito de vida",
      "Trastornos de conducta alimentaria",
    ],
  },
]

export function Areas() {
  return (
    <section id="areas" className="relative overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-[#1a1a1a] md:text-4xl lg:text-5xl text-balance">
            ¿Te sientes identificado?
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.title}
              className="group relative overflow-hidden rounded-3xl bg-card p-8 md:p-10 shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Background blob */}
              <div
                className={`pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full ${area.blobColor} blur-2xl transition-transform group-hover:scale-125`}
              />

              <div className="relative z-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center">
                  <Image
                    src={area.icon}
                    alt={area.iconAlt}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />
                </div>

                <h3 className="mb-4 font-serif text-2xl font-semibold text-card-foreground md:text-3xl">
                  {area.title}
                </h3>

                <ul className="flex flex-col gap-3">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-lg leading-relaxed text-[#333333]"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
