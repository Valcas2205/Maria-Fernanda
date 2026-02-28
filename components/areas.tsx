import Image from "next/image"

const areas = [
  {
    icon: "/images/icon-amor-propio.png",
    iconAlt: "Icono amor propio",
    title: "Amor Propio",
    blobColor: "bg-secondary/10",
    items: [
      "Autoestima y autoconcepto",
      "Evaluacion psicometrica",
      "Informes psicologicos",
    ],
  },
  {
    icon: "/images/icon-relaciones.png",
    iconAlt: "Icono relaciones",
    title: "Relaciones",
    blobColor: "bg-accent/10",
    items: [
      "Terapia de parejas",
      "Duelos y perdidas",
      "Vinculos interpersonales",
    ],
  },
  {
    icon: "/images/icon-espiritualidad.png",
    iconAlt: "Icono espiritualidad",
    title: "Espiritualidad y Salud",
    blobColor: "bg-primary/10",
    items: [
      "Ansiedad y depresion",
      "Proposito de vida",
      "Trastornos de conducta alimentaria",
    ],
  },
]

export function Areas() {
  return (
    <section id="areas" className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-light tracking-tight text-[#1a1a1a] md:text-4xl lg:text-5xl text-balance">
            Areas de Trabajo
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.title}
              className="group relative overflow-hidden rounded-3xl bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Background blob */}
              <div
                className={`pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full ${area.blobColor} blur-2xl transition-transform group-hover:scale-125`}
              />

              <div className="relative z-10">
                <div className="mb-5 flex h-16 w-16 items-center justify-center">
                  <Image
                    src={area.icon}
                    alt={area.iconAlt}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </div>

                <h3 className="mb-3 font-serif text-xl font-medium text-card-foreground">
                  {area.title}
                </h3>

                <ul className="flex flex-col gap-2.5">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
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
