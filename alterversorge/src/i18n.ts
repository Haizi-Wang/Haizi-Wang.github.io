export type Lang = 'zh' | 'zhHant' | 'en' | 'de'

export type Copy = {
  title: string
  brand: string
  subtitle: string
  monthly: string
  monthlyTip: string
  birth: string
  birthTip: string
  expected: (e: string) => string
  expectedTip: string
  cost: (e: string) => string
  costTip: string
  effective: (e: string) => string
  children: string
  childrenTip: string
  childYears: string
  childYearsTip: string
  childN: (e: number) => string
  notesTitle: string
  notes: string[]
  withdrawTitle: string
  monthlyPreTax: string
  purchasing: (e: string) => string
  purchasingTip: string
  assetsTitle: string
  assetsSplit: (e: string, t: string, n: string) => string
  chartFull: string
  chartFullNote: (e: string) => string
  chartLump: string
  chartLumpNote: (e: string, t: string) => string
  langLabel: string
  moreInfo: string
  increase: string
  decrease: string
}

export const chartLabels = {
  zh: {
    unit: '万',
    age67: '67岁',
    save: '积累期',
    draw: '提领期',
    yearAge: (y: number, a: number) => `${y}年 · ${a}岁`,
    yearAgeParen: (y: number, a: number) => `${y}年（${a}岁）`,
    total: '账户总额',
    totalShort: '总额',
    own: '自付',
    subsidy: '国家补贴',
    subsidyShort: '补贴',
    gain: '资产增值',
    gainShort: '增值',
    withdrawn: '当年提取',
    ownShort: '自付',
  },
  zhHant: {
    unit: '萬',
    age67: '67歲',
    save: '積累期',
    draw: '提領期',
    yearAge: (y: number, a: number) => `${y}年 · ${a}歲`,
    yearAgeParen: (y: number, a: number) => `${y}年（${a}歲）`,
    total: '帳戶總額',
    totalShort: '總額',
    own: '自付',
    subsidy: '國家補貼',
    subsidyShort: '補貼',
    gain: '資產增值',
    gainShort: '增值',
    withdrawn: '當年提取',
    ownShort: '自付',
  },
  en: {
    unit: 'k',
    age67: 'Age 67',
    save: 'Accumulation',
    draw: 'Withdrawal',
    yearAge: (y: number, a: number) => `${y} · age ${a}`,
    yearAgeParen: (y: number, a: number) => `${y} (age ${a})`,
    total: 'Total',
    totalShort: 'total',
    own: 'Own',
    subsidy: 'Subsidy',
    subsidyShort: 'subsidy',
    gain: 'Growth',
    gainShort: 'growth',
    withdrawn: 'Withdrawn',
    ownShort: 'own',
  },
  de: {
    unit: 'Tsd.',
    age67: '67 Jahre',
    save: 'Ansparphase',
    draw: 'Auszahlung',
    yearAge: (y: number, a: number) => `${y} · ${a} Jahre`,
    yearAgeParen: (y: number, a: number) => `${y} (${a} Jahre)`,
    total: 'Gesamtvermögen',
    totalShort: 'gesamt',
    own: 'Eigenbeitrag',
    subsidy: 'Zulage',
    subsidyShort: 'Zulage',
    gain: 'Wertzuwachs',
    gainShort: 'Zuwachs',
    withdrawn: 'Entnahme im Jahr',
    ownShort: 'eigen',
  },
} as const

export const copy: Record<Lang, Copy> = {
  zh: {
    title: '德国个人养老投资账户计算器',
    brand: 'Altersvorsorgedepot',
    subtitle:
      '按照联邦议会 2026 年 3 月 27 日通过、联邦参议院 2026 年 4 月 24 日同意、2026 年 5 月 29 日公布的养老改革法案估算，2027 年 1 月 1 日起生效实施。',
    monthly: '每月投资额（自有资金）',
    monthlyTip:
      '每月存入 30 欧元的时候，国家补贴相对于你自己存入的金额比例最高。每月存入 150 欧元，可以拿到最高补贴。每月最多可以存入 570 欧元。',
    birth: '出生年份',
    birthTip: '用来计算到 67 岁还剩多少年。年龄只影响积累多久，不影响补贴比例。',
    expected: (e) => `预期年化收益率 ${e}%`,
    expectedTip:
      '投资标的的预期长期年化回报。全球股票长期大约 6% 到 8%。这里默认 7%。',
    cost: (e) => `有效成本（年化）${e}%`,
    costTip: '产品的总费用率。标准产品法律规定最高 1%。有效收益率 = 预期收益率 − 成本。',
    effective: (e) => `有效收益率 ${e}% 年化`,
    children: '有儿童津贴资格的子女数量',
    childrenTip: '每个有 Kindergeld 资格的子女，每年最高 300 欧元子女补贴。',
    childYears: '子女出生年份',
    childYearsTip: '每个子女单独填出生年份。子女补贴通常持续到该子女约 25 岁。',
    childN: (e) => `第 ${e} 个`,
    notesTitle: '说明',
    notes: [
      '积累期的税务优惠体现在：（1）每年的自缴金额（最高 1800 €）和国家补贴，都可以按特别支出减少应纳税收入；（2）该账户内股票基金和 ETF 的资本利得、基金分红，以及每年的基金预扣税，完全免税。',
      '个人的税前年收入，例如工作收入、资本收入或其他收入，不改变资产增值的趋势和总额。',
      '提领期提取额按正常的个人收入申报，不区分自付、国家补贴或资产增值。未取出的余额继续增值。85岁以后全部余额可以一次性取出。',
      '仅为简单估算，不构成投资建议。收益率可以自行设定。估算未包含职场新人奖金、Frühstart-Rente 等情形以及未来可能的法规及税费调整。本计算器以 2027 年 1 月 1 日为第一笔缴费年度起点。',
    ],
    withdrawTitle: '提取额 67–85 岁（不一次性提取）',
    monthlyPreTax: '月度，税前',
    purchasing: (e) => `按现在的购买力约 ${e} €`,
    purchasingTip:
      '把 67 岁开始领取的这笔税前月提取额，按每年 2% 的通胀折回今天，看它大概相当于现在的多少钱。实际物价涨幅可能远高于 2%，所以到时候的实际购买力可能会更少。',
    assetsTitle: '67 岁时总资产（税前）',
    assetsSplit: (e, t, n) => `自付 ${e} · 补贴 ${t} · 增值 ${n}`,
    chartFull: '资产增长（退休时不一次性提取）',
    chartFullNote: (e) => `67 岁起全部余额按月领取，月度税前 ${e} €`,
    chartLump: '资产增长（退休时一次性提取 30%）',
    chartLumpNote: (e, t) => `67 岁一次性提取 ${e}，其余按月领取，月度税前 ${t} €`,
    langLabel: '语言',
    moreInfo: '更多说明',
    increase: '增加',
    decrease: '减少',
  },
  zhHant: {
    title: '德國個人養老投資帳戶計算器',
    brand: 'Altersvorsorgedepot',
    subtitle:
      '按照聯邦議會 2026 年 3 月 27 日通過、聯邦參議院 2026 年 4 月 24 日同意、2026 年 5 月 29 日公布的養老改革法案估算，2027 年 1 月 1 日起生效實施。',
    monthly: '每月投資額（自有資金）',
    monthlyTip:
      '每月存入 30 歐元的時候，國家補貼相對於你自己存入的金額比例最高。每月存入 150 歐元，可以拿到最高補貼。每月最多可以存入 570 歐元。',
    birth: '出生年份',
    birthTip: '用來計算到 67 歲還剩多少年。年齡只影響積累多久，不影響補貼比例。',
    expected: (e) => `預期年化收益率 ${e}%`,
    expectedTip:
      '投資標的的預期長期年化回報。全球股票長期大約 6% 到 8%。這裡預設 7%。',
    cost: (e) => `有效成本（年化）${e}%`,
    costTip: '產品的總費用率。標準產品法律規定最高 1%。有效收益率 = 預期收益率 − 成本。',
    effective: (e) => `有效收益率 ${e}% 年化`,
    children: '有兒童津貼資格的子女數量',
    childrenTip: '每個有 Kindergeld 資格的子女，每年最高 300 歐元子女補貼。',
    childYears: '子女出生年份',
    childYearsTip: '每個子女單獨填出生年份。子女補貼通常持續到該子女約 25 歲。',
    childN: (e) => `第 ${e} 個`,
    notesTitle: '說明',
    notes: [
      '積累期的稅務優惠體現在：（1）每年的自繳金額（最高 1800 €）和國家補貼，都可以按特別支出減少應納稅收入；（2）該帳戶內股票基金和 ETF 的資本利得、基金分紅，以及每年的基金預扣稅，完全免稅。',
      '個人的稅前年收入，例如工作收入、資本收入或其他收入，不改變資產增值的趨勢和總額。',
      '提領期提取額按正常的個人收入申報，不區分自付、國家補貼或資產增值。未取出的餘額繼續增值。85歲以後全部餘額可以一次性取出。',
      '僅為簡單估算，不構成投資建議。收益率可以自行設定。估算未包含職場新人獎金、Frühstart-Rente 等情形以及未來可能的法規及稅費調整。本計算器以 2027 年 1 月 1 日為第一筆繳費年度起點。',
    ],
    withdrawTitle: '提取額 67–85 歲（不一次性提取）',
    monthlyPreTax: '月度，稅前',
    purchasing: (e) => `按現在的購買力約 ${e} €`,
    purchasingTip:
      '把 67 歲開始領取的這筆稅前月提取額，按每年 2% 的通脹折回今天，看它大概相當於現在的多少錢。實際物價漲幅可能遠高於 2%，所以到時候的實際購買力可能會更少。',
    assetsTitle: '67 歲時總資產（稅前）',
    assetsSplit: (e, t, n) => `自付 ${e} · 補貼 ${t} · 增值 ${n}`,
    chartFull: '資產增長（退休時不一次性提取）',
    chartFullNote: (e) => `67 歲起全部餘額按月領取，月度稅前 ${e} €`,
    chartLump: '資產增長（退休時一次性提取 30%）',
    chartLumpNote: (e, t) => `67 歲一次性提取 ${e}，其餘按月領取，月度稅前 ${t} €`,
    langLabel: '語言',
    moreInfo: '更多說明',
    increase: '增加',
    decrease: '減少',
  },
  en: {
    title: 'German Personal Pension Investment Calculator',
    brand: 'Altersvorsorgedepot',
    subtitle:
      'Estimate based on the pension reform act passed by the Bundestag on 27 March 2026, approved by the Bundesrat on 24 April 2026 and published on 29 May 2026. It takes effect on 1 January 2027.',
    monthly: 'Monthly investment (your own money)',
    monthlyTip:
      'At €30 a month, the state subsidy is highest relative to what you pay in yourself. At €150 a month you receive the maximum basic subsidy. The most you can pay in is €570 a month.',
    birth: 'Year of birth',
    birthTip:
      'Used to count the years left until age 67. Age only affects how long the money compounds, not the subsidy rate.',
    expected: (e) => `Expected annual return ${e}%`,
    expectedTip:
      'The long-term annual return you expect from the investments. Global equities have historically returned about 6% to 8%. The default here is 7%.',
    cost: (e) => `Effective annual cost ${e}%`,
    costTip:
      'The product’s total expense ratio. The law caps the standard product at 1%. Effective return = expected return − costs.',
    effective: (e) => `Effective return ${e}% a year`,
    children: 'Children eligible for child benefit',
    childrenTip: 'Up to €300 a year in child subsidy for each child who qualifies for Kindergeld.',
    childYears: 'Children’s years of birth',
    childYearsTip:
      'Enter a birth year for each child. The child subsidy usually continues until that child is about 25.',
    childN: (e) => `Child ${e}`,
    notesTitle: 'Notes',
    notes: [
      'The tax advantage during accumulation is: (1) your own contributions (up to €1,800 a year) and the state subsidy can both be deducted as special expenses, reducing taxable income; (2) capital gains and fund distributions from equity funds and ETFs in the account, and the annual fund advance lump-sum tax, are fully tax-free.',
      'Your pre-tax annual income — wages, capital income or other income — does not change the path or the total of the investment growth.',
      'Withdrawals in the payout phase are declared as ordinary personal income. Own contributions, the state subsidy and investment growth are not distinguished. The balance that has not been withdrawn continues to grow. From age 85 the entire remaining balance can be withdrawn at once.',
      'This is a simple estimate only and not investment advice. You can set the return yourself. The estimate does not include the career-starter bonus, Frühstart-Rente, or possible future changes to the law and to taxes. Contributions are modelled from 1 January 2027.',
    ],
    withdrawTitle: 'Withdrawal, ages 67–85 (no lump sum)',
    monthlyPreTax: 'Monthly, before tax',
    purchasing: (e) => `About ${e} € in today’s purchasing power`,
    purchasingTip:
      'The pre-tax monthly withdrawal starting at 67 is discounted back to today at 2% inflation a year, to show roughly what it would buy now. Actual inflation may be well above 2%, so real purchasing power could be lower.',
    assetsTitle: 'Total assets at age 67 (before tax)',
    assetsSplit: (e, t, n) => `Own ${e} · subsidy ${t} · growth ${n}`,
    chartFull: 'Asset growth (no lump sum at retirement)',
    chartFullNote: (e) => `From age 67 the whole balance is paid monthly. Pre-tax monthly amount: ${e} €`,
    chartLump: 'Asset growth (30% lump sum at retirement)',
    chartLumpNote: (e, t) =>
      `At 67, ${e} is withdrawn as a lump sum. The rest is paid monthly. Pre-tax monthly amount: ${t} €`,
    langLabel: 'Language',
    moreInfo: 'More information',
    increase: 'Increase',
    decrease: 'Decrease',
  },
  de: {
    title: 'Rechner für das Altersvorsorgedepot',
    brand: 'Altersvorsorgedepot',
    subtitle:
      'Schätzung nach dem Altersvorsorgereformgesetz. Der Bundestag hat es am 27. März 2026 beschlossen, der Bundesrat am 24. April 2026 zugestimmt. Verkündet am 29. Mai 2026, in Kraft ab dem 1. Januar 2027.',
    monthly: 'Monatliche Einzahlung (eigenes Geld)',
    monthlyTip:
      'Bis zu einer Einzahlung von 30 € im Monat ist die staatliche Förderung im Verhältnis zum eigenen Beitrag am höchsten. Bei 150 € im Monat erhältst Du die maximale Grundzulage. Höchstens 570 € im Monat sind möglich.',
    birth: 'Geburtsjahr',
    birthTip:
      'Damit wird berechnet, wie viele Jahre bis 67 bleiben. Das Alter beeinflusst nur die Ansparzeit, nicht den Fördersatz.',
    expected: (e) => `Erwartete Rendite pro Jahr ${e} %`,
    expectedTip:
      'Die langfristig erwartete Jahresrendite der Anlage. Globale Aktien lagen langfristig etwa bei 6 % bis 8 %. Voreinstellung: 7 %.',
    cost: (e) => `Effektive Kosten pro Jahr ${e} %`,
    costTip:
      'Die Gesamtkostenquote des Produkts. Für das Standarddepot gilt gesetzlich höchstens 1 %. Effektive Rendite = erwartete Rendite − Kosten.',
    effective: (e) => `Effektive Rendite ${e} % pro Jahr`,
    children: 'Anzahl der kindergeldberechtigten Kinder',
    childrenTip: 'Für jedes Kind mit Kindergeld gibt es bis zu 300 € Kinderzulage im Jahr.',
    childYears: 'Geburtsjahre der Kinder',
    childYearsTip:
      'Für jedes Kind ein Geburtsjahr eintragen. Die Kinderzulage läuft in der Regel bis etwa zum 25. Lebensjahr.',
    childN: (e) => `Kind ${e}`,
    notesTitle: 'Hinweise',
    notes: [
      'Der Steuervorteil in der Ansparphase: (1) Eigene Beiträge (höchstens 1.800 € im Jahr) und die staatliche Zulage können als Sonderausgaben das zu versteuernde Einkommen mindern. (2) Kursgewinne und Fondsausschüttungen von Aktienfonds und ETFs im Konto sowie die jährliche Vorabpauschale sind vollständig steuerfrei.',
      'Das jährliche Einkommen vor Steuern, etwa aus Arbeit, Kapital oder anderen Quellen, ändert weder den Verlauf noch die Summe der Wertsteigerung.',
      'Entnahmen in der Auszahlungsphase werden als normales persönliches Einkommen erklärt. Eigenbeitrag, staatliche Zulage und Wertzuwachs werden nicht unterschieden. Das noch nicht entnommene Guthaben wächst weiter. Ab 85 Jahren kann das gesamte Restguthaben auf einmal entnommen werden.',
      'Dies ist nur eine einfache Schätzung und keine Anlageberatung. Die Rendite können Sie selbst festlegen. Die Schätzung enthält nicht den Berufseinsteigerbonus, die Frühstart-Rente und ähnliche Fälle sowie mögliche künftige Änderungen von Gesetz und Steuern. Einzahlungen werden ab dem 1. Januar 2027 modelliert.',
    ],
    withdrawTitle: 'Entnahme mit 67–85 Jahren (ohne Einmalauszahlung)',
    monthlyPreTax: 'Monatlich, vor Steuern',
    purchasing: (e) => `Etwa ${e} € in heutiger Kaufkraft`,
    purchasingTip:
      'Die monatliche Entnahme vor Steuern ab 67 wird mit 2 % Inflation pro Jahr auf heute zurückgerechnet. Die tatsächliche Teuerung kann deutlich über 2 % liegen, die reale Kaufkraft also geringer sein.',
    assetsTitle: 'Gesamtvermögen mit 67 (vor Steuern)',
    assetsSplit: (e, t, n) => `Eigenbeitrag ${e} · Zulage ${t} · Wertzuwachs ${n}`,
    chartFull: 'Vermögensaufbau (ohne Einmalauszahlung zum Rentenbeginn)',
    chartFullNote: (e) => `Ab 67 wird das gesamte Guthaben monatlich ausgezahlt. Monatlich vor Steuern: ${e} €`,
    chartLump: 'Vermögensaufbau (30 % Einmalauszahlung zum Rentenbeginn)',
    chartLumpNote: (e, t) =>
      `Mit 67 werden ${e} auf einmal entnommen. Der Rest wird monatlich ausgezahlt. Monatlich vor Steuern: ${t} €`,
    langLabel: 'Sprache',
    moreInfo: 'Weitere Hinweise',
    increase: 'Erhöhen',
    decrease: 'Verringern',
  },
}
