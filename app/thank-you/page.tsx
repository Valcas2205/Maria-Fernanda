"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, Clock } from "lucide-react"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const initialStatus = searchParams.get("status") || "pending"
  const paymentId = searchParams.get("paymentId")
  
  const [status, setStatus] = useState(initialStatus)
  const [isPolling, setIsPolling] = useState(initialStatus === "verifying")

  useEffect(() => {
    if (!isPolling || !paymentId) return

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/${paymentId}/status`)
        if (res.ok) {
          const data = await res.json()
          if (data.status) {
            setStatus(data.status)
            if (data.status === "approved" || data.status === "pending" || data.status === "rejected") {
              setIsPolling(false)
            }
          }
        }
      } catch (e) {
        console.error("Polling error:", e)
      }
    }, 4000)

    // Detener polling después de 3 minutos como máximo (180s = 45 intentos) para no dejarlo infinito
    const timeout = setTimeout(() => {
      setIsPolling(false)
      if (status === "verifying") {
        setStatus("pending") // Fallback visual a pendiente
      }
    }, 180000)

    return () => {
      clearInterval(pollInterval)
      clearTimeout(timeout)
    }
  }, [isPolling, paymentId, status])

  const isApproved = status === "approved"
  const isVerifying = status === "verifying"

  return (
    <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-sm relative overflow-hidden">
      {isVerifying && (
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary/20">
          <div className="h-full bg-secondary animate-pulse w-full"></div>
        </div>
      )}
      
      <div className="flex justify-center mb-6">
        {isVerifying ? (
          <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center relative">
            <Loader2 className="h-10 w-10 text-secondary animate-spin" />
            <div className="absolute inset-0 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin" style={{ animationDuration: '3s' }}></div>
          </div>
        ) : isApproved ? (
          <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
        ) : (
          <div className="h-20 w-20 rounded-full bg-amber-50 flex items-center justify-center">
            <Clock className="h-12 w-12 text-amber-500" />
          </div>
        )}
      </div>

      <h1 className="mb-3 font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl">
        {isVerifying ? "Verificando..." : isApproved ? "¡Pago Confirmado!" : "¡Gracias!"}
      </h1>
      
      <p className="mb-8 text-[15px] leading-relaxed text-[#333333]">
        {isVerifying ? (
          <>
            Estamos validando tu pago en tiempo real con la entidad bancaria.<br/>
            <strong>Por favor, no cierres esta ventana.</strong>
          </>
        ) : isApproved ? (
          <>
            ¡Tu pago ha sido <strong>validado exitosamente</strong>! Te enviaremos un correo pronto con tus productos y próximos pasos.
          </>
        ) : (
          <>
            Recibimos tu reporte de pago y quedó <strong>pendiente de validación</strong>.
            Revisaremos el comprobante manualmente y te contactaremos.
          </>
        )}
      </p>

      {!isVerifying && (
        <Button asChild className="rounded-full px-8 py-6 text-base font-bold bg-secondary text-white hover:opacity-90">
          <Link href="/">Volver al inicio</Link>
        </Button>
      )}
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <Suspense fallback={<div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-sm"><Loader2 className="mx-auto h-8 w-8 animate-spin text-secondary" /></div>}>
        <ThankYouContent />
      </Suspense>
    </main>
  )
}
