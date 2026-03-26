"use client"

import { useState } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"

const faqs = [
  {
    pregunta: "Necesito experiencia previa para empezar?",
    respuesta: "No necesitas 'experiencia', pero si una base real. Trabajamos con negocios que YA venden servicios o conocimiento. Si todavia no superaste los USD 1.000/mes, este es el lugar incorrecto.",
  },
  {
    pregunta: "Que tipo de conocimiento puedo vender?",
    respuesta: "Conocimiento aplicado que se pueda convertir en una oferta clara: servicios, mentorias, programas o expertise con demanda real. Si hoy esta difuso, el primer paso es ordenarlo.",
  },
  {
    pregunta: "Cuanto tiempo toma empezar a ver resultados?",
    respuesta: "Depende del punto de partida. Primero ordenamos oferta + sistema comercial; despues viene la mejora consistente. No buscamos 'picos', buscamos previsibilidad.",
  },
  {
    pregunta: "Esto es un done for you o un done with you?",
    respuesta: "Depende del modelo. Servicios profesionales: podemos operar gran parte del sistema. Infoproductos: trabajamos con vos (estrategia + implementacion + ajustes), no como agencia. No es curso. Es trabajo sobre tu negocio.",
  },
  {
    pregunta: "Voy a tener contacto directo con vos?",
    respuesta: "Si. Las decisiones y la estrategia se trabajan directo. No es un sistema manejado por un equipo junior.",
  },
  {
    pregunta: "Es necesario invertir en anuncios desde el principio?",
    respuesta: "No. Construimos un sistema que funciona sin depender de ads. Si se usan, es cuando la base ya esta ordenada.",
  },
  {
    pregunta: "En que se diferencia esto de una consultoria tradicional o una agencia?",
    respuesta: "No damos teoria suelta ni 'tareas' genericas. Entramos al negocio, ordenamos el sistema y lo ajustamos con vos hasta que convierta.",
  },
  {
    pregunta: "Que tipo de negocios no califican?",
    respuesta: "Negocios sin ventas activas. Personas buscando atajos o 'formulas'. Proyectos sin intencion de ordenar estructura y operar en serio.",
  },
]

export function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="preguntas-frecuentes" className="section-dark relative overflow-hidden">
      
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: "absolute", width: "50vw", height: "50vw",
          maxWidth: 600, maxHeight: 600, borderRadius: "50%",
          top: "-20%", right: "-10%",
          background: `radial-gradient(circle, ${GOLD}06 0%, transparent 65%)`,
          filter: "blur(80px)",
        }} />
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-24 md:py-32 lg:py-40 relative z-10">

        <ScrollReveal>
          <div className="mb-14 md:mb-16 text-center space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              FAQ
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl">Preguntas frecuentes</h2>
            <p className="text-base md:text-lg mx-auto max-w-xl" style={{ color: "#888888" }}>
              Si ya vendes servicios o conocimiento y buscas orden y previsibilidad, este proceso es para vos.
            </p>
          </div>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={Math.min(index * 50, 300)}>
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: openIndex === index ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                  border: openIndex === index ? `1px solid ${GOLD}30` : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-7 py-6 flex items-start justify-between gap-4 text-left transition-colors"
                >
                  <span className="font-semibold text-white text-base md:text-lg leading-snug">{faq.pregunta}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 mt-1 transition-all duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    style={{ color: openIndex === index ? GOLD : "#555555" }}
                  />
                </button>
                
                <div 
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openIndex === index ? "500px" : "0",
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-7 pb-7">
                    <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: "#888888" }}>
                      {faq.respuesta}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Card */}
        <ScrollReveal delay={250}>
          <div 
            className="mt-16 md:mt-20 rounded-2xl p-10 md:p-12 text-center space-y-6"
            style={{
              background: `${GOLD}06`,
              border: `1px solid ${GOLD}25`,
            }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              El primer paso
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Como empiezo</h3>
            <p className="text-base md:text-lg mx-auto max-w-md" style={{ color: "#888888" }}>
              Esta llamada define si calificas y cual es el cuello de botella real de tu negocio.
            </p>
            <div className="pt-2">
              <CtaPrimary label="Agenda una sesion" className="h-14 px-10 text-base" />
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
