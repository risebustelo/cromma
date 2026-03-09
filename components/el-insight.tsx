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
// Copy principle: mostrar el problema real — no el síntoma
// Cada par: lo que hacen (acción) vs. lo que NO tienen (resultado)

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

// ─── Tarjetas de segmento ─────────────────────────────────────────────────────
// Copy principle: cada card = dolor específico + costo de inacción implícito
// No es "sos esto" — es "esto te está costando hoy"

type Variant = "gold" | "light" | "dark"

const V: Record<Variant, { bg: string; border: string; label: string; dot: string; pain: string }> = {
  gold: { bg: "#0f0e0b", border: "rgba(201,162,39,0.28)", label: "rgba(201,162,39,0.6)", dot: "#c9a227", pain: "#ddc98a" },
  light: { bg: "#f0efe9", border: "rgba(0,0,0,0.07)", label: "rgba(0,0,0,0.35)", dot: "#0a0a0a", pain: "#1a1a1a" },
  dark: { bg: "#111111", border: "rgba(255,255,255,0.07)", label: "rgba(255,255,255,0.28)", dot: "rgba(255,255,255,0.5)", pain: "rgba(255,255,255,0.82)" },
}

// ROW 1 — Creadores, coaches, infoproductores
// Insight: saben lo que hacen. El sistema falla, no ellos.
const ROW_1: { label: string; pain: string; variant: Variant }[] = [
  { label: "COACH / MENTOR", pain: "Vivís de recomendaciones. Cuando paran, vos parás.", variant: "gold" },
  { label: "CONSULTOR", pain: "Cobrás por hora. Si no trabajás, no ingresa nada.", variant: "light" },
  { label: "AGENCIA", pain: "Cerrás clientes solos. Nadie más en tu equipo puede.", variant: "dark" },
  { label: "INFOPRODUCTOR", pain: "Lanzás, vendés, y después… silencio.", variant: "gold" },
  { label: "CREADOR DE CONTENIDO", pain: "Millones de views. Clientes predecibles: cero.", variant: "light" },
  { label: "FREELANCER", pain: "Cuando terminás un proyecto, empieza el pánico.", variant: "dark" },
  { label: "SPEAKER / FORMADOR", pain: "Grandes audiencias. Ningún sistema para convertirlas.", variant: "gold" },
  { label: "MARCA PERSONAL", pain: "Presencia online. Facturación impredecible.", variant: "light" },
  { label: "EXPERTO DE NICHO", pain: "Sabés más que nadie. Pero el mercado no lo sabe.", variant: "dark" },
]

// ROW 2 — Servicios profesionales y negocios establecidos
// Insight: tienen demanda pero no sistema — cada cliente es esfuerzo desde cero
const ROW_2: { label: string; pain: string; variant: Variant }[] = [
  { label: "PROFESIONAL INDEPENDIENTE", pain: "Trabajás el doble para ganar lo mismo.", variant: "light" },
  { label: "ESTUDIO / FIRMA", pain: "Dependés de dos o tres clientes grandes. Es frágil.", variant: "gold" },
  { label: "SERVICIO LOCAL", pain: "El boca a boca no escala. Lo sabés.", variant: "dark" },
  { label: "EMPRESA B2B", pain: "Ciclos de venta largos sin sistema que los acorte.", variant: "light" },
  { label: "ECOMMERCE", pain: "Tráfico hay. Compradores recurrentes, no.", variant: "gold" },
  { label: "TECNOLOGÍA / SOFTWARE", pain: "Product-market fit existe. Go-to-market, no.", variant: "dark" },
  { label: "INMOBILIARIA", pain: "Los leads llegan. Calificados y listos, no.", variant: "light" },
  { label: "STARTUP / EMPRENDIMIENTO", pain: "Tracción manual. No podés seguir el ritmo.", variant: "gold" },
  { label: "NEGOCIO ESTABLECIDO", pain: "Crecés despacio. Sabés que podría ser mucho más rápido.", variant: "dark" },
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

          {/* Frases flip — pain-first */}
          <div className="flex flex-col gap-1.5">
            {PAIRS.map(([left, right], i) => (
              <FlipLine key={i} left={left} right={right} delay={i * 800} />
            ))}
          </div>

        </div>
      </div>

      {/* Track 1 */}
      <Track items={TRACK_1} duration={32} />
      <div style={{ height: 10 }} />
      {/* Track 2 */}
      <Track items={TRACK_2} duration={40} reverse />

      {/* Cierre — el diagnóstico, no la solución todavía */}
      <div className="container mx-auto px-4 mt-7">
        <div className="mx-auto max-w-4xl">
          <p className="text-[13px]" style={{ color: "#555555" }}>
            No es falta de talento, ni de esfuerzo.{" "}
            <span style={{ color: "#888888" }}>Es que nunca tuviste un sistema diseñado para traer clientes.</span>
          </p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.12), transparent)" }} />
    </section>
  )
}