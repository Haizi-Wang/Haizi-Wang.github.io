/** Reform products available from 1 Jan 2027 (Altersvorsorgereformgesetz). */
export const START_YEAR = 2027
export const RETIRE_AGE = 67
export const DRAW_YEARS = 18 // ages 67–85
export const MIN_ANNUAL_FOR_SUBSIDY = 120
export const MAX_MONTHLY_CONTRIBUTION = 570 // €6,840 / year
export const MAX_SUBSIDISED_ANNUAL = 1800

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
  monthlyNetLow: number
  monthlyNetHigh: number
  points: Point[]
}

/** Grundzulage: 50% on first €360, 25% on next up to €1,800. Needs ≥ €120/year. */
export function basicSubsidy(annualOwn: number): number {
  if (annualOwn < MIN_ANNUAL_FOR_SUBSIDY) return 0
  const tier1 = Math.min(annualOwn, 360)
  const tier2 = Math.max(0, Math.min(annualOwn, MAX_SUBSIDISED_ANNUAL) - 360)
  return tier1 * 0.5 + tier2 * 0.25
}

/** Kinderzulage: 100% match up to €300 per eligible child. Needs ≥ €120/year. */
export function childSubsidy(annualOwn: number, eligibleChildren: number): number {
  if (eligibleChildren <= 0 || annualOwn < MIN_ANNUAL_FOR_SUBSIDY) return 0
  return Math.min(annualOwn, 300) * eligibleChildren
}

/** Level annuity payment that depletes principal over n years at rate r. */
export function annuityPayment(principal: number, rate: number, n: number): number {
  if (n <= 0 || principal <= 0) return 0
  if (Math.abs(rate) < 1e-8) return principal / n
  const growth = (1 + rate) ** n
  return (principal * rate * growth) / (growth - 1)
}

/**
 * Project account balance from START_YEAR until age 85.
 * Age at start = START_YEAR − birthYear (calendar-year simplification).
 * Child eligibility: Kindergeld-style window ages 0–24 inclusive.
 */
export function project(input: CalcInput): CalcResult {
  const monthly = Math.max(0, input.monthly)
  const children = Math.min(5, Math.max(0, Math.round(input.children)))
  const birthYear = input.birthYear
  const eff = input.returnPct / 100 - input.costPct / 100
  const ageAtStart = START_YEAR - birthYear
  const saveYears = Math.max(1, RETIRE_AGE - ageAtStart)
  const annualOwn = monthly * 12
  const annualBasic = basicSubsidy(annualOwn)

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
    const births = input.childBirths
    let eligible = 0
    for (let i = 0; i < children && i < births.length; i++) {
      // Age of child during contribution year START_YEAR + t
      const childAge = START_YEAR - births[i] + t
      if (childAge >= 0 && childAge < 25) eligible += 1
    }
    const annualSub = annualBasic + childSubsidy(annualOwn, eligible)
    own += annualOwn
    subsidyPaid += annualSub
    value = (value + annualOwn + annualSub) * (1 + eff)
    push(START_YEAR + t + 1, ageAtStart + t + 1, 'save', 0)
  }

  const brutto = value
  const lumpSum = brutto * Math.min(1, Math.max(0, input.lumpSumRatio ?? 0))
  const remainRatio = brutto > 0 ? (brutto - lumpSum) / brutto : 0
  own *= remainRatio
  subsidyPaid *= remainRatio
  value = brutto - lumpSum

  const annualWithdraw = annuityPayment(value, eff, DRAW_YEARS)

  for (let e = 1; e <= DRAW_YEARS; e++) {
    const grown = value * (1 + eff)
    const gainSlice = grown - own - subsidyPaid
    const afterGrowth = Math.max(0, own + subsidyPaid + gainSlice)
    const take = Math.min(annualWithdraw, afterGrowth)
    const keepRatio = afterGrowth > 0 ? (afterGrowth - take) / afterGrowth : 0
    own *= keepRatio
    subsidyPaid *= keepRatio
    value = afterGrowth - take
    const withdrawn = take + (e === 1 ? lumpSum : 0)
    push(START_YEAR + saveYears + e, ageAtStart + saveYears + e, 'draw', Math.round(withdrawn))
  }

  const atRetire = points[saveYears]
  const monthlyWithdraw = annualWithdraw / 12

  return {
    age: ageAtStart,
    saveYears,
    eff,
    brutto: Math.round(brutto),
    foerderung: atRetire?.subsidy ?? 0,
    annualWithdraw: Math.round(annualWithdraw),
    lumpSum: Math.round(lumpSum),
    monthlyNetLow: monthlyWithdraw * 0.7,
    monthlyNetHigh: monthlyWithdraw * 0.8,
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
