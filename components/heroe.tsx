"use client"

import { useState, useEffect, useCallback } from "react"
import { CtaPrimary, CtaSecondary } from "@/components/ui/cta-buttons"

const phrases = ["conocimiento", "servicio", "marca"]
const LONGEST_PHRASE = "conocimiento"

const metrics = [
  { label: "Revenue", value: "$24.800", change: "+34%", up: true },
  { label: "Conversión", value: "18.4%", change: "+6.2%", up: true },
  { label: "Pipeline CRM", value: "$142k", change: "+21%", up: true },
  { label: "Nuevos clientes", value: "38", change: "+12", up: true },
  { label: "Agenda calificada", value: "91%", change: "+8%", up: true },
]

const sparkData = [18, 24, 19, 31, 27, 38, 33, 44, 41, 52, 48, 61]

const TEAL = "#1a6b6b"
const TEAL_DIM = "rgba(26,107,107,0.18)"
const BADGE_GREEN = "oklch(0.55 0.14 155)"
const BADGE_GREEN_BG = "oklch(0.55 0.14 155 / 0.12)"

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 120, h = 36
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ")
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke={TEAL} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Heroe() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing")
  const [mounted, setMounted] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)
  const [tick2, setTick2] = useState(0)

  const currentPhrase = phrases[currentIndex]

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length)
      setTick2((t) => t + 1)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const tick = useCallback(() => {
    if (phase === "typing") {
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1))
      } else { setPhase("pausing") }
    } else if (phase === "pausing") {
      setPhase("deleting")
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1))
      } else {
        setCurrentIndex((prev) => (prev + 1) % phrases.length)
        setPhase("typing")
      }
    }
  }, [displayText, phase, currentPhrase])

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setDisplayText(phrases[0]); return }
    let delay = 55
    if (phase === "deleting") delay = 28
    if (phase === "pausing") delay = 2000
    const timer = setTimeout(tick, delay)
    return () => clearTimeout(timer)
  }, [tick, phase])

  return (
    <section id="hero" className="section-dark noise relative overflow-hidden" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center" }}>

      <style>{`
        @keyframes driftA {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(5%,8%) scale(1.1); }
          100% { transform: translate(-3%,4%) scale(0.95); }
        }
        @keyframes driftB {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(-6%,5%) scale(1.08); }
          100% { transform: translate(4%,-4%) scale(0.96); }
        }
        @keyframes gridMove {
          from { transform: translate(0, 0); }
          to   { transform: translate(60px, 60px); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .cursor-blink { animation: cursorBlink 1s step-end infinite; }
        .hero-grid-moving {
          animation: gridMove 8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-grid-moving, [style*="animation"] { animation: none !important; }
        }
      `}</style>

      {/* ── Fondo: grilla + glows ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Grilla CSS pura — teal muy sutil */}
        <div style={{
          position: "absolute",
          inset: "-60px",
          backgroundImage: `
            linear-gradient(rgba(74,184,184,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,184,184,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} className="hero-grid-moving" />

        {/* Fade radial para que la grilla desaparezca en los bordes */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, #0a0a0a 75%)",
        }} />

        {/* Glow teal — izquierda arriba */}
        <div style={{
          position: "absolute",
          width: "500px", height: "500px",
          top: "-10%", left: "5%",
          background: "radial-gradient(circle, rgba(26,107,107,0.20) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "driftA 20s ease-in-out infinite alternate",
        }} />

        {/* Glow coral — derecha medio */}
        <div style={{
          position: "absolute",
          width: "400px", height: "400px",
          top: "25%", right: "-5%",
          background: "radial-gradient(circle, rgba(240,123,170,0.10) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "driftB 26s ease-in-out infinite alternate",
        }} />

      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* Columna principal */}
          <div className="flex-1 min-w-0 text-center lg:text-left">

            <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-8" style={{ color: "#a0a0a0", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              Consultores · Coaches · Servicios Profesionales · Infoproductores
            </p>

            <h1 className="text-white mb-6" style={{ fontSize: "clamp(36px,6.5vw,68px)", lineHeight: 1.08, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
              <span className="block text-white">Convertimos tu</span>
              <span className="relative block" style={{ color: "#c9a227" }}>
                <span className="invisible whitespace-nowrap" aria-hidden>{LONGEST_PHRASE}</span>
                <span className="absolute inset-0 flex items-center lg:justify-start justify-center whitespace-nowrap">
                  {displayText}
                  <span className="cursor-blink font-light" style={{ color: "#c9a227" }}>|</span>
                </span>
              </span>
              <span className="block text-white">en clientes predecibles.</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-10 text-center lg:text-left mx-auto lg:mx-0 max-w-sm sm:max-w-md lg:max-w-none" style={{ color: "#888888", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
              Sabés lo que hacés. El problema es que no tenés un sistema para venderlo.{" "}
              <span style={{ color: "#797979" }}>Eso es exactamente lo que construimos.</span>
            </p>

            <div className="flex flex-col items-center lg:items-start gap-3" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s" }}>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <CtaPrimary />
                <CtaSecondary />
              </div>
              <p className="text-xs tracking-wide mt-1" style={{ color: "#797979" }}>
                Aplicación gratuita · Cupos limitados
              </p>
            </div>
          </div>

          {/* Widget métricas — solo desktop */}
          <div className="hidden lg:flex flex-col gap-2 w-64 flex-shrink-0" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s" }}>

            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#797979" }}>Live analytics</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL, animation: "livePulse 2s ease-in-out infinite" }} />
                <span className="text-[10px]" style={{ color: "#797979" }}>en vivo</span>
              </span>
            </div>

            <div key={activeMetric} className="rounded-xl p-4" style={{ border: `1px solid ${TEAL_DIM}`, background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)", animation: "fadeSlideIn 0.4s ease" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[11px] mb-1 tracking-wide" style={{ color: "#797979" }}>{metrics[activeMetric].label}</p>
                  <p className="text-2xl font-bold text-white" key={`val-${tick2}`} style={{ animation: "countUp 0.4s ease" }}>{metrics[activeMetric].value}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: BADGE_GREEN, background: BADGE_GREEN_BG }}>{metrics[activeMetric].change}</span>
              </div>
              <Sparkline data={sparkData} />
            </div>

            {metrics.map((m, i) => (
              <div key={i} onClick={() => setActiveMetric(i)} className="flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200" style={{ background: i === activeMetric ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.015)", border: i === activeMetric ? `1px solid ${TEAL_DIM}` : "1px solid transparent" }}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300" style={{ background: i === activeMetric ? TEAL : "#2a2a2a" }} />
                  <span className="text-[11px]" style={{ color: i === activeMetric ? "#888888" : "#797979" }}>{m.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: i === activeMetric ? "rgba(255,255,255,0.8)" : "#797979" }}>{m.value}</span>
                  <span className="text-[10px]" style={{ color: i === activeMetric ? BADGE_GREEN : "#797979" }}>{m.change}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}