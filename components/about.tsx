import Image from "next/image"
import { GraduationCap, Award, BookOpen } from "lucide-react"

const credentials = [
  {
    icon: GraduationCap,
    title: "Licenciada en Psicologia",
    year: "2022",
  },
  {
    icon: Award,
    title: "Master en Psicologia Clinica y de la Salud",
    subtitle: "ISEP, Espana",
  },
  {
    icon: BookOpen,
    title: "Especializacion en Psicoterapia Cognitivo Conductual",
    subtitle: "",
  },
]

export function About() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:gap-14">
          {/* Image - left column */}
          <div className="relative w-full md:w-5/12 lg:w-[40%] flex-shrink-0">
            <div className="h-[400px] w-full overflow-hidden rounded-[2rem] md:h-full">
              <Image
                src="/images/hero-diplomas.jpg"
                alt="Maria Fernanda Azcunes con sus titulos profesionales"
                width={600}
                height={800}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Text + Credentials - right column */}
          <div className="flex flex-1 flex-col gap-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Psic. Maria Fernanda Azcunes
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lg leading-relaxed text-foreground/80">
                Todo comenzo en 2020, cuando este proyecto nacio como un blog psicoeducativo. Lo que inicio como una manera de compartir conocimiento se transformo en algo mucho mas profundo:{" "}
                <span className="font-serif italic text-accent">mi proposito de vida</span>.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                Hoy, <span className="font-serif italic text-primary">todo es un balance</span>{" "}
                es un espacio dedicado a ayudar a las personas a conocerse mejor, a mejorar la relacion consigo mismas y a encontrar ese equilibrio que todos buscamos.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                Creo profundamente en que la terapia es un acto de valentia, y me siento honrada cada vez que alguien me permite acompanarle en su proceso.
              </p>
            </div>

            {/* Credentials inline - compact, right after the text */}
            <div className="mt-2">
              <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
                Respaldo Profesional
              </h3>
              <div className="flex flex-col gap-3">
                {credentials.map((cred) => (
                  <div
                    key={cred.title}
                    className="flex items-center gap-4 rounded-xl bg-card/70 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-card/90"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 shadow-sm">
                      <cred.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-card-foreground leading-tight">
                        {cred.title}
                      </h4>
                      {cred.subtitle && (
                        <p className="text-xs text-muted-foreground">{cred.subtitle}</p>
                      )}
                      {cred.year && (
                        <p className="text-xs text-muted-foreground">{cred.year}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
