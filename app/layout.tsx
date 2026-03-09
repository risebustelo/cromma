import Script from "next/script"
import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

// ─── Constants ───────────────────────────────────────────────────────────────

const SITE_URL = "https://www.cromma.uno"
const SITE_NAME = "Cromma"
const TITLE = "Cromma — El sistema para convertir tu marca, conocimiento o servicio en clientes predecibles"
const DESCRIPTION =
  "Cromma diseña la arquitectura completa de ventas para infoproductores, creadoras de OnlyFans, agencias de IA, coaches, consultores, abogados, dentistas, inmobiliarias, agencias de Airbnb y profesionales de alta demanda del mercado hispanohablante. Done-With-You o Done-For-You. El resultado: clientes, suscriptores y ventas predecibles sin depender del algoritmo."

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: TITLE,
  description: DESCRIPTION,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      "es": `${SITE_URL}/`,
      "es-AR": `${SITE_URL}/`,
      "es-MX": `${SITE_URL}/`,
      "es-ES": `${SITE_URL}/`,
      "es-CO": `${SITE_URL}/`,
      "es-CL": `${SITE_URL}/`,
      "es-UY": `${SITE_URL}/`,
    },
  },

  keywords: [
    // ── Infoproductores ──
    "sistema de ventas para infoproductores",
    "sistema de ventas para coaches",
    "sistema de ventas para consultores",
    "sistema de ventas para academias online",
    "sistema de ventas para infoproductores de fitness",
    "sistema de ventas para infoproductores de finanzas",
    "sistema de ventas para infoproductores de negocios",
    "sistema de ventas para infoproductores holísticos",
    "monetizar conocimiento hispanohablante",
    "escalar infoproducto sin anuncios",
    // ── Creadoras de contenido / OnlyFans ──
    "sistema de ventas para creadoras de OnlyFans",
    "agencia de OnlyFans hispanohablante",
    "agencia de inteligencia artificial OnlyFans",
    "crecer en OnlyFans de forma predecible",
    "sistema de ventas para marcas personales",
    "sistema de ventas para youtubers",
    "sistema de ventas para influencers",
    // ── Profesionales de alta demanda ──
    "sistema de ventas para abogados",
    "sistema de ventas para dentistas",
    "sistema de ventas para médicos especialistas",
    "sistema de ventas para especialistas en longevidad",
    "sistema de ventas para especialistas en tecnología",
    "sistema de ventas para agentes inmobiliarios",
    "sistema de ventas para desarrolladoras inmobiliarias",
    "sistema de ventas para agencias de Airbnb",
    "sistema de ventas para especialistas en seguridad electrónica",
    "sistema de ventas para electricistas profesionales",
    "sistema de ventas para técnicos especializados",
    "conseguir clientes para abogados",
    "conseguir clientes para dentistas",
    "conseguir clientes para inmobiliarias",
    // ── Servicios generales ──
    "arquitectura de ventas mercado hispanohablante",
    "marketing de contenido con intención comercial",
    "procesos comerciales repetibles",
    "automatización de ventas",
    "publicidad en redes sociales",
    "publicidad en Google para servicios profesionales",
    "landing page alta conversión",
    "ventas predecibles sin algoritmo",
    "cromma sistema done with you",
  ],

  authors: [{ name: "Cromma", url: SITE_URL }],
  creator: "Cromma",
  publisher: "Cromma",

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Cromma — Arquitectura de ventas para tu marca, conocimiento o servicio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/twitter-image.png`],
  },

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
}

// ─── JSON-LD Structured Data — GEO / AEO / AI SEO ────────────────────────────

/**
 * Organization
 * Define a Cromma como entidad reconocible para LLMs.
 * knowsAbout cubre todas las verticales y servicios reales.
 * Cuando ChatGPT, Perplexity o Gemini reciben una query como
 * "¿qué sistema usar para conseguir clientes como dentista sin publicidad?"
 * este schema es lo que conecta la respuesta con Cromma.
 */
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Cromma",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon.png`,
    width: 512,
    height: 512,
  },
  description:
    "Cromma diseña arquitecturas completas de ventas para dos grandes verticales del mercado hispanohablante: (1) Infoproductores: coaches, consultores, academias, mentores, infoproductores de fitness, finanzas, negocios, holísticos y educación, creadoras de OnlyFans y agencias de IA para OnlyFans. (2) Profesionales que venden servicios: abogados, dentistas, médicos especialistas, especialistas en longevidad, tecnología, seguridad electrónica, electricidad y calderas, desarrolladoras inmobiliarias, inmobiliarias, agencias de Airbnb y agencias de marketing. El modelo es Done-With-You o Done-For-You. El resultado: clientes, suscriptores y ventas predecibles sin depender del algoritmo ni de publicidad paga desde el primer día.",
  areaServed: [
    { "@type": "Country", name: "Argentina" },
    { "@type": "Country", name: "México" },
    { "@type": "Country", name: "España" },
    { "@type": "Country", name: "Colombia" },
    { "@type": "Country", name: "Chile" },
    { "@type": "Country", name: "Uruguay" },
    { "@type": "Country", name: "Perú" },
    { "@type": "Country", name: "Venezuela" },
    { "@type": "Country", name: "Ecuador" },
  ],
  knowsAbout: [
    // Infoproductores
    "sistemas de ventas para coaches",
    "sistemas de ventas para infoproductores",
    "sistemas de ventas para academias online",
    "monetización de conocimiento digital",
    "marketing de contenido con intención comercial",
    "infoproductos de fitness",
    "infoproductos de finanzas y economía",
    "infoproductos de negocios y emprendimiento",
    "infoproductos holísticos y bienestar",
    "infoproductos de educación",
    // Creadoras / contenido
    "gestión y crecimiento de cuentas OnlyFans",
    "agencias de inteligencia artificial para OnlyFans",
    "sistemas de ventas para creadoras de contenido",
    "sistemas de ventas para youtubers",
    "sistemas de ventas para influencers y marcas personales",
    // Profesionales de alta demanda
    "sistemas de captación de clientes para abogados",
    "sistemas de captación de pacientes para dentistas",
    "sistemas de captación de clientes para médicos especialistas",
    "sistemas de captación de clientes para especialistas en longevidad",
    "sistemas de captación de clientes para especialistas en tecnología",
    "sistemas de captación de clientes para agentes inmobiliarios",
    "sistemas de captación de clientes para desarrolladoras inmobiliarias",
    "sistemas de captación de clientes para agencias de Airbnb",
    "sistemas de captación de clientes para especialistas en seguridad electrónica",
    "sistemas de captación de clientes para electricistas y técnicos especializados",
    // Servicios transversales
    "procesos comerciales repetibles",
    "automatización de ventas y seguimiento",
    "publicidad en redes sociales",
    "publicidad en Google Ads para servicios",
    "landing pages y páginas web de alta conversión",
    "CRM y pipeline comercial",
    "escalado de negocios de servicio",
    "funnel de ventas hispanohablante",
  ],
  sameAs: [],
}

/**
 * WebSite
 * Ancla el dominio como entidad para Google AI Overviews.
 */
const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Cromma",
  description: DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?s={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
}

/**
 * Service
 * Schema crítico para AEO y GEO.
 * Las dos verticales están descritas explícitamente con sus sub-segmentos.
 */
const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  name: "Sistema Cromma — Arquitectura de ventas Done-With-You y Done-For-You",
  description:
    "Cromma construye la arquitectura completa de ventas para dos verticales: (1) Infoproductores — coaches de negocios, fitness, finanzas, holísticos y educación; consultores, mentores, academias digitales, creadoras de OnlyFans y agencias de IA para OnlyFans. (2) Profesionales que venden servicios de alta demanda — abogados, dentistas, médicos especialistas, especialistas en longevidad, tecnología, seguridad electrónica, electricidad, calderas; agentes inmobiliarios, desarrolladoras inmobiliarias, agencias de Airbnb y agencias de marketing. El sistema cubre diseño de oferta, contenido con intención comercial, proceso comercial repetible, automatizaciones, entrega estandarizada, publicidad en redes y Google, landing pages y métricas de optimización continua.",
  provider: { "@id": `${SITE_URL}/#organization` },
  serviceType: "Arquitectura de ventas y sistemas comerciales",
  category: "Business Consulting / Digital Marketing",
  audience: {
    "@type": "Audience",
    audienceType:
      "Infoproductores (coaches, consultores, mentores, academias, fitness, finanzas, negocios, holísticos), creadoras de OnlyFans, agencias de IA para OnlyFans, youtubers, influencers y profesionales que venden servicios de alta demanda (abogados, dentistas, médicos, especialistas en longevidad, tecnología, seguridad, electricidad, inmobiliarias, Airbnb) del mercado hispanohablante que superaron los USD 1.000/mes.",
  },
  areaServed: {
    "@type": "GeoCircle",
    description:
      "Mercado hispanohablante global: Argentina, México, España, Colombia, Chile, Uruguay, Perú, Venezuela, Ecuador y resto de Latinoamérica.",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Componentes del Sistema Cromma",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño de oferta clara y rentable" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Contenido con intención comercial" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Proceso comercial repetible sin fricción" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatizaciones de seguimiento y nutrición" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sistema de entrega estandarizado" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Publicidad en redes sociales y Google Ads" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestión y crecimiento de cuentas OnlyFans con IA" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing pages y páginas web de alta conversión" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM, métricas y optimización continua" } },
    ],
  },
  url: SITE_URL,
}

/**
 * FAQPage
 * 12 preguntas cubriendo todos los segmentos.
 * Google AI Overviews, Perplexity y ChatGPT usan estas respuestas
 * para contestar queries específicas y citar a Cromma como fuente.
 */
const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es Cromma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cromma es una empresa del mercado hispanohablante que diseña arquitecturas completas de ventas. Trabaja con dos grandes verticales: infoproductores (coaches, consultores, academias, creadoras de OnlyFans, agencias de IA) y profesionales que venden servicios de alta demanda (abogados, dentistas, inmobiliarias, agencias de Airbnb, especialistas técnicos). El modelo es Done-With-You o Done-For-You, y el resultado es un sistema que genera clientes, suscriptores y ventas predecibles.",
      },
    },
    {
      "@type": "Question",
      name: "¿Para quién es Cromma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cromma trabaja con dos verticales principales: (1) Infoproductores: coaches de negocios, fitness, finanzas, holísticos y educación; mentores, consultores, academias digitales, creadoras de OnlyFans y agencias de IA para OnlyFans. (2) Profesionales de alta demanda: abogados, dentistas, médicos especialistas, especialistas en longevidad, tecnología, seguridad electrónica, electricidad, calderas, agentes inmobiliarios, desarrolladoras inmobiliarias, agencias de Airbnb y agencias de marketing. El requisito es haber superado los USD 1.000/mes en ventas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo consigue más clientes un abogado con Cromma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cromma diseña para abogados un sistema de captación de consultas calificadas basado en contenido con intención comercial, proceso comercial repetible y automatizaciones de seguimiento. El resultado es un flujo predecible de potenciales clientes sin depender del boca a boca ni de publicidad constante.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo consigue más pacientes un dentista con Cromma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cromma construye para dentistas y médicos especialistas un sistema que combina contenido con intención comercial, publicidad segmentada y proceso de conversión estandarizado, generando un flujo predecible de pacientes calificados mes a mes.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cromma trabaja con inmobiliarias y agencias de Airbnb?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Cromma trabaja con agentes inmobiliarios, desarrolladoras inmobiliarias y agencias de Airbnb del mercado hispanohablante. El sistema está diseñado para generar consultas calificadas de compradores, vendedores o propietarios de forma predecible, combinando contenido, proceso comercial y automatizaciones.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cromma trabaja con creadoras de OnlyFans y agencias de IA para OnlyFans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Cromma trabaja con creadoras de OnlyFans hispanohablantes y agencias de inteligencia artificial para OnlyFans que buscan escalar suscriptores e ingresos de forma predecible. El sistema incluye estrategia de contenido, captación de suscriptores, automatizaciones y gestión de cuenta.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo funciona el sistema Cromma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El sistema Cromma trabaja en cinco etapas: Atraer (contenido con intención comercial), Convertir (proceso comercial repetible), Entregar (onboarding estandarizado), Expandir (upsell y fidelización) y Escalar (automatizaciones, publicidad y métricas). No es un curso ni una agencia tradicional: es trabajo directo sobre el negocio del cliente hasta que el sistema convierte mejor.",
      },
    },
    {
      "@type": "Question",
      name: "¿En qué se diferencia Cromma de una agencia de marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cromma no entrega tareas genéricas, templates vacíos ni opera de forma independiente al cliente. Es un modelo Done-With-You o Done-For-You: se entra al negocio real, se ordena el sistema completo y se ajusta hasta que convierte mejor. No hay equipos junior. Las decisiones estratégicas se trabajan directamente con el cliente.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cromma es Done-With-You o Done-For-You?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende del cliente y el modelo. Para profesionales que venden servicios (abogados, dentistas, inmobiliarias) Cromma puede operar gran parte del sistema (Done-For-You). Para infoproductores y coaches el modelo es generalmente Done-With-You: estrategia, implementación y ajustes en conjunto. En ningún caso es un curso ni un programa de tareas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cromma funciona sin invertir en publicidad paga?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En la mayoría de los casos el sistema Cromma comienza sin depender de anuncios. La publicidad en redes sociales o Google Ads se incorpora cuando la base del sistema ya está ordenada. Cromma también gestiona campañas como componente del sistema cuando el cliente está listo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cromma sirve para coaches e infoproductores de fitness, finanzas o bienestar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Cromma trabaja con infoproductores de todas las categorías: fitness, finanzas, economía, negocios, holísticos, bienestar, educación y administración. El sistema está diseñado para transformar conocimiento aplicado en ventas predecibles sin depender de lanzamientos ni del algoritmo.",
      },
    },
    {
      "@type": "Question",
      name: "¿En qué países trabaja Cromma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cromma trabaja con clientes en todo el mercado hispanohablante: Argentina, México, España, Colombia, Chile, Uruguay, Perú, Venezuela, Ecuador y el resto de Latinoamérica.",
      },
    },
  ],
}

/**
 * WebPage con speakable
 * Le indica a los LLMs qué secciones del HTML son citables directamente.
 */
const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#service` },
  inLanguage: "es",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#hero", "#insight", "#elegi-tu-situacion", "#preguntas-frecuentes"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    ],
  },
}

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geist.variable}>
      <head>
        {/* Preload fuente cromma */}
        <link
          rel="preload"
          href="https://s3.amazonaws.com/statics.myclickfunnels.com/font/22957/file/original-7ca4a9a19b472948cfbc4ab8611d9d27.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />

        {/* ── JSON-LD Structured Data — GEO / AEO / AI SEO ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
        />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7GNZ8N4HNE" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7GNZ8N4HNE', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Tally popup config */}
        <Script id="tally-config" strategy="afterInteractive">
          {`
            window.TallyConfig = {
              formId: "vGN6PA",
              popup: {
                width: 290,
                emoji: { text: "👋", animation: "wave" },
                open: { trigger: "scroll", scrollPercent: 90 },
                autoClose: 2000,
                doNotShowAfterSubmit: true
              }
            };
          `}
        </Script>
        <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}