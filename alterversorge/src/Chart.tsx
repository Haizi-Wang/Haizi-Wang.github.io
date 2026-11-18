import { useEffect, useRef, useState } from 'react'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import type { Point } from './calc'
import { formatEuro } from './calc'
import { chartLabels, type Lang } from './i18n'

const OWN = '#2a7a8c'
const SUBSIDY = '#c47a2c'
const GAIN = '#1f6b52'
const TOTAL = '#0b3d4a'

const STEPS = [1e4, 2e4, 5e4, 1e5, 2e5, 5e5, 1e6]
const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.35
/** Default canvas height: 0.4× the PR #17 720px default (~288). */
const BASE_H = 288
const PLOT_LEFT = 52
const PLOT_RIGHT = 16
const PLOT_TOP = 24
const PLOT_BOTTOM = 56
const PLOT_H = BASE_H - PLOT_TOP - PLOT_BOTTOM
const AXIS_Y = PLOT_TOP + PLOT_H
const YEAR_LABEL_Y = AXIS_Y + 10
/** Viewport shows the full chart at 100% zoom; pan only when user zooms in. */
const SCROLL_MAX_H = BASE_H + 24

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

function clampZoom(z: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))
}

function touchDist(a: Touch, b: Touch) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
}

function touchMid(a: Touch, b: Touch) {
  return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 }
}

type Hit = Point & { x: number; y: number; viewX: number; viewY: number }

export function Chart({ points, lang = 'zh' }: { points: Point[]; lang?: Lang }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const hitsRef = useRef<Hit[]>([])
  const baseSizeRef = useRef({ w: 0, h: BASE_H })
  const zoomRef = useRef(1)
  const pinchRef = useRef<{ startDist: number; startZoom: number } | null>(null)
  const [zoom, setZoom] = useState(1)
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

  const applyZoom = (next: number, focalClient?: { x: number; y: number }) => {
    const scroll = scrollRef.current
    const layer = layerRef.current
    const canvas = canvasRef.current
    if (!scroll || !layer || !canvas) return

    const prev = zoomRef.current || 1
    const z = clampZoom(Number.isFinite(next) ? next : prev)
    // Always sync React state so +/− disabled UI cannot drift from the canvas.
    if (Math.abs(z - prev) < 0.0005) {
      zoomRef.current = z
      setZoom(z)
      return
    }

    const { w: baseW, h: baseH } = baseSizeRef.current
    if (baseW <= 0) {
      // Layout not ready — still record intent so a later draw picks it up.
      zoomRef.current = z
      setZoom(z)
      return
    }

    const rect = scroll.getBoundingClientRect()
    const focalX = focalClient
      ? focalClient.x - rect.left + scroll.scrollLeft
      : scroll.scrollLeft + scroll.clientWidth / 2
    const focalY = focalClient
      ? focalClient.y - rect.top + scroll.scrollTop
      : scroll.scrollTop + scroll.clientHeight / 2
    const contentX = focalX / prev
    const contentY = focalY / prev

    zoomRef.current = z
    setZoom(z)
    layer.style.width = `${baseW * z}px`
    layer.style.height = `${baseH * z}px`
    canvas.style.transform = `scale(${z})`
    canvas.style.transformOrigin = 'top left'

    const viewX = focalClient ? focalClient.x - rect.left : scroll.clientWidth / 2
    const viewY = focalClient ? focalClient.y - rect.top : scroll.clientHeight / 2
    // Assign scroll after layer resize; avoid scroll→full redraw races (see effect).
    scroll.scrollLeft = Math.max(0, contentX * z - viewX)
    scroll.scrollTop = Math.max(0, contentY * z - viewY)
  }

  const applyZoomRef = useRef(applyZoom)
  applyZoomRef.current = applyZoom

  const nudgeZoom = (delta: number) => {
    applyZoomRef.current(zoomRef.current + delta)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const scroll = scrollRef.current
    const layer = layerRef.current
    if (!canvas || !wrap || !scroll || !layer) return

    const draw = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx || points.length === 0) return
      const { max, step } = axisMax(Math.max(...points.map((p) => p.value), 1))
      const ticks = Math.round(max / step)
      // Fit width to the visible scrollport at 100% zoom (no forced wide min).
      const width = Math.max(Math.floor(scroll.clientWidth), 280)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(BASE_H * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${BASE_H}px`
      const z = zoomRef.current
      canvas.style.transform = `scale(${z})`
      canvas.style.transformOrigin = 'top left'
      baseSizeRef.current = { w: width, h: BASE_H }
      layer.style.width = `${width * z}px`
      layer.style.height = `${BASE_H * z}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, BASE_H)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      const plotW = Math.max(width - PLOT_LEFT - PLOT_RIGHT, 1)
      const last = points.length - 1
      const xAt = (i: number) => PLOT_LEFT + (last === 0 ? 0 : (i / last) * plotW)
      const yAt = (v: number) => AXIS_Y - (v / max) * PLOT_H
      const retireIdx = points.findIndex((p) => p.age === 67 && p.phase === 'save')

      ctx.fillStyle = 'rgba(232, 244, 240, 0.55)'
      ctx.fillRect(PLOT_LEFT, PLOT_TOP, plotW, PLOT_H)

      ctx.font = `11px 'Source Sans 3', 'Noto Sans SC', sans-serif`
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      for (let i = 0; i <= ticks; i++) {
        const v = i * step
        const y = yAt(v)
        ctx.beginPath()
        ctx.strokeStyle = i === 0 ? 'rgba(11, 61, 74, 0.28)' : 'rgba(11, 61, 74, 0.08)'
        ctx.lineWidth = 1
        ctx.moveTo(PLOT_LEFT, y)
        ctx.lineTo(PLOT_LEFT + plotW, y)
        ctx.stroke()
        ctx.fillStyle = '#5a6f74'
        ctx.fillText(formatAxis(v, lang), PLOT_LEFT - 8, y)
      }

      ctx.beginPath()
      ctx.strokeStyle = 'rgba(11, 61, 74, 0.18)'
      ctx.lineWidth = 1
      ctx.moveTo(PLOT_LEFT, PLOT_TOP)
      ctx.lineTo(PLOT_LEFT, AXIS_Y)
      ctx.lineTo(PLOT_LEFT + plotW, AXIS_Y)
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

      strokeLine((p) => p.own, OWN, 1.35)
      strokeLine((p) => p.own + p.subsidy, SUBSIDY, 1.35)
      strokeLine((p) => p.value, TOTAL, 2.4)

      if (activeIndex >= 0 && activeIndex <= last) {
        const x = xAt(activeIndex)
        const p = points[activeIndex]
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(11, 61, 74, 0.28)'
        ctx.lineWidth = 1
        ctx.setLineDash([2, 3])
        ctx.moveTo(x, PLOT_TOP)
        ctx.lineTo(x, AXIS_Y)
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
        ctx.moveTo(x, PLOT_TOP)
        ctx.lineTo(x, AXIS_Y)
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
        ctx.font = `600 15px 'Fraunces', 'Noto Serif SC', serif`
        const phaseLabel = (text: string, from: number, to: number) => {
          if (to - from < 64) return
          const mid = (from + to) / 2
          const w = ctx.measureText(text).width
          ctx.fillStyle = 'rgba(244, 250, 248, 0.92)'
          ctx.beginPath()
          ctx.roundRect(mid - w / 2 - 10, PLOT_TOP + 2, w + 20, 22, 10)
          ctx.fill()
          ctx.strokeStyle = 'rgba(11, 61, 74, 0.2)'
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = '#0b3d4a'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(text, mid, PLOT_TOP + 13)
        }
        phaseLabel(labels.save, PLOT_LEFT, x)
        phaseLabel(labels.draw, x, PLOT_LEFT + plotW)
      }

      ctx.font = `10px 'Source Sans 3', 'Noto Sans SC', sans-serif`
      ctx.fillStyle = '#5a6f74'
      // Avoid unreadable year-label pile-up when many points share one viewport width.
      const yearStep = Math.max(1, Math.ceil(last / Math.max(Math.floor(plotW / 26), 8)))
      for (let i = 0; i <= last; i++) {
        const x = xAt(i)
        const major = i === retireIdx || i === 0 || i === last || i % yearStep === 0
        ctx.beginPath()
        ctx.strokeStyle = i === retireIdx ? '#0b3d4a' : 'rgba(11, 61, 74, 0.18)'
        ctx.lineWidth = 1
        ctx.moveTo(x, AXIS_Y)
        ctx.lineTo(x, AXIS_Y + (i === retireIdx ? 7 : 4))
        ctx.stroke()
        if (!major) continue
        ctx.save()
        ctx.translate(x, YEAR_LABEL_Y)
        ctx.rotate(-Math.PI / 2)
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = i === retireIdx ? '#0b3d4a' : '#5a6f74'
        ctx.fillText(String(points[i].year), 0, 0)
        ctx.restore()
      }

      const refreshHits = () => {
        const canvasBox = canvas.getBoundingClientRect()
        const wrapBox = wrap.getBoundingClientRect()
        // Ancestor CSS scale + chart zoom both shrink getBoundingClientRect.
        const sx = canvasBox.width / (canvas.clientWidth || canvasBox.width || 1)
        const sy = canvasBox.height / (canvas.clientHeight || canvasBox.height || 1)
        hitsRef.current = points.map((p, i) => {
          const x = xAt(i)
          const y = yAt(p.value)
          return {
            ...p,
            x,
            y,
            viewX: canvasBox.left - wrapBox.left + x * sx,
            viewY: canvasBox.top - wrapBox.top + y * sy,
          }
        })
      }
      refreshHits()
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(scroll)
    // Scroll only refreshes hit targets — full redraw here raced zoom-out on Android
    // (scrollLeft clamp during layer shrink re-entered draw mid-gesture).
    const onScroll = () => {
      const canvasBox = canvas.getBoundingClientRect()
      const wrapBox = wrap.getBoundingClientRect()
      const sx = canvasBox.width / (canvas.clientWidth || canvasBox.width || 1)
      const sy = canvasBox.height / (canvas.clientHeight || canvasBox.height || 1)
      hitsRef.current = hitsRef.current.map((hit) => ({
        ...hit,
        viewX: canvasBox.left - wrapBox.left + hit.x * sx,
        viewY: canvasBox.top - wrapBox.top + hit.y * sy,
      }))
    }
    scroll.addEventListener('scroll', onScroll, { passive: true })
    let alive = true
    document.fonts?.ready.then(() => {
      if (alive) draw()
    })
    return () => {
      alive = false
      ro.disconnect()
      scroll.removeEventListener('scroll', onScroll)
    }
  }, [points, activeIndex, lang, labels])

  /**
   * Custom chart pinch: Android Chrome does not reliably page-zoom when the
   * gesture starts inside an overflow:auto region (.chart-scroll). We claim
   * two-finger moves (non-passive) and scale the canvas locally instead.
   * Pinch-out (fingers closer) must decrease zoom the same way pinch-in increases it.
   */
  useEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return

    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchRef.current = {
          startDist: Math.max(touchDist(e.touches[0], e.touches[1]), 1),
          startZoom: zoomRef.current,
        }
      }
    }

    const onMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !pinchRef.current) return
      if (pinchRef.current.startDist < 8) return
      e.preventDefault()
      const dist = touchDist(e.touches[0], e.touches[1])
      const mid = touchMid(e.touches[0], e.touches[1])
      applyZoomRef.current(
        pinchRef.current.startZoom * (dist / pinchRef.current.startDist),
        mid,
      )
    }

    const onEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinchRef.current = null
    }

    scroll.addEventListener('touchstart', onStart, { passive: true })
    scroll.addEventListener('touchmove', onMove, { passive: false })
    scroll.addEventListener('touchend', onEnd, { passive: true })
    scroll.addEventListener('touchcancel', onEnd, { passive: true })
    return () => {
      scroll.removeEventListener('touchstart', onStart)
      scroll.removeEventListener('touchmove', onMove)
      scroll.removeEventListener('touchend', onEnd)
      scroll.removeEventListener('touchcancel', onEnd)
    }
  }, [])

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pinchRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const box = canvas.getBoundingClientRect()
    const layoutW = canvas.clientWidth || box.width || 1
    const x = ((e.clientX - box.left) * layoutW) / (box.width || layoutW)
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

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08
    applyZoomRef.current(zoomRef.current * factor, { x: e.clientX, y: e.clientY })
  }

  const lastNudgeAt = useRef(0)
  const onZoomPointer = (delta: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    // Prefer pointerup over click: Android + SVG icons inside <button> can drop clicks.
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const now = performance.now()
    // Ignore compatibility mouse ghost after a touch nudge.
    if (e.pointerType === 'mouse' && now - lastNudgeAt.current < 450) return
    if (e.pointerType === 'touch' || e.pointerType === 'pen') lastNudgeAt.current = now
    e.preventDefault()
    e.stopPropagation()
    nudgeZoom(delta)
  }

  const onZoomResetPointer = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const now = performance.now()
    if (e.pointerType === 'mouse' && now - lastNudgeAt.current < 450) return
    if (e.pointerType === 'touch' || e.pointerType === 'pen') lastNudgeAt.current = now
    e.preventDefault()
    e.stopPropagation()
    applyZoomRef.current(1)
  }

  const summary =
    hover ??
    (retire
      ? { ...retire, x: 0, y: 0, viewX: 0, viewY: 0 }
      : null)

  const zoomPct = Math.round(zoom * 100)
  const atMinZoom = zoom <= MIN_ZOOM + 0.001
  const atMaxZoom = zoom >= MAX_ZOOM - 0.001

  return (
    <div ref={wrapRef} className="relative">
      <div
        className="chart-zoom-bar"
        role="toolbar"
        aria-label={labels.zoomIn}
        data-zoom={zoomPct}
      >
        <button
          type="button"
          className={`chart-zoom-btn${atMinZoom ? ' is-disabled' : ''}`}
          aria-label={labels.zoomOut}
          aria-disabled={atMinZoom}
          data-zoom-action="out"
          onPointerUp={onZoomPointer(-ZOOM_STEP)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              nudgeZoom(-ZOOM_STEP)
            }
          }}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="chart-zoom-btn chart-zoom-pct"
          aria-label={labels.zoomReset}
          data-zoom-action="reset"
          title={labels.zoomReset}
          onPointerUp={onZoomResetPointer}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              applyZoomRef.current(1)
            }
          }}
        >
          {zoomPct}%
        </button>
        <button
          type="button"
          className={`chart-zoom-btn${atMaxZoom ? ' is-disabled' : ''}`}
          aria-label={labels.zoomIn}
          aria-disabled={atMaxZoom}
          data-zoom-action="in"
          onPointerUp={onZoomPointer(ZOOM_STEP)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              nudgeZoom(ZOOM_STEP)
            }
          }}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
        {!atMinZoom && (
          <button
            type="button"
            className="chart-zoom-btn"
            aria-label={labels.zoomReset}
            data-zoom-action="reset-icon"
            onPointerUp={onZoomResetPointer}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                applyZoomRef.current(1)
              }
            }}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="chart-scroll overflow-auto rounded-2xl border border-[color:var(--line)] bg-[color:var(--plot)]"
        style={{ maxHeight: SCROLL_MAX_H }}
        onWheel={onWheel}
      >
        <div ref={layerRef} className="chart-zoom-layer">
          <canvas
            ref={canvasRef}
            className="block"
            onPointerMove={onPointerMove}
            onPointerLeave={() => setHover(null)}
            role="img"
            aria-label={labels.total}
          />
        </div>
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
