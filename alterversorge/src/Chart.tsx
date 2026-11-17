import { useEffect, useRef, useState } from 'react'
import type { Point } from './calc'
import { formatEuro } from './calc'
import { chartLabels, type Lang } from './i18n'

const OWN = '#2a7a8c'
const SUBSIDY = '#c47a2c'
const GAIN = '#1f6b52'
const TOTAL = '#0b3d4a'

const STEPS = [1e4, 2e4, 5e4, 1e5, 2e5, 5e5, 1e6]

function axisMax(peak: number) {
  const step = STEPS.find((s) => peak / s <= 8) ?? STEPS[STEPS.length - 1]
  return { max: (Math.ceil(Math.max(peak, 1) / step) + 1) * step, step }
}

function formatAxis(n: number, lang: Lang) {
  if (n === 0) return '0'
  if (n % 1e4 === 0) {
    const units = n / 1e4
    if (lang === 'zh' || lang === 'zhHant') {
      return `${units.toLocaleString('zh-CN')}${chartLabels[lang].unit}`
    }
    if (lang === 'de') return `${(units * 10).toLocaleString('de-DE')} Tsd.`
    return `${units * 10}k`
  }
  const locale = lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'zh-CN'
  return Math.round(n).toLocaleString(locale)
}

type Hit = Point & { x: number; y: number; viewX: number; viewY: number }

export function Chart({ points, lang = 'zh' }: { points: Point[]; lang?: Lang }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hitsRef = useRef<Hit[]>([])
  const [hover, setHover] = useState<Hit | null>(null)
  const labels = chartLabels[lang]

  const retire =
    points.find((p) => p.phase === 'save' && p.age === 67) ?? points[points.length - 1]

  const activeIndex = (() => {
    if (hover) {
      const i = points.findIndex((p) => p.year === hover.year && p.age === hover.age)
      if (i >= 0) return i
    }
    const i = points.findIndex((p) => p.phase === 'save' && p.age === 67)
    return i >= 0 ? i : Math.max(points.length - 1, 0)
  })()

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const scroll = scrollRef.current
    if (!canvas || !wrap || !scroll) return

    const draw = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx || points.length === 0) return
      const { max, step } = axisMax(Math.max(...points.map((p) => p.value), 1))
      const ticks = Math.round(max / step)
      const width = Math.max(scroll.clientWidth, 78 + Math.max(points.length - 1, 1) * 22)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(400 * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = '400px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, 400)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      const plotW = width - 58 - 20
      const last = points.length - 1
      const xAt = (i: number) => 58 + (last === 0 ? 0 : (i / last) * plotW)
      const yAt = (v: number) => 342 - (v / max) * 314
      const retireIdx = points.findIndex((p) => p.age === 67 && p.phase === 'save')

      ctx.fillStyle = 'rgba(232, 244, 240, 0.55)'
      ctx.fillRect(58, 28, plotW, 314)

      ctx.font = `11px 'Source Sans 3', 'Noto Sans SC', sans-serif`
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      for (let i = 0; i <= ticks; i++) {
        const v = i * step
        const y = yAt(v)
        ctx.beginPath()
        ctx.strokeStyle = i === 0 ? 'rgba(11, 61, 74, 0.28)' : 'rgba(11, 61, 74, 0.08)'
        ctx.lineWidth = 1
        ctx.moveTo(58, y)
        ctx.lineTo(58 + plotW, y)
        ctx.stroke()
        ctx.fillStyle = '#5a6f74'
        ctx.fillText(formatAxis(v, lang), 50, y)
      }

      ctx.beginPath()
      ctx.strokeStyle = 'rgba(11, 61, 74, 0.18)'
      ctx.lineWidth = 1
      ctx.moveTo(58, 28)
      ctx.lineTo(58, 342)
      ctx.lineTo(58 + plotW, 342)
      ctx.stroke()

      const fillBand = (
        bottom: (p: Point) => number,
        top: (p: Point) => number,
        fill: string,
      ) => {
        ctx.beginPath()
        points.forEach((p, i) => {
          const x = xAt(i)
          const y = yAt(top(p))
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        for (let i = last; i >= 0; i--) {
          ctx.lineTo(xAt(i), yAt(bottom(points[i])))
        }
        ctx.closePath()
        ctx.fillStyle = fill
        ctx.fill()
      }

      fillBand(() => 0, (p) => p.own, 'rgba(42, 122, 140, 0.72)')
      fillBand((p) => p.own, (p) => p.own + p.subsidy, 'rgba(196, 122, 44, 0.7)')
      fillBand((p) => p.own + p.subsidy, (p) => p.value, 'rgba(31, 107, 82, 0.38)')

      const strokeLine = (pick: (p: Point) => number, color: string, widthPx: number) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = widthPx
        points.forEach((p, i) => {
          const x = xAt(i)
          const y = yAt(pick(p))
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.stroke()
      }

      strokeLine((p) => p.own, OWN, 1.25)
      strokeLine((p) => p.own + p.subsidy, SUBSIDY, 1.25)
      strokeLine((p) => p.value, TOTAL, 2.25)

      if (activeIndex >= 0 && activeIndex <= last) {
        const x = xAt(activeIndex)
        const p = points[activeIndex]
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(11, 61, 74, 0.28)'
        ctx.lineWidth = 1
        ctx.setLineDash([2, 3])
        ctx.moveTo(x, 28)
        ctx.lineTo(x, 342)
        ctx.stroke()
        ctx.setLineDash([])
        const dot = (y: number, color: string) => {
          ctx.beginPath()
          ctx.fillStyle = '#f4faf8'
          ctx.arc(x, y, 5.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.fillStyle = color
          ctx.arc(x, y, 3.4, 0, Math.PI * 2)
          ctx.fill()
        }
        dot(yAt(p.own), OWN)
        dot(yAt(p.own + p.subsidy), SUBSIDY)
        dot(yAt(p.value), TOTAL)
      }

      if (retireIdx >= 0) {
        const x = xAt(retireIdx)
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(11, 61, 74, 0.35)'
        ctx.setLineDash([1, 3])
        ctx.lineWidth = 1
        ctx.moveTo(x, 28)
        ctx.lineTo(x, 342)
        ctx.stroke()
        ctx.setLineDash([])
        const tag = labels.age67
        ctx.font = `600 11px 'Source Sans 3', 'Noto Sans SC', sans-serif`
        const tw = ctx.measureText(tag).width
        const left = x - tw / 2 - 6
        ctx.fillStyle = '#0b3d4a'
        ctx.beginPath()
        ctx.roundRect(left, 6, tw + 12, 16, 8)
        ctx.fill()
        ctx.fillStyle = '#f4faf8'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(tag, x, 14)
        ctx.font = `600 18px 'Fraunces', 'Noto Serif SC', serif`
        const phaseLabel = (text: string, from: number, to: number) => {
          if (to - from < 72) return
          const mid = (from + to) / 2
          const w = ctx.measureText(text).width
          ctx.fillStyle = 'rgba(244, 250, 248, 0.92)'
          ctx.beginPath()
          ctx.roundRect(mid - w / 2 - 12, 33, w + 24, 30, 12)
          ctx.fill()
          ctx.strokeStyle = 'rgba(11, 61, 74, 0.2)'
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = '#0b3d4a'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(text, mid, 48)
        }
        phaseLabel(labels.save, 58, x)
        phaseLabel(labels.draw, x, 58 + plotW)
      }

      ctx.font = `10px 'Source Sans 3', 'Noto Sans SC', sans-serif`
      ctx.fillStyle = '#5a6f74'
      for (let i = 0; i <= last; i++) {
        const x = xAt(i)
        ctx.beginPath()
        ctx.strokeStyle = i === retireIdx ? '#0b3d4a' : 'rgba(11, 61, 74, 0.18)'
        ctx.lineWidth = 1
        ctx.moveTo(x, 342)
        ctx.lineTo(x, 342 + (i === retireIdx ? 7 : 4))
        ctx.stroke()
        ctx.save()
        ctx.translate(x, 352)
        ctx.rotate(-Math.PI / 2)
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = i === retireIdx ? '#0b3d4a' : '#5a6f74'
        ctx.fillText(String(points[i].year), 0, 0)
        ctx.restore()
      }

      const canvasBox = canvas.getBoundingClientRect()
      const wrapBox = wrap.getBoundingClientRect()
      hitsRef.current = points.map((p, i) => {
        const x = xAt(i)
        const y = yAt(p.value)
        return {
          ...p,
          x,
          y,
          viewX: canvasBox.left - wrapBox.left + x,
          viewY: canvasBox.top - wrapBox.top + y,
        }
      })
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(scroll)
    scroll.addEventListener('scroll', draw)
    let alive = true
    document.fonts?.ready.then(() => {
      if (alive) draw()
    })
    return () => {
      alive = false
      ro.disconnect()
      scroll.removeEventListener('scroll', draw)
    }
  }, [points, activeIndex, lang, labels])

  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const box = canvas.getBoundingClientRect()
    const x = e.clientX - box.left
    let best: Hit | null = null
    let dist = 18
    for (const hit of hitsRef.current) {
      const d = Math.abs(hit.x - x)
      if (d < dist) {
        dist = d
        best = hit
      }
    }
    setHover(best)
  }

  const summary =
    hover ??
    (retire
      ? { ...retire, x: 0, y: 0, viewX: 0, viewY: 0 }
      : null)

  return (
    <div ref={wrapRef} className="relative">
      <div
        ref={scrollRef}
        className="chart-scroll max-h-[28rem] overflow-auto rounded-2xl border border-[color:var(--line)] bg-[color:var(--plot)]"
      >
        <canvas
          ref={canvasRef}
          className="block touch-none"
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          role="img"
          aria-label={labels.total}
        />
      </div>

      {hover && (
        <div
          className="pointer-events-none absolute z-10 w-44 rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)] px-3 py-2 text-xs leading-relaxed text-[color:var(--ink)] shadow-lg"
          style={{
            left: Math.min(Math.max(hover.viewX + 14, 8), 280),
            top: Math.max(hover.viewY - 28, 8),
          }}
        >
          <div className="font-semibold text-[color:var(--primary)]">
            {labels.yearAge(hover.year, hover.age)}
          </div>
          <div className="mt-1 flex justify-between gap-3">
            <span className="text-[color:var(--muted)]">{labels.total}</span>
            <span className="font-semibold tabular-nums">{formatEuro(hover.value, lang)}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span style={{ color: OWN }}>{labels.own}</span>
            <span className="tabular-nums">{formatEuro(hover.own, lang)}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span style={{ color: SUBSIDY }}>{labels.subsidy}</span>
            <span className="tabular-nums">{formatEuro(hover.subsidy, lang)}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span style={{ color: GAIN }}>{labels.gain}</span>
            <span className="tabular-nums">{formatEuro(hover.gain, lang)}</span>
          </div>
          {hover.phase === 'draw' && hover.withdrawn > 0 && (
            <div className="mt-1 flex justify-between gap-3 border-t border-[color:var(--line)] pt-1">
              <span className="text-[color:var(--muted)]">{labels.withdrawn}</span>
              <span className="tabular-nums">{formatEuro(hover.withdrawn, lang)}</span>
            </div>
          )}
        </div>
      )}

      {summary && (
        <p className="mt-3 text-sm text-[color:var(--ink)]">
          <span className="font-semibold">{labels.yearAgeParen(summary.year, summary.age)}</span>
          <span className="text-[color:var(--muted)]"> · {labels.totalShort} </span>
          <span className="font-semibold tabular-nums text-[color:var(--good)]">
            {formatEuro(summary.value, lang)}
          </span>
          <span className="text-[color:var(--muted)]"> · {labels.ownShort} </span>
          <span className="font-semibold tabular-nums">{formatEuro(summary.own, lang)}</span>
          <span className="text-[color:var(--muted)]"> · {labels.subsidyShort} </span>
          <span className="font-semibold tabular-nums">{formatEuro(summary.subsidy, lang)}</span>
          <span className="text-[color:var(--muted)]"> · {labels.gainShort} </span>
          <span className="font-semibold tabular-nums">{formatEuro(summary.gain, lang)}</span>
          {summary.phase === 'draw' && summary.withdrawn > 0 && (
            <>
              <span className="text-[color:var(--muted)]"> · {labels.withdrawn} </span>
              <span className="font-semibold tabular-nums text-[color:var(--accent)]">
                {formatEuro(summary.withdrawn, lang)}
              </span>
            </>
          )}
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[color:var(--muted)]">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: OWN }} />
          {labels.own}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: SUBSIDY }} />
          {labels.subsidy}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: GAIN }} />
          {labels.gain}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4 rounded" style={{ background: TOTAL }} />
          {labels.total}
        </span>
      </div>
    </div>
  )
}
