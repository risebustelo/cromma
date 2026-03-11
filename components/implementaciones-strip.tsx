"use client"

import { useRef } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { ChevronLeft, ChevronRight, Lightbulb, PenTool, BarChart3, Zap, Package, LineChart, Megaphone, Users, Layers, Target } from "lucide-react"

// Colores del logo — rotan por card
const ACCENT_COLORS = ["#c9a227", "#1a7a7a", "#d45a8a", "#2a9e58"]

const cards = [
  { icon: Lightbulb, label: "Oferta", desc: "Definimos qué vendés, a quién y por qué te eligen." },
  { icon: PenTool, label: "Contenido", desc: "Publicaciones con intención comercial que generan consultas." },
  { icon: BarChart3, label: "Proceso Comercial", desc: "De la consulta al cierre, sin fricción ni improvisación." },
  { icon: Zap, label: "Automatizaciones", desc: "Flujos que trabajan mientras dormís." },
  { icon: Package, label: "Entrega", desc: "Sistema para servir con calidad y orden." },
  { icon: LineChart, label: "Métricas", desc: "Datos reales para decisiones reales." },
  { icon: Megaphone, label: "Atracción", desc: "Estrategia de visibilidad sin depender de ads." },
  { icon: Users, label: "Comunidad", desc: "Construcción de audiencia calificada." },
  { icon: Layers, label: "Funnels", desc: "Embudos de conversión optimizados por etapa." },
  { icon: Target, label: "Retención", desc: "Sistemas para revender y expandir cada cliente." },
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
      <div className="container mx-auto px-4 py-14 md:py-18">

        <ScrollReveal>
          <div className="text-center mb-10 space-y-3">
            {/* eyebrow */}
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#c9a227" }}>
              Lo que construimos
            </p>
            <h2 className="text-[#0a0a0a]">Implementaciones que construimos</h2>
            <p className="mx-auto max-w-xl" style={{ color: "#555555" }}>
              Cada pieza de tu negocio conectada con un propósito claro.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative">
          {/* CAMBIO: botones con colores del sistema en lugar de clases genéricas */}
          <button onClick={() => scroll("left")} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full transition-colors" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#ffffff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }} aria-label="Scroll izquierda">
            <ChevronLeft className="h-5 w-5" style={{ color: "#555555" }} />
          </button>
          <button onClick={() => scroll("right")} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full transition-colors" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#ffffff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }} aria-label="Scroll derecha">
            <ChevronRight className="h-5 w-5" style={{ color: "#555555" }} />
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollSnapType: "x mandatory" }}>
            {cards.map((card, i) => {
              const Icon = card.icon
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length]
              return (
                <div key={card.label} className="flex-shrink-0 w-[220px] md:w-[240px] rounded-xl p-5 card-lift" style={{
                  scrollSnapAlign: "start",
                  // CAMBIO: fondo blanco con borde de color del logo
                  background: "#ffffff",
                  border: `1px solid ${accent}28`,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}>
                  {/* CAMBIO: ícono con color del logo en lugar de text-primary */}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${accent}14`, border: `1px solid ${accent}28` }}>
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                  </div>
                  {/* CAMBIO: texto con colores del sistema */}
                  <span className="text-sm font-semibold block mb-1" style={{ color: "#0a0a0a" }}>{card.label}</span>
                  <span className="text-xs leading-snug" style={{ color: "#666666" }}>{card.desc}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category tags — CAMBIO: color del sistema */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10">
            {categories.map((cat) => (
              <span key={cat} className="text-xs font-medium tracking-widest" style={{ color: "#888888" }}>{cat}</span>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={100}>
          <div className="text-center mt-16">
            <CtaPrimary />
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}