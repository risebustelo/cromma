"use client"

import { useRef, useEffect, useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"
const EMERALD = "#2eaf5a"
const TEAL = "#1a6b6b"
const CORAL = "#f07baa"
const ACCENT_COLORS = [GOLD, TEAL, CORAL, EMERALD]

const testimonios = [
  { quote: "En 60 dias pasamos de depender del boca a boca a tener un sistema que genera consultas todas las semanas. El cambio fue estructural.", name: "Mariana L.", role: "Consultora de RRHH", result: "+340% consultas" },
  { quote: "Tenia contenido, tenia audiencia, pero no tenia sistema. Cromma me ayudo a conectar todo y hoy facturo el doble con la mitad del esfuerzo.", name: "Tomas R.", role: "Creador digital", result: "2x facturacion" },
  { quote: "No es una agencia que te manda tareas. Entran a tu negocio, lo entienden y te arman un flujo que realmente convierte.", name: "Lucia S.", role: "Fundadora, estudio de diseno", result: "Sistema completo" },
  { quote: "Pense que necesitaba mas seguidores. En realidad necesitaba un proceso comercial. Hoy cierro 3 de cada 10 consultas.", name: "Federico M.", role: "Coach ejecutivo", result: "30% tasa cierre" },
  { quote: "El sistema de entrega que armamos me permitio tomar mas clientes sin perder calidad. Antes era imposible.", name: "Valentina G.", role: "Mentora de negocios", result: "+50% clientes" },
  { quote: "Lo que mas valore es la claridad. En dos semanas sabia exactamente que vendia, a quien y como.", name: "Nicolas P.", role: "Consultor financiero", result: "Oferta clara" },
  { quote: "Es estrategia aplicada a tu negocio real, nada de plantillas genericas. Cada pieza esta pensada para tu caso.", name: "Carolina D.", role: "Creadora de infoproductos", result: "Personalizado" },
]

export function Casos() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === "left" ? -380 : 380, behavior: "smooth" })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / 380)
      setActiveIndex(Math.min(idx, testimonios.length - 1))
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section id="casos" className="section-dark relative overflow-hidden">

      <style>{`
        @keyframes casosGlowA {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(4%, -6%) scale(1.1); }
        }
        @keyframes casosGlowB {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-5%, 5%) scale(1.08); }
        }
        .testimonio-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .testimonio-card:hover {
          transform: translateY(-4px);
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonio-card { transition: none; }
          .testimonio-card:hover { transform: none; }
        }
      `}</style>

      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: "absolute", width: "50vw", height: "50vw",
          maxWidth: 600, maxHeight: 600, borderRadius: "50%",
          top: "-15%", left: "-10%",
          background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "casosGlowA 22s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", width: "40vw", height: "40vw",
          maxWidth: 500, maxHeight: 500, borderRadius: "50%",
          bottom: "-10%", right: "-5%",
          background: "radial-gradient(circle, rgba(26,107,107,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "casosGlowB 28s ease-in-out infinite alternate",
        }} />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">

        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              Resultados reales
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl">Lo que dicen nuestros clientes</h2>
            <p className="mx-auto max-w-xl text-base md:text-lg" style={{ color: "#888888" }}>
              Negocios reales que dejaron de improvisar y construyeron sistemas predecibles.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll("left")} 
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full transition-all duration-200"
            style={{ 
              border: "1px solid rgba(255,255,255,0.10)", 
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"
            }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button 
            onClick={() => scroll("right")} 
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full transition-all duration-200"
            style={{ 
              border: "1px solid rgba(255,255,255,0.10)", 
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"
            }}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          {/* Cards Container */}
          <div 
            ref={scrollRef} 
            className="flex gap-6 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0" 
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonios.map((t, i) => {
              const accentColor = ACCENT_COLORS[i % ACCENT_COLORS.length]
              return (
                <div 
                  key={i} 
                  className="testimonio-card flex-shrink-0 w-[320px] md:w-[360px] flex flex-col justify-between rounded-2xl p-8" 
                  style={{
                    scrollSnapAlign: "start",
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accentColor}40`
                    e.currentTarget.style.boxShadow = `0 8px 32px ${accentColor}10`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="h-8 w-8" style={{ color: accentColor, opacity: 0.6 }} />
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-base leading-relaxed mb-8 flex-1" style={{ color: "#cccccc" }}>
                    {t.quote}
                  </blockquote>
                  
                  {/* Result Badge */}
                  <div className="mb-6">
                    <span 
                      className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ 
                        background: `${accentColor}15`, 
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                      }}
                    >
                      {t.result}
                    </span>
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div 
                      className="flex h-11 w-11 items-center justify-center rounded-full font-bold text-sm flex-shrink-0" 
                      style={{ 
                        background: `${accentColor}20`, 
                        color: accentColor, 
                        border: `1px solid ${accentColor}40` 
                      }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{t.name}</span>
                        <BadgeCheck className="h-4 w-4" style={{ color: accentColor }} />
                      </div>
                      <span className="text-xs" style={{ color: "#666666" }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonios.map((_, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (!scrollRef.current) return
                  scrollRef.current.scrollTo({ left: i * 380, behavior: "smooth" })
                  setActiveIndex(i)
                }} 
                className="transition-all duration-300"
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 99,
                  background: i === activeIndex ? GOLD : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }} 
                aria-label={`Ir al testimonio ${i + 1}`} 
              />
            ))}
          </div>
        </div>

        <ScrollReveal delay={100}>
          <div className="text-center mt-16">
            <CtaPrimary label="Agenda una sesion" />
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
