import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaPrimary } from "@/components/ui/cta-buttons"
import { Megaphone, Handshake, Package, RefreshCw, TrendingUp } from "lucide-react"

const steps = [
  { icon: Megaphone, title: "Atraer", desc: "Contenido con intención comercial.", step: 1, color: "#2ecc71" },
  { icon: Handshake, title: "Convertir", desc: "Consulta al cierre sin fricción.", step: 2, color: "#3b9ecf" },
  { icon: Package, title: "Entregar", desc: "Onboarding estándar. Experiencia medible.", step: 3, color: "#2ecc71" },
  { icon: RefreshCw, title: "Expandir", desc: "Upsell y retención. Más valor por cliente.", step: 4, color: "#3b9ecf" },
  { icon: TrendingUp, title: "Escalar", desc: "Automatización. El sistema trabaja sin vos.", step: 5, color: "#D4AF37" },
]

const proceso = [
  { n: "01", label: "Clarificás la oferta", sub: "Qué resolvés, para quién, a qué precio." },
  { n: "02", label: "Estructurás el sistema", sub: "El flujo que convierte y retiene." },
  { n: "03", label: "Implementás y escalás", sub: "Ejecutamos, medimos y ajustamos." },
]

export function FrameworkDiagram() {
  return (
    <section id="como-funciona" className="section-light relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14 space-y-2">
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "oklch(0.55 0.12 95)" }}>
              El framework
            </p>
            <h2 className="text-[#0a0a0a]">Cómo funciona Cromma</h2>
            <p className="text-[#666666] mx-auto max-w-sm text-sm">
              Cinco etapas conectadas. De la visibilidad al crecimiento predecible.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop — fila de 5 */}
        <div className="hidden md:flex mx-auto max-w-5xl items-start justify-between">
          {steps.map((node, i) => (
            <div key={node.title} className="flex items-start flex-1">
              <ScrollReveal delay={i * 80} className="flex-1">
                <div className="flex flex-col items-center text-center px-3">
                  <div className="relative mb-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ background: `${node.color}18`, border: `1.5px solid ${node.color}40` }}
                    >
                      <node.icon className="h-6 w-6" style={{ color: node.color }} />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ background: node.color, color: "#0a0a0a" }}
                    >
                      {node.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0a0a0a] mb-1">{node.title}</h3>
                  <p className="text-xs text-[#777777] leading-snug max-w-[120px]">{node.desc}</p>
                </div>
              </ScrollReveal>

              {i < steps.length - 1 && (
                <div className="flex-shrink-0 flex items-center mt-7 w-6">
                  <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
                    <path
                      d="M0 5 L20 5 M15 1 L20 5 L15 9"
                      stroke="#cccccc"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile — lista vertical */}
        <div className="md:hidden space-y-0 max-w-xs mx-auto">
          {steps.map((node, i) => (
            <ScrollReveal key={node.title} delay={i * 80}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${node.color}18`, border: `1.5px solid ${node.color}40` }}
                  >
                    <node.icon className="h-5 w-5" style={{ color: node.color }} />
                    <span
                      className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                      style={{ background: node.color, color: "#0a0a0a" }}
                    >
                      {node.step}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px h-7 border-l-2 border-dashed mt-1" style={{ borderColor: `${node.color}30` }} />
                  )}
                </div>
                <div className="pt-1 pb-4">
                  <h3 className="text-sm font-bold text-[#0a0a0a] mb-0.5">{node.title}</h3>
                  <p className="text-xs text-[#777777] leading-snug">{node.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Divisor */}
        <div className="my-12 border-t border-[oklch(0.9_0_0)]" />

        {/* Proceso 3 pasos + CTA */}
        <ScrollReveal delay={60}>
          <div className="mx-auto max-w-2xl">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {proceso.map((p) => (
                <div key={p.n} className="flex items-start gap-3">
                  <span
                    className="text-3xl font-black leading-none flex-shrink-0 mt-0.5"
                    style={{ color: "oklch(0.85 0.15 95 / 0.9)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0a0a0a] mb-0.5">{p.label}</p>
                    <p className="text-xs text-[#888888] leading-snug">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <CtaPrimary />
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}