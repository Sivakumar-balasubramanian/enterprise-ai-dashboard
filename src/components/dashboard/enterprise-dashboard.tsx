import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useMemo, useState } from 'react'

import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { dashboardData, type TimeRange } from './dashboard-data'
import { ExportModal } from './export-modal'

const timeRanges: Array<{ label: string; value: TimeRange }> = [
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
]

const trendStyles = {
  up: { icon: '↗', label: 'Improving', className: 'text-emerald-300' },
  down: { icon: '↘', label: 'Declining', className: 'text-amber-300' },
  stable: { icon: '→', label: 'Stable', className: 'text-cyan-300' },
} as const

const severityClasses = {
  High: 'border-orange-400/30 bg-orange-400/10 text-orange-200',
  Medium: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  Low: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
} as const

export function EnterpriseDashboard() {
  const [range, setRange] = useState<TimeRange>('7d')
  const [activeTab, setActiveTab] = useState('overview')
  const [exportOpen, setExportOpen] = useState(false)
  const [comparePrevious, setComparePrevious] = useState(true)

  const current = dashboardData[range]
  const severityTotal = current.severity.reduce((sum, item) => sum + item.value, 0)
  const comparisonData = useMemo(
    () =>
      current.comparison.map((item) => ({
        name: item.name,
        Current: item.current,
        Previous: comparePrevious ? item.previous : item.current,
      })),
    [comparePrevious, current.comparison],
  )

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.14),transparent_30%),linear-gradient(180deg,_#020617_0%,_#020817_45%,_#02030a_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/6 px-6 py-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span className="rounded-full border border-white/10 px-3 py-1">AI Development Intelligence</span>
                <span>/</span>
                <span>Enterprise Command Center</span>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-cyan-300">Overview</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Premium AI quality dashboard
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                  Monitor enterprise prompt health, compare audit performance, and prioritize the fastest path to a stronger overall quality score.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 p-1">
                {timeRanges.map((option) => (
                  <button
                    key={option.value}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      range === option.value
                        ? 'bg-cyan-400/20 text-cyan-100 shadow-lg shadow-cyan-950/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    onClick={() => setRange(option.value)}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <Button variant="secondary">Share review</Button>
              <Button onClick={() => setExportOpen(true)}>Export packet</Button>
            </div>
          </div>
        </header>

        <Tabs className="mt-6 flex-1" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="audits">Audits</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              3 collaborators active
              <span className="hidden text-slate-500 sm:inline">•</span>
              <span className="hidden sm:inline">Compliance sync in 18h</span>
            </div>
          </div>

          <TabsContent className="mt-6 space-y-6" value="overview">
            <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl"
                initial={{ opacity: 0, y: 20 }}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-lg space-y-4">
                    <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                      Overall quality score
                    </div>
                    <div className="flex items-end gap-4">
                      <div>
                        <div className="text-6xl font-semibold tracking-tight text-white sm:text-7xl">{current.overall.score}</div>
                        <p className="mt-2 text-lg text-slate-200">{current.overall.label}</p>
                      </div>
                      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                        <div className="font-semibold">+{current.overall.delta} vs previous audit</div>
                        <div className="mt-1 text-emerald-100/80">Benchmark {current.overall.benchmark}</div>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{current.overall.summary}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button>See prioritized fixes</Button>
                      <Button variant="secondary">Review audit details</Button>
                    </div>
                  </div>

                  <div className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle,_rgba(34,211,238,0.28)_0%,_rgba(15,23,42,0.2)_55%,_rgba(15,23,42,0)_100%)]">
                    <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
                    <div className="absolute inset-9 rounded-full border border-emerald-400/20" />
                    <div className="text-center">
                      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Primary KPI</p>
                      <p className="mt-3 text-5xl font-semibold text-white">{current.overall.score}%</p>
                      <p className="mt-2 text-sm text-cyan-200">Prompt quality drives the largest score swing</p>
                    </div>
                  </div>
                </div>
              </motion.article>

              <motion.aside
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl"
                initial={{ opacity: 0, x: 20 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Action focus</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">Top issues to fix</h2>
                  </div>
                  <div className="rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-200">
                    Quick wins available
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {current.findings.map((finding, index) => (
                    <div
                      key={finding.title}
                      className="rounded-3xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-400">Priority {index + 1}</p>
                          <h3 className="mt-1 font-semibold text-white">{finding.title}</h3>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${severityClasses[finding.severity]}`}>
                          {finding.severity}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{finding.recommendation}</p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                        <span>{finding.count} instances</span>
                        <span>•</span>
                        <span>{finding.gain}</span>
                        <span>•</span>
                        <span>{finding.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {current.metrics.map((metric, index) => {
                const trend = trendStyles[metric.trend]
                const data = metric.sparkline.map((value, sparkIndex) => ({
                  name: sparkIndex,
                  value,
                }))

                return (
                  <motion.article
                    key={metric.title}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-xl shadow-slate-950/30 backdrop-blur-2xl"
                    initial={{ opacity: 0, y: 24 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-400">{metric.title}</p>
                        <div className="mt-3 flex items-end gap-3">
                          <span className="text-3xl font-semibold text-white">{metric.value}</span>
                          <span className={`text-sm font-medium ${trend.className}`}>
                            {trend.icon} {metric.delta}
                          </span>
                        </div>
                      </div>
                      <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs text-slate-300">
                        {metric.impact}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{trend.label}</p>
                    <div className="mt-4 h-16">
                      <ResponsiveContainer height="100%" width="100%">
                        <AreaChart data={data}>
                          <defs>
                            <linearGradient id={`spark-${metric.title}`} x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.85} />
                              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <Tooltip
                            contentStyle={{
                              borderRadius: '12px',
                              border: '1px solid rgba(148, 163, 184, 0.18)',
                              background: 'rgba(2, 6, 23, 0.96)',
                            }}
                            cursor={false}
                          />
                          <Area
                            dataKey="value"
                            fill={`url(#spark-${metric.title})`}
                            stroke="#22d3ee"
                            strokeWidth={2}
                            type="monotone"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.article>
                )
              })}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Metric relationships</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">How the score is composed</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-sm text-slate-300">
                    Audits → sessions → prompts → score
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-4">
                  {current.flow.map((step, index) => (
                    <div key={step.label} className="relative rounded-3xl border border-white/10 bg-slate-950/35 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Stage {index + 1}</p>
                      <div className="mt-4 text-3xl font-semibold text-white">{step.value}</div>
                      <p className="mt-2 font-medium text-slate-200">{step.label}</p>
                      <p className="mt-1 text-xs text-cyan-200">{step.impact}</p>
                      <p className="mt-4 text-sm leading-6 text-slate-400">{step.description}</p>
                      {index < current.flow.length - 1 ? (
                        <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-cyan-400/40 md:block" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Severity mix</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Anti-pattern distribution</h2>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    {severityTotal} total findings
                  </div>
                </div>
                <div className="mt-6 overflow-hidden rounded-full border border-white/10 bg-slate-950/60">
                  <div className="flex h-4 w-full">
                    {current.severity.map((item) => (
                      <div
                        key={item.label}
                        style={{ width: `${(item.value / severityTotal) * 100}%`, backgroundColor: item.color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {current.severity.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
                      <p className="mt-1 text-xs text-slate-500">
                        {Math.round((item.value / severityTotal) * 100)}% of findings
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </TabsContent>

          <TabsContent className="mt-6 space-y-6" value="audits">
            <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Comparison mode</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">This audit vs previous audit</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Understand how benchmark dimensions changed before you share results with engineering leadership.
                    </p>
                  </div>
                  <button
                    aria-pressed={comparePrevious}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition ${
                      comparePrevious
                        ? 'border-cyan-400/30 bg-cyan-400/12 text-cyan-100'
                        : 'border-white/10 bg-slate-950/50 text-slate-300'
                    }`}
                    onClick={() => setComparePrevious((value) => !value)}
                    type="button"
                  >
                    {comparePrevious ? 'Showing previous audit' : 'Comparison paused'}
                  </button>
                </div>
                <div className="mt-6 h-80">
                  <ResponsiveContainer height="100%" width="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid stroke="rgba(148,163,184,0.14)" strokeDasharray="3 3" vertical={false} />
                      <XAxis axisLine={false} dataKey="name" stroke="#94a3b8" tickLine={false} />
                      <YAxis axisLine={false} stroke="#94a3b8" tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '12px',
                          border: '1px solid rgba(148, 163, 184, 0.18)',
                          background: 'rgba(2, 6, 23, 0.96)',
                        }}
                      />
                      <Bar dataKey="Previous" fill="#475569" radius={[10, 10, 0, 0]} />
                      <Bar dataKey="Current" fill="#22d3ee" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Team collaboration</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Live review pod</h2>
                <div className="mt-6 flex -space-x-3">
                  {current.collaborators.map((person, index) => (
                    <div
                      key={person.name}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-950/80 bg-gradient-to-br from-cyan-300 to-emerald-300 text-sm font-semibold text-slate-950"
                      style={{ zIndex: current.collaborators.length - index }}
                    >
                      {person.name}
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  {current.collaborators.map((person) => (
                    <div key={person.name} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{person.name}</span>
                        <span className="text-sm text-slate-400">{person.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </TabsContent>

          <TabsContent className="mt-6 space-y-6" value="recommendations">
            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Action recommendations</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Recommended next moves</h2>
                <div className="mt-6 space-y-4">
                  {current.recommendations.map((recommendation) => (
                    <div
                      key={recommendation.title}
                      className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{recommendation.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{recommendation.summary}</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-right text-sm text-emerald-100">
                          <div className="font-medium">{recommendation.impact}</div>
                          <div className="mt-1 text-xs text-emerald-200/80">{recommendation.timeframe}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Compliance / governance</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Assurance snapshot</h2>
                <div className="mt-6 space-y-4">
                  {current.compliance.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      <ExportModal data={current} onOpenChange={setExportOpen} open={exportOpen} range={range} />
    </div>
  )
}
