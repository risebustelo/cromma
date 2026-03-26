"use client"

import { useState, useEffect, useRef } from "react"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import {
  Lightbulb, PenTool, BarChart3, Zap, Package,
  LineChart, Megaphone, RefreshCw, ArrowRight,
  CheckCircle2, Lock, TrendingUp, Users, DollarSign,
  Activity, ChevronRight, Circle,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

// ─── Brand tokens ───────────────────────────────────────────────────────────
const GOLD = "#C9A227"
const GOLD_DIM = "rgba(201,162,39,0.10)"
const GOLD_BD = "rgba(201,162,39,0.20)"
const EMERALD = "#2eaf5a"
const EM_DIM = "rgba(46,175,90,0.10)"

// ─── Tab data ────────────────────────────────────────────────────────────────
const tabs = [
  {
    Icon: Lightbulb,
    label: "Oferta",
    etapa: "Atraer",
    title: "Sin oferta clara, no hay negocio.",
    description:
      "Antes de crear contenido o vender, definimos exactamente qué vendés, a quién y por qué te eligen. Una oferta bien estructurada es la diferencia entre conseguir clientes de forma consistente o depender del azar.",
    resultado:
      "Propuesta lista para generar las primeras consultas calificadas en menos de 30 días.",
    bullets: [
      "Propuesta de valor diferenciada y posicionada",
      "Precio alineado al mercado y al resultado que entregás",
      "Mensaje claro que atrae al cliente correcto y filtra al incorrecto",
    ],
    tags: ["Sales Coaching", "CRM", "Landing Pages"],
  },
  {
    Icon: Megaphone,
    label: "Atracción",
    etapa: "Atraer",
    title: "Visibilidad que trae clientes, no solo likes.",
    description:
      "Construimos un sistema de atracción que genera consultas calificadas de forma predecible. Sin depender de ads desde el día uno, sin viralidad, sin suerte.",
    resultado: "De 0 a un flujo estable de consultas entrantes en 60 a 90 días.",
    bullets: [
      "Landing pages optimizadas para conversión real",
      "Funnels por etapa del proceso de compra",
      "Campañas pagas en Meta, TikTok y Google cuando la base está lista",
    ],
    tags: ["Landing Pages", "Funnels", "Meta Ads", "Google Ads", "TikTok Ads"],
  },
  {
    Icon: PenTool,
    label: "Contenido",
    etapa: "Atraer",
    title: "Contenido que genera consultas, no solo likes.",
    description:
      "Publicar más no es la solución. Publicar con intención comercial sí lo es. Construimos un sistema de contenido que atrae, filtra y convierte, con IA para escalar sin perder la voz.",
    resultado:
      "Sistema activo que genera entre 5 y 20 consultas calificadas por semana de forma sostenida.",
    bullets: [
      "Estrategia editorial con intención de venta en cada pieza",
      "Generación y edición con IA para triplicar el volumen sin triplicar el tiempo",
      "Sistema semanal repetible que no depende de la inspiración",
    ],
    tags: ["IA Generativa", "Automatizaciones", "Asistentes IA"],
  },
  {
    Icon: BarChart3,
    label: "Convertir",
    etapa: "Convertir",
    title: "Cerrar 6 de cada 10 consultas es posible con proceso.",
    description:
      "La mayoría pierde clientes no por el precio sino por falta de proceso. Implementamos un sistema comercial repetible que lleva cada consulta desde el primer contacto hasta el cierre sin fricción ni improvisación.",
    resultado:
      "Tasa de cierre de entre 25% y 40% en consultas calificadas en los primeros 60 días.",
    bullets: [
      "Flujo de ventas estructurado etapa por etapa",
      "Scripts, objeciones y secuencias de seguimiento probadas",
      "CRM configurado para tu proceso real con alertas y automatización",
    ],
    tags: ["CRM", "Chatbots", "Calendarios", "Sales Coaching"],
  },
  {
    Icon: Zap,
    label: "Automatizar",
    etapa: "Escalar",
    title: "Tu negocio genera ingresos aunque vos no estés.",
    description:
      "Cuando el sistema comercial está probado, lo automatizamos. Seguimiento, nutrición, agendamiento y atención inicial sin intervención humana. El objetivo es llegar a cinco cifras mensuales sin contratar un equipo.",
    resultado:
      "Reducción del 60% del tiempo operativo manteniendo o aumentando la tasa de conversión.",
    bullets: [
      "Asistentes con IA para calificación y atención inicial 24/7",
      "Flujos automáticos de seguimiento post-consulta y nutrición de leads",
      "Integración total entre CRM, calendario, email y plataformas de pago",
    ],
    tags: ["Asistentes IA", "Chatbots", "Make / Zapier", "Calendarios", "Email Marketing"],
  },
  {
    Icon: Package,
    label: "Entregar",
    etapa: "Entregar",
    title: "Escalar sin que la calidad colapse.",
    description:
      "El cuello de botella más común al crecer es la entrega. Estandarizamos el servicio para que puedas tomar más clientes sin trabajar más horas ni sacrificar la experiencia.",
    resultado: "Capacidad de duplicar clientes activos sin aumentar horas de trabajo.",
    bullets: [
      "Onboarding estandarizado que reduce fricciones desde el día uno",
      "Plataformas de cursos, comunidades y entrega digital configuradas",
      "Sistemas de seguimiento para negocios de mayor escala",
    ],
    tags: ["Cursos", "Comunidades", "ERP a medida", "PM Coaching", "Skool / Whop"],
  },
  {
    Icon: RefreshCw,
    label: "Expandir",
    etapa: "Expandir",
    title: "El cliente que ya tenés vale el doble si lo trabajás bien.",
    description:
      "La forma más barata de crecer es venderle más al cliente que ya confía en vos. Implementamos sistemas de retención, upsell y reactivación para maximizar el valor de cada relación.",
    resultado:
      "Aumento del 30% al 50% en el valor promedio por cliente en los primeros 90 días.",
    bullets: [
      "Flujos de upsell y cross-sell automatizados por comportamiento",
      "Secuencias de reactivación para clientes inactivos",
      "Programa de referidos integrado al proceso de entrega",
    ],
    tags: ["CRM", "Email Marketing", "Automatizaciones", "Comunidades"],
  },
  {
    Icon: LineChart,
    label: "Analítica",
    etapa: "Escalar",
    title: "No podés mejorar lo que no medís.",
    description:
      "Implementamos dashboards y sistemas de seguimiento para que sepas en tiempo real qué funciona, qué no y dónde está el próximo cuello de botella. Decisiones basadas en datos, no en intuición.",
    resultado:
      "Visibilidad total del negocio con reportes semanales accionables en menos de 15 minutos.",
    bullets: [
      "Dashboard con los indicadores que realmente importan",
      "Tracking de conversión etapa por etapa del funnel",
      "Reportes accionables semanales sin perder tiempo en análisis",
    ],
    tags: ["Dashboards", "Analytics", "ERP", "Software a medida"],
  },
]

// ─── Obsidiana dashboard data ────────────────────────────────────────────────
const kpis = [
  { Icon: TrendingUp, label: "Consultas / sem", value: "47", delta: "+12", up: true },
  { Icon: Activity, label: "Tasa de cierre", value: "38%", delta: "+6pp", up: true },
  { Icon: DollarSign, label: "Ticket promedio", value: "$3.2k", delta: "estable", up: null },
  { Icon: Users, label: "MRR proyectado", value: "$18.4k", delta: "+34%", up: true },
]

const funnel = [
  { label: "Leads", pct: 100, color: `rgba(201,162,39,0.65)` },
  { label: "Consultas", pct: 62, color: `rgba(201,162,39,0.50)` },
  { label: "Calificados", pct: 38, color: `rgba(201,162,39,0.38)` },
  { label: "Cierres", pct: 23, color: `rgba(46,175,90,0.70)` },
]

const barData = [18, 23, 29, 31, 38, 41, 35, 47]
const barLabels = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"]
const barMax = Math.max(...barData)

const pipeline = [
  { name: "Martina R.", etapa: "Propuesta enviada", valor: "$4.800", status: "activo" },
  { name: "Carlos V.", etapa: "2da llamada", valor: "$3.200", status: "seguimiento" },
  { name: "Lucía M.", etapa: "Discovery call", valor: "$5.000", status: "activo" },
  { name: "Ana G.", etapa: "Consulta inicial", valor: "$2.400", status: "frío", blur: true },
  { name: "Diego P.", etapa: "Negociación", valor: "$6.000", status: "seguimiento", blur: true },
]

const statusStyle: Record<string, { bg: string; color: string }> = {
  activo: { bg: "rgba(46,175,90,0.12)", color: EMERALD },
  seguimiento: { bg: `rgba(201,162,39,0.12)`, color: GOLD },
  frío: { bg: "rgba(255,255,255,0.05)", color: "#666" },
}

// ─── Obsidiana card ──────────────────────────────────────────────────────────
function ObsidianaCard() {
  const [obsLang, setObsLang] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)
  const langs = ["Solo por invitación", "By invitation only", "Nur auf Einladung", "Sur invitation uniquement"]

  useEffect(() => {
    const id = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => { setObsLang(p => (p + 1) % langs.length); setFadeIn(true) }, 350)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        background: "linear-gradient(145deg,#0e0d09 0%,#0a0a08 100%)",
        border: `1px solid ${GOLD_BD}`,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: `0 0 80px rgba(201,162,39,0.06)`,
      }}
    >
      {/* ── Topbar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "11px 18px",
        background: "rgba(201,162,39,0.04)",
        borderBottom: `1px solid ${GOLD_BD}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {[0.12, 0.07, 0.04].map((o, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: `rgba(255,255,255,${o})` }} />
          ))}
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11.5,
            color: GOLD, letterSpacing: ".10em", marginLeft: 6,
          }}>CROMMA · OBSIDIANA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase",
            color: GOLD, border: `1px solid ${GOLD_BD}`, padding: "3px 10px",
            borderRadius: 100, background: GOLD_DIM,
          }}>Beta</span>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: `linear-gradient(135deg, #8B6914, ${GOLD})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#0c0c0a",
          }}>A</div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "grid", gridTemplateColumns: "170px 1fr" }}>

        {/* Sidebar */}
        <div style={{
          borderRight: `1px solid rgba(201,162,39,0.09)`,
          padding: "16px 0",
          background: "rgba(0,0,0,0.18)",
        }}>
          {[
            {
              label: "Principal", items: [
                { name: "Dashboard", active: true },
                { name: "Pipeline" },
                { name: "Contactos" },
                { name: "Automatizaciones" },
              ]
            },
            {
              label: "Sistema", items: [
                { name: "Contenido" },
                { name: "Analytics" },
                { name: "Equipo", locked: true },
                { name: "Reportes", locked: true },
              ]
            },
          ].map(section => (
            <div key={section.label} style={{ marginBottom: 20 }}>
              <p style={{
                fontSize: 9, fontWeight: 700, letterSpacing: ".22em",
                textTransform: "uppercase", color: "#4a4535",
                padding: "0 14px", marginBottom: 6,
              }}>{section.label}</p>
              {section.items.map(item => (
                <div key={item.name} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "7px 14px", fontSize: 12,
                  color: item.locked ? "#3a3520" : item.active ? GOLD : "#5a5440",
                  borderLeft: `2px solid ${item.active ? GOLD : "transparent"}`,
                  background: item.active ? "rgba(201,162,39,0.06)" : "transparent",
                  cursor: item.locked ? "default" : "pointer",
                }}>
                  {item.locked && <Lock size={10} style={{ flexShrink: 0 }} />}
                  {item.name}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ padding: "16px 14px", minWidth: 0 }}>

          {/* KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 12 }}>
            {kpis.map(k => (
              <div key={k.label} style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: "12px 12px 10px",
              }}>
                <p style={{ fontSize: 9.5, color: "#55503c", fontWeight: 600, letterSpacing: ".05em", marginBottom: 5 }}>{k.label}</p>
                <p style={{
                  fontSize: 20, fontWeight: 300, color: "#e8e4d8", lineHeight: 1,
                  fontFamily: "'DM Mono', monospace",
                }}>{k.value}</p>
                <p style={{
                  fontSize: 9.5, marginTop: 4, fontWeight: 600,
                  color: k.up === true ? EMERALD : k.up === false ? "#e05" : "#55503c",
                }}>
                  {k.up === true ? "↑" : k.up === false ? "↓" : "—"} {k.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 8, marginBottom: 12 }}>

            {/* Bar chart */}
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "12px 12px 8px",
            }}>
              <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#55503c", marginBottom: 10 }}>Consultas / semana</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 72 }}>
                {barData.map((v, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
                    <div style={{
                      width: "100%", borderRadius: "3px 3px 0 0",
                      height: `${Math.round(v / barMax * 60) + 6}px`,
                      background: i === barData.length - 1
                        ? GOLD
                        : "rgba(201,162,39,0.22)",
                      transition: "background .2s",
                    }} />
                    <span style={{ fontSize: 8, color: "#44402e", fontFamily: "'DM Mono', monospace" }}>{barLabels[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel */}
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "12px 12px 10px",
            }}>
              <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#55503c", marginBottom: 10 }}>Funnel</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {funnel.map(f => (
                  <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 9, color: "#44402e", minWidth: 58, fontFamily: "'DM Mono', monospace" }}>{f.label}</span>
                    <div style={{ flex: 1, height: 16, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{
                        width: `${f.pct}%`, height: "100%",
                        background: f.color, borderRadius: 3,
                        display: "flex", alignItems: "center", paddingLeft: 5,
                      }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#0c0c0a", fontFamily: "'DM Mono', monospace" }}>{f.pct}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline table */}
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, overflow: "hidden",
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#55503c" }}>Pipeline activo</span>
              <span style={{ fontSize: 9, color: "#3a3520" }}>5 de 12 deals</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr>
                  {["Contacto", "Etapa", "Valor", "Estado"].map(h => (
                    <th key={h} style={{
                      textAlign: "left", fontSize: 8.5, fontWeight: 700, letterSpacing: ".12em",
                      textTransform: "uppercase", color: "#3a3520",
                      padding: "7px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pipeline.map((row, i) => (
                  <tr key={i} style={{ filter: row.blur ? "blur(4px)" : "none", opacity: row.blur ? 0.4 : 1 }}>
                    <td style={{ padding: "8px 12px", color: "#8a8070", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{row.name}</td>
                    <td style={{ padding: "8px 12px", color: "#5a5440", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{row.etapa}</td>
                    <td style={{ padding: "8px 12px", color: "#8a8070", fontFamily: "'DM Mono', monospace", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{row.valor}</td>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <span style={{
                        fontSize: 8.5, fontWeight: 700, padding: "3px 8px", borderRadius: 100,
                        textTransform: "uppercase", letterSpacing: ".06em",
                        ...statusStyle[row.status],
                      }}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Lock CTA ── */}
      <div style={{
        textAlign: "center", padding: "24px 20px",
        borderTop: `1px solid rgba(201,162,39,0.10)`,
        background: "rgba(0,0,0,0.25)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
          <Lock size={12} style={{ color: GOLD, opacity: .5 }} />
          <p style={{ fontSize: 11, fontStyle: "italic", color: "#4a4535" }}>
            {fadeIn ? langs[obsLang] : langs[obsLang]}
          </p>
        </div>
        <p style={{ fontSize: 12, color: "#3a3520", marginBottom: 16 }}>
          El acceso completo al sistema se revela al ingresar.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#agenda"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "11px 22px", borderRadius: 11, fontSize: 13, fontWeight: 600,
              background: `linear-gradient(135deg, #8B6914, ${GOLD})`, color: "#0c0c0a",
              textDecoration: "none",
            }}
          >
            Solicitar acceso <ArrowRight size={14} />
          </a>
          <a
            href="#agenda"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "11px 20px", borderRadius: 11, fontSize: 13, fontWeight: 500,
              border: `1px solid ${GOLD_BD}`, color: GOLD, background: "transparent",
              textDecoration: "none",
            }}
          >
            Tengo una invitación
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
export function TabsCapabilities() {
  const [active, setActive] = useState(0)
  const isObsidiana = active === tabs.length
  const current = !isObsidiana ? tabs[active] : null

  return (
    <section id="sistema" className="section-dark noise relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

        @keyframes tcFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sistemaDriftA {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(4%,-5%) scale(1.08); }
        }
        @keyframes sistemaDriftB {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-3%,4%) scale(1.06); }
        }

        .tc-tab {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 100px;
          font-size: 13px; font-weight: 500; white-space: nowrap;
          cursor: pointer; flex-shrink: 0; border: none;
          transition: background .18s, color .18s, border-color .18s;
          font-family: inherit;
        }
        .tc-tab-default {
          background: rgba(255,255,255,0.03);
          color: #666055;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .tc-tab-default:hover { color: #a09070; border-color: rgba(255,255,255,0.13); }
        .tc-tab-active {
          background: ${GOLD};
          color: #0c0c0a;
          border: 1px solid transparent;
          font-weight: 600;
        }
        .tc-tab-obs {
          background: #0c0c0a;
          color: ${GOLD};
          border: 1px solid rgba(201,162,39,0.30);
        }
        .tc-tab-obs-active {
          background: linear-gradient(135deg,#8B6914,${GOLD});
          color: #0c0c0a;
          border: 1px solid transparent;
          font-weight: 600;
        }

        .tc-panel { animation: tcFadeUp .28s ease both; }

        .tc-bento-hero {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 28px 26px;
        }
        .tc-bento-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse at 90% 10%, rgba(201,162,39,0.07) 0%, transparent 55%);
        }

        .tc-bento-sm {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 22px 20px;
        }

        .tc-result-card {
          border-left: 2px solid ${GOLD};
          border-radius: 0 14px 14px 0;
          background: rgba(201,162,39,0.05);
          padding: 20px 20px;
        }

        .tc-tag {
          font-size: 11px; font-weight: 500; color: #555040;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px; padding: 4px 12px;
          background: rgba(255,255,255,0.02);
        }

        .tc-cta-btn {
          width: 100%; padding: 13px 0;
          border-radius: 12px; border: none; cursor: pointer;
          font-family: inherit; font-size: 14px; font-weight: 600;
          background: linear-gradient(135deg,#8B6914,${GOLD}); color: #0c0c0a;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: opacity .18s, transform .15s;
        }
        .tc-cta-btn:hover { opacity: .9; transform: scale(1.01); }
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
          background: `radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 65%)`,
          filter: "blur(80px)",
          animation: "sistemaDriftA 25s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", width: "40vw", height: "40vw",
          maxWidth: 500, maxHeight: 500, borderRadius: "50%",
          bottom: "-5%", left: "-5%",
          background: `radial-gradient(circle, rgba(26,107,107,0.06) 0%, transparent 65%)`,
          filter: "blur(90px)",
          animation: "sistemaDriftB 32s ease-in-out infinite alternate",
        }} />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-14 space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              El sistema
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light">
              Todo en un sistema integrado
            </h2>
            <p className="mx-auto max-w-xl text-base" style={{ color: "#55503c" }}>
              Cada pieza conectada con un propósito claro. No implementaciones aisladas — soluciones para cada etapa.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab pills */}
        <ScrollReveal delay={50}>
          <div style={{
            display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none",
            paddingBottom: 14, marginBottom: 10,
            WebkitOverflowScrolling: "touch",
          }}>
            {tabs.map((tab, i) => {
              const Icon = tab.Icon
              const isActive = active === i
              return (
                <button
                  key={tab.label}
                  onClick={() => setActive(i)}
                  className={`tc-tab ${isActive ? "tc-tab-active" : "tc-tab-default"}`}
                >
                  <Icon size={13} style={{ flexShrink: 0 }} />
                  {tab.label}
                </button>
              )
            })}
            <button
              onClick={() => setActive(tabs.length)}
              className={`tc-tab ${isObsidiana ? "tc-tab-obs-active" : "tc-tab-obs"}`}
            >
              <Circle size={7} fill="currentColor" style={{ flexShrink: 0 }} />
              Obsidiana
            </button>
          </div>
        </ScrollReveal>

        {/* Panels */}
        <ScrollReveal delay={100}>

          {/* Obsidiana */}
          {isObsidiana && (
            <div className="tc-panel mx-auto max-w-4xl">
              <ObsidianaCard />
            </div>
          )}

          {/* Regular tab panel — dense 3-zone bento */}
          {!isObsidiana && current && (() => {
            const Icon = current.Icon
            return (
              <div key={active} className="tc-panel mx-auto max-w-4xl">

                {/* Row 1: hero + result stacked + cta stacked */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 10,
                }}>

                  {/* ── Top row: hero | (result + cta) ── */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 10,
                  }}
                    className="md:grid-cols-[1fr_300px]"
                  >

                    {/* Hero */}
                    <div className="tc-bento-hero">
                      <div style={{
                        display: "inline-block",
                        fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
                        textTransform: "uppercase", color: GOLD,
                        border: `1px solid ${GOLD_BD}`, background: GOLD_DIM,
                        borderRadius: 100, padding: "4px 12px", marginBottom: 18,
                      }}>
                        {current.etapa}
                      </div>

                      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                        <div style={{
                          flexShrink: 0, width: 40, height: 40, borderRadius: 11,
                          background: GOLD_DIM, border: `1px solid ${GOLD_BD}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Icon size={18} style={{ color: GOLD }} />
                        </div>
                        <h3 style={{
                          fontSize: "clamp(17px,3vw,21px)", fontWeight: 400,
                          lineHeight: 1.3, color: "#e8e4d8", paddingTop: 2,
                        }}>
                          {current.title}
                        </h3>
                      </div>

                      <p style={{ fontSize: 13.5, color: "#55503c", lineHeight: 1.7 }}>
                        {current.description}
                      </p>
                    </div>

                    {/* Right column: result + cta */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                      {/* Result */}
                      <div className="tc-result-card" style={{ flex: 1 }}>
                        <p style={{
                          fontSize: 9, fontWeight: 700, letterSpacing: ".22em",
                          textTransform: "uppercase", color: GOLD, marginBottom: 10,
                        }}>
                          Resultado esperado
                        </p>
                        <p style={{ fontSize: 13, color: "#6a6450", lineHeight: 1.65 }}>
                          {current.resultado}
                        </p>
                      </div>

                      {/* CTA */}
                      <div style={{
                        background: "rgba(201,162,39,0.05)",
                        border: `1px solid ${GOLD_BD}`,
                        borderRadius: 16, padding: "18px 18px",
                      }}>
                        <button className="tc-cta-btn">
                          Implementar esto <ArrowRight size={14} />
                        </button>
                        <p style={{ fontSize: 11.5, color: "#44402e", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
                          Agendá una sesión y diseñamos el sistema juntos.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* ── Bottom row: bullets | tags ── */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
                    className="sm:grid-cols-[3fr_2fr]"
                  >

                    {/* Bullets */}
                    <div className="tc-bento-sm">
                      <p style={{
                        fontSize: 9.5, fontWeight: 700, letterSpacing: ".14em",
                        textTransform: "uppercase", color: "#44402e", marginBottom: 14,
                      }}>
                        Qué incluye
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {current.bullets.map((b, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <CheckCircle2 size={14} style={{ color: EMERALD, flexShrink: 0, marginTop: 1 }} />
                            <span style={{ fontSize: 13, color: "#6a6450", lineHeight: 1.5 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="tc-bento-sm">
                      <p style={{
                        fontSize: 9.5, fontWeight: 700, letterSpacing: ".14em",
                        textTransform: "uppercase", color: "#44402e", marginBottom: 14,
                      }}>
                        Herramientas
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {current.tags.map(t => (
                          <span key={t} className="tc-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )
          })()}

        </ScrollReveal>
      </div>
    </section>
  )
}