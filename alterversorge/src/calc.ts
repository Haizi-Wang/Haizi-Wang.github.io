/** Reform products available from 1 Jan 2027 (Altersvorsorgereformgesetz). */
export const START_YEAR = 2027
export const RETIRE_AGE = 67
export const DRAW_YEARS = 18 // ages 67–85
export const MIN_ANNUAL_FOR_SUBSIDY = 120
export const MAX_MONTHLY_CONTRIBUTION = 570 // €6,840 / year
export const MAX_SUBSIDISED_ANNUAL = 1800
export const CHILD_SUBSIDY_PER_CHILD = 300
/** A child counts while aged 0–24 (Kindergeld-style window, simplified). */
export const CHILD_MAX_AGE = 24

export type Phase = 'save' | 'draw'

export type Point = {
  year: number
  age: number
  value: number
  own: number
  subsidy: number
  gain: number
  phase: Phase
  withdrawn: number
}

export type CalcInput = {
  monthly: number
  birthYear: number
  returnPct: number
  costPct: number
  children: number
  childBirths: number[]
  lumpSumRatio?: number
}

export type CalcResult = {
  age: number
  saveYears: number
  eff: number
  brutto: number
  foerderung: number
  annualWithdraw: number
  lumpSum: number
  points: Point[]
}

const num = (v: number, fallback = 0) => (Number.isFinite(v) ? v : fallback)
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Grundzulage: 50% on first €360, 25% on next up to €1,800. Needs ≥ €120/year. */
export function basicSubsidy(annualOwn: number): number {
  if (annualOwn < MIN_ANNUAL_FOR_SUBSIDY) return 0
  const tier1 = Math.min(annualOwn, 360)
  const tier2 = Math.max(0, Math.min(annualOwn, MAX_SUBSIDISED_ANNUAL) - 360)
  return tier1 * 0.5 + tier2 * 0.25
}

/**
 * Kinderzulage: 1:1 match up to €300 per eligible child. Needs ≥ €120/year.
 * Conservative assumption: the match can never exceed your own annual contribution.
 */
export function childSubsidy(annualOwn: number, eligibleChildren: number): number {
  if (eligibleChildren <= 0 || annualOwn < MIN_ANNUAL_FOR_SUBSIDY) return 0
  return Math.min(annualOwn, CHILD_SUBSIDY_PER_CHILD * eligibleChildren)
}

/** Level payment that depletes principal over n periods at per-period rate r (paid at period end). */
export function annuityPayment(principal: number, rate: number, n: number): number {
  if (n <= 0 || principal <= 0) return 0
  if (Math.abs(rate) < 1e-8) return principal / n
  const growth = (1 + rate) ** n
  return (principal * rate * growth) / (growth - 1)
}

/**
 * Project the account from START_YEAR until age 85.
 * Timing: own money is paid in monthly (≈ half a year of growth on average);
 * the state subsidy is credited at year end. Withdrawals are paid monthly.
 * Age at start = START_YEAR − birthYear (calendar-year simplification).
 * Invalid inputs are sanitised; anyone already 67+ gets an empty result.
 */
export function project(input: CalcInput): CalcResult {
  const monthly = clamp(num(input.monthly), 0, MAX_MONTHLY_CONTRIBUTION)
  const children = clamp(Math.round(num(input.children)), 0, 5)
  const birthYear = clamp(Math.round(num(input.birthYear, 1973)), 1900, START_YEAR)
  const effRaw = num(input.returnPct) / 100 - num(input.costPct) / 100
  const eff = Math.max(effRaw, -0.99)
  const ageAtStart = START_YEAR - birthYear
  const saveYears = Math.max(0, RETIRE_AGE - ageAtStart)
  const annualOwn = monthly * 12
  const annualBasic = basicSubsidy(annualOwn)
  const midYear = (1 + eff) ** 0.5

  const points: Point[] = [
    {
      year: START_YEAR,
      age: ageAtStart,
      value: 0,
      own: 0,
      subsidy: 0,
      gain: 0,
      phase: 'save',
      withdrawn: 0,
    },
  ]

  let value = 0
  let own = 0
  let subsidyPaid = 0

  const push = (year: number, age: number, phase: Phase, withdrawn: number) => {
    const v = Math.max(0, Math.round(value))
    const o = Math.max(0, Math.round(own))
    const s = Math.max(0, Math.round(Math.min(subsidyPaid, v - o)))
    const g = v - o - s
    points.push({ year, age, value: v, own: o, subsidy: s, gain: g, phase, withdrawn })
  }

  for (let t = 0; t < saveYears; t++) {
    const births = input.childBirths ?? []
    let eligible = 0
    for (let i = 0; i < children && i < births.length; i++) {
      const childAge = START_YEAR + t - births[i]
      if (childAge >= 0 && childAge <= CHILD_MAX_AGE) eligible += 1
    }
    const annualSub = annualBasic + childSubsidy(annualOwn, eligible)
    own += annualOwn
    subsidyPaid += annualSub
    value = value * (1 + eff) + annualOwn * midYear + annualSub
    push(START_YEAR + t + 1, ageAtStart + t + 1, 'save', 0)
  }

  const brutto = value
  const lumpSum = brutto * clamp(num(input.lumpSumRatio ?? 0), 0, 1)
  const remainRatio = brutto > 0 ? (brutto - lumpSum) / brutto : 0
  own *= remainRatio
  subsidyPaid *= remainRatio
  value = brutto - lumpSum

  const monthlyRate = (1 + eff) ** (1 / 12) - 1
  const monthlyPayment = annuityPayment(value, monthlyRate, DRAW_YEARS * 12)

  if (saveYears > 0) {
    for (let e = 1; e <= DRAW_YEARS; e++) {
      let withdrawnYear = 0
      for (let m = 0; m < 12; m++) {
        const grown = value * (1 + monthlyRate)
        const take = Math.min(monthlyPayment, grown)
        const keep = grown > 0 ? (grown - take) / grown : 0
        own *= keep
        subsidyPaid *= keep
        value = grown - take
        withdrawnYear += take
      }
      push(
        START_YEAR + saveYears + e,
        ageAtStart + saveYears + e,
        'draw',
        Math.round(withdrawnYear + (e === 1 ? lumpSum : 0)),
      )
    }
  }

  const atRetire = points[saveYears]

  return {
    age: ageAtStart,
    saveYears,
    eff,
    brutto: Math.round(brutto),
    foerderung: atRetire?.subsidy ?? 0,
    annualWithdraw: Math.round(monthlyPayment * 12),
    lumpSum: Math.round(lumpSum),
    points,
  }
}

export function formatMoney(n: number, lang: string = 'zh'): string {
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  return Math.round(n).toLocaleString(locale)
}

export function formatEuro(n: number, lang: string = 'zh'): string {
  return `${formatMoney(n, lang)} €`
}
