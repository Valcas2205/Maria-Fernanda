"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount, openCart } = useCart()

  const navLinks: { label: string; href: string; external?: boolean }[] = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Sobre mí", href: "/#sobre-mi" },
    { label: "Áreas de trabajo", href: "/#areas" },
    { label: "Agendar cita", href: "/#agendar" },
    { label: "Tienda", href: "/tienda" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link 
          href="/#inicio" 
          className="flex-shrink-0"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/#inicio");
              setMobileOpen(false);
            }
          }}
        >
          <Image
            src="/images/brand-logo.png"
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
              onClick={(e) => {
                if (link.href.startsWith("/#") && window.location.pathname === "/") {
                  e.preventDefault();
                  const id = link.href.replace("/#", "");
                  if (id === "inicio") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }
                  window.history.pushState(null, "", link.href);
                }
              }}
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

          {/* Cart icon */}
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-colors hover:bg-secondary/20"
            aria-label="Ver carrito"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile: cart + toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={openCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary"
            aria-label="Ver carrito"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#1a1a1a]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="flex flex-col gap-4 border-t border-border/50 bg-background px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={(e) => {
                setMobileOpen(false);
                if (link.href.startsWith("/#") && window.location.pathname === "/") {
                  e.preventDefault();
                  const id = link.href.replace("/#", "");
                  if (id === "inicio") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }
                  window.history.pushState(null, "", link.href);
                }
              }}
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
