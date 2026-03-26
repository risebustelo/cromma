"use client"

import { useState, useEffect } from "react"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { Lightbulb, PenTool, BarChart3, Zap, Package, LineChart, Megaphone, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"
const EMERALD = "#2eaf5a"
const TEAL = "#1a6b6b"

const tabs = [
  {
    icon: Lightbulb,
    label: "Oferta",
    etapa: "Atraer",
    title: "Sin oferta clara, no hay negocio.",
    description: "Antes de crear contenido o vender, definimos exactamente que vendes, a quien y por que te eligen. Una oferta bien estructurada es la diferencia entre conseguir clientes de forma consistente o depender del azar.",
    resultado: "Propuesta lista para generar las primeras consultas calificadas en menos de 30 dias.",
    bullets: [
      "Propuesta de valor diferenciada y posicionada",
      "Precio alineado al mercado y al resultado que entregas",
      "Mensaje claro que atrae al cliente correcto y filtra al incorrecto",
    ],
    soluciones: ["Sales Coaching", "CRM", "Landing Pages"],
  },
  {
    icon: Megaphone,
    label: "Atraccion",
    etapa: "Atraer",
    title: "Visibilidad que trae clientes, no solo likes.",
    description: "Construimos un sistema de atraccion que genera consultas calificadas de forma predecible. Sin depender de ads desde el dia uno, sin viralidad, sin suerte.",
    resultado: "De 0 a un flujo estable de consultas entrantes en 60 a 90 dias.",
    bullets: [
      "Landing pages optimizadas para conversion real",
      "Funnels por etapa del proceso de compra",
      "Campanas pagas en Meta, TikTok y Google cuando la base esta lista",
    ],
    soluciones: ["Landing Pages", "Funnels", "Meta Ads", "Google Ads", "TikTok Ads"],
  },
  {
    icon: PenTool,
    label: "Contenido",
    etapa: "Atraer",
    title: "Contenido que genera consultas, no solo likes.",
    description: "Publicar mas no es la solucion. Publicar con intencion comercial si lo es. Construimos un sistema de contenido que atrae, filtra y convierte, con IA para escalar sin perder la voz.",
    resultado: "Sistema activo que genera entre 5 y 20 consultas calificadas por semana de forma sostenida.",
    bullets: [
      "Estrategia editorial con intencion de venta en cada pieza",
      "Generacion y edicion con IA para triplicar el volumen sin triplicar el tiempo",
      "Sistema semanal repetible que no depende de la inspiracion",
    ],
    soluciones: ["IA Generativa", "Automatizaciones", "Asistentes IA"],
  },
  {
    icon: BarChart3,
    label: "Convertir",
    etapa: "Convertir",
    title: "Cerrar 6 de cada 10 consultas es posible con proceso.",
    description: "La mayoria pierde clientes no por el precio sino por falta de proceso. Implementamos un sistema comercial repetible que lleva cada consulta desde el primer contacto hasta el cierre sin friccion ni improvisacion.",
    resultado: "Tasa de cierre de entre 25% y 40% en consultas calificadas en los primeros 60 dias.",
    bullets: [
      "Flujo de ventas estructurado etapa por etapa",
      "Scripts, objeciones y secuencias de seguimiento probadas",
      "CRM configurado para tu proceso real con alertas y automatizacion",
    ],
    soluciones: ["CRM", "Chatbots", "Calendarios", "Sales Coaching"],
  },
  {
    icon: Zap,
    label: "Automatizar",
    etapa: "Escalar",
    title: "Tu negocio genera ingresos aunque vos no estes.",
    description: "Cuando el sistema comercial esta probado, lo automatizamos. Seguimiento, nutricion, agendamiento y atencion inicial sin intervencion humana. El objetivo es llegar a cinco cifras mensuales sin contratar un equipo.",
    resultado: "Reduccion del 60% del tiempo operativo manteniendo o aumentando la tasa de conversion.",
    bullets: [
      "Asistentes con IA para calificacion y atencion inicial 24/7",
      "Flujos automaticos de seguimiento post-consulta y nutricion de leads",
      "Integracion total entre CRM, calendario, email y plataformas de pago",
    ],
    soluciones: ["Asistentes IA", "Chatbots", "Make / Zapier", "Calendarios", "Email Marketing"],
  },
  {
    icon: Package,
    label: "Entregar",
    etapa: "Entregar",
    title: "Escalar sin que la calidad colapse.",
    description: "El cuello de botella mas comun al crecer es la entrega. Estandarizamos el servicio para que puedas tomar mas clientes sin trabajar mas horas ni sacrificar la experiencia.",
    resultado: "Capacidad de duplicar clientes activos sin aumentar horas de trabajo.",
    bullets: [
      "Onboarding estandarizado que reduce fricciones desde el dia uno",
      "Plataformas de cursos, comunidades y entrega digital configuradas",
      "Sistemas de seguimiento para negocios de mayor escala",
    ],
    soluciones: ["Cursos", "Comunidades", "ERP a medida", "PM Coaching", "Skool / Whop"],
  },
  {
    icon: RefreshCw,
    label: "Expandir",
    etapa: "Expandir",
    title: "El cliente que ya tienes vale el doble si lo trabajas bien.",
    description: "La forma mas barata de crecer es venderle mas al cliente que ya confia en vos. Implementamos sistemas de retencion, upsell y reactivacion para maximizar el valor de cada relacion.",
    resultado: "Aumento del 30% al 50% en el valor promedio por cliente en los primeros 90 dias.",
    bullets: [
      "Flujos de upsell y cross-sell automatizados por comportamiento",
      "Secuencias de reactivacion para clientes inactivos",
      "Programa de referidos integrado al proceso de entrega",
    ],
    soluciones: ["CRM", "Email Marketing", "Automatizaciones", "Comunidades"],
  },
  {
    icon: LineChart,
    label: "Analitica",
    etapa: "Escalar",
    title: "No puedes mejorar lo que no medis.",
    description: "Implementamos dashboards y sistemas de seguimiento para que sepas en tiempo real que funciona, que no y donde esta el proximo cuello de botella. Decisiones basadas en datos, no en intuicion.",
    resultado: "Visibilidad total del negocio con reportes semanales accionables en menos de 15 minutos.",
    bullets: [
      "Dashboard con los indicadores que realmente importan",
      "Tracking de conversion etapa por etapa del funnel",
      "Reportes accionables semanales sin perder tiempo en analisis",
    ],
    soluciones: ["Dashboards", "Analytics", "ERP", "Software a medida"],
  },
]

const obsidianaLanguages = [
  "Solo por invitacion",
  "By invitation only",
  "Nur auf Einladung",
  "Sur invitation uniquement",
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
        className="relative rounded-2xl p-10 md:p-14 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0f0e0b 0%, #0a0a0a 100%)",
          border: `1px solid ${GOLD}40`,
          boxShadow: `0 0 60px ${GOLD}10, inset 0 1px 0 ${GOLD}15`,
        }}
      >
        {/* Corner accents */}
        {(["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"] as const).map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-12 h-12`}>
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(${i % 2 === 0 ? "90deg" : "270deg"}, ${GOLD}, transparent)` }} />
            <div className="absolute top-0 left-0 h-full w-px" style={{ background: `linear-gradient(${i < 2 ? "180deg" : "0deg"}, ${GOLD}, transparent)` }} />
          </div>
        ))}

        {/* Beta + brand */}
        <div className="flex justify-between items-start mb-10">
          <span
            className="text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full"
            style={{ border: `1px solid ${GOLD}50`, color: GOLD, background: `${GOLD}10` }}
          >
            Beta
          </span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#806515" }}>
            Cromma
          </span>
        </div>

        {/* Name */}
        <div className="mb-3">
          <h3 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ color: GOLD }}>
            Obsidiana
          </h3>
          <div className="h-px w-20 mt-4" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
        </div>

        {/* Rotating language */}
        <div className="h-10 mb-10 flex items-center">
          <p
            className="text-base font-medium tracking-widest"
            style={{
              color: "#806515",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {obsidianaLanguages[langIndex]}
          </p>
        </div>

        {/* Mystery blocks */}
        <div className="space-y-4 mb-12">
          {[70, 85, 55].map((w, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: GOLD, opacity: 0.4 }} />
              <div
                className="h-2.5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${GOLD}20, ${GOLD}08)`, width: `${w}%` }}
              />
            </div>
          ))}
          <p className="text-xs mt-6 italic" style={{ color: "#4a3d12" }}>
            Los beneficios se revelan al ingresar.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#agenda" 
            className="flex-1 h-14 font-bold text-base inline-flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-[1.02]" 
            style={{ background: `linear-gradient(135deg, #8B6914, ${GOLD}, #8B6914)`, color: "#0a0a0a" }}
          >
            Solicitar acceso
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a 
            href="#agenda" 
            className="flex-1 h-14 font-bold text-base inline-flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/5" 
            style={{ border: `1px solid ${GOLD}50`, color: GOLD, background: "transparent" }}
          >
            Tengo una invitacion
          </a>
        </div>
      </div>
    </div>
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
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sistemaDriftA {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(4%, -5%) scale(1.08); }
        }
        @keyframes sistemaDriftB {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-3%, 4%) scale(1.06); }
        }
      `}</style>

      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,162,39,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,162,39,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />
        <div style={{
          position: "absolute", width: "45vw", height: "45vw",
          maxWidth: 550, maxHeight: 550, borderRadius: "50%",
          top: "-15%", right: "-8%",
          background: `radial-gradient(circle, ${GOLD}08 0%, transparent 65%)`,
          filter: "blur(80px)",
          animation: "sistemaDriftA 25s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", width: "40vw", height: "40vw",
          maxWidth: 500, maxHeight: 500, borderRadius: "50%",
          bottom: "-5%", left: "-5%",
          background: `radial-gradient(circle, ${TEAL}06 0%, transparent 65%)`,
          filter: "blur(90px)",
          animation: "sistemaDriftB 32s ease-in-out infinite alternate",
        }} />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-16 space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              El sistema
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl">Todo en un sistema integrado</h2>
            <p className="mx-auto max-w-xl text-base md:text-lg" style={{ color: "#888888" }}>
              Cada pieza conectada con un proposito claro. No implementaciones aisladas — soluciones para cada etapa.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={60}>
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-3 mb-10 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
            {tabs.map((tab, i) => {
              const TabIcon = tab.icon
              const isActive = active === i
              return (
                <button
                  key={tab.label}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
                  style={{
                    background: isActive ? GOLD : "rgba(255,255,255,0.03)",
                    color: isActive ? "#0a0a0a" : "#888888",
                    border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <TabIcon className="h-4 w-4 flex-shrink-0" />
                  {tab.label}
                </button>
              )
            })}

            {/* Tab Obsidiana */}
            <button
              onClick={() => setActive(tabs.length)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={
                isObsidiana
                  ? { background: `linear-gradient(135deg, #8B6914, ${GOLD})`, color: "#0a0a0a", border: `1px solid ${GOLD}`, boxShadow: `0 0 20px ${GOLD}30` }
                  : { background: "#0a0a0a", color: GOLD, border: `1px solid ${GOLD}30` }
              }
            >
              <span className="h-2 w-2 rounded-full" style={{ background: isObsidiana ? "#0a0a0a" : GOLD }} />
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
              className="mx-auto max-w-3xl rounded-2xl p-8 md:p-12 space-y-8"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                animation: "tabIn 0.25s ease both",
              }}
            >
              {/* Etapa badge */}
              <span
                className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full"
                style={{ border: `1px solid ${GOLD}30`, color: GOLD, background: `${GOLD}08` }}
              >
                {current.etapa}
              </span>

              {/* Title */}
              <div className="flex items-start gap-5">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}25` }}
                >
                  <Icon className="h-6 w-6" style={{ color: GOLD }} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug pt-2">{current.title}</h3>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "#888888" }}>
                {current.description}
              </p>

              {/* Result */}
              <div
                className="rounded-xl px-6 py-5"
                style={{ borderLeft: `3px solid ${GOLD}`, background: `${GOLD}06` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>
                  Resultado esperado
                </p>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "#a8a8a8" }}>
                  {current.resultado}
                </p>
              </div>

              <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Bullets */}
              <ul className="space-y-3">
                {current.bullets.map((b) => (
                  <li key={b} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: EMERALD }} />
                    <span className="text-base" style={{ color: "#a0a0a0" }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Solutions tags */}
              <div className="flex flex-wrap gap-2">
                {current.soluciones.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-4 py-1.5 rounded-full"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#888888",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4">
                <CtaPrimary className="h-14 px-10 text-base" />
              </div>

            </div>
          ) : null}
        </ScrollReveal>

      </div>
    </section>
  )
}
