"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AlertTriangle, TrendingDown, Clock, Users, Zap, Target } from "lucide-react"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"
const EMERALD = "#2eaf5a"
const TEAL = "#1a6b6b"
const CORAL = "#f07baa"

// Scramble effect hook
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

// Problem cards data
const problems = [
  {
    icon: TrendingDown,
    title: "Ingresos impredecibles",
    description: "Un mes facturás bien, el siguiente volvés a cero. Sin sistema, cada mes es empezar de nuevo.",
    stat: "73%",
    statLabel: "de consultores sin flujo constante",
    variant: "coral" as const,
  },
  {
    icon: Clock,
    title: "Tu tiempo es el limite",
    description: "Cambias horas por dinero. El techo de tu negocio es tu agenda disponible.",
    stat: "40h",
    statLabel: "promedio semanal en operación",
    variant: "gold" as const,
  },
  {
    icon: Users,
    title: "Dependés del boca a boca",
    description: "Cuando para la red de referidos, para el ingreso. No hay flujo propio.",
    stat: "68%",
    statLabel: "dependen solo de referidos",
    variant: "teal" as const,
  },
  {
    icon: AlertTriangle,
    title: "Contenido sin conversión",
    description: "Publicás, tenés alcance, pero no se traduce en consultas ni ventas.",
    stat: "2.3%",
    statLabel: "tasa de conversión promedio",
    variant: "coral" as const,
  },
  {
    icon: Target,
    title: "Oferta confusa",
    description: "No tenés claro cuál es tu oferta específica, para quién es, ni por que debería comprarte.",
    stat: "85%",
    statLabel: "sin propuesta diferenciada",
    variant: "emerald" as const,
  },
  {
    icon: Zap,
    title: "Todo manual",
    description: "Seguimiento, respuestas, agendamiento. Todo depende de que estés presente.",
    stat: "12h",
    statLabel: "pérdidas en tareas repetitivas",
    variant: "gold" as const,
  },
]

const variantStyles = {
  coral: {
    border: "rgba(240,123,170,0.20)",
    borderHover: "rgba(240,123,170,0.35)",
    glow: "rgba(240,123,170,0.08)",
    iconBg: "rgba(240,123,170,0.10)",
    iconBorder: "rgba(240,123,170,0.25)",
    iconColor: CORAL,
    statColor: CORAL,
  },
  gold: {
    border: "rgba(201,162,39,0.20)",
    borderHover: "rgba(201,162,39,0.35)",
    glow: "rgba(201,162,39,0.08)",
    iconBg: "rgba(201,162,39,0.10)",
    iconBorder: "rgba(201,162,39,0.25)",
    iconColor: GOLD,
    statColor: GOLD,
  },
  teal: {
    border: "rgba(26,107,107,0.25)",
    borderHover: "rgba(26,107,107,0.40)",
    glow: "rgba(26,107,107,0.08)",
    iconBg: "rgba(26,107,107,0.12)",
    iconBorder: "rgba(26,107,107,0.30)",
    iconColor: "#4ab8b8",
    statColor: "#4ab8b8",
  },
  emerald: {
    border: "rgba(46,175,90,0.20)",
    borderHover: "rgba(46,175,90,0.35)",
    glow: "rgba(46,175,90,0.08)",
    iconBg: "rgba(46,175,90,0.10)",
    iconBorder: "rgba(46,175,90,0.25)",
    iconColor: EMERALD,
    statColor: EMERALD,
  },
}

function ProblemCard({ problem, index }: { problem: typeof problems[0]; index: number }) {
  const Icon = problem.icon
  const style = variantStyles[problem.variant]

  return (
    <ScrollReveal delay={index * 80}>
      <div
        className="group relative h-full rounded-2xl p-6 md:p-8 transition-all duration-300 hover:translate-y-[-4px]"
        style={{
          background: "#0a0a0a",
          border: `1px solid ${style.border}`,
          boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = style.borderHover
          e.currentTarget.style.boxShadow = `0 8px 32px ${style.glow}, 0 2px 16px rgba(0,0,0,0.4)`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = style.border
          e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.3)"
        }}
      >
        {/* Icon */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
          style={{
            background: style.iconBg,
            border: `1px solid ${style.iconBorder}`,
          }}
        >
          <Icon className="h-6 w-6" style={{ color: style.iconColor }} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3">{problem.title}</h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#888888" }}>
          {problem.description}
        </p>

        {/* Stat */}
        <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold" style={{ color: style.statColor }}>
              {problem.stat}
            </span>
            <span className="text-xs" style={{ color: "#666666" }}>
              {problem.statLabel}
            </span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

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
    <section ref={ref} id="insight" className="section-dark-coral relative overflow-hidden">

      <style>{`
        @keyframes insightGlowA {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(3%, -4%) scale(1.08); }
        }
        @keyframes insightGlowB {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-4%, 5%) scale(1.06); }
        }
      `}</style>

      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: "absolute", width: "50vw", height: "50vw",
          maxWidth: 600, maxHeight: 600, borderRadius: "50%",
          top: "-20%", left: "-10%",
          background: "radial-gradient(circle, rgba(240,123,170,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "insightGlowA 25s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", width: "40vw", height: "40vw",
          maxWidth: 500, maxHeight: 500, borderRadius: "50%",
          bottom: "-10%", right: "-5%",
          background: "radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "insightGlowB 30s ease-in-out infinite alternate",
        }} />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <p style={{
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: CORAL
            }}>
              {eyebrow}
              <span style={{
                display: "inline-block", width: 2, height: "0.8em",
                background: CORAL, marginLeft: 4, verticalAlign: "middle",
                animation: visible ? "blink 0.7s step-end infinite" : "none",
                opacity: visible ? 1 : 0,
              }} />
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto">
              Lo reconoces porque lo viviste
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#888888" }}>
              No es falta de talento ni de esfuerzo. Es que nunca tuviste un sistema disenado para traer clientes de forma predecible.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} />
          ))}
        </div>

        {/* Bottom insight */}
        <ScrollReveal delay={400}>
          <div className="mt-16 md:mt-20 text-center">
            <div
              className="inline-flex items-center gap-3 rounded-full px-6 py-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
              <span className="text-sm" style={{ color: "#888888" }}>
                La solución no es trabajar mas. Es construir un <span className="text-white font-semibold">sistema que trabaje para vos</span>.
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.15), transparent)" }} />
    </section>
  )
}
