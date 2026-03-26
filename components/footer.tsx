"use client"

import { Instagram, Linkedin } from "lucide-react"
import { AnimatedSocialIcons } from "@/components/ui/animated-social-icons"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"

export function Footer() {
  const year = new Date().getFullYear()

  const socialIcons = [
    {
      Icon: Instagram,
      href: "https://instagram.com/cromma.uno",
    },
    {
      Icon: Linkedin,
      href: "https://linkedin.com/company/unocromma",
    },
  ]

  return (
    <footer className="section-dark relative overflow-hidden">

      {/* Top border accent */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)` }}
      />

      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <a href="/" className="nav-logo group shrink-0" aria-label="Ir al inicio">
            <span className="logo-gem" aria-hidden="true">
              <span className="logo-gem-layer logo-gem-glow">
                <span />
                <span />
                <span />
                <span />
              </span>
              <span className="logo-gem-layer logo-gem-grid">
                <span />
                <span />
                <span />
                <span />
              </span>
            </span>
            <span className="nav-logo-text">CROMMA</span>
          </a>

          {/* Social Icons */}
          <AnimatedSocialIcons icons={socialIcons} iconSize={18} />

          {/* Links and Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a
              href="#"
              className="text-sm transition-colors duration-200"
              style={{ color: "#888888" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#888888"}
            >
              Política de privacidad
            </a>
            <span className="text-sm" style={{ color: "#666666" }}>
              {year} Cromma™. Todos los derechos reservados.
            </span>
          </div>

        </div>
      </div>
    </footer>
  )
}
