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
  ["Publicás.", "Pero no convierte."],
  ["Vendés.", "Pero no escala."],
  ["Trabajás.", "Todo depende de vos."],
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

// ─── Tarjetas de segmento ─────────────────────────────────────────────────────

type Variant = "gold" | "light" | "dark"

const V: Record<Variant, { bg: string; border: string; label: string; dot: string; pain: string }> = {
  gold: { bg: "#0f0e0b", border: "rgba(201,162,39,0.28)", label: "rgba(201,162,39,0.6)", dot: "#c9a227", pain: "#ddc98a" },
  light: { bg: "#f0efe9", border: "rgba(0,0,0,0.07)", label: "rgba(0,0,0,0.35)", dot: "#0a0a0a", pain: "#1a1a1a" },
  dark: { bg: "#111111", border: "rgba(255,255,255,0.07)", label: "rgba(255,255,255,0.28)", dot: "rgba(255,255,255,0.5)", pain: "rgba(255,255,255,0.82)" },
}

// ROW 1 — Infoproductores + Contenido
const ROW_1: { label: string; pain: string; variant: Variant }[] = [
  { label: "COACH / MENTOR", pain: "Vendés por recomendación, no por sistema.", variant: "gold" },
  { label: "INFOPRODUCTOR", pain: "Contenido hay. Conversión, no.", variant: "light" },
  { label: "FITNESS", pain: "Seguidores sí. Membresía recurrente, no.", variant: "dark" },
  { label: "FINANZAS / ECONOMÍA", pain: "La audiencia consume pero no compra.", variant: "gold" },
  { label: "BIENESTAR / HOLÍSTICO", pain: "Tu expertise es real. Tu sistema, no.", variant: "light" },
  { label: "AGENCIA MARKETING", pain: "Facturás bien, pero sin previsibilidad.", variant: "dark" },
  { label: "CREADORA ONLYFANS", pain: "Ingresos inconsistentes mes a mes.", variant: "gold" },
  { label: "AGENCIA ONLYFANS / IA", pain: "Crecimiento lento y sin sistema replicable.", variant: "light" },
  { label: "YOUTUBER / INFLUENCER", pain: "Audiencia grande. Monetización predecible, no.", variant: "dark" },
]

// ROW 2 — Servicios profesionales
const ROW_2: { label: string; pain: string; variant: Variant }[] = [
  { label: "ABOGADO / ESTUDIO", pain: "Los clientes llegan por recomendación, no sistema.", variant: "light" },
  { label: "DENTISTA / MÉDICO", pain: "La agenda depende de referidos, no de un flujo.", variant: "gold" },
  { label: "LONGEVIDAD / SALUD", pain: "Especialidad de nicho. Difícil de comunicar.", variant: "dark" },
  { label: "INMOBILIARIA", pain: "Leads llegan. Calificados, no.", variant: "light" },
  { label: "AIRBNB / ALQUILERES", pain: "Crecés en operación pero no en margen.", variant: "gold" },
  { label: "TECNOLOGÍA / SOFTWARE", pain: "Cobrás por hora cuando podrías por resultado.", variant: "dark" },
  { label: "SEGURIDAD / ELÉCTRICO", pain: "El trabajo es bueno. Los clientes no te encuentran.", variant: "light" },
  { label: "DESARROLLADORA", pain: "Leads sin calificar y seguimiento manual.", variant: "gold" },
  { label: "AGENCIA DE SERVICIOS", pain: "Referidos o nada. Sin sistema propio.", variant: "dark" },
]

// Triplicar para loop infinito sin salto visible
const TRACK_1 = [...ROW_1, ...ROW_1, ...ROW_1]
const TRACK_2 = [...ROW_2, ...ROW_2, ...ROW_2]

// Fondo decorativo de íconos sociales
function SocialBg({ dark }: { dark: boolean }) {
  const c = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 180 90" fill="none">
      <rect x="8" y="8" width="22" height="22" rx="6" stroke={c} strokeWidth="1.6" />
      <circle cx="19" cy="19" r="5" stroke={c} strokeWidth="1.3" />
      <circle cx="25" cy="12" r="1.2" fill={c} />
      <rect x="38" y="8" width="22" height="22" rx="4" stroke={c} strokeWidth="1.6" />
      <text x="42" y="24" fontSize="12" fontWeight="bold" fill={c} fontFamily="sans-serif">in</text>
      <rect x="68" y="8" width="28" height="18" rx="5" stroke={c} strokeWidth="1.6" />
      <polygon points="78,11 86,17 78,23" fill={c} />
      <path d="M104 9 L116 27 M116 9 L104 27" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="19" cy="65" r="12" stroke={c} strokeWidth="1.6" />
      <circle cx="56" cy="65" r="12" stroke={c} strokeWidth="1.6" />
      <text x="50" y="70" fontSize="11" fill={c} fontFamily="sans-serif">@</text>
      <circle cx="100" cy="65" r="12" stroke={c} strokeWidth="1.6" />
      <path d="M92 62 Q100 57 108 62" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M94 67 Q100 63 106 67" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M96 72 Q100 69 104 72" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="140" cy="65" r="12" stroke={c} strokeWidth="1.6" />
      <text x="135" y="71" fontSize="13" fontWeight="bold" fill={c} fontFamily="sans-serif">f</text>
    </svg>
  )
}

function Card({ label, pain, variant }: { label: string; pain: string; variant: Variant }) {
  const v = V[variant]
  return (
    <div
      className="relative flex-shrink-0 rounded-xl overflow-hidden"
      style={{ width: 196, height: 90, background: v.bg, border: `1px solid ${v.border}`, margin: "0 7px" }}
    >
      <SocialBg dark={variant !== "light"} />
      <div className="relative z-10 h-full flex flex-col justify-between p-3.5">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: v.dot }} />
          <span className="text-[8.5px] font-bold tracking-[0.18em] uppercase"
            style={{ color: v.label, fontFamily: "cromma, sans-serif" }}>
            {label}
          </span>
        </div>
        <p className="text-[11.5px] font-semibold leading-snug"
          style={{ color: v.pain, fontFamily: "cromma, sans-serif" }}>
          {pain}
        </p>
      </div>
    </div>
  )
}

// ─── Track infinito ───────────────────────────────────────────────────────────

const CARD_W = 210  // 196 + 14 margin
const UNIQUE = 9    // cards únicas por fila

function Track({ items, duration, reverse = false }: {
  items: typeof TRACK_1; duration: number; reverse?: boolean
}) {
  const loopW = CARD_W * UNIQUE
  return (
    <div className="relative overflow-hidden" style={{ height: 108 }}>
      {/* Fades laterales */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />

      <div
        className="flex absolute top-0 left-0 items-center"
        style={{
          height: 108,
          animation: `insight-ticker ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
          willChange: "transform",
        }}
      >
        {items.map((item, i) => (
          <Card key={i} label={item.label} pain={item.pain} variant={item.variant} />
        ))}
      </div>
    </div>
  )
}

// ─── Sección principal ────────────────────────────────────────────────────────

export function ElInsight() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const eyebrow = useScramble("EL PROBLEMA", visible, 100)

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
    <section ref={ref} id="insight" className="section-dark relative overflow-hidden py-10 md:py-14">

      <style>{`
        @keyframes insight-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-${CARD_W * UNIQUE}px); }
        }
      `}</style>

      {/* Línea superior dorada */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.2), transparent)" }} />

      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="mx-auto max-w-4xl space-y-4">

          {/* Eyebrow scramble */}
          <p className="text-[10px] font-bold tracking-[0.25em] font-mono" style={{ color: "#c9a227" }}>
            {eyebrow}
            <span style={{
              display: "inline-block", width: "2px", height: "0.8em",
              background: "#c9a227", marginLeft: "3px", verticalAlign: "middle",
              animation: visible ? "blink 0.7s step-end infinite" : "none",
              opacity: visible ? 1 : 0,
            }} />
          </p>

          {/* Frases flip */}
          <div className="flex flex-col gap-1.5">
            {PAIRS.map(([left, right], i) => (
              <FlipLine key={i} left={left} right={right} delay={i * 800} />
            ))}
          </div>

        </div>
      </div>

      {/* Track 1 — Infoproductores y contenido */}
      <Track items={TRACK_1} duration={32} />
      <div style={{ height: 10 }} />
      {/* Track 2 — Servicios profesionales */}
      <Track items={TRACK_2} duration={40} reverse />

      {/* Cierre */}
      <div className="container mx-auto px-4 mt-7">
        <div className="mx-auto max-w-4xl">
          <p className="text-[13px]" style={{ color: "#333333" }}>
            Lo que falta no es más esfuerzo.{" "}
            <span style={{ color: "#555555" }}>Es un sistema que conecte todo.</span>
          </p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.12), transparent)" }} />
    </section>
  )
}