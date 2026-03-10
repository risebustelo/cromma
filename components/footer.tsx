"use client"

import { Instagram, Linkedin } from "lucide-react"
import { AnimatedSocialIcons } from "@/components/ui/animated-social-icons"

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
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

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

          <div className="flex items-center gap-6 text-xs text-[#a0a0a0]">
            <a href="#" className="hover:text-[#cccccc] transition-colors duration-200">
              Política de privacidad
            </a>
            <span className="text-[#888888]">
              © {year} Cromma. Todos los derechos reservados.
            </span>
          </div>

        </div>
      </div>
    </footer>
  )
}