"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Verificar si ya aceptaron las cookies en localStorage
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      // Pequeño retraso para que no aparezca de golpe al cargar
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-8 md:left-auto md:right-8 md:p-0"
        >
          <div className="mx-auto max-w-sm rounded-2xl bg-card p-6 shadow-2xl ring-1 ring-border md:w-80">
            <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
              Uso de Cookies
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              Utilizamos cookies propias y de terceros para mejorar tu experiencia
              en nuestra web. Al continuar navegando, consideramos que aceptas su
              uso.{" "}
              <Link
                href="/politica-de-privacidad"
                className="font-medium text-primary hover:underline"
              >
                Política de Privacidad
              </Link>
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 rounded-full bg-primary py-2.5 text-center text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
              >
                Aceptar Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
