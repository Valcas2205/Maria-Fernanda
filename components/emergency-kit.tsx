"use client"

import { useState } from "react"
import { Download } from "lucide-react"

export function EmergencyKit() {
  const [email, setEmail] = useState("")

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="overflow-hidden rounded-3xl bg-card p-8 shadow-lg md:p-10">
          <div className="relative z-10 text-center">
            <span className="mb-4 inline-block rounded-full bg-secondary/15 px-4 py-1.5 text-sm font-medium text-[#c27868]">
              Recurso gratuito
            </span>
            <h2 className="mb-3 font-serif text-2xl font-light tracking-tight text-card-foreground md:text-3xl text-balance">
              Botiquin de Emergencia Emocional
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              Descarga tu guia gratuita de gestion de crisis. Herramientas practicas para momentos dificiles.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="flex flex-col items-center gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electronico"
                className="flex-1 w-full rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
                required
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Descargar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
