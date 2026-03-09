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
            i < iter.current
              ? target[i]
              : ch === " " ? " "
                : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join("")
        )
        iter.current += 0.5
        if (iter.current < target.length + 2) {
          frame.current = requestAnimationFrame(run)
        } else {
          setDisplay(target)
        }
      }
      frame.current = requestAnimationFrame(run)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame.current) }
  }, [trigger, target, delay])

  return display
}

// ─── Flip lines ───────────────────────────────────────────────────────────────

const PAIRS: [string, string][] = [
  ["Trabajás.", "Pero todo depende de vos."],
  ["Publicás.", "Pero nadie te compra."],
  ["Facturás.", "Pero no escala solo."],
]

function FlipLine({ left, right, delay }: { left: string; right: string; delay: number }) {
  const [phase, setPhase] = useState<"show-right" | "deleting" | "typing">("show-right")
  const [text, setText] = useState(right)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const PAUSE = 2200
    const TYPE_MS = 38
    const DEL_MS = 22

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
      <span className="font-black leading-none"
        style={{ fontFamily: "cromma, sans-serif", fontSize: "clamp(1.1rem,2.6vw,1.65rem)", color: "#ffffff", letterSpacing: "-0.02em" }}>
        {left}
      </span>
      <span className="font-semibold leading-none"
        style={{ fontFamily: "cromma, sans-serif", fontSize: "clamp(1.1rem,2.6vw,1.65rem)", color: phase === "typing" ? "#c9a227" : "#444444", letterSpacing: "-0.02em", minWidth: "1ch" }}>
        {text}
        <span style={{
          display: "inline-block", width: "2px", height: "1em", background: "#c9a227",
          marginLeft: "2px", verticalAlign: "text-bottom",
          opacity: phase === "show-right" ? 0 : 1,
          animation: phase !== "show-right" ? "blink 0.5s step-end infinite" : "none",
        }} />
      </span>
    </div>
  )
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Variant = "gold" | "light" | "dark"

// urgency: qué está pasando HOY sin sistema — aparece como tag pequeño arriba a la derecha
// loss: lo que se pierde cada mes — número concreto
type CardData = {
  label: string
  pain: string       // problema principal — una línea, presente continuo
  sub: string        // consecuencia concreta — segunda línea, más corta
  tag: string        // micro-tag de urgencia: "SIN SISTEMA" / "TECHO CLARO" / etc
  variant: Variant
}

// ─── Estilos por variante ─────────────────────────────────────────────────────

const V: Record<Variant, {
  bg: string; border: string
  labelColor: string; dot: string
  painColor: string; subColor: string
  tagBg: string; tagColor: string
  tagBorder: string
}> = {
  gold: {
    bg: "#0d0c09",
    border: "rgba(201,162,39,0.25)",
    labelColor: "rgba(201,162,39,0.55)",
    dot: "#c9a227",
    painColor: "#e8d49a",
    subColor: "rgba(201,162,39,0.45)",
    tagBg: "rgba(201,162,39,0.08)",
    tagColor: "rgba(201,162,39,0.7)",
    tagBorder: "rgba(201,162,39,0.2)",
  },
  light: {
    bg: "#eeede7",
    border: "rgba(0,0,0,0.08)",
    labelColor: "rgba(0,0,0,0.32)",
    dot: "#1a1a1a",
    painColor: "#111111",
    subColor: "rgba(0,0,0,0.38)",
    tagBg: "rgba(0,0,0,0.05)",
    tagColor: "rgba(0,0,0,0.4)",
    tagBorder: "rgba(0,0,0,0.1)",
  },
  dark: {
    bg: "#0e0e0e",
    border: "rgba(255,255,255,0.06)",
    labelColor: "rgba(255,255,255,0.25)",
    dot: "rgba(255,255,255,0.4)",
    painColor: "rgba(255,255,255,0.85)",
    subColor: "rgba(255,255,255,0.32)",
    tagBg: "rgba(255,255,255,0.04)",
    tagColor: "rgba(255,255,255,0.3)",
    tagBorder: "rgba(255,255,255,0.08)",
  },
}

// ─── ROW 1 — Creadores, coaches, infoproductores ──────────────────────────────
// Pain: lo que viven HOY. Sub: la consecuencia directa. Tag: el cuello de botella.

const ROW_1: CardData[] = [
  {
    label: "COACH / MENTOR",
    pain: "Cada cliente te costó una llamada.",
    sub: "Cuando dejás de buscar, dejás de facturar.",
    tag: "SIN SISTEMA",
    variant: "gold",
  },
  {
    label: "CONSULTOR",
    pain: "Tu tiempo es el único activo que vendés.",
    sub: "Y tiene un límite físico. Ya lo sabés.",
    tag: "TECHO CLARO",
    variant: "light",
  },
  {
    label: "AGENCIA",
    pain: "Vos cerrás. Tu equipo no puede.",
    sub: "El negocio escala solo si vos escalás.",
    tag: "CUELLO DE BOTELLA",
    variant: "dark",
  },
  {
    label: "INFOPRODUCTOR",
    pain: "El lanzamiento dura 10 días.",
    sub: "Los otros 20, silencio.",
    tag: "INGRESOS PICO",
    variant: "gold",
  },
  {
    label: "CREADOR DE CONTENIDO",
    pain: "El algoritmo te da alcance. No clientes.",
    sub: "Ningún seguidor paga solo por verte.",
    tag: "CONVERSIÓN CERO",
    variant: "light",
  },
  {
    label: "FREELANCER",
    pain: "Terminás un proyecto y volvés a cero.",
    sub: "Cada mes es una búsqueda nueva.",
    tag: "CICLO ROTO",
    variant: "dark",
  },
  {
    label: "SPEAKER / FORMADOR",
    pain: "El escenario llena la sala. No el pipeline.",
    sub: "La audiencia aplaude. Después, nada.",
    tag: "SIN CONVERSIÓN",
    variant: "gold",
  },
  {
    label: "MARCA PERSONAL",
    pain: "Tenés presencia. No tenés flujo.",
    sub: "La marca no vende sola sin un sistema detrás.",
    tag: "FLUJO INEXISTENTE",
    variant: "light",
  },
  {
    label: "EXPERTO DE NICHO",
    pain: "El mercado no sabe que existís.",
    sub: "Tu competencia cobra más. Y aparece primero.",
    tag: "INVISIBILIDAD",
    variant: "dark",
  },
]

// ─── ROW 2 — Servicios profesionales y negocios ───────────────────────────────

const ROW_2: CardData[] = [
  {
    label: "PROFESIONAL INDEPENDIENTE",
    pain: "Más horas no es más dinero.",
    sub: "Ya llegaste al techo de lo que podés cobrar por hora.",
    tag: "TECHO DE HORA",
    variant: "light",
  },
  {
    label: "ESTUDIO / FIRMA",
    pain: "Dos clientes grandes son toda la firma.",
    sub: "Si uno se va, el mes se cae.",
    tag: "RIESGO CONCENTRADO",
    variant: "gold",
  },
  {
    label: "SERVICIO LOCAL",
    pain: "El boca a boca llegó hasta acá.",
    sub: "A partir de ahora, no crece solo.",
    tag: "LÍMITE DE RED",
    variant: "dark",
  },
  {
    label: "EMPRESA B2B",
    pain: "Cada venta tarda meses.",
    sub: "Sin sistema, no podés predecir ni planificar.",
    tag: "CICLOS LARGOS",
    variant: "light",
  },
  {
    label: "ECOMMERCE",
    pain: "Compraron una vez. No volvieron.",
    sub: "El costo de adquisición no para de subir.",
    tag: "SIN RETENCIÓN",
    variant: "gold",
  },
  {
    label: "TECNOLOGÍA / SOFTWARE",
    pain: "El producto funciona. El go-to-market, no.",
    sub: "Sin distribución, el mejor producto no gana.",
    tag: "DISTRIBUCIÓN ROTA",
    variant: "dark",
  },
  {
    label: "INMOBILIARIA",
    pain: "Los leads llegan. Los buenos, no.",
    sub: "Perdés tiempo en prospectos que nunca cierran.",
    tag: "LEADS SIN FILTRO",
    variant: "light",
  },
  {
    label: "STARTUP",
    pain: "Crecés a fuerza de voluntad.",
    sub: "Eso no escala. Y ya empezás a sentirlo.",
    tag: "TRACCIÓN MANUAL",
    variant: "gold",
  },
  {
    label: "NEGOCIO ESTABLECIDO",
    pain: "Facturás bien. Pero podrías facturar el doble.",
    sub: "Y lo sabés. Sólo falta el sistema que lo haga.",
    tag: "POTENCIAL FRENADO",
    variant: "dark",
  },
]

const TRACK_1 = [...ROW_1, ...ROW_1, ...ROW_1]
const TRACK_2 = [...ROW_2, ...ROW_2, ...ROW_2]

const CARD_W = 222   // 208px card + 14px margin
const UNIQUE = 9

// ─── Card mejorada ────────────────────────────────────────────────────────────
// Layout: label + dot arriba | pain (grande) en medio | sub + tag abajo

function Card({ label, pain, sub, tag, variant }: CardData) {
  const v = V[variant]
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        width: 208,
        height: 110,
        background: v.bg,
        border: `1px solid ${v.border}`,
        margin: "0 7px",
      }}
    >
      {/* Gradiente sutil en esquina superior derecha */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
        style={{
          background: variant === "gold"
            ? "radial-gradient(circle at top right, rgba(201,162,39,0.07), transparent 70%)"
            : variant === "light"
              ? "radial-gradient(circle at top right, rgba(0,0,0,0.03), transparent 70%)"
              : "radial-gradient(circle at top right, rgba(255,255,255,0.03), transparent 70%)",
        }} />

      <div className="relative z-10 h-full flex flex-col justify-between p-3.5">

        {/* Fila superior: label + tag */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: v.dot }} />
            <span
              className="text-[7.5px] font-bold tracking-[0.18em] uppercase truncate"
              style={{ color: v.labelColor, fontFamily: "cromma, sans-serif" }}
            >
              {label}
            </span>
          </div>
          {/* Tag de urgencia */}
          <span
            className="flex-shrink-0 text-[6.5px] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-full"
            style={{
              color: v.tagColor,
              background: v.tagBg,
              border: `1px solid ${v.tagBorder}`,
              fontFamily: "cromma, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        </div>

        {/* Pain — línea principal */}
        <p
          className="text-[12px] font-bold leading-snug"
          style={{ color: v.painColor, fontFamily: "cromma, sans-serif", letterSpacing: "-0.01em" }}
        >
          {pain}
        </p>

        {/* Sub — consecuencia */}
        <p
          className="text-[10px] font-medium leading-snug"
          style={{ color: v.subColor, fontFamily: "cromma, sans-serif" }}
        >
          {sub}
        </p>

      </div>
    </div>
  )
}

// ─── Track ────────────────────────────────────────────────────────────────────

function Track({ items, duration, reverse = false, bgFrom }: {
  items: CardData[]
  duration: number
  reverse?: boolean
  bgFrom?: string
}) {
  const bg = bgFrom ?? "#0a0a0a"
  return (
    <div className="relative overflow-hidden" style={{ height: 128 }}>
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${bg}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${bg}, transparent)` }} />
      <div
        className="flex absolute top-0 left-0 items-center"
        style={{
          height: 128,
          animation: `insight-scroll ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
          willChange: "transform",
        }}
      >
        {items.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </div>
  )
}

// ─── Sección principal ────────────────────────────────────────────────────────

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
    <section ref={ref} id="insight" className="section-dark relative overflow-hidden py-10 md:py-16">

      <style>{`
        @keyframes insight-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${CARD_W * UNIQUE}px); }
        }
      `}</style>

      {/* Línea superior dorada */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.2), transparent)" }} />

      {/* Header */}
      <div className="container mx-auto px-4 mb-10">
        <div className="mx-auto max-w-4xl space-y-4">
          <p className="text-[10px] font-bold tracking-[0.25em] font-mono" style={{ color: "#c9a227" }}>
            {eyebrow}
            <span style={{
              display: "inline-block", width: "2px", height: "0.8em",
              background: "#c9a227", marginLeft: "3px", verticalAlign: "middle",
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

      {/* Micro-label fila 1 */}
      <div className="container mx-auto px-4 mb-3">
        <div className="mx-auto max-w-4xl">
          <span className="text-[8.5px] font-bold tracking-[0.22em] font-mono"
            style={{ color: "rgba(255,255,255,0.15)" }}>CREADORES · COACHES · AGENCIAS</span>
        </div>
      </div>

      <Track items={TRACK_1} duration={36} />

      {/* Micro-label fila 2 */}
      <div className="container mx-auto px-4 mt-6 mb-3">
        <div className="mx-auto max-w-4xl">
          <span className="text-[8.5px] font-bold tracking-[0.22em] font-mono"
            style={{ color: "rgba(255,255,255,0.15)" }}>SERVICIOS · EMPRESAS · NEGOCIOS</span>
        </div>
      </div>

      <Track items={TRACK_2} duration={44} reverse />

      {/* Cierre */}
      <div className="container mx-auto px-4 mt-10">
        <div className="mx-auto max-w-4xl space-y-1">
          <p className="text-[13px] font-semibold" style={{ color: "#444444" }}>
            No es falta de talento, ni de esfuerzo.
          </p>
          <p className="text-[13px]" style={{ color: "#333333" }}>
            Es que nunca tuviste un sistema diseñado para traer clientes.
          </p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.12), transparent)" }} />
    </section>
  )
}