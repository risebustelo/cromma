"use client"

import { useRef } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react"

// ─── WCAG AA sobre section-dark bg #0a0a0a ───────────────────────────────────
// ✅ pasan:  #ffffff 19.80 | #cccccc 12.33 | #888888 5.58 | eyebrow oklch(0.75) 7.17
// ❌ corregido: role #666666 → 3.45 ❌ → #797979 → 4.55 ✅

const testimonios = [
  {
    quote: "En 60 días pasamos de depender del boca a boca a tener un sistema que genera consultas todas las semanas. El cambio fue estructural.",
    name: "Mariana L.", role: "Consultora de RRHH",
  },
  {
    quote: "Tenía contenido, tenía audiencia, pero no tenía sistema. Cromma me ayudó a conectar todo y hoy facturo el doble con la mitad del esfuerzo.",
    name: "Tomás R.", role: "Creador digital",
  },
  {
    quote: "No es una agencia que te manda tareas. Entran a tu negocio, lo entienden y te arman un flujo que realmente convierte.",
    name: "Lucía S.", role: "Fundadora, estudio de diseño",
  },
  {
    quote: "Pensé que necesitaba más seguidores. En realidad necesitaba un proceso comercial. Hoy cierro 3 de cada 10 consultas.",
    name: "Federico M.", role: "Coach ejecutivo",
  },
  {
    quote: "El sistema de entrega que armamos me permitió tomar más clientes sin perder calidad. Antes era imposible.",
    name: "Valentina G.", role: "Mentora de negocios",
  },
  {
    quote: "Lo que más valoré es la claridad. En dos semanas sabía exactamente qué vendía, a quién y cómo.",
    name: "Nicolás P.", role: "Consultor financiero",
  },
  {
    quote: "Es estrategia aplicada a tu negocio real, nada de plantillas genéricas. Cada pieza está pensada para tu caso.",
    name: "Carolina D.", role: "Creadora de infoproductos",
  },
]

export function Casos() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" })
  }

  return (
    <section id="casos" className="section-dark relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-28">

        <ScrollReveal>
          <div className="text-center mb-12 space-y-3">
            {/* oklch(0.75 0.12 95) ≈ 7.17:1 ✅ sin cambio */}
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[oklch(0.75_0.12_95)]">
              Resultados reales
            </p>
            {/* white → 19.80 ✅ */}
            <h2 className="text-white">Lo que dicen nuestros clientes</h2>
            {/* #888888 → 5.58 ✅ */}
            <p className="mx-auto max-w-xl text-[#888888]">
              Negocios reales que dejaron de improvisar.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonios.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] md:w-[340px] flex flex-col justify-between rounded-xl border border-white/8 bg-white/[0.04] p-7 card-lift"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="text-primary text-4xl font-serif leading-none mb-3 select-none">&ldquo;</div>
                {/* #cccccc → 12.33 ✅ */}
                <blockquote className="text-[#cccccc] text-sm md:text-base leading-relaxed mb-8 flex-1">
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      {/* white → 19.80 ✅ */}
                      <span className="text-sm font-semibold text-white">{t.name}</span>
                      <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {/* era #666666 → 3.45 ❌ | corregido #797979 → 4.55 ✅ */}
                    <span className="text-xs" style={{ color: "#797979" }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ScrollReveal delay={80}>
          <div className="text-center mt-12">
            <CtaPrimary label="Agendá una sesión" />
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}