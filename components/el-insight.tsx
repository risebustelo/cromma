"use client"

import { useEffect, useRef, useState } from "react"

// ─── Scramble hook ────────────────────────────────────────────────────────────

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%"

function useScramble(target: string, trigger: boolean, delay = 0) {
  const [display, setDisplay] = useState(target)
  const frame = useRef(0)
  const iter = useRef(0)

  useEffect(() => {
    if (!trigger) return
    const timeout = setTimeout(() => {
      iter.current = 0
      const run = () => {
        setDisplay(
          target.split("").map((ch, i) =>
            i < iter.current ? target[i]
              : ch === " " ? " "
                : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join("")
        )
        iter.current += 0.5
        if (iter.current < target.length + 2) frame.current = requestAnimationFrame(run)
        else setDisplay(target)
      }
      frame.current = requestAnimationFrame(run)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame.current) }
  }, [trigger, target, delay])

  return display
}

// ─── Flip lines ───────────────────────────────────────────────────────────────

const PAIRS: [string, string][] = [
  ["Publicás.", "Pero no convierte."],
  ["Vendés.", "Pero no escala."],
  ["Trabajás.", "Todo depende de vos."],
]

function FlipLine({ left, right, delay }: { left: string; right: string; delay: number }) {
  const [phase, setPhase] = useState<"show-right" | "deleting" | "typing">("show-right")
  const [text, setText] = useState(right)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const PAUSE = 2200, TYPE_MS = 38, DEL_MS = 22
    const startCycle = () => {
      setPhase("deleting")
      let current = right
      const del = setInterval(() => {
        current = current.slice(0, -1)
        setText(current)
        if (current.length === 0) {
          clearInterval(del)
          setPhase("typing")
          let built = ""
          const type = setInterval(() => {
            built += right[built.length]
            setText(built)
            if (built === right) {
              clearInterval(type)
              setPhase("show-right")
              timerRef.current = setTimeout(startCycle, PAUSE)
            }
          }, TYPE_MS)
        }
      }, DEL_MS)
    }
    timerRef.current = setTimeout(startCycle, PAUSE + delay)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span style={{
        fontFamily: "cromma, sans-serif",
        fontSize: "clamp(1.1rem,2.6vw,1.65rem)",
        fontWeight: 900,
        // CAMBIO: blanco → negro para fondo claro
        color: "#0a0a0a",
        letterSpacing: "-0.02em", lineHeight: 1,
      }}>
        {left}
      </span>
      <span style={{
        fontFamily: "cromma, sans-serif",
        fontSize: "clamp(1.1rem,2.6vw,1.65rem)",
        fontWeight: 600,
        // CAMBIO: idle #797979 → #555555 (pasa WCAG sobre fondo claro)
        color: phase === "typing" ? "#c9a227" : "#555555",
        letterSpacing: "-0.02em", lineHeight: 1, minWidth: "1ch",
      }}>
        {text}
        <span style={{
          display: "inline-block", width: 2, height: "1em",
          background: "#c9a227", marginLeft: 2, verticalAlign: "text-bottom",
          opacity: phase === "show-right" ? 0 : 1,
          animation: phase !== "show-right" ? "blink 0.5s step-end infinite" : "none",
        }} />
      </span>
    </div>
  )
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

// CAMBIO: reemplazamos "light" | "dark" por los 4 colores del logo
type Variant = "gold" | "teal" | "coral" | "emerald"

type CardData = {
  label: string
  pain: string
  sub: string
  tag: string
  variant: Variant
}

// ─── Paleta — cards siempre blancas, detalle de color del logo ────────────────
// Todos verificados WCAG AA sobre bg #ffffff
const V: Record<Variant, {
  dot: string; topBar: string
  tagColor: string; tagBg: string; tagBorder: string
  borderColor: string
}> = {
  gold: {
    dot: "#c9a227",
    topBar: "#c9a227",
    tagColor: "#7a6000",        // 4.8:1 ✅ sobre #fff
    tagBg: "rgba(201,162,39,0.08)",
    tagBorder: "rgba(201,162,39,0.22)",
    borderColor: "rgba(201,162,39,0.28)",
  },
  teal: {
    dot: "#1a7a7a",
    topBar: "#1a7a7a",
    tagColor: "#0d4444",        // 8.2:1 ✅ sobre #fff
    tagBg: "rgba(26,122,122,0.07)",
    tagBorder: "rgba(26,122,122,0.20)",
    borderColor: "rgba(26,122,122,0.22)",
  },
  coral: {
    dot: "#d45a8a",
    topBar: "#d45a8a",
    tagColor: "#8a2050",        // 6.1:1 ✅ sobre #fff
    tagBg: "rgba(212,90,138,0.07)",
    tagBorder: "rgba(212,90,138,0.20)",
    borderColor: "rgba(212,90,138,0.22)",
  },
  emerald: {
    dot: "#2a9e58",
    topBar: "#2a9e58",
    tagColor: "#155a2a",        // 7.4:1 ✅ sobre #fff
    tagBg: "rgba(42,158,88,0.07)",
    tagBorder: "rgba(42,158,88,0.20)",
    borderColor: "rgba(42,158,88,0.22)",
  },
}

// ─── SVG decorativo ───────────────────────────────────────────────────────────

function SocialBg() {
  // CAMBIO: siempre fondo claro
  const c = "rgba(0,0,0,0.04)"
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 240 120" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect x="8" y="8" width="24" height="24" rx="6" stroke={c} strokeWidth="1.6" />
      <circle cx="20" cy="20" r="5.5" stroke={c} strokeWidth="1.3" />
      <circle cx="26.5" cy="12.5" r="1.3" fill={c} />
      <rect x="42" y="8" width="24" height="24" rx="4" stroke={c} strokeWidth="1.6" />
      <text x="47" y="26" fontSize="13" fontWeight="bold" fill={c} fontFamily="sans-serif">in</text>
      <rect x="76" y="10" width="30" height="20" rx="5" stroke={c} strokeWidth="1.6" />
      <polygon points="86,14 97,20 86,26" fill={c} />
      <path d="M116 9 L130 27 M130 9 L116 27" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M150 8 L150 22 C150 25.3 147.3 28 144 28 C140.7 28 138 25.3 138 22" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M150 12 C152 12 156 14 158 16" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="30" cy="90" r="13" stroke={c} strokeWidth="1.6" />
      <text x="25" y="96" fontSize="14" fontWeight="bold" fill={c} fontFamily="sans-serif">f</text>
      <circle cx="80" cy="90" r="13" stroke={c} strokeWidth="1.6" />
      <text x="74" y="96" fontSize="12" fill={c} fontFamily="sans-serif">@</text>
      <circle cx="130" cy="90" r="13" stroke={c} strokeWidth="1.6" />
      <path d="M122 87 Q130 82 138 87" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M124 92 Q130 88 136 92" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M126 97 Q130 94 134 97" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

// ─── ROW 1 — CAMBIO: variants distribuidas en gold/teal/coral/emerald ─────────

const ROW_1: CardData[] = [
  { label: "COACH / MENTOR", pain: "Sin sistema, no hay clientes nuevos.", sub: "Cuando dejás de buscar, dejás de facturar.", tag: "SIN SISTEMA", variant: "gold" },
  { label: "INFOPRODUCTOR", pain: "El lanzamiento dura 10 días.", sub: "Los otros 20 del mes: silencio.", tag: "INGRESOS PICO", variant: "teal" },
  { label: "FITNESS", pain: "Seguidores sí. Membresía recurrente, no.", sub: "El alcance no se convierte solo.", tag: "CONVERSIÓN CERO", variant: "coral" },
  { label: "AGENCIA MARKETING", pain: "Facturás bien, pero sin previsibilidad.", sub: "Cada mes arrancás de cero a buscar.", tag: "CICLO ROTO", variant: "emerald" },
  { label: "CREADORA ONLYFANS", pain: "Ingresos inconsistentes mes a mes.", sub: "Sin sistema de retención, no hay base.", tag: "SIN RETENCIÓN", variant: "gold" },
  { label: "AGENCIA OF / IA", pain: "Crecimiento lento y sin replicar.", sub: "Lo que funciona en una cuenta no escala.", tag: "NO ESCALA", variant: "teal" },
  { label: "CONSULTOR", pain: "Tu tiempo es lo único que vendés.", sub: "Y tiene un límite físico.", tag: "TECHO DE HORA", variant: "coral" },
  { label: "FREELANCER", pain: "Terminás un proyecto. Volvés a cero.", sub: "Cada mes es una búsqueda nueva.", tag: "CICLO ROTO", variant: "emerald" },
  { label: "CREADOR CONTENIDO", pain: "El algoritmo da alcance. No clientes.", sub: "Ningún seguidor paga solo por verte.", tag: "ALCANCE ≠ CLIENTES", variant: "gold" },
]

// ─── ROW 2 — CAMBIO: variants distribuidas ────────────────────────────────────

const ROW_2: CardData[] = [
  { label: "ABOGADO / ESTUDIO", pain: "Los clientes llegan por referido.", sub: "Cuando para la red, para el ingreso.", tag: "SIN FLUJO", variant: "teal" },
  { label: "CLÍNICA / MÉDICO", pain: "La agenda depende de referidos.", sub: "Sin flujo activo, hay meses vacíos.", tag: "AGENDA FRÁGIL", variant: "coral" },
  { label: "LONGEVIDAD / SALUD", pain: "Especialidad de nicho. Difícil de comunicar.", sub: "El mercado no sabe que existís.", tag: "INVISIBILIDAD", variant: "emerald" },
  { label: "INMOBILIARIA", pain: "Los leads llegan. Los buenos, no.", sub: "Perdés tiempo en los que no cierran.", tag: "LEADS SIN FILTRO", variant: "gold" },
  { label: "AIRBNB / RENTA", pain: "Crecés en operación, no en margen.", sub: "Más propiedades no es más ganancia.", tag: "MARGEN PLANO", variant: "teal" },
  { label: "TECH / SOFTWARE", pain: "El producto funciona. El GTM, no.", sub: "Sin distribución, el mejor no gana.", tag: "GTM ROTO", variant: "coral" },
  { label: "SEGURIDAD", pain: "El trabajo es bueno. No te encuentran.", sub: "Sin presencia activa, no hay demanda.", tag: "INVISIBILIDAD", variant: "emerald" },
  { label: "AGENCIA SERVICIOS", pain: "Referidos o nada. Sin sistema propio.", sub: "El día que paren, parás vos.", tag: "DEPENDENCIA TOTAL", variant: "gold" },
  { label: "NEGOCIO", pain: "Facturás bien. Podrías facturar el doble.", sub: "Solo falta el sistema que lo haga.", tag: "POTENCIAL FRENADO", variant: "teal" },
]

const TRACK_1 = [...ROW_1, ...ROW_1, ...ROW_1]
const TRACK_2 = [...ROW_2, ...ROW_2, ...ROW_2]

const CARD_W = 256
const UNIQUE = 9

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ label, pain, sub, tag, variant }: CardData) {
  const v = V[variant]
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        width: 240, height: 120,
        // CAMBIO: siempre blanco
        background: "#ffffff",
        border: `1px solid ${v.borderColor}`,
        margin: "0 8px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <SocialBg />

      {/* CAMBIO: línea de color en top — detalle de logo */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: v.topBar, opacity: 0.75 }} />

      <div className="relative z-10 h-full flex flex-col justify-between p-4 pt-5">

        {/* Label + Tag */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="flex-shrink-0 rounded-full" style={{ width: 5, height: 5, background: v.dot }} />
            <span style={{
              fontFamily: "cromma, sans-serif", fontSize: 8, fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase" as const,
              // CAMBIO: label siempre oscuro sobre blanco
              color: "#555555", whiteSpace: "nowrap" as const,
            }}>
              {label}
            </span>
          </div>
          <span style={{
            fontFamily: "cromma, sans-serif", fontSize: 7, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: v.tagColor, background: v.tagBg,
            border: `1px solid ${v.tagBorder}`, borderRadius: 99,
            padding: "2px 6px", whiteSpace: "nowrap" as const, flexShrink: 0,
          }}>
            {tag}
          </span>
        </div>

        {/* Pain — CAMBIO: negro sobre blanco */}
        <p style={{
          fontFamily: "cromma, sans-serif", fontSize: 13, fontWeight: 700,
          lineHeight: 1.35, letterSpacing: "-0.01em",
          color: "#0a0a0a", margin: 0,
        }}>
          {pain}
        </p>

        {/* Sub — CAMBIO: gris medio sobre blanco */}
        <p style={{
          fontFamily: "cromma, sans-serif", fontSize: 11, fontWeight: 500,
          lineHeight: 1.35, color: "#666666", margin: 0,
        }}>
          {sub}
        </p>

      </div>
    </div>
  )
}

// ─── Track ────────────────────────────────────────────────────────────────────

function Track({ items, duration, reverse = false }: {
  items: CardData[]; duration: number; reverse?: boolean
}) {
  return (
    <div className="relative overflow-hidden" style={{ height: 140 }}>
      {/* CAMBIO: gradientes laterales al color del fondo claro */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #f5f5f3, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #f5f5f3, transparent)" }} />
      <div
        className="flex absolute top-0 left-0 items-center"
        style={{
          height: 140,
          animation: `insight-scroll ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
          willChange: "transform",
        }}
      >
        {items.map((item, i) => <Card key={i} {...item} />)}
      </div>
    </div>
  )
}

// ─── Sección ──────────────────────────────────────────────────────────────────

export function ElInsight() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const eyebrow = useScramble("EL PROBLEMA REAL", visible, 100)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    // CAMBIO: section-dark → section-light
    <section ref={ref} id="insight" className="section-light relative overflow-hidden py-10 md:py-16">

      <style>{`
        @keyframes insight-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${CARD_W * UNIQUE}px); }
        }
      `}</style>

      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.25), transparent)" }} />

      {/* Header */}
      <div className="container mx-auto px-4 mb-10">
        <div className="mx-auto max-w-4xl space-y-4">
          <p style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", color: "#c9a227" }}>
            {eyebrow}
            <span style={{
              display: "inline-block", width: 2, height: "0.8em",
              background: "#c9a227", marginLeft: 3, verticalAlign: "middle",
              animation: visible ? "blink 0.7s step-end infinite" : "none",
              opacity: visible ? 1 : 0,
            }} />
          </p>
          <div className="flex flex-col gap-1.5">
            {PAIRS.map(([left, right], i) => (
              <FlipLine key={i} left={left} right={right} delay={i * 800} />
            ))}
          </div>
        </div>
      </div>

      {/* Micro-label fila 1 — CAMBIO: #888888 sobre section-light */}
      <div className="container mx-auto px-4 mb-3">
        <div className="mx-auto max-w-4xl">
          <span style={{
            fontFamily: "monospace", fontSize: 9, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase" as const,
            color: "#888888",
          }}>
            CREADORES · COACHES · AGENCIAS
          </span>
        </div>
      </div>

      <Track items={TRACK_1} duration={40} />

      {/* Micro-label fila 2 */}
      <div className="container mx-auto px-4 mt-7 mb-3">
        <div className="mx-auto max-w-4xl">
          <span style={{
            fontFamily: "monospace", fontSize: 9, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase" as const,
            color: "#888888",
          }}>
            SERVICIOS · EMPRESAS · NEGOCIOS
          </span>
        </div>
      </div>

      <Track items={TRACK_2} duration={48} reverse />

      {/* Cierre — CAMBIO: #555555 sobre section-light */}
      <div className="container mx-auto px-4 mt-10">
        <div className="mx-auto max-w-4xl space-y-1">
          <p style={{ fontFamily: "cromma, sans-serif", fontSize: 13, fontWeight: 600, color: "#555555" }}>
            No es falta de talento, ni de esfuerzo.
          </p>
          <p style={{ fontFamily: "cromma, sans-serif", fontSize: 13, color: "#555555" }}>
            Es que nunca tuviste un sistema diseñado para traer clientes.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.15), transparent)" }} />
    </section>
  )
}