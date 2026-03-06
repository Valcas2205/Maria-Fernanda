"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks: { label: string; href: string; external?: boolean }[] = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Sobre mi", href: "/#sobre-mi" },
    { label: "Areas de trabajo", href: "/#areas" },
    { label: "Agendar cita", href: "/#agendar" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/#inicio" className="flex-shrink-0">
          <Image
            src="/images/Logomarron.png"
            alt="Todo es un balance"
            width={220}
            height={44}
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-base font-semibold text-[#1a1a1a]/90 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={WS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-secondary px-6 py-2.5 text-base font-bold text-[#ffffff] transition-opacity hover:opacity-90"
          >
            {"Te esperamos!"}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#1a1a1a]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="flex flex-col gap-4 border-t border-border/50 bg-background px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-bold text-[#1a1a1a] transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={WS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-full bg-secondary px-5 py-3 text-center text-base font-bold text-[#ffffff] transition-opacity hover:opacity-90"
          >
            {"Te esperamos!"}
          </Link>
        </nav>
      )}
    </header>
  )
}
