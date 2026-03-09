"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"

const faqs = [
  {
    pregunta: "\u00bfNecesito experiencia previa para empezar?",
    respuesta: "No necesit\u00e1s 'experiencia', pero s\u00ed una base real. Trabajamos con negocios que YA venden servicios o conocimiento. Si todav\u00eda no superaste los USD 1.000/mes, este es el lugar incorrecto.",
  },
  {
    pregunta: "\u00bfQu\u00e9 tipo de conocimiento puedo vender?",
    respuesta: "Conocimiento aplicado que se pueda convertir en una oferta clara: servicios, mentor\u00edas, programas o expertise con demanda real. Si hoy est\u00e1 difuso, el primer paso es ordenarlo.",
  },
  {
    pregunta: "\u00bfCu\u00e1nto tiempo toma empezar a ver resultados?",
    respuesta: "Depende del punto de partida. Primero ordenamos oferta + sistema comercial; despu\u00e9s viene la mejora consistente. No buscamos 'picos', buscamos previsibilidad.",
  },
  {
    pregunta: "\u00bfEsto es un done for you o un done with you?",
    respuesta: "Depende del modelo. Servicios profesionales: podemos operar gran parte del sistema. Infoproductos: trabajamos con vos (estrategia + implementaci\u00f3n + ajustes), no como agencia. No es curso. Es trabajo sobre tu negocio.",
  },
  {
    pregunta: "\u00bfVoy a tener contacto directo con vos?",
    respuesta: "S\u00ed. Las decisiones y la estrategia se trabajan directo. No es un sistema manejado por un equipo junior.",
  },
  {
    pregunta: "\u00bfEs necesario invertir en anuncios desde el principio?",
    respuesta: "No. Construimos un sistema que funciona sin depender de ads. Si se usan, es cuando la base ya est\u00e1 ordenada.",
  },
  {
    pregunta: "\u00bfEn qu\u00e9 se diferencia esto de una consultor\u00eda tradicional o una agencia?",
    respuesta: "No damos teor\u00eda suelta ni 'tareas' gen\u00e9ricas. Entramos al negocio, ordenamos el sistema y lo ajustamos con vos hasta que convierta.",
  },
  {
    pregunta: "\u00bfQu\u00e9 tipo de negocios no califican?",
    respuesta: "Negocios sin ventas activas. Personas buscando atajos o 'f\u00f3rmulas'. Proyectos sin intenci\u00f3n de ordenar estructura y operar en serio.",
  },
]

export function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="preguntas-frecuentes" className="section-dark relative overflow-hidden">
      <div className="container mx-auto max-w-3xl px-4 py-20 md:py-28">

        <ScrollReveal>
          <div className="mb-14 text-center space-y-3">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[oklch(0.75_0.12_95)]">
              FAQ
            </p>
            <h2 className="text-white">Preguntas frecuentes</h2>
            <p className="text-[#888888] text-base mx-auto max-w-xl">
              {"Si ya vend\u00e9s servicios o conocimiento y busc\u00e1s orden y previsibilidad, este proceso es para vos."}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={Math.min(index * 40, 300)}>
              <div
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${openIndex === index
                  ? "border-white/15 bg-white/[0.05]"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                >
                  <span className="font-semibold text-white text-base leading-snug">{faq.pregunta}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 mt-1 text-[#555555] transition-transform duration-200 ${openIndex === index ? "rotate-180 text-primary" : ""
                      }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="h-px bg-white/[0.06] mb-4" />
                    <p className="text-sm md:text-base text-[#888888] leading-relaxed">
                      {faq.respuesta}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Como empiezo */}
        <ScrollReveal delay={200}>
          <div className="mt-16 border border-primary/25 bg-primary/[0.05] rounded-xl p-8 md:p-10 text-center space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[oklch(0.75_0.12_95)]">
              El primer paso
            </p>
            <h3 className="text-2xl font-bold text-white">{"C\u00f3mo empiezo"}</h3>
            <p className="text-[#888888] text-base mx-auto max-w-md">
              {"Esta llamada define si calific\u00e1s y cu\u00e1l es el cuello de botella real."}
            </p>
            <CtaPrimary label="Agendá una sesión" />
          </div>

        </ScrollReveal>

      </div>
    </section>
  )
}
