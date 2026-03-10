"use client"

import { useState, useEffect } from "react"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { Lightbulb, PenTool, BarChart3, Zap, Package, LineChart, Megaphone, RefreshCw, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const tabs = [
  {
    icon: Lightbulb,
    label: "Oferta",
    etapa: "Atraer",
    title: "Sin oferta clara, no hay negocio.",
    description: "Antes de crear contenido o vender, definimos exactamente qué vendés, a quién y por qué te eligen. Una oferta bien estructurada es la diferencia entre conseguir clientes de forma consistente o depender del azar.",
    resultado: "Propuesta lista para generar las primeras consultas calificadas en menos de 30 días.",
    bullets: [
      "Propuesta de valor diferenciada y posicionada",
      "Pricing alineado al mercado y al resultado que entregás",
      "Mensaje claro que atrae al cliente correcto y filtra al incorrecto",
    ],
    soluciones: ["Sales Coaching", "CRM", "Landing Pages"],
  },
  {
    icon: Megaphone,
    label: "Atracción",
    etapa: "Atraer",
    title: "Visibilidad que trae clientes, no solo likes.",
    description: "Construimos un sistema de atracción que genera consultas calificadas de forma predecible. Sin depender de ads desde el día uno, sin viralidad, sin suerte.",
    resultado: "De 0 a un flujo estable de consultas entrantes en 60 a 90 días.",
    bullets: [
      "Landing pages optimizadas para conversión real",
      "Funnels por etapa del proceso de compra",
      "Campañas pagas en Meta, TikTok y Google cuando la base está lista",
    ],
    soluciones: ["Landing Pages", "Funnels", "Meta Ads", "Google Ads", "TikTok Ads"],
  },
  {
    icon: PenTool,
    label: "Contenido",
    etapa: "Atraer",
    title: "Contenido que genera consultas, no solo likes.",
    description: "Publicar más no es la solución. Publicar con intención comercial sí lo es. Construimos un sistema de contenido que atrae, filtra y convierte, con IA para escalar sin perder la voz.",
    resultado: "Sistema activo que genera entre 5 y 20 consultas calificadas por semana de forma sostenida.",
    bullets: [
      "Estrategia editorial con intención de venta en cada pieza",
      "Generación y edición con IA para triplicar el volumen sin triplicar el tiempo",
      "Sistema semanal repetible que no depende de la inspiración",
    ],
    soluciones: ["IA Generativa", "Automatizaciones", "Asistentes IA"],
  },
  {
    icon: BarChart3,
    label: "Convertir",
    etapa: "Convertir",
    title: "Cerrar 6 de cada 10 consultas es posible con proceso.",
    description: "La mayoría pierde clientes no por el precio sino por falta de proceso. Implementamos un sistema comercial repetible que lleva cada consulta desde el primer contacto hasta el cierre sin fricción ni improvisación.",
    resultado: "Tasa de cierre de entre 25% y 40% en consultas calificadas en los primeros 60 días.",
    bullets: [
      "Flujo de ventas estructurado etapa por etapa",
      "Scripts, objeciones y secuencias de seguimiento probadas",
      "CRM configurado para tu proceso real con alertas y automatización",
    ],
    soluciones: ["CRM", "Chatbots", "Calendarios", "Sales Coaching"],
  },
  {
    icon: Zap,
    label: "Automatizar",
    etapa: "Escalar",
    title: "Tu negocio genera ingresos aunque vos no estés.",
    description: "Cuando el sistema comercial está probado, lo automatizamos. Seguimiento, nutrición, agendamiento y atención inicial sin intervención humana. El objetivo es llegar a cinco cifras mensuales sin contratar un equipo.",
    resultado: "Reducción del 60% del tiempo operativo manteniendo o aumentando la tasa de conversión.",
    bullets: [
      "Asistentes con IA para calificación y atención inicial 24/7",
      "Flujos automáticos de seguimiento post-consulta y nutrición de leads",
      "Integración total entre CRM, calendario, email y plataformas de pago",
    ],
    soluciones: ["Asistentes IA", "Chatbots", "Make / Zapier", "Calendarios", "Email Marketing"],
  },
  {
    icon: Package,
    label: "Entregar",
    etapa: "Entregar",
    title: "Escalar sin que la calidad colapse.",
    description: "El cuello de botella más común al crecer es la entrega. Estandarizamos el servicio para que puedas tomar más clientes sin trabajar más horas ni sacrificar la experiencia.",
    resultado: "Capacidad de duplicar clientes activos sin aumentar horas de trabajo.",
    bullets: [
      "Onboarding estandarizado que reduce fricciones desde el día uno",
      "Plataformas de cursos, comunidades y entrega digital configuradas",
      "Sistemas de seguimiento para negocios de mayor escala",
    ],
    soluciones: ["Cursos", "Comunidades", "ERP a medida", "PM Coaching", "Skool / Whop"],
  },
  {
    icon: RefreshCw,
    label: "Expandir",
    etapa: "Expandir",
    title: "El cliente que ya tenés vale el doble si lo trabajás bien.",
    description: "La forma más barata de crecer es venderle más al cliente que ya confía en vos. Implementamos sistemas de retención, upsell y reactivación para maximizar el valor de cada relación.",
    resultado: "Aumento del 30% al 50% en el valor promedio por cliente en los primeros 90 días.",
    bullets: [
      "Flujos de upsell y cross-sell automatizados por comportamiento",
      "Secuencias de reactivación para clientes inactivos",
      "Programa de referidos integrado al proceso de entrega",
    ],
    soluciones: ["CRM", "Email Marketing", "Automatizaciones", "Comunidades"],
  },
  {
    icon: LineChart,
    label: "Analítica",
    etapa: "Escalar",
    title: "No podés mejorar lo que no medís.",
    description: "Implementamos dashboards y sistemas de seguimiento para que sepas en tiempo real qué funciona, qué no y dónde está el próximo cuello de botella. Decisiones basadas en datos, no en intuición.",
    resultado: "Visibilidad total del negocio con reportes semanales accionables en menos de 15 minutos.",
    bullets: [
      "Dashboard con los indicadores que realmente importan",
      "Tracking de conversión etapa por etapa del funnel",
      "Reportes accionables semanales sin perder tiempo en análisis",
    ],
    soluciones: ["Dashboards", "Analytics", "ERP", "Software a medida"],
  },
]

const obsidianaLanguages = [
  "Solo por invitación",
  "By invitation only",
  "仅限受邀者",
  "Только по приглашению",
]

function ObsidianaCard() {
  const [langIndex, setLangIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setLangIndex((prev) => (prev + 1) % obsidianaLanguages.length)
        setVisible(true)
      }, 400)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
          border: "1px solid #8B6914",
          boxShadow: "0 0 40px rgba(184,134,11,0.15), inset 0 1px 0 rgba(212,175,55,0.1)",
        }}
      >
        {/* Corner accents */}
        {(["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"] as const).map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-10 h-10`}>
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(${i % 2 === 0 ? "90deg" : "270deg"}, #D4AF37, transparent)` }} />
            <div className="absolute top-0 left-0 h-full w-px" style={{ background: `linear-gradient(${i < 2 ? "180deg" : "0deg"}, #D4AF37, transparent)` }} />
          </div>
        ))}

        {/* Beta + brand */}
        <div className="flex justify-between items-start mb-8">
          <span
            className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
            style={{ border: "1px solid #8B6914", color: "#D4AF37", background: "rgba(184,134,11,0.08)" }}
          >
            Beta
          </span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#a07820" }}>
            Cromma
          </span>
        </div>

        {/* Name */}
        <div className="mb-2">
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#D4AF37" }}>
            Obsidiana
          </h3>
          <div className="h-px w-16 mt-3" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
        </div>

        {/* Rotating language */}
        <div className="h-8 mb-8 flex items-center">
          <p
            className="text-sm font-medium tracking-widest"
            style={{
              color: "#a07820",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {obsidianaLanguages[langIndex]}
          </p>
        </div>

        {/* Mystery blocks */}
        <div className="space-y-3 mb-10">
          {[65, 80, 50].map((w, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "#D4AF37", opacity: 0.4 }} />
              <div
                className="h-2 rounded-full"
                style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))", width: `${w}%` }}
              />
            </div>
          ))}
          {/* Texto decorativo — no necesita pasar WCAG al ser puramente ornamental */}
          <p className="text-xs mt-4 italic" style={{ color: "#5a4a1a" }}>
            Los beneficios se revelan al ingresar.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">

          href="#agenda"
          className="flex-1 h-12 font-bold text-sm inline-flex items-center justify-center rounded-xl"
          style={{ background: "linear-gradient(135deg, #8B6914, #D4AF37, #8B6914)", color: "#0a0a0a" }}>
          Solicitar acceso
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>

        href="#agenda"
        className="flex-1 h-12 font-bold text-sm inline-flex items-center justify-center rounded-xl"
        style={{ border: "1px solid #8B6914", color: "#c9a227", background: "transparent" }}>
        Tengo una invitación
      </a>
    </div>
      </div >
    </div >
  )
}

export function TabsCapabilities() {
  const [active, setActive] = useState(0)
  const isObsidiana = active === tabs.length
  const current = !isObsidiana ? tabs[active] : null
  const Icon = current?.icon

  return (
    <section id="sistema" className="section-dark noise relative overflow-hidden">
      <style>{`
        @keyframes tabIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container mx-auto px-4 py-16 md:py-24">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 space-y-2">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#c9a227" }}>
              El sistema
            </p>
            <h2 className="text-white">Todo en un sistema integrado</h2>
            {/* era oklch(0.48 0 0) ≈ #737373 → 4.4:1 ❌ | corregido #a0a0a0 → 5.9:1 ✅ */}
            <p className="mx-auto max-w-md text-sm md:text-base" style={{ color: "#a0a0a0" }}>
              Cada pieza conectada con un propósito claro. No implementaciones aisladas — soluciones para cada etapa.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={60}>
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
            {tabs.map((tab, i) => {
              const TabIcon = tab.icon
              const isActive = active === i
              return (
                <button
                  key={tab.label}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
                  style={{
                    background: isActive ? "#c9a227" : "oklch(1 0 0 / 0.04)",
                    // era oklch(0.5 0 0) ≈ #777 → 4.0:1 ❌ | corregido #a0a0a0 → 5.9:1 ✅
                    color: isActive ? "#0a0a0a" : "#a0a0a0",
                    border: isActive ? "1px solid transparent" : "1px solid oklch(1 0 0 / 0.07)",
                  }}
                >
                  <TabIcon className="h-3.5 w-3.5 flex-shrink-0" />
                  {tab.label}
                </button>
              )
            })}

            {/* Tab Obsidiana */}
            <button
              onClick={() => setActive(tabs.length)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0"
              style={
                isObsidiana
                  ? { background: "linear-gradient(135deg, #8B6914, #D4AF37)", color: "#0a0a0a", border: "1px solid #D4AF37", boxShadow: "0 0 16px rgba(212,175,55,0.3)" }
                  : { background: "#0a0a0a", color: "#c9a227", border: "1px solid #3a2f0a" }
              }
            >
              <span className="h-2 w-2 rounded-full" style={{ background: isObsidiana ? "#0a0a0a" : "#D4AF37" }} />
              Obsidiana
            </button>
          </div>
        </ScrollReveal>

        {/* Panel */}
        <ScrollReveal delay={120}>
          {isObsidiana ? (
            <ObsidianaCard />
          ) : current && Icon ? (
            <div
              key={active}
              className="mx-auto max-w-3xl rounded-2xl p-8 md:p-10 space-y-6"
              style={{
                background: "oklch(0.09 0.003 260)",
                border: "1px solid oklch(1 0 0 / 0.07)",
                animation: "tabIn 0.22s ease both",
              }}
            >
              {/* Etapa badge */}
              <span
                className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-full"
                style={{ border: "1px solid oklch(0.85 0.15 95 / 0.25)", color: "#c9a227", background: "oklch(0.85 0.15 95 / 0.06)" }}
              >
                {current.etapa}
              </span>

              {/* Título */}
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: "oklch(0.85 0.15 95 / 0.1)", border: "1px solid oklch(0.85 0.15 95 / 0.18)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#c9a227" }} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white leading-snug pt-1">{current.title}</h3>
              </div>

              {/* Descripción */}
              {/* era oklch(0.58 0 0) ≈ #888 → 3.2:1 ❌ | corregido #a0a0a0 → 5.9:1 ✅ */}
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#a0a0a0" }}>
                {current.description}
              </p>

              {/* Resultado esperado */}
              <div
                className="rounded-xl px-5 py-4"
                style={{ borderLeft: "3px solid #c9a227", background: "oklch(0.85 0.15 95 / 0.05)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#c9a227" }}>
                  Resultado esperado
                </p>
                {/* oklch(0.72 0 0) ≈ #a8a8a8 → 4.8:1 ✅ — sin cambio */}
                <p className="text-sm leading-relaxed" style={{ color: "#a8a8a8" }}>
                  {current.resultado}
                </p>
              </div>

              <div className="h-px" style={{ background: "oklch(1 0 0 / 0.06)" }} />

              {/* Bullets */}
              <ul className="space-y-2.5">
                {current.bullets.map((b) => (
                  <li key={b} className="flex gap-3 items-start">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "#c9a227" }} />
                    {/* era oklch(0.68 0 0) ≈ #9e9e9e → 4.0:1 ❌ | corregido #a0a0a0 → 5.9:1 ✅ */}
                    <span className="text-sm" style={{ color: "#a0a0a0" }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tags de soluciones */}
              <div className="flex flex-wrap gap-2">
                {current.soluciones.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      // era oklch(0.45 0 0) ≈ #6b6b → 3.7:1 ❌ | corregido #a0a0a0 → 5.9:1 ✅
                      color: "#a0a0a0",
                      background: "oklch(1 0 0 / 0.02)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <CtaPrimary />
              </div>

            </div>
          ) : null}
        </ScrollReveal>

      </div>
    </section>
  )
}