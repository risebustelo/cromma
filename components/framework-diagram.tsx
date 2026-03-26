"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { Megaphone, Handshake, Package, RefreshCw, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"
const EMERALD = "#2eaf5a"
const TEAL = "#1a6b6b"

const steps = [
  { 
    icon: Megaphone, 
    title: "Atraer", 
    desc: "Contenido que atrae a quienes ya necesitan lo que ofreces.", 
    step: 1, 
    color: EMERALD,
    metrics: ["Visibilidad organica", "Leads calificados", "Autoridad"],
  },
  { 
    icon: Handshake, 
    title: "Convertir", 
    desc: "Transformamos interes en consultas calificadas y clientes.", 
    step: 2, 
    color: TEAL,
    metrics: ["Tasa de conversion", "Pipeline activo", "Tiempo de cierre"],
  },
  { 
    icon: Package, 
    title: "Entregar", 
    desc: "Proceso claro para que cada cliente tenga una experiencia profesional.", 
    step: 3, 
    color: EMERALD,
    metrics: ["Satisfaccion", "Retencion", "Eficiencia"],
  },
  { 
    icon: RefreshCw, 
    title: "Expandir", 
    desc: "Estrategias para crear clientes que vuelven y recomiendan.", 
    step: 4, 
    color: TEAL,
    metrics: ["LTV", "Referidos", "Upsells"],
  },
  { 
    icon: TrendingUp, 
    title: "Escalar", 
    desc: "Convertimos el proceso en un sistema que crece con el negocio.", 
    step: 5, 
    color: GOLD,
    metrics: ["Automatizacion", "Crecimiento", "Margen"],
  },
]

const proceso = [
  { 
    n: "01", 
    label: "Clarificamos tu oferta", 
    sub: "Definimos que vendes, a quien y por que deberian elegirte.",
    bullets: ["Propuesta de valor diferenciada", "Precio alineado al mercado", "Mensaje claro y directo"],
  },
  { 
    n: "02", 
    label: "Disenamos el sistema", 
    sub: "Construimos la estructura que atrae, convierte y organiza las consultas.",
    bullets: ["Funnel de conversion", "Proceso comercial", "Automatizaciones"],
  },
  { 
    n: "03", 
    label: "Implementamos y optimizamos", 
    sub: "Ponemos el sistema en marcha y lo mejoramos con datos reales.",
    bullets: ["Lanzamiento rapido", "Metricas claras", "Iteracion continua"],
  },
]

export function FrameworkDiagram() {
  return (
    <section id="como-funciona" className="section-light relative overflow-hidden">
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              El framework
            </p>
            <h2 className="text-[#0a0a0a] text-3xl md:text-4xl lg:text-5xl">Como funciona Cromma</h2>
            <p className="text-[#555555] mx-auto max-w-xl text-base md:text-lg">
              La mayoria publica contenido sin un sistema detras.
              Nosotros construimos el sistema que convierte esa atencion en consultas reales.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid - Framework Steps */}
        <div className="max-w-6xl mx-auto mb-20 md:mb-28">
          
          {/* Desktop: Horizontal Bento */}
          <div className="hidden lg:grid grid-cols-5 gap-4">
            {steps.map((node, i) => (
              <ScrollReveal key={node.title} delay={i * 100}>
                <div
                  className="group relative h-full rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px]"
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${node.color}25`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${node.color}50`
                    e.currentTarget.style.boxShadow = `0 8px 24px ${node.color}12`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${node.color}25`
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"
                  }}
                >
                  {/* Step number */}
                  <div 
                    className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: node.color, color: "#0a0a0a" }}
                  >
                    {node.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                    style={{ background: `${node.color}12`, border: `1px solid ${node.color}25` }}
                  >
                    <node.icon className="h-6 w-6" style={{ color: node.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold text-[#0a0a0a] mb-2">{node.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#666666" }}>{node.desc}</p>

                  {/* Metrics */}
                  <div className="space-y-1.5 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    {node.metrics.map((metric) => (
                      <div key={metric} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full" style={{ background: node.color }} />
                        <span className="text-[10px]" style={{ color: "#888888" }}>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow connector */}
                  {i < steps.length - 1 && (
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                      <ArrowRight className="h-4 w-4" style={{ color: "#cccccc" }} />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile/Tablet: Vertical Layout */}
          <div className="lg:hidden space-y-4">
            {steps.map((node, i) => (
              <ScrollReveal key={node.title} delay={i * 80}>
                <div
                  className="relative rounded-2xl p-5 transition-all duration-300"
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${node.color}25`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Left: Icon + Line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="relative flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ background: `${node.color}12`, border: `1px solid ${node.color}25` }}
                      >
                        <node.icon className="h-5 w-5" style={{ color: node.color }} />
                        <span
                          className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                          style={{ background: node.color, color: "#0a0a0a" }}
                        >
                          {node.step}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px h-6 mt-2" style={{ background: `${node.color}30` }} />
                      )}
                    </div>
                    
                    {/* Right: Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="text-base font-bold text-[#0a0a0a] mb-1">{node.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>{node.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)" }} />
        </div>

        {/* Process Steps - Bento Cards */}
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD }}>
                El proceso
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0a0a0a]">Tres pasos hacia clientes predecibles</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-12">
              {proceso.map((p, i) => (
                <ScrollReveal key={p.n} delay={i * 100}>
                  <div
                    className="group h-full rounded-2xl p-6 md:p-8 transition-all duration-300 hover:translate-y-[-4px]"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(201,162,39,0.20)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,162,39,0.40)"
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,162,39,0.08)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,162,39,0.20)"
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"
                    }}
                  >
                    {/* Number */}
                    <span
                      className="text-4xl font-black leading-none mb-4 block"
                      style={{ color: GOLD }}
                    >
                      {p.n}
                    </span>

                    {/* Content */}
                    <h4 className="text-lg font-bold text-[#0a0a0a] mb-2">{p.label}</h4>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#666666" }}>{p.sub}</p>

                    {/* Bullets */}
                    <div className="space-y-2 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                      {p.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: EMERALD }} />
                          <span className="text-xs" style={{ color: "#555555" }}>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <CtaPrimary className="h-14 px-10 text-base" />
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
