"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown, MessageCircle } from "lucide-react"

export function CtaPrimary({
  label = "Empezá ahora",
  href = "#agenda",
  className,
}: {
  label?: string
  href?: string
  className?: string
}) {
  return (
    <Button asChild size="lg" variant="cta" className={`group ${className ?? ""}`}>
      <a href={href} className="inline-flex items-center">
        {label}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </Button>
  )
}

export function CtaSecondary({
  label = "Conocer más",
  href = "#como-funciona",
  className,
}: {
  label?: string
  href?: string
  className?: string
}) {
  return (
    <Button asChild size="lg" variant="cta-outline" className={`text-white/70 hover:text-white ${className ?? ""}`}>
      <a href={href} className="inline-flex items-center">
        {label}
        <ArrowDown className="ml-2 h-4 w-4" />
      </a>
    </Button>
  )
}

export function WhatsAppButton({
  href,
  label = "Escribinos por WhatsApp",
}: {
  href: string
  label?: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-wa inline-flex items-center gap-2 overflow-hidden text-xs font-bold text-white no-underline select-none hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" style={{ height: "2rem", padding: "0 0.75rem", borderRadius: "0.5rem" }}>
      <MessageCircle className="relative z-10 h-4 w-4 flex-shrink-0" />
      <span className="relative z-10">{label}</span>
    </a>
  )
}