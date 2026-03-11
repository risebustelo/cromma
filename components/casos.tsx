"use client"

import { useRef, useEffect, useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react"

const testimonios = [
  { quote: "En 60 días pasamos de depender del boca a boca a tener un sistema que genera consultas todas las semanas. El cambio fue estructural.", name: "Mariana L.", role: "Consultora de RRHH" },
  { quote: "Tenía contenido, tenía audiencia, pero no tenía sistema. Cromma me ayudó a conectar todo y hoy facturo el doble con la mitad del esfuerzo.", name: "Tomás R.", role: "Creador digital" },
  { quote: "No es una agencia que te manda tareas. Entran a tu negocio, lo entienden y te arman un flujo que realmente convierte.", name: "Lucía S.", role: "Fundadora, estudio de diseño" },
  { quote: "Pensé que necesitaba más seguidores. En realidad necesitaba un proceso comercial. Hoy cierro 3 de cada 10 consultas.", name: "Federico M.", role: "Coach ejecutivo" },
  { quote: "El sistema de entrega que armamos me permitió tomar más clientes sin perder calidad. Antes era imposible.", name: "Valentina G.", role: "Mentora de negocios" },
  { quote: "Lo que más valoré es la claridad. En dos semanas sabía exactamente qué vendía, a quién y cómo.", name: "Nicolás P.", role: "Consultor financiero" },
  { quote: "Es estrategia aplicada a tu negocio real, nada de plantillas genéricas. Cada pieza está pensada para tu caso.", name: "Carolina D.", role: "Creadora de infoproductos" },
]

// Colores del logo para los avatares y acentos
const ACCENT_COLORS = ["#c9a227", "#1a7a7a", "#d45a8a", "#2a9e58"]

// Partículas flotantes
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    color: ACCENT_COLORS[i % ACCENT_COLORS.length],
  }))

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: p.color,
          opacity: 0.25,
          animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  )
}

export function Casos() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" })
  }

  // Detectar qué card está visible
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / 360)
      setActiveIndex(Math.min(idx, testimonios.length - 1))
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section id="casos" className="section-dark relative overflow-hidden">

      <style>{`
        @keyframes floatParticle {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.15; }
          50%  { opacity: 0.3; }
          100% { transform: translate(${Math.random() > 0.5 ? "" : "-"}${Math.floor(Math.random() * 30 + 10)}px, -${Math.floor(Math.random() * 40 + 20)}px) scale(1.3); opacity: 0.1; }
        }
        @keyframes casosGlowA {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(4%, -6%) scale(1.1); }
        }
        @keyframes casosGlowB {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-5%, 5%) scale(1.08); }
        }
        @keyframes casosGlowC {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(3%, 4%) scale(1.05); }
        }
        .testimonio-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .testimonio-card:hover {
          border-color: rgba(201,162,39,0.25) !important;
          box-shadow: 0 0 24px rgba(201,162,39,0.08), 0 8px 32px rgba(0,0,0,0.4);
          transform: translateY(-3px);
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonio-card { transition: none; }
          .testimonio-card:hover { transform: none; }
          [style*="floatParticle"], [style*="casosGlow"] { animation: none !important; }
        }
      `}</style>

      {/* Fondo animado — glows de colores del logo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Glow dorado — izquierda */}
        <div style={{
          position: "absolute", width: "45vw", height: "45vw",
          maxWidth: 520, maxHeight: 520, borderRadius: "50%",
          top: "-10%", left: "-8%",
          background: "radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "casosGlowA 22s ease-in-out infinite alternate",
        }} />

        {/* Glow teal — derecha */}
        <div style={{
          position: "absolute", width: "40vw", height: "40vw",
          maxWidth: 460, maxHeight: 460, borderRadius: "50%",
          top: "20%", right: "-5%",
          background: "radial-gradient(circle, rgba(26,122,122,0.08) 0%, transparent 65%)",
          filter: "blur(90px)",
          animation: "casosGlowB 28s ease-in-out infinite alternate",
        }} />

        {/* Glow coral — abajo centro */}
        <div style={{
          position: "absolute", width: "35vw", height: "35vw",
          maxWidth: 400, maxHeight: 400, borderRadius: "50%",
          bottom: "5%", left: "35%",
          background: "radial-gradient(circle, rgba(212,90,138,0.06) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "casosGlowC 34s ease-in-out infinite alternate",
        }} />

        {/* Grilla sutil — igual que el hero pero más tenue */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />

        <FloatingParticles />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">

        <ScrollReveal>
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#c9a227" }}>
              Resultados reales
            </p>
            <h2 className="text-white">Lo que dicen nuestros clientes</h2>
            <p className="mx-auto max-w-xl" style={{ color: "#888888" }}>
              Negocios reales que dejaron de improvisar.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative">
          <button onClick={() => scroll("left")} className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors" aria-label="Anterior">
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button onClick={() => scroll("right")} className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors" aria-label="Siguiente">
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollSnapType: "x mandatory" }}>
            {testimonios.map((t, i) => {
              const accentColor = ACCENT_COLORS[i % ACCENT_COLORS.length]
              return (
                <div key={i} className="testimonio-card flex-shrink-0 w-[300px] md:w-[340px] flex flex-col justify-between rounded-xl p-7" style={{
                  scrollSnapAlign: "start",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  // Borde superior con color del logo
                  boxShadow: `inset 0 1px 0 ${accentColor}33`,
                }}>
                  {/* Comilla con color del logo */}
                  <div style={{ fontSize: 40, fontFamily: "serif", lineHeight: 1, marginBottom: 12, color: accentColor, opacity: 0.8 }}>&ldquo;</div>
                  <blockquote className="text-sm md:text-base leading-relaxed mb-8 flex-1" style={{ color: "#cccccc" }}>
                    {t.quote}
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    {/* Avatar con color del logo */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-sm flex-shrink-0" style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}44` }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-white">{t.name}</span>
                        <BadgeCheck className="h-3.5 w-3.5" style={{ color: accentColor }} />
                      </div>
                      <span className="text-xs" style={{ color: "#797979" }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dots de navegación */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonios.map((_, i) => (
              <button key={i} onClick={() => {
                if (!scrollRef.current) return
                scrollRef.current.scrollTo({ left: i * 360, behavior: "smooth" })
                setActiveIndex(i)
              }} style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 99,
                background: i === activeIndex ? "#c9a227" : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }} aria-label={`Ir al testimonio ${i + 1}`} />
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