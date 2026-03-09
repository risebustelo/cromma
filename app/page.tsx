import { Navbar } from "@/components/navbar"
import { Heroe } from "@/components/heroe"
import { ElInsight } from "@/components/el-insight"
import { Casos } from "@/components/casos"
import { FrameworkDiagram } from "@/components/framework-diagram"
import { TabsCapabilities } from "@/components/tabs-capabilities"
import { ImplementacionesStrip } from "@/components/implementaciones-strip"
import { LlamadoAccion } from "@/components/llamado-accion"
import { PreguntasFrecuentes } from "@/components/preguntas-frecuentes"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Navbar */}
      <Navbar />
      {/* 2. Hero — dark, typewriter */}
      <Heroe />
      {/* 3. El problema / Insight — dark. Sin CTA. */}
      <ElInsight />
      {/* 4. Testimonials — dark navy cards */}
      <Casos />
      {/* 6. Framework Cromma — light, zigzag 5 pasos */}
      <FrameworkDiagram />
      {/* 7. Sistema integrado — dark, pill tabs */}
      <TabsCapabilities />
      {/* 8. Implementaciones carousel — light */}
      <ImplementacionesStrip />
      {/* 11. Agenda / Calendar — light */}
      <LlamadoAccion />
      {/* 12. FAQ — dark */}
      <PreguntasFrecuentes />
      {/* 13. Footer — dark */}
      <Footer />
    </main>
  )
}