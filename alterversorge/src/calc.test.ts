import {
  START_YEAR,
  basicSubsidy,
  childSubsidy,
  project,
} from './calc'

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error(msg)
}

function nearly(a: number, b: number, tol = 1) {
  return Math.abs(a - b) <= tol
}

const mk = (o: Partial<Parameters<typeof project>[0]> = {}) => ({
  monthly: 150,
  birthYear: 1973,
  returnPct: 7,
  costPct: 0.1,
  children: 0,
  childBirths: [] as number[],
  ...o,
})

assert(START_YEAR === 2027, 'START_YEAR must be 2027')

// --- subsidy rules ---
assert(basicSubsidy(0) === 0, 'no subsidy below minimum')
assert(basicSubsidy(119) === 0, '119 annual gets no subsidy')
assert(basicSubsidy(120) === 60, '120 → 50% = 60')
assert(basicSubsidy(360) === 180, '360 → 180')
assert(basicSubsidy(1800) === 540, '1800 → max grund 540')
assert(basicSubsidy(6840) === 540, 'above 1800 still capped at 540')

assert(childSubsidy(300, 1) === 300, 'one child max 300')
assert(childSubsidy(1800, 2) === 600, 'two children 600')
assert(childSubsidy(100, 1) === 0, 'below min annual → 0 child subsidy')
assert(childSubsidy(300, 3) === 300, 'child subsidy never exceeds own contribution')
assert(childSubsidy(1800, 5) === 1500, 'five children 1500')

// --- baseline ---
const base = project(mk({ children: 1, childBirths: [2004] }))
assert(base.age === 2027 - 1973, `age at start should be 54, got ${base.age}`)
assert(base.saveYears === 13, `saveYears should be 13 (67-54), got ${base.saveYears}`)
assert(base.eff === 0.069, `eff return 6.9%, got ${base.eff}`)
assert(base.points[base.saveYears].own === 150 * 12 * 13, 'own contributions mismatch')

// Child born 2004 is 23 and 24 in 2027/2028 → child subsidy for 2 years.
const expectedSubsidy = 540 * 13 + 300 * 2
assert(
  nearly(base.points[base.saveYears].subsidy, expectedSubsidy, 5),
  `subsidy expected ~${expectedSubsidy}, got ${base.points[base.saveYears].subsidy}`,
)

assert(project(mk()).saveYears === 13, 'must not count a phantom 2026 contribution year')

// --- low contributions ---
assert(
  project(mk({ monthly: 10, birthYear: 1990 })).points[project(mk({ monthly: 10, birthYear: 1990 })).saveYears]
    .subsidy > 0,
  '€10/mo reaches min subsidy',
)
const belowMin = project(mk({ monthly: 5, birthYear: 1990, children: 1, childBirths: [2015] }))
assert(belowMin.points[belowMin.saveYears].subsidy === 0, '€5/mo below €120/year → no subsidy')

// --- lump sum ---
const lump = project(mk({ children: 1, childBirths: [2004], lumpSumRatio: 0.3 }))
assert(nearly(lump.lumpSum, Math.round(base.brutto * 0.3), 1), '30% lump sum')
assert(lump.annualWithdraw < base.annualWithdraw, 'lump sum reduces monthly draw')
assert(nearly(lump.annualWithdraw, base.annualWithdraw * 0.7, 2), 'draw scales with remaining 70%')

// --- payout depletes the account by 85 ---
const last = base.points[base.points.length - 1]
assert(last.age === 85, `last point should be age 85, got ${last.age}`)
assert(last.value <= 1, `balance should be ~0 at 85, got ${last.value}`)

// --- robustness ---
const nanIn = project(mk({ monthly: NaN, returnPct: NaN, costPct: NaN }))
assert(Number.isFinite(nanIn.brutto) && nanIn.brutto === 0, 'NaN inputs must not produce NaN')

const capped = project(mk({ monthly: 100000 }))
assert(capped.points[capped.saveYears].own === 570 * 12 * 13, 'monthly contribution capped at €570')

const retired = project(mk({ birthYear: 1950 }))
assert(retired.saveYears === 0 && retired.brutto === 0, 'age 67+ gets no projection')
assert(retired.points.length === 1, 'age 67+ has a single empty point')

const future = project(mk({ birthYear: 2100 }))
assert(future.age === 0, 'birth year clamped to start year')

const negative = project(mk({ returnPct: -5 }))
assert(Number.isFinite(negative.brutto) && negative.brutto > 0, 'negative returns stay finite')

const manyKidsLowPay = project(mk({ monthly: 25, children: 3, childBirths: [2020, 2022, 2024] }))
const perYear = manyKidsLowPay.points[manyKidsLowPay.saveYears].subsidy / manyKidsLowPay.saveYears
assert(perYear <= 300 + 150 + 1, `low contribution must cap child subsidy, got ${perYear}/yr`)

console.log('All calc tests passed.')
console.log(
  JSON.stringify(
    {
      age: base.age,
      saveYears: base.saveYears,
      brutto: base.brutto,
      own: base.points[base.saveYears].own,
      subsidy: base.points[base.saveYears].subsidy,
      gain: base.points[base.saveYears].gain,
      monthlyWithdraw: Math.round(base.annualWithdraw / 12),
    },
    null,
    2,
  ),
)
