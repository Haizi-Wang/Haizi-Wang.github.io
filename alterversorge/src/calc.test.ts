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

assert(START_YEAR === 2027, 'START_YEAR must be 2027')

assert(basicSubsidy(0) === 0, 'no subsidy below minimum')
assert(basicSubsidy(119) === 0, '119 annual gets no subsidy')
assert(basicSubsidy(120) === 60, '120 → 50% = 60')
assert(basicSubsidy(360) === 180, '360 → 180')
assert(basicSubsidy(1800) === 540, '1800 → max grund 540')
assert(basicSubsidy(6840) === 540, 'above 1800 still capped at 540')

assert(childSubsidy(300, 1) === 300, 'one child max 300')
assert(childSubsidy(1800, 2) === 600, 'two children 600')
assert(childSubsidy(100, 1) === 0, 'below min annual → 0 child subsidy')

const base = project({
  monthly: 150,
  birthYear: 1973,
  returnPct: 7,
  costPct: 0.1,
  children: 1,
  childBirths: [2004],
})

assert(base.age === 2027 - 1973, `age at start should be 54, got ${base.age}`)
assert(base.saveYears === 13, `saveYears should be 13 (67-54), got ${base.saveYears}`)
assert(base.eff === 0.069, `eff return 6.9%, got ${base.eff}`)

// Own contributions: 150 * 12 * 13
assert(base.points[base.saveYears].own === 150 * 12 * 13, 'own contributions mismatch')

// Child born 2004: ages in years 2027..2039 → ages 23..35; eligible while age < 25 → 2027,2028 only (ages 23,24)
// Years with child subsidy: 2
// Annual basic 540 + child 300 for 2 years, then 540 for 11 years
const expectedSubsidy = 540 * 13 + 300 * 2
assert(
  nearly(base.points[base.saveYears].subsidy, expectedSubsidy, 5),
  `subsidy expected ~${expectedSubsidy}, got ${base.points[base.saveYears].subsidy}`,
)

const oldBugYears = project({
  monthly: 150,
  birthYear: 1973,
  returnPct: 7,
  costPct: 0.1,
  children: 0,
  childBirths: [],
})
assert(oldBugYears.saveYears === 13, 'must not count a phantom 2026 contribution year')

const zeroKids = project({
  monthly: 10,
  birthYear: 1990,
  returnPct: 7,
  costPct: 0.1,
  children: 0,
  childBirths: [],
})
assert(zeroKids.points[zeroKids.saveYears].subsidy > 0, '€10/mo reaches min subsidy')

const belowMin = project({
  monthly: 5,
  birthYear: 1990,
  returnPct: 7,
  costPct: 0.1,
  children: 1,
  childBirths: [2015],
})
assert(belowMin.points[belowMin.saveYears].subsidy === 0, '€5/mo below €120/year → no subsidy')

const lump = project({
  monthly: 150,
  birthYear: 1973,
  returnPct: 7,
  costPct: 0.1,
  children: 1,
  childBirths: [2004],
  lumpSumRatio: 0.3,
})
assert(nearly(lump.lumpSum, Math.round(base.brutto * 0.3), 1), '30% lump sum')
assert(lump.annualWithdraw < base.annualWithdraw, 'lump sum reduces monthly draw')

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
