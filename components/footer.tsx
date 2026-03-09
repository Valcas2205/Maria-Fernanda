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
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.34 3.29-1.107 1.3-2.702 1.986-4.621 1.986h-.063c-1.349-.009-2.46-.438-3.299-1.276-.896-.896-1.378-2.175-1.345-3.575.06-2.564 2.077-4.37 4.702-4.37 1.025 0 1.907.227 2.649.682-.03-.86-.207-1.59-.557-2.184-.52-.884-1.391-1.371-2.613-1.371h-.076c-1.033.014-1.87.372-2.49 1.065l-1.506-1.37c.973-1.088 2.276-1.664 3.87-1.712h.136c1.985.024 3.49.793 4.378 2.234.57.925.907 2.107.982 3.475 1.017.534 1.833 1.235 2.448 2.103.864 1.218 1.206 2.688 1.017 4.381-.272 2.445-1.422 4.382-3.42 5.758C17.122 23.442 14.833 24 12.186 24zm.053-13.126c-1.576 0-2.597 1.02-2.634 2.634-.017.739.174 1.346.567 1.738.385.385.916.58 1.58.585h.043c2.065 0 3.27-1.28 3.451-3.681-.616-.796-1.636-1.276-2.945-1.276h-.062z" />
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
  { label: "Política de Privacidad", href: "/politica-de-privacidad" },
  { label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
  { label: "Aviso Legal", href: "/aviso-legal" },
]

export function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Top row: 3 columns aligned */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-center">
          {/* Left: Logo + tagline */}
          <div className="flex flex-col items-start gap-3">
            <Image
              src="/images/logo.png"
              alt="Todo es un balance"
              width={180}
              height={36}
              className="h-8 w-auto"
            />
            <p className="font-serif text-base italic text-[#1a1a1a]/80">
              Psicologia clinica con enfoque practico y empatico
            </p>
          </div>

          {/* Center: Seal + Social icons stacked */}
          <div className="flex flex-col items-center gap-5">
            <Image
              src="/images/sello.png"
              alt="Todo es un balance - Psic. Maria Fernanda Azcunes"
              width={100}
              height={100}
              className="h-20 w-20"
            />
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary transition-colors hover:bg-secondary/40"
                >
                  <social.icon className="h-4.5 w-4.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Legal links */}
          <div className="flex flex-col items-start gap-4 md:items-end">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-serif text-lg font-medium text-primary transition-colors hover:text-secondary lg:text-xl"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-10 border-t border-border/40 pt-6">
          <p className="text-center text-base text-[#1a1a1a]/60">
            {"© 2026 Todo es un Balance · Maria Fernanda Azcunes. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
