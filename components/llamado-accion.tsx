"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { WhatsAppButton } from "@/components/ui/cta-buttons"

const WHATSAPP_URL = "https://wa.me/5491132031117?text=Hola%2C%20quiero%20hacer%20una%20consulta."

export function LlamadoAccion() {
  useEffect(() => {
    ; (async () => {
      const cal = await getCalApi({ namespace: "consultoria" })
      cal("ui", { hideEventTypeDetails: true, layout: "month_view", branding: { hideBranding: true } })
    })()
  }, [])

  return (
    <section id="agenda" className="section-light relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-12">
        <div className="mx-auto max-w-5xl">

          <ScrollReveal>
            <div className="text-center mb-10 space-y-3">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                Primer paso
              </p>
              <h2 className="text-[#0a0a0a]">
                Toma el primer paso para monetizar tu conocimiento
              </h2>
              <p className="text-[#555555] text-lg mx-auto max-w-2xl leading-relaxed">
                Agenda una sesion de consultoria y empieza a construir una estructura real para vender tu conocimiento de forma rentable y escalable.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="rounded-xl overflow-hidden" style={{ height: "600px" }}>
              <Cal
                namespace="consultoria"
                calLink="cromma/consultoria"
                config={{ layout: "month_view", "useSlotsViewOnSmallScreen": "true" }}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="text-center mt-2 space-y-2">
              <p className="text-sm text-[#999999]">
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