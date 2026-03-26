"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Users, DollarSign, Target, BarChart3, ArrowUpRight, Activity } from "lucide-react"

// Using CROMMA's existing color palette
const GOLD = "#c9a227"
const EMERALD = "#2eaf5a"
const TEAL = "#1a6b6b"
const CORAL = "#f07baa"

// Animated number counter
function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1500 }: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  if (!mounted) return <span>{prefix}0{suffix}</span>
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

// Mini sparkline chart
function Sparkline({ data, color, height = 32 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(" ")

  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace("#", "")})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Mini bar chart
function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1 h-10">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all duration-300"
          style={{
            height: `${(v / max) * 100}%`,
            background: i === data.length - 1 ? color : `${color}40`,
          }}
        />
      ))}
    </div>
  )
}

// Circular progress indicator
function CircularProgress({ value, color, size = 48 }: { value: number; color: string; size?: number }) {
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  )
}

// Funnel visualization
function FunnelChart() {
  const stages = [
    { label: "Visitantes", value: 12400, width: 100 },
    { label: "Leads", value: 3720, width: 75 },
    { label: "Calificados", value: 1488, width: 55 },
    { label: "Propuestas", value: 595, width: 40 },
    { label: "Clientes", value: 238, width: 28 },
  ]

  return (
    <div className="space-y-2">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-3">
          <div
            className="h-6 rounded-sm flex items-center justify-start pl-2 transition-all duration-500"
            style={{
              width: `${stage.width}%`,
              background: `linear-gradient(90deg, ${GOLD}${Math.round(100 - i * 15).toString(16).padStart(2, "0")}, ${GOLD}40)`,
            }}
          >
            <span className="text-[9px] font-bold text-[#0a0a0a] whitespace-nowrap">{stage.value.toLocaleString()}</span>
          </div>
          <span className="text-[10px] text-[#666666] whitespace-nowrap">{stage.label}</span>
        </div>
      ))}
    </div>
  )
}

// Main Dashboard Component
export function AnalyticsDashboard({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const metrics = [
    { label: "ROAS", value: 847, prefix: "", suffix: "%", change: "+34%", up: true, color: EMERALD },
    { label: "Pipeline", value: 142000, prefix: "$", suffix: "", change: "+21%", up: true, color: GOLD },
    { label: "Conversion", value: 184, prefix: "", suffix: "%", change: "+6.2pp", up: true, color: TEAL },
    { label: "CAC", value: 47, prefix: "$", suffix: "", change: "-18%", up: true, color: EMERALD },
  ]

  const revenueData = [18, 24, 19, 31, 27, 38, 33, 44, 41, 52, 48, 61]
  const conversionData = [12, 15, 14, 18, 22, 19, 24, 28, 26, 31, 29, 34]
  const weeklyData = [45, 62, 58, 71, 68, 82, 91]

  if (compact) {
    return (
      <div
        className="rounded-2xl p-5 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" style={{ color: TEAL }} />
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#666666]">
              Performance
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: EMERALD }} />
            <span className="text-[9px] text-[#555555]">Live</span>
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.slice(0, 4).map((m) => (
            <div key={m.label} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-[9px] text-[#555555] mb-1">{m.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-white">
                  {mounted ? <AnimatedNumber value={m.value} prefix={m.prefix} suffix="" /> : `${m.prefix}0`}
                  {m.suffix && <span className="text-xs">{m.suffix}</span>}
                </span>
                <span className="text-[10px] font-semibold" style={{ color: m.up ? EMERALD : CORAL }}>{m.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Chart */}
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-[#555555]">Revenue Trend</span>
            <span className="text-[10px] font-semibold" style={{ color: EMERALD }}>+34%</span>
          </div>
          <Sparkline data={revenueData} color={GOLD} height={40} />
        </div>
      </div>
    )
  }

  // Full Dashboard
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(15,14,11,0.98) 0%, rgba(10,10,10,0.98) 100%)",
        border: "1px solid rgba(201,162,39,0.15)",
        boxShadow: "0 4px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
      }}
    >
      {/* Dashboard Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
            <BarChart3 className="h-4 w-4" style={{ color: GOLD }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Performance Dashboard</h3>
            <p className="text-[10px] text-[#555555]">Real-time analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: EMERALD }} />
          <span className="text-xs text-[#666666]">Live</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Top Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="rounded-xl p-4 transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-[#555555]">{m.label}</span>
                {m.up ? (
                  <TrendingUp className="h-3.5 w-3.5" style={{ color: EMERALD }} />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" style={{ color: CORAL }} />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  {mounted ? <AnimatedNumber value={m.value} prefix={m.prefix} /> : `${m.prefix}0`}
                  {m.suffix && <span className="text-sm font-semibold">{m.suffix}</span>}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ color: m.up ? EMERALD : CORAL, background: m.up ? `${EMERALD}15` : `${CORAL}15` }}>
                  {m.change}
                </span>
                <span className="text-[10px] text-[#444444]">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Revenue Chart */}
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-white">Revenue Growth</h4>
                <p className="text-[10px] text-[#555555]">Last 12 months</p>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" style={{ color: EMERALD }} />
                <span className="text-sm font-bold" style={{ color: EMERALD }}>+127%</span>
              </div>
            </div>
            <Sparkline data={revenueData} color={GOLD} height={80} />
          </div>

          {/* Funnel */}
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-white">Conversion Funnel</h4>
                <p className="text-[10px] text-[#555555]">Monthly pipeline</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="h-4 w-4" style={{ color: TEAL }} />
                <span className="text-sm font-bold text-white">1.92%</span>
              </div>
            </div>
            <FunnelChart />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Weekly Performance */}
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h4 className="text-xs font-semibold text-[#666666] mb-3">Weekly Leads</h4>
            <MiniBarChart data={weeklyData} color={TEAL} />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-white">91</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: EMERALD, background: `${EMERALD}15` }}>+35%</span>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="rounded-xl p-5 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <CircularProgress value={72} color={EMERALD} size={56} />
            <div>
              <h4 className="text-xs font-semibold text-[#666666]">Close Rate</h4>
              <span className="text-2xl font-bold text-white">72%</span>
              <p className="text-[10px] text-[#444444]">Qualified leads</p>
            </div>
          </div>

          {/* Active Clients */}
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-5 w-5" style={{ color: GOLD }} />
              <h4 className="text-xs font-semibold text-[#666666]">Active Clients</h4>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">
                {mounted ? <AnimatedNumber value={247} /> : "0"}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: EMERALD, background: `${EMERALD}15` }}>+18</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <DollarSign className="h-3.5 w-3.5 text-[#555555]" />
              <span className="text-xs text-[#555555]">$4,200 avg. LTV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
