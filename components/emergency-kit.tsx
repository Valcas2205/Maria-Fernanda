"use client"

import { useState } from "react"
import { Download, Heart, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export function EmergencyKit() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Error al registrar el correo")
      }

      // Trigger download
      const link = document.createElement("a")
      link.href = "/BOTIQUÍN EMOCIONAL.pdf"
      link.download = "BOTIQUÍN EMOCIONAL.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsSuccess(true)
      toast.success("¡Registro exitoso! Tu descarga ha comenzado.")
      setEmail("")
    } catch (error) {
      console.error(error)
      toast.error("Hubo un problema al registrar tu correo. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#FCF7F4] p-8 shadow-sm md:p-12">
          <div className="relative z-10 flex flex-col items-center text-center">
            
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAEBE6]">
              <Heart className="h-7 w-7 text-[#DF9A8F]" strokeWidth={1.5} />
            </div>

            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-[#1a202c] md:text-3xl lg:text-4xl leading-[1.15]">
              Botiquín de <br className="hidden sm:block" />
              Emergencia Emocional
            </h2>
            
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-[#4a5568] sm:text-[15px]">
              Descarga tu guía gratuita con herramientas prácticas para gestionar momentos de crisis emocional
            </p>

            {isSuccess ? (
              <div className="flex flex-col items-center gap-2 text-[#DF9A8F]">
                <CheckCircle2 className="h-10 w-10" />
                <p className="font-medium text-lg">¡Gracias! El archivo se está descargando.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-sm underline text-[#4a5568]"
                >
                  Descargar de nuevo
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-xl flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full sm:w-[320px] rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm text-[#475569] placeholder:text-gray-400 shadow-sm focus:border-[#DF9A8F] focus:outline-none focus:ring-1 focus:ring-[#DF9A8F]"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#DF9A8F] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d68b7b] w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 text-white" />
                  )}
                  {isLoading ? "Procesando..." : "Descargar"}
                </button>
              </form>
            )}

            <p className="mt-8 text-xs text-[#94a3b8]">
              Tu información está segura. No compartiremos tu correo con nadie.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

