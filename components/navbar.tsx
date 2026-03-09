"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Casos", href: "#casos" },
  { label: "FAQ", href: "#preguntas-frecuentes" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return

    e.preventDefault()
    const id = href.replace("#", "")
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  return (
    <nav className="w-full border-b border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="nav-logo group shrink-0"
            aria-label="Ir al inicio"
          >
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

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block shrink-0">
            <CtaPrimary
              label="Agendá una sesión"
              className="text-sm h-9 px-5 rounded-lg"
            />
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <CtaPrimary
              label="Agenda"
              className="text-xs h-8 px-4 rounded-lg"
            />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] bg-[#0a0a0a] border-white/10"
              >
                <div className="mt-10 flex flex-col gap-6">
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="rounded-lg px-3 py-2.5 text-base text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <div className="border-t border-white/10" />

                  <CtaPrimary label="Agenda una sesion" className="w-full" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}