import { useEffect, useId, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Info } from 'lucide-react'
import { Chart } from './Chart'
import {
  MAX_MONTHLY_CONTRIBUTION,
  formatEuro,
  formatMoney,
  project,
} from './calc'
import { copy, type Lang } from './i18n'

function digitsOnly(raw: string) {
  return raw.replace(/\D/g, '').replace(/^0+(?=\d)/, '')
}

function Tip({ text, label }: { text: string; label: string }) {
  const [open, setOpen] = useState(false)
  const tipId = useId()
  return (
    <>
      <button
        type="button"
        className="tip-btn"
        aria-expanded={open}
        aria-controls={tipId}
        aria-label={label}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen((v) => !v)
        }}
      >
        <Info className="size-4" aria-hidden="true" />
      </button>
      {open && (
        <span id={tipId} role="note" className="tip-panel">
          {text}
        </span>
      )}
    </>
  )
}

function StepperField({
  id,
  value,
  onValue,
  min,
  max,
  fallback,
  stepBy = 1,
  increaseLabel,
  decreaseLabel,
}: {
  id: string
  value: string
  onValue: (v: string) => void
  min?: number
  max?: number
  fallback: number
  stepBy?: number
  increaseLabel: string
  decreaseLabel: string
}) {
  const nudge = (dir: number) => {
    const n = Number(value)
    let next = (value !== '' && Number.isFinite(n) ? n : fallback) + dir * stepBy
    if (min != null) next = Math.max(min, next)
    if (max != null) next = Math.min(max, next)
    onValue(String(next))
  }

  return (
    <div className="field">
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => onValue(digitsOnly(e.target.value))}
        aria-describedby={undefined}
      />
      <div className="stepper">
        <button type="button" aria-label={increaseLabel} onClick={() => nudge(1)}>
          <ChevronUp className="size-4" aria-hidden="true" />
        </button>
        <button type="button" aria-label={decreaseLabel} onClick={() => nudge(-1)}>
          <ChevronDown className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

const LANGS: [Lang, string][] = [
  ['zh', '简体中文'],
  ['zhHant', '繁體中文'],
  ['en', 'English'],
  ['de', 'Deutsch'],
]

export default function App() {
  const [lang, setLang] = useState<Lang>('zh')
  const t = copy[lang]

  const [monthly, setMonthly] = useState(150)
  const [monthlyText, setMonthlyText] = useState('150')
  const [birthYear, setBirthYear] = useState(1973)
  const [birthText, setBirthText] = useState('1973')
  const [returnPct, setReturnPct] = useState(7)
  const [costPct, setCostPct] = useState(0.1)
  const [children, setChildren] = useState(1)
  const [childrenText, setChildrenText] = useState('1')
  const [childBirths, setChildBirths] = useState([2004, 2006, 2008, 2010, 2012])
  const [childTexts, setChildTexts] = useState(['2004', '2006', '2008', '2010', '2012'])

  const monthlyId = useId()
  const birthId = useId()
  const childrenId = useId()
  const returnId = useId()
  const costId = useId()

  useEffect(() => {
    const saved = window.localStorage.getItem('av-lang')
    if (saved === 'en' || saved === 'zh' || saved === 'zhHant' || saved === 'de') {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('av-lang', lang)
    document.title = t.title
    document.documentElement.lang =
      lang === 'zh' ? 'zh-CN' : lang === 'zhHant' ? 'zh-Hant' : lang === 'de' ? 'de' : 'en'
  }, [lang, t.title])

  useEffect(() => {
    if (monthly > MAX_MONTHLY_CONTRIBUTION) setMonthly(MAX_MONTHLY_CONTRIBUTION)
  }, [monthly])

  const full = useMemo(
    () =>
      project({
        monthly,
        birthYear,
        returnPct,
        costPct,
        children,
        childBirths,
      }),
    [monthly, birthYear, returnPct, costPct, children, childBirths],
  )

  const lump = useMemo(
    () =>
      project({
        monthly,
        birthYear,
        returnPct,
        costPct,
        children,
        childBirths,
        lumpSumRatio: 0.3,
      }),
    [monthly, birthYear, returnPct, costPct, children, childBirths],
  )

  const monthlyWithdraw = Math.round(full.annualWithdraw / 12)
  const lumpMonthly = Math.round(lump.annualWithdraw / 12)
  const purchasingPower = Math.round(monthlyWithdraw / 1.02 ** full.saveYears)
  const wide = lang === 'en' || lang === 'de'

  return (
    <main className="shell relative min-h-screen overflow-x-hidden px-4 py-8 text-[color:var(--ink)] sm:px-6 lg:py-10">
      <div
        className="orb hidden lg:block"
        style={{
          width: 220,
          height: 220,
          top: 40,
          right: '8%',
          background: 'radial-gradient(circle, rgba(126,200,184,0.45), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="orb hidden lg:block"
        style={{
          width: 180,
          height: 180,
          bottom: 80,
          left: '4%',
          background: 'radial-gradient(circle, rgba(196,122,44,0.22), transparent 70%)',
          animationDelay: '-6s',
        }}
        aria-hidden="true"
      />

      <div
        className={`mx-auto grid max-w-6xl gap-6 ${wide ? 'lg:grid-cols-[400px_1fr]' : 'lg:grid-cols-[360px_1fr]'}`}
      >
        <section className="panel relative min-w-0 rounded-[1.4rem] p-5 sm:p-6">
          <div
            className="lang-switch mb-5"
            role="group"
            aria-label={t.langLabel}
          >
            {LANGS.map(([code, label]) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.18em] text-[color:var(--primary-soft)] uppercase">
            {t.brand}
          </p>
          <h1
            className={`font-display hero-glow leading-[1.12] ${wide ? 'text-3xl' : 'text-4xl'}`}
          >
            {t.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{t.subtitle}</p>

          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor={monthlyId}
                className="mb-1.5 flex flex-wrap items-center gap-1 text-sm font-semibold"
              >
                {t.monthly}
                <Tip text={t.monthlyTip} label={t.moreInfo} />
              </label>
              <StepperField
                id={monthlyId}
                value={monthlyText}
                min={0}
                max={MAX_MONTHLY_CONTRIBUTION}
                fallback={0}
                stepBy={10}
                increaseLabel={t.increase}
                decreaseLabel={t.decrease}
                onValue={(v) => {
                  setMonthlyText(v)
                  if (v === '') return
                  const n = Math.min(MAX_MONTHLY_CONTRIBUTION, Number(v))
                  setMonthlyText(String(n))
                  setMonthly(n)
                }}
              />
            </div>

            <div>
              <label
                htmlFor={birthId}
                className="mb-1.5 flex flex-wrap items-center gap-1 text-sm font-semibold"
              >
                {t.birth}
                <Tip text={t.birthTip} label={t.moreInfo} />
              </label>
              <StepperField
                id={birthId}
                value={birthText}
                min={1961}
                max={2026}
                fallback={Math.min(2026, Math.max(1961, birthYear || 1973))}
                increaseLabel={t.increase}
                decreaseLabel={t.decrease}
                onValue={(v) => {
                  if (v === '') {
                    setBirthText('')
                    return
                  }
                  const n = Number(v)
                  if (!Number.isFinite(n)) return
                  if (v.length >= 4) {
                    const clamped = Math.min(2026, Math.max(1961, n))
                    setBirthText(String(clamped))
                    setBirthYear(clamped)
                  } else {
                    setBirthText(v)
                    if (n >= 1961 && n <= 2026) setBirthYear(n)
                  }
                }}
              />
            </div>

            <div>
              <label
                htmlFor={returnId}
                className="mb-1.5 flex flex-wrap items-center gap-1 text-sm font-semibold"
              >
                {t.expected(returnPct.toFixed(1))}
                <Tip text={t.expectedTip} label={t.moreInfo} />
              </label>
              <input
                id={returnId}
                className="range"
                type="range"
                min={3}
                max={10}
                step={0.1}
                value={returnPct}
                onChange={(e) => setReturnPct(Number(e.target.value))}
              />
            </div>

            <div>
              <label
                htmlFor={costId}
                className="mb-1.5 flex flex-wrap items-center gap-1 text-sm font-semibold"
              >
                {t.cost(costPct.toFixed(1))}
                <Tip text={t.costTip} label={t.moreInfo} />
              </label>
              <input
                id={costId}
                className="range"
                type="range"
                min={0.1}
                max={1}
                step={0.1}
                value={costPct}
                onChange={(e) => setCostPct(Number(e.target.value))}
              />
              <span className="mt-1 block text-xs font-normal text-[color:var(--good)]">
                {t.effective((full.eff * 100).toFixed(1))}
              </span>
            </div>

            <div>
              <label
                htmlFor={childrenId}
                className="mb-1.5 flex flex-wrap items-center gap-1 text-sm font-semibold"
              >
                {t.children}
                <Tip text={t.childrenTip} label={t.moreInfo} />
              </label>
              <StepperField
                id={childrenId}
                value={childrenText}
                min={0}
                max={5}
                fallback={children}
                increaseLabel={t.increase}
                decreaseLabel={t.decrease}
                onValue={(v) => {
                  setChildrenText(v)
                  if (v === '') return
                  const n = Math.min(5, Math.max(0, Math.round(Number(v))))
                  setChildren(n)
                  setChildrenText(String(n))
                }}
              />
            </div>

            {children > 0 && (
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-1 text-sm font-semibold">
                  {t.childYears}
                  <Tip text={t.childYearsTip} label={t.moreInfo} />
                </div>
                <div className="flex flex-col gap-2">
                  {childTexts.slice(0, children).map((text, i) => {
                    const id = `child-year-${i}`
                    return (
                      <label key={id} className="block text-sm font-semibold" htmlFor={id}>
                        <span className="mb-1 block text-xs font-normal text-[color:var(--muted)]">
                          {t.childN(i + 1)}
                        </span>
                        <input
                          id={id}
                          type="text"
                          inputMode="numeric"
                          value={text}
                          onFocus={(e) => e.currentTarget.select()}
                          onChange={(e) => {
                            const raw = digitsOnly(e.target.value)
                            if (raw === '') {
                              setChildTexts((rows) => rows.map((row, j) => (j === i ? '' : row)))
                              return
                            }
                            const n = Number(raw)
                            if (!Number.isFinite(n)) return
                            if (raw.length >= 4) {
                              const clamped = Math.min(2026, Math.max(1986, n))
                              setChildTexts((rows) =>
                                rows.map((row, j) => (j === i ? String(clamped) : row)),
                              )
                              setChildBirths((rows) =>
                                rows.map((row, j) => (j === i ? clamped : row)),
                              )
                            } else {
                              setChildTexts((rows) =>
                                rows.map((row, j) => (j === i ? raw : row)),
                              )
                              if (n >= 1986 && n <= 2026) {
                                setChildBirths((rows) =>
                                  rows.map((row, j) => (j === i ? n : row)),
                                )
                              }
                            }
                          }}
                          className="w-full rounded-[0.9rem] border border-[color:var(--line)] bg-white/70 px-3 py-2.5 outline-none transition-[border-color,box-shadow] hover:border-[color:rgba(42,122,140,0.45)] focus:border-[color:var(--primary-soft)] focus:shadow-[0_0_0_3px_var(--glow)]"
                        />
                      </label>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-[color:var(--line)] pt-4">
            <h2 className="text-base font-semibold text-[color:var(--primary)]">{t.notesTitle}</h2>
            <ol className="mt-2.5 list-decimal space-y-2 pl-4 text-[13px] leading-relaxed break-words text-[color:var(--muted)] [overflow-wrap:anywhere]">
              {t.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="flex flex-col gap-4" style={{ animationDelay: '80ms' }}>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="panel rounded-[1.25rem] p-4 sm:p-5">
              <h2 className="text-sm font-medium text-[color:var(--muted)]">{t.withdrawTitle}</h2>
              <p className="result-value mt-1">
                {formatMoney(monthlyWithdraw, lang)} €
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{t.monthlyPreTax}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1 text-sm">
                {t.purchasing(formatMoney(purchasingPower, lang))}
                <Tip text={t.purchasingTip} label={t.moreInfo} />
              </div>
            </article>

            <article className="panel rounded-[1.25rem] p-4 sm:p-5">
              <h2 className="text-sm font-medium text-[color:var(--muted)]">{t.assetsTitle}</h2>
              <p className="result-value mt-1">{formatEuro(full.brutto, lang)}</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">
                {t.assetsSplit(
                  formatEuro(full.points[full.saveYears]?.own ?? 0, lang),
                  formatEuro(full.points[full.saveYears]?.subsidy ?? 0, lang),
                  formatEuro(full.points[full.saveYears]?.gain ?? 0, lang),
                )}
              </p>
            </article>
          </div>

          <article className="panel rounded-[1.25rem] p-4 sm:p-5">
            <h2 className="font-semibold">{t.chartFull}</h2>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              {t.chartFullNote(formatMoney(monthlyWithdraw, lang))}
            </p>
            <div className="mt-3">
              <Chart points={full.points} lang={lang} />
            </div>
          </article>

          <article className="panel rounded-[1.25rem] p-4 sm:p-5">
            <h2 className="font-semibold">{t.chartLump}</h2>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              {t.chartLumpNote(formatEuro(lump.lumpSum, lang), formatMoney(lumpMonthly, lang))}
            </p>
            <div className="mt-3">
              <Chart points={lump.points} lang={lang} />
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
