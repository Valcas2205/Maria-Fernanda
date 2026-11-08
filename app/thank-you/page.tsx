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
  const method = searchParams.get("method") || "pagomovil"

  const [status, setStatus] = useState(initialStatus)
  const [isPolling, setIsPolling] = useState(initialStatus === "verifying")
  const [timeLeft, setTimeLeft] = useState(90) // 90 segundos = 1:30 min

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

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPolling(false)
          if (status === "verifying") {
            setStatus("pending") // Fallback visual a pendiente
          }
          clearInterval(timerInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(pollInterval)
      clearInterval(timerInterval)
    }
  }, [isPolling, paymentId, status])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

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

            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-lg font-semibold text-secondary">
              <Clock className="h-4 w-4" />
              Tiempo restante: {formatTime(timeLeft)}
            </span>
          </>
        ) : isApproved ? (
          <>
            ¡Tu pago ha sido <strong>validado exitosamente</strong>! Te enviaremos un correo pronto con tus productos y próximos pasos.
          </>
        ) : (
          <>
            {method === "zelle" || method === "paypal" ? (
              <>
                Recibimos tu reporte de pago y ha quedado en estado de <strong>revisión</strong>. Nuestro equipo validará la transacción manualmente en breve.
                <br/><br/>
                Te enviaremos tu recibo por correo al confirmarlo.
              </>
            ) : (
              <>
                Estamos presentando demoras con el banco. Seguiremos verificando tu pago en segundo plano durante <strong>la próxima hora</strong>.
                <br/><br/>
                Si logramos validarlo, te enviaremos tu recibo por correo. De lo contrario, un administrador lo revisará manualmente.
              </>
            )}
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
