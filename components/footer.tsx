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
    <svg viewBox="0 0 192 192" fill="currentColor" className={className}>
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.745C82.2364 44.745 70.1369 51.3409 63.137 63.5409L75.5619 71.505C80.5619 63.3034 88.897 60.0409 97.222 60.0409C97.284 60.0409 97.3466 60.0409 97.4086 60.0416C108.025 60.1109 115.856 64.2969 120.637 72.3409C124.062 78.2476 125.401 85.4276 124.629 93.7096C118.033 92.3746 110.864 91.6676 103.222 91.6076C103.093 91.6069 102.964 91.6069 102.835 91.6076C83.4619 91.6076 70.5536 100.972 69.7536 115.345C69.3436 122.775 72.2369 129.712 77.8619 134.779C82.7836 139.201 89.2369 141.505 96.0619 141.545C96.1686 141.546 96.2753 141.546 96.382 141.545C107.102 141.545 115.529 137.399 121.37 129.234C125.645 123.301 128.258 115.629 129.326 106.005C134.042 108.671 137.658 112.247 139.856 116.661C143.564 124.125 143.667 136.505 133.837 146.335C125.137 155.035 114.827 159.005 97.222 159.145C77.7536 158.985 63.1286 153.145 53.422 141.545C44.2819 130.633 39.4936 115.113 39.3219 95.8996C39.4936 76.6856 44.2819 61.1669 53.422 50.2536C63.1286 38.6536 77.7536 32.8143 97.222 32.6543C116.825 32.8143 131.625 38.7003 141.522 50.3836C146.359 56.0936 150.024 63.0669 152.464 71.1136L166.639 67.4096C163.704 57.5496 159.178 49.1003 153.035 42.1503C140.555 27.7383 122.497 20.2849 97.262 20.1049H97.182C72.082 20.2849 54.177 27.7843 41.782 42.2803C30.6219 55.5636 24.8419 73.7376 24.6486 95.8596L24.647 96.0003L24.6486 96.141C24.8419 118.262 30.6219 136.436 41.782 149.72C54.177 164.215 72.082 171.715 97.182 171.895H97.262C118.282 171.731 131.397 166.531 142.597 155.331C157.597 140.331 157.357 121.401 151.637 110.121C147.647 102.261 140.617 96.0869 130.887 91.7769C130.627 90.7989 130.347 89.8346 130.047 88.8869L141.537 88.9883ZM96.282 127.005C96.2087 127.005 96.1354 127.006 96.062 127.005C88.1703 126.965 83.4703 123.005 83.7203 115.965C83.9586 109.189 90.222 105.005 102.835 105.005C102.94 105.005 103.046 105.005 103.152 105.006C109.622 105.059 115.572 105.812 120.882 107.227C119.477 122.247 111.437 127.005 96.282 127.005Z" />
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
          {/* Left: Seal + tagline */}
          <div className="flex flex-col items-start gap-3">
            <Image
              src="/images/sello.png"
              alt="Todo es un balance - Psic. Maria Fernanda Azcunes"
              width={120}
              height={120}
              className="h-24 w-24"
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
                className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/20 text-secondary transition-colors hover:bg-secondary/40"
              >
                <social.icon className="h-5 w-5" />
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

        {/* Divider + copyright */}
        <div className="mt-10 border-t border-border/40 pt-6">
          <p className="text-center text-sm text-foreground/40">
            {"© 2026 Todo es un Balance · Maria Fernanda Azcunes. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
