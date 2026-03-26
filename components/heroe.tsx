"use client"

import { useState, useEffect, useCallback } from "react"
import { CtaPrimary, CtaSecondary } from "@/components/ui/cta-buttons"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

const phrases = ["conocimiento", "servicio", "marca"]
const LONGEST_PHRASE = "conocimiento"

export function Heroe() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing")
  const [mounted, setMounted] = useState(false)

  const currentPhrase = phrases[currentIndex]

  useEffect(() => { setMounted(true) }, [])

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
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .cursor-blink { animation: cursorBlink 1s step-end infinite; }
        .hero-grid-moving {
          animation: gridMove 8s linear infinite;
        }
        .hero-fade-up {
          animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-fade-right {
          animation: fadeSlideRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-grid-moving, .hero-fade-up, .hero-fade-right { animation: none !important; }
          .hero-fade-up, .hero-fade-right { opacity: 1; transform: none; }
        }
      `}</style>

      {/* Background: Grid + Glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* CSS Grid - teal subtle */}
        <div style={{
          position: "absolute",
          inset: "-60px",
          backgroundImage: `
            linear-gradient(rgba(74,184,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,184,184,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} className="hero-grid-moving" />

        {/* Radial fade for grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, #0a0a0a 75%)",
        }} />

        {/* Glow teal - top left */}
        <div style={{
          position: "absolute",
          width: "600px", height: "600px",
          top: "-15%", left: "0%",
          background: "radial-gradient(circle, rgba(26,107,107,0.15) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "driftA 20s ease-in-out infinite alternate",
        }} />

        {/* Glow gold - bottom right */}
        <div style={{
          position: "absolute",
          width: "500px", height: "500px",
          bottom: "-10%", right: "5%",
          background: "radial-gradient(circle, rgba(201,162,39,0.10) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "driftB 26s ease-in-out infinite alternate",
        }} />

      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 lg:py-36">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

          {/* Main Column - Text Content */}
          <div className="flex-1 min-w-0 text-center lg:text-left">

            <p 
              className="text-xs font-semibold tracking-[0.22em] uppercase mb-10 hero-fade-up" 
              style={{ 
                color: "#888888", 
                opacity: mounted ? 1 : 0,
                animationDelay: "0.1s",
              }}
            >
              Consultores · Coaches · Servicios Profesionales · Infoproductores
            </p>

            <h1 
              className="text-white mb-8 hero-fade-up" 
              style={{ 
                fontSize: "clamp(40px,7vw,76px)", 
                lineHeight: 1.05,
                animationDelay: "0.2s",
              }}
            >
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

            <p 
              className="text-base md:text-lg lg:text-xl leading-relaxed mb-12 text-center lg:text-left mx-auto lg:mx-0 max-w-lg hero-fade-up" 
              style={{ 
                color: "#888888",
                animationDelay: "0.3s",
              }}
            >
              Sabes lo que haces. El problema es que no tienes un sistema para venderlo.{" "}
              <span style={{ color: "#666666" }}>Eso es exactamente lo que construimos.</span>
            </p>

            <div 
              className="flex flex-col items-center lg:items-start gap-4 hero-fade-up" 
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <CtaPrimary className="h-14 px-10 text-base" />
                <CtaSecondary className="h-14 px-10 text-base" />
              </div>
              <p className="text-xs tracking-wide mt-2" style={{ color: "#666666" }}>
                Aplicacion gratuita · Cupos limitados
              </p>
            </div>
          </div>

          {/* Dashboard Widget - Desktop Only */}
          <div 
            className="hidden lg:block w-full max-w-md xl:max-w-lg flex-shrink-0 hero-fade-right" 
            style={{ animationDelay: "0.5s" }}
          >
            <AnalyticsDashboard compact />
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div 
        aria-hidden 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0a0a0a, transparent)",
        }}
      />
    </section>
  )
}
