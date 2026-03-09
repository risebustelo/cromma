"use client"

import { useRef } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { ChevronLeft, ChevronRight, Lightbulb, PenTool, BarChart3, Zap, Package, LineChart, Megaphone, Users, Layers, Target } from "lucide-react"

const cards = [
  { icon: Lightbulb, label: "Oferta", desc: "Definimos qu\u00e9 vend\u00e9s, a qui\u00e9n y por qu\u00e9 te eligen." },
  { icon: PenTool, label: "Contenido", desc: "Publicaciones con intenci\u00f3n comercial que generan consultas." },
  { icon: BarChart3, label: "Proceso Comercial", desc: "De la consulta al cierre, sin fricci\u00f3n ni improvisaci\u00f3n." },
  { icon: Zap, label: "Automatizaciones", desc: "Flujos que trabajan mientras dorm\u00eds." },
  { icon: Package, label: "Entrega", desc: "Sistema para servir con calidad y orden." },
  { icon: LineChart, label: "M\u00e9tricas", desc: "Datos reales para decisiones reales." },
  { icon: Megaphone, label: "Atracci\u00f3n", desc: "Estrategia de visibilidad sin depender de ads." },
  { icon: Users, label: "Comunidad", desc: "Construcci\u00f3n de audiencia calificada." },
  { icon: Layers, label: "Funnels", desc: "Embudos de conversi\u00f3n optimizados por etapa." },
  { icon: Target, label: "Retenci\u00f3n", desc: "Sistemas para revender y expandir cada cliente." },
]

const categories = ["CREADORES", "CONSULTORAS", "AGENCIAS", "SERVICIOS PROFESIONALES", "INFOPRODUCTOS"]

export function ImplementacionesStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = 300
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section className="section-light relative overflow-hidden">
      <div className="container mx-auto px-4 py-14 md:py-18">
        <ScrollReveal>
          <div className="text-center mb-10 space-y-3">
            <h2>Implementaciones que construimos</h2>
            <p className="mx-auto max-w-xl">
              {"Cada pieza de tu negocio conectada con un prop\u00f3sito claro."}
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel with nav buttons */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-muted transition-colors"
            aria-label="Scroll izquierda"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-muted transition-colors"
            aria-label="Scroll derecha"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.label}
                  className="flex-shrink-0 w-[220px] md:w-[240px] rounded-xl border border-border/50 bg-card/80 p-5 card-lift"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground block mb-1">{card.label}</span>
                  <span className="text-xs text-muted-foreground leading-snug">{card.desc}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category tags */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10">
            {categories.map((cat) => (
              <span key={cat} className="text-xs font-medium tracking-widest text-muted-foreground">{cat}</span>
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
