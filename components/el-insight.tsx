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
      <span
        className="font-black leading-none"
        style={{
          fontFamily: "cromma, sans-serif",
          fontSize: "clamp(1.1rem, 2.6vw, 1.65rem)",
          color: "#ffffff",
          letterSpacing: "-0.02em",
        }}
      >
        {left}
      </span>
      <span
        className="font-semibold leading-none"
        style={{
          fontFamily: "cromma, sans-serif",
          fontSize: "clamp(1.1rem, 2.6vw, 1.65rem)",
          color: phase === "typing" ? "#c9a227" : "#444444",
          letterSpacing: "-0.02em",
          minWidth: "1ch",
        }}
      >
        {text}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            background: "#c9a227",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            opacity: phase === "show-right" ? 0 : 1,
            animation: phase !== "show-right" ? "blink 0.5s step-end infinite" : "none",
          }}
        />
      </span>
    </div>
  )
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Variant = "gold" | "light" | "dark"

type CardData = {
  label: string   // perfil — corto, en mayúsculas
  pain: string    // problema principal — 1 línea corta, impacta de golpe
  sub: string     // consecuencia — 1 línea, refuerza el dolor
  tag: string     // nombre del cuello de botella — muy corto
  variant: Variant
}

const V: Record<Variant, {
  bg: string
  border: string
  labelColor: string
  dot: string
  painColor: string
  subColor: string
  tagBg: string
  tagColor: string
  tagBorder: string
  glow: string
}> = {
  gold: {
    bg: "#0d0c09",
    border: "rgba(201,162,39,0.22)",
    labelColor: "rgba(201,162,39,0.5)",
    dot: "#c9a227",
    painColor: "#f0dfa0",
    subColor: "rgba(201,162,39,0.42)",
    tagBg: "rgba(201,162,39,0.09)",
    tagColor: "rgba(201,162,39,0.65)",
    tagBorder: "rgba(201,162,39,0.18)",
    glow: "rgba(201,162,39,0.05)",
  },
  light: {
    bg: "#eeedea",
    border: "rgba(0,0,0,0.07)",
    labelColor: "rgba(0,0,0,0.3)",
    dot: "#222222",
    painColor: "#0e0e0e",
    subColor: "rgba(0,0,0,0.36)",
    tagBg: "rgba(0,0,0,0.05)",
    tagColor: "rgba(0,0,0,0.38)",
    tagBorder: "rgba(0,0,0,0.1)",
    glow: "rgba(0,0,0,0.02)",
  },
  dark: {
    bg: "#0e0e0e",
    border: "rgba(255,255,255,0.06)",
    labelColor: "rgba(255,255,255,0.24)",
    dot: "rgba(255,255,255,0.38)",
    painColor: "rgba(255,255,255,0.88)",
    subColor: "rgba(255,255,255,0.3)",
    tagBg: "rgba(255,255,255,0.04)",
    tagColor: "rgba(255,255,255,0.28)",
    tagBorder: "rgba(255,255,255,0.08)",
    glow: "rgba(255,255,255,0.02)",
  },
}

// ─── Datos — copy quirúrgico, líneas cortas que entran en la card ─────────────
// Regla: pain ≤ 38 chars | sub ≤ 42 chars | tag ≤ 18 chars | label ≤ 22 chars

const ROW_1: CardData[] = [
  {
    label: "COACH / MENTOR",
    pain: "Sin sistema, no hay clientes nuevos.",
    sub: "Cuando dejás de buscar, dejás de facturar.",
    tag: "SIN SISTEMA",
    variant: "gold",
  },
  {
    label: "CONSULTOR",
    pain: "Tu tiempo es lo único que vendés.",
    sub: "Y tiene un límite físico.",
    tag: "TECHO DE HORA",
    variant: "light",
  },
  {
    label: "AGENCIA",
    pain: "Vos cerrás. Tu equipo, no puede.",
    sub: "El negocio escala solo si vos escalás.",
    tag: "CUELLO DE BOTELLA",
    variant: "dark",
  },
  {
    label: "INFOPRODUCTOR",
    pain: "El lanzamiento dura 10 días.",
    sub: "Los otros 20 del mes: silencio.",
    tag: "INGRESOS PICO",
    variant: "gold",
  },
  {
    label: "CREADOR DE CONTENIDO",
    pain: "El algoritmo da alcance. No clientes.",
    sub: "Ningún seguidor paga solo por verte.",
    tag: "CONVERSIÓN CERO",
    variant: "light",
  },
  {
    label: "FREELANCER",
    pain: "Terminás un proyecto. Volvés a cero.",
    sub: "Cada mes es una búsqueda nueva.",
    tag: "CICLO ROTO",
    variant: "dark",
  },
  {
    label: "SPEAKER / FORMADOR",
    pain: "El escenario llena la sala.",
    sub: "No el pipeline de clientes.",
    tag: "SIN CONVERSIÓN",
    variant: "gold",
  },
  {
    label: "MARCA PERSONAL",
    pain: "Tenés presencia. No tenés flujo.",
    sub: "La marca no vende sola.",
    tag: "FLUJO INEXISTENTE",
    variant: "light",
  },
  {
    label: "EXPERTO DE NICHO",
    pain: "Tu competencia aparece primero.",
    sub: "Y cobra más. Aunque sabe menos.",
    tag: "INVISIBILIDAD",
    variant: "dark",
  },
]

const ROW_2: CardData[] = [
  {
    label: "PROFESIONAL INDEPENDIENTE",
    pain: "Más horas no es más dinero.",
    sub: "Ya llegaste al techo.",
    tag: "TECHO CLARO",
    variant: "light",
  },
  {
    label: "ESTUDIO / FIRMA",
    pain: "Dos clientes grandes = toda la firma.",
    sub: "Si uno se va, el mes se cae.",
    tag: "RIESGO CONCENTRADO",
    variant: "gold",
  },
  {
    label: "SERVICIO LOCAL",
    pain: "El boca a boca llegó hasta acá.",
    sub: "A partir de ahora no crece solo.",
    tag: "LÍMITE DE RED",
    variant: "dark",
  },
  {
    label: "EMPRESA B2B",
    pain: "Cada venta tarda meses.",
    sub: "Sin sistema no podés predecir nada.",
    tag: "CICLOS LARGOS",
    variant: "light",
  },
  {
    label: "ECOMMERCE",
    pain: "Compraron una vez. No volvieron.",
    sub: "El costo de adquisición no para.",
    tag: "SIN RETENCIÓN",
    variant: "gold",
  },
  {
    label: "TECNOLOGÍA / SOFTWARE",
    pain: "El producto funciona. El GTM, no.",
    sub: "Sin distribución, el mejor no gana.",
    tag: "GTM ROTO",
    variant: "dark",
  },
  {
    label: "INMOBILIARIA",
    pain: "Los leads llegan. Los buenos, no.",
    sub: "Perdés tiempo en los que no cierran.",
    tag: "LEADS SIN FILTRO",
    variant: "light",
  },
  {
    label: "STARTUP",
    pain: "Crecés a pura fuerza de voluntad.",
    sub: "Eso no escala. Ya empezás a sentirlo.",
    tag: "TRACCIÓN MANUAL",
    variant: "gold",
  },
  {
    label: "NEGOCIO ESTABLECIDO",
    pain: "Facturás bien. Podrías facturar el doble.",
    sub: "Solo falta el sistema que lo haga.",
    tag: "POTENCIAL FRENADO",
    variant: "dark",
  },
]

const TRACK_1 = [...ROW_1, ...ROW_1, ...ROW_1]
const TRACK_2 = [...ROW_2, ...ROW_2, ...ROW_2]

// Card: 240px ancho, 120px alto — texto cómodo en mobile y desktop
const CARD_W = 256   // 240px + 16px de margen
const UNIQUE = 9

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ label, pain, sub, tag, variant }: CardData) {
  const v = V[variant]
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl"
      style={{
        width: 240,
        height: 120,
        background: v.bg,
        border: `1px solid ${v.border}`,
        margin: "0 8px",
        // Sombra interior sutil arriba derecha
        boxShadow: `inset -30px -20px 40px ${v.glow}`,
      }}
    >
      <div className="h-full flex flex-col justify-between p-4">

        {/* Fila superior: label + tag */}
        <div className="flex items-center justify-between gap-2">

          {/* Label con dot */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="flex-shrink-0 rounded-full"
              style={{ width: 5, height: 5, background: v.dot }}
            />
            <span
              style={{
                fontFamily: "cromma, sans-serif",
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase" as const,
                color: v.labelColor,
                whiteSpace: "nowrap" as const,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </span>
          </div>

          {/* Tag pill */}
          <span
            style={{
              fontFamily: "cromma, sans-serif",
              fontSize: 7,
              fontWeight: 700,
              letterSpacing: "0.13em",
              textTransform: "uppercase" as const,
              color: v.tagColor,
              background: v.tagBg,
              border: `1px solid ${v.tagBorder}`,
              borderRadius: 99,
              padding: "2px 6px",
              whiteSpace: "nowrap" as const,
              flexShrink: 0,
            }}
          >
            {tag}
          </span>
        </div>

        {/* Pain — problema principal, tipografía más grande y legible */}
        <p
          style={{
            fontFamily: "cromma, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            color: v.painColor,
            margin: 0,
          }}
        >
          {pain}
        </p>

        {/* Sub — consecuencia */}
        <p
          style={{
            fontFamily: "cromma, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            lineHeight: 1.35,
            color: v.subColor,
            margin: 0,
          }}
        >
          {sub}
        </p>

      </div>
    </div>
  )
}

// ─── Track ────────────────────────────────────────────────────────────────────

function Track({
  items,
  duration,
  reverse = false,
}: {
  items: CardData[]
  duration: number
  reverse?: boolean
}) {
  return (
    <div className="relative overflow-hidden" style={{ height: 140 }}>
      {/* Fades laterales */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "6rem",
          background: "linear-gradient(to right, #0a0a0a, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "6rem",
          background: "linear-gradient(to left, #0a0a0a, transparent)",
        }}
      />

      <div
        className="flex absolute top-0 left-0 items-center"
        style={{
          height: 140,
          animation: `insight-scroll ${duration}s linear infinite ${reverse ? "reverse" : "normal"
            }`,
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
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="insight"
      className="section-dark relative overflow-hidden py-10 md:py-16"
    >
      <style>{`
        @keyframes insight-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${CARD_W * UNIQUE}px); }
        }
      `}</style>

      {/* Línea superior */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,162,39,0.2), transparent)",
        }}
      />

      {/* Header */}
      <div className="container mx-auto px-4 mb-10">
        <div className="mx-auto max-w-4xl space-y-4">
          <p
            className="text-[10px] font-bold tracking-[0.25em] font-mono"
            style={{ color: "#c9a227" }}
          >
            {eyebrow}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "0.8em",
                background: "#c9a227",
                marginLeft: "3px",
                verticalAlign: "middle",
                animation: visible ? "blink 0.7s step-end infinite" : "none",
                opacity: visible ? 1 : 0,
              }}
            />
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
          <span
            className="font-bold font-mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.14)",
            }}
          >
            CREADORES · COACHES · AGENCIAS
          </span>
        </div>
      </div>

      <Track items={TRACK_1} duration={40} />

      {/* Micro-label fila 2 */}
      <div className="container mx-auto px-4 mt-7 mb-3">
        <div className="mx-auto max-w-4xl">
          <span
            className="font-bold font-mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.14)",
            }}
          >
            SERVICIOS · EMPRESAS · NEGOCIOS
          </span>
        </div>
      </div>

      <Track items={TRACK_2} duration={48} reverse />

      {/* Cierre */}
      <div className="container mx-auto px-4 mt-10">
        <div className="mx-auto max-w-4xl space-y-1">
          <p
            style={{
              fontFamily: "cromma, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#444444",
            }}
          >
            No es falta de talento, ni de esfuerzo.
          </p>
          <p
            style={{
              fontFamily: "cromma, sans-serif",
              fontSize: 13,
              color: "#333333",
            }}
          >
            Es que nunca tuviste un sistema diseñado para traer clientes.
          </p>
        </div>
      </div>

      {/* Línea inferior */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,162,39,0.12), transparent)",
        }}
      />
    </section>
  )
}