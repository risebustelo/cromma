"use client"

import { useRef } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { ChevronLeft, ChevronRight, Lightbulb, PenTool, BarChart3, Zap, Package, LineChart, Megaphone, Users, Layers, Target } from "lucide-react"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"
const EMERALD = "#2eaf5a"
const TEAL = "#1a6b6b"
const CORAL = "#f07baa"
const ACCENT_COLORS = [GOLD, TEAL, CORAL, EMERALD]

const cards = [
  { icon: Lightbulb, label: "Oferta", desc: "Definimos que vendes, a quien y por que te eligen." },
  { icon: PenTool, label: "Contenido", desc: "Publicaciones con intencion comercial que generan consultas." },
  { icon: BarChart3, label: "Proceso Comercial", desc: "De la consulta al cierre, sin friccion ni improvisacion." },
  { icon: Zap, label: "Automatizaciones", desc: "Flujos que trabajan mientras dormis." },
  { icon: Package, label: "Entrega", desc: "Sistema para servir con calidad y orden." },
  { icon: LineChart, label: "Metricas", desc: "Datos reales para decisiones reales." },
  { icon: Megaphone, label: "Atraccion", desc: "Estrategia de visibilidad sin depender de ads." },
  { icon: Users, label: "Comunidad", desc: "Construccion de audiencia calificada." },
  { icon: Layers, label: "Funnels", desc: "Embudos de conversion optimizados por etapa." },
  { icon: Target, label: "Retencion", desc: "Sistemas para revender y expandir cada cliente." },
]

const categories = ["CREADORES", "CONSULTORAS", "AGENCIAS", "SERVICIOS PROFESIONALES", "INFOPRODUCTOS"]

export function ImplementacionesStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" })
  }

  return (
    <section className="section-light relative overflow-hidden">
      <div className="container mx-auto px-4 py-24 md:py-32">

        <ScrollReveal>
          <div className="text-center mb-14 md:mb-16 space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              Lo que construimos
            </p>
            <h2 className="text-[#0a0a0a] text-3xl md:text-4xl lg:text-5xl">Implementaciones que construimos</h2>
            <p className="mx-auto max-w-xl text-base md:text-lg" style={{ color: "#555555" }}>
              Cada pieza de tu negocio conectada con un proposito claro.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Navigation */}
          <button 
            onClick={() => scroll("left")} 
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full transition-all duration-200" 
            style={{ 
              border: "1px solid rgba(0,0,0,0.08)", 
              background: "#ffffff", 
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)" 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"
            }}
            aria-label="Scroll izquierda"
          >
            <ChevronLeft className="h-5 w-5" style={{ color: "#444444" }} />
          </button>
          <button 
            onClick={() => scroll("right")} 
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full transition-all duration-200" 
            style={{ 
              border: "1px solid rgba(0,0,0,0.08)", 
              background: "#ffffff", 
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)" 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"
            }}
            aria-label="Scroll derecha"
          >
            <ChevronRight className="h-5 w-5" style={{ color: "#444444" }} />
          </button>

          <div 
            ref={scrollRef} 
            className="flex gap-5 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0" 
            style={{ scrollSnapType: "x mandatory" }}
          >
            {cards.map((card, i) => {
              const Icon = card.icon
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length]
              return (
                <div 
                  key={card.label} 
                  className="flex-shrink-0 w-[240px] md:w-[260px] rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px]" 
                  style={{
                    scrollSnapAlign: "start",
                    background: "#ffffff",
                    border: `1px solid ${accent}20`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}45`
                    e.currentTarget.style.boxShadow = `0 8px 24px ${accent}12`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${accent}20`
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"
                  }}
                >
                  {/* Icon */}
                  <div 
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" 
                    style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  
                  {/* Content */}
                  <span className="text-base font-bold block mb-2" style={{ color: "#0a0a0a" }}>{card.label}</span>
                  <span className="text-sm leading-relaxed" style={{ color: "#666666" }}>{card.desc}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category tags */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 md:mt-14">
            {categories.map((cat, i) => (
              <span 
                key={cat} 
                className="text-xs font-semibold tracking-widest flex items-center gap-2" 
                style={{ color: "#888888" }}
              >
                {i > 0 && <span className="w-1 h-1 rounded-full" style={{ background: "#cccccc" }} />}
                {cat}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={140}>
          <div className="text-center mt-16 md:mt-20">
            <CtaPrimary className="h-14 px-10 text-base" />
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
