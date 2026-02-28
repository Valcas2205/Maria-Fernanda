import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.11v-3.49a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.27 8.27 0 0 0 4.76 1.5V6.77a4.83 4.83 0 0 1-1-.08z" />
    </svg>
  )
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.186 24h-.007C5.461 23.973.057 18.6.007 11.868-.043 5.321 5.144.007 11.693 0h.014c3.091.007 5.9 1.163 8.086 3.299a11.27 11.27 0 0 1 3.2 7.435c.157 3.017-.834 5.822-2.793 7.9-2.057 2.18-5.007 3.37-8.014 3.366zM11.7 2.253c-5.344.006-9.69 4.361-9.68 9.706.008 5.347 4.341 9.691 9.682 9.788h.007c2.424.004 4.76-.952 6.582-2.682 1.6-1.696 2.404-3.984 2.278-6.406-.098-1.88-.814-3.543-2.13-4.958-1.378-1.484-3.366-2.382-5.596-2.525-.165-.01-.33-.016-.495-.016-2.638 0-4.82 1.148-6.132 3.137l1.77 1.162c.96-1.454 2.56-2.246 4.362-2.246.12 0 .24.004.362.011 1.6.103 2.943.691 3.884 1.706.866.932 1.344 2.072 1.413 3.39.036.713-.036 1.38-.193 2.005-.628-.264-1.318-.462-2.07-.586-.46-.076-.933-.117-1.408-.117-3.263 0-5.588 1.898-5.688 4.644-.053 1.467.488 2.852 1.522 3.898 1.013 1.025 2.397 1.6 3.895 1.618h.025c1.848-.023 3.345-.753 4.45-2.166.81-1.038 1.303-2.38 1.475-4.013.725.374 1.273.888 1.59 1.503.57 1.109.615 2.93-.502 4.118-1.046 1.113-2.3 1.596-4.066 1.61h-.022c-1.987-.015-3.506-.687-4.516-2-.955-1.24-1.45-2.977-1.473-5.16l-2.251-.015c.028 2.637.662 4.78 1.886 6.37 1.38 1.795 3.444 2.72 6.132 2.753l.168.002h.063l.168-.002c2.198-.034 3.943-.72 5.338-2.1 1.608-1.592 1.743-4.28.873-5.971-.598-1.164-1.726-2.072-3.262-2.637.069-.466.098-.936.074-1.414zm-2.22 10.16c-.024.672-.293 1.277-.76 1.705-.474.433-1.115.668-1.837.668h-.014c-.736-.01-1.394-.29-1.852-.786-.449-.487-.676-1.134-.651-1.828.057-1.596 1.464-2.66 3.505-2.66.334 0 .668.03.995.088.56.098 1.083.254 1.56.467-.168 1.09-.468 1.879-.946 2.346z" />
    </svg>
  )
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/todoesunbalance/",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@todoesunbalance",
    icon: TikTokIcon,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@todoesunbalance",
    icon: ThreadsIcon,
  },
  {
    label: "Email",
    href: "mailto:contacto@todoesunbalance.com",
    icon: Mail,
  },
]

const legalLinks = [
  { label: "Politica de Privacidad", href: "#" },
  { label: "Terminos y Condiciones", href: "#" },
  { label: "Aviso Legal", href: "#" },
]

export function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Top row: logo + tagline | social icons | legal links */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left: Logo + tagline + seal */}
          <div className="flex flex-col gap-3">
            <Image
              src="/images/logo.png"
              alt="Todo es un balance"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
            <p className="font-serif text-sm italic text-foreground/60">
              Psicologia clinica con enfoque practico y empatico
            </p>
          </div>

          {/* Center: Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary transition-colors hover:bg-secondary/40"
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>

          {/* Right: Legal links */}
          <div className="flex flex-col items-start gap-2 md:items-end">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-foreground/50 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Seal image centered */}
        <div className="mt-8 flex justify-center">
          <Image
            src="/images/sello.png"
            alt="Sello Todo es un Balance - Psic. Maria Fernanda Azcunes"
            width={80}
            height={80}
            className="h-16 w-16 opacity-40"
          />
        </div>

        {/* Divider + copyright */}
        <div className="mt-6 border-t border-border/40 pt-6">
          <p className="text-center text-sm text-foreground/40">
            {"2026 Todo es un Balance \u00B7 Maria Fernanda Azcunes. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
