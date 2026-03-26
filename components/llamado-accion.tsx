"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { WhatsAppButton } from "@/components/ui/cta-buttons"
import { CheckCircle2, Clock, Users, Zap } from "lucide-react"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"
const EMERALD = "#2eaf5a"
const TEAL = "#1a6b6b"

const WHATSAPP_URL = "https://wa.me/5491132031117?text=Hola%2C%20quiero%20hacer%20una%20consulta."

const benefits = [
  { icon: Clock, text: "Sesion de 30-45 minutos" },
  { icon: CheckCircle2, text: "Analisis de tu situacion actual" },
  { icon: Zap, text: "Plan de accion concreto" },
  { icon: Users, text: "Sin compromiso" },
]

export function LlamadoAccion() {
  useEffect(() => {
    ; (async () => {
      const cal = await getCalApi({ namespace: "consultoria" })
      cal("ui", { hideEventTypeDetails: true, layout: "month_view", branding: { hideBranding: true } })
    })()
  }, [])

  return (
    <section id="agenda" className="section-light relative overflow-hidden">
      
      {/* Subtle background accent */}
      <div 
        aria-hidden 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="mx-auto max-w-5xl">

          <ScrollReveal>
            <div className="text-center mb-14 md:mb-16 space-y-4">
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
                Primer paso
              </p>
              <h2 className="text-[#0a0a0a] text-3xl md:text-4xl lg:text-5xl">
                Toma el primer paso hacia clientes predecibles
              </h2>
              <p className="text-[#555555] text-base md:text-lg mx-auto max-w-2xl leading-relaxed">
                Agenda una sesion de consultoria y empieza a construir una estructura real para vender tu conocimiento de forma rentable y escalable.
              </p>
            </div>
          </ScrollReveal>

          {/* Benefits */}
          <ScrollReveal delay={60}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 md:mb-14">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div key={benefit.text} className="flex items-center gap-2">
                    <div 
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ background: `${EMERALD}12`, border: `1px solid ${EMERALD}25` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: EMERALD }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "#555555" }}>{benefit.text}</span>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>

          {/* Calendar */}
          <ScrollReveal delay={100}>
            <div 
              className="rounded-2xl overflow-hidden" 
              style={{ 
                height: "620px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                background: "#ffffff",
              }}
            >
              <Cal
                namespace="consultoria"
                calLink="cromma/consultoria"
                config={{ layout: "month_view", "useSlotsViewOnSmallScreen": "true" }}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
              />
            </div>
          </ScrollReveal>

          {/* Alternative contact */}
          <ScrollReveal delay={140}>
            <div className="text-center mt-8 space-y-3">
              <p className="text-sm" style={{ color: "#888888" }}>
                Problemas para ver el calendario?
              </p>
              <WhatsAppButton href={WHATSAPP_URL} />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
