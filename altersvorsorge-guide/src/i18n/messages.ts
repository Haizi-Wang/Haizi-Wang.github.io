import type { Lang } from "./types";

export const messages = {
  zh: {
    brandZh: "德国养老投资账户",
    nav: {
      home: "概览",
      eligibility: "准入条件",
      process: "过程",
      investing: "选基金",
      withdrawal: "退出提领",
      rechner: "计算器",
      film: "影音资料",
      aria: "主导航",
    },
    lang: {
      switchToEn: "English",
      switchToZh: "中文",
      aria: "语言",
      footerDefault: "语言：简体中文（zh-CN）",
      footerEn: "Language: English",
    },
    footer: {
      disclaimerLabel: "免责声明：",
      disclaimer:
        "本站为正式教育说明，依据德国联邦财政部、联邦议院立法记录、德国养老保险机构及公开法案整理，不构成个性化投资、税务或法律建议。补贴资格、合同认证与税务后果因个人情况而异；作出决定前请查阅官方资料或咨询持牌顾问。测算请使用站内计算器，并以合同与官方规则为准。",
      calc: "站内计算器",
      source: "源码",
      law: "参考法规：AVR Gz 29Mai2026（Altersvorsorgereformgesetz）",
    },
    home: {
      lead:
        "德国养老投资账户——从 2027 年起逐步承接国家补贴型私人养老的新路径。本站用正式、可核对的说明，带你走完：准入 → 过程 → 选基金 → 退出提领，并可打开计算器做情景测算。",
      ctaEligibility: "从准入条件开始",
      ctaCalc: "打开计算器",
      switchHint: "Switch to English",
      whyTitle: "为什么值得认真弄明白",
      whyP1:
        "过去熟悉的 Riester-Rente，将从 2027 年起由新的国家补贴型私人养老产品体系逐步取代。其中最引人关注的是经过认证的 Altersvorsorgedepot：在符合规定的前提下，可用基金、ETF 等工具为退休积累资产，并获得国家补贴。",
      reminderLabel: "提醒：",
      reminder:
        "国家补贴高，不等于任何产品都值得购买。养老金不只是看今天能获得多少补贴，还要看几十年以后真正能够留下多少资产。",
      timelineTitle: "立法时间线（摘要）",
      timeline: [
        { time: "2025-12-17", text: "联邦内阁通过政府草案" },
        { time: "2026-03-27", text: "联邦议院通过修订后的法律" },
        { time: "2026-05-08", text: "联邦参议院批准" },
        { time: "2026-05-29", text: "《Altersvorsorgereformgesetz》正式公布（AVR Gz 29Mai2026）" },
        { time: "2027-01-01", text: "新产品及补贴体系主要规定开始实施" },
      ],
      pathAria: "学习路径",
      step: "步骤",
      path: [
        {
          to: "/eligibility",
          step: "01",
          title: "准入条件",
          text: "谁可以直接或间接享受补贴，以及最低缴费与年龄等门槛。",
        },
        {
          to: "/process",
          step: "02",
          title: "过程",
          text: "开户、缴费和补贴：账户数量、缴费规则、儿童补贴算例。",
        },
        {
          to: "/investing",
          step: "03",
          title: "选基金 / 投资方向",
          text: "可投品类、风险等级上限、标准账户与临近退休降风险。",
        },
        {
          to: "/withdrawal",
          step: "04",
          title: "退出 / 提领",
          text: "提领期、30% 一次性提取、有害提取、税务与迁居注意点。",
        },
      ],
    },
    eligibility: {
      title: "准入条件",
      lead:
        "谁可以开立认证养老投资账户并享受 Zulage：直接受惠与间接受惠如何区分，以及最低缴费与年龄等通用门槛。",
      directTitle: "直接受惠人群（Unmittelbar Förderberechtigte）",
      directIntro:
        "根据改革后对《所得税法》（EStG § 10a）相关规则的框架，在未满 67 岁且满足相应条件时，下列群体通常属于可直接享受国家补贴与税前扣除路径的人群：",
      groups: [
        {
          title: "法定养老保险强制参保人员",
          body: "：在德国缴纳法定养老保险的雇员等。",
        },
        {
          title: "公务员、法官与军人",
          body: "：领取联邦或各州薪饷的公职人员，以及享有相应公职抚恤保障的人员。",
        },
        {
          title: "自雇与自由职业者",
          body: "：未满 67 岁，在缴费年度取得经营所得或自由职业所得，并依法提交该年度个人所得税申报的纳税人（改革后的重要扩展）。",
        },
        {
          title: "职业养老保障机构成员",
          body: "：如医师、律师、建筑师等公会养老金库的强制成员（满足法定条件时）。",
        },
        {
          title: "育儿时间 / 无薪休假公职人员",
          body: "：可认定 Kindererziehungszeiten 等情形。",
        },
        {
          title: "可比的外国法定养老保险参保人",
          body: "：参加与德国法定养老保险相类似的体系，且在德国承担无限纳税义务者。",
        },
      ],
      indirectTitle: "间接受惠人群（Mittelbar Zulageberechtigte）",
      indirect:
        "若夫妻双方未长期分居、居住在欧盟/EWR，且一方属于直接受惠人群，另一方即使本身不符合直接资格，也可能通过配偶资格间接享受补贴（规则与额度以现行税法为准，旧制中间接补贴常见上限表述为 175 欧元量级——具体以官方当年规则核对）。",
      thresholdsTitle: "通用门槛",
      minOwnLabel: "最低自付",
      minOwn:
        "：自 2027 缴费年度起，通常每年至少存入 120 欧元（约合每月 10 欧元），才进入基本补贴资格门槛之一。实际补贴仍按缴费金额比例计算，并非存满 120 欧元即可拿到最高补贴。",
      ageLabel: "年龄",
      age: "：对自雇、自由职业者及部分扩展人群，申请补贴的年龄前提多为未满 67 岁。",
      bonusLabel: "25 岁以下 Berufseinsteiger-Bonus：",
      bonus:
        "缴费年度开始时未满 25 岁且符合资格的投保人，基础补贴可一次性额外增加 200 欧元，注入认证养老账户（非现金打入私人银行卡）。全日制学生若未缴纳法定养老保险，通常暂不具备直接资格；通过有缴费义务的学生工等方式参保后可激活资格。",
      next: "下一步了解开户数量、缴费与补贴如何计算：",
      nextLink: "开户、缴费和补贴 →",
    },
    process: {
      title: "开户、缴费和补贴",
      whatTitle: "Altersvorsorgedepot 是什么",
      what1:
        "Altersvorsorgedepot（养老投资账户）是经过法定认证的私人养老产品：在符合规定的范围内，可用基金、ETF 等工具为退休积累资产，并获得国家补贴与相应税收安排。",
      what2a: "它",
      what2Not: "不是",
      what2b:
        "普通证券账户。在券商账户里每月买 ETF，并不会因此自动获得 Zulage。养老投资账户须满足认证要求；投资与提款受养老制度约束；不符合规定的提前提取可能触发补贴追回与税务后果。",
      openTitle: "开户",
      open:
        "符合准入条件的人，可通过获准提供商开立认证 Altersvorsorgedepot（或在规则允许时，将既有合同转入新补贴体系）。开户后按年/按月自付缴费，补贴于次年核实后打入账户。",
      howManyTitle: "一个人可以开几个账户？",
      howMany1a: "不包括已经开办的 Riester 账号，一名纳税人",
      howManyMax: "最多 2 个",
      howMany1b:
        "享受国家税收优惠与补贴的认证养老合同。补贴与缴费上限按",
      howManyPer: "人头合计",
      howMany1c: "，不会因账户变多而翻倍：",
      howManyItems: [
        "基础补贴最高约 540 欧元 / 年（按缴费金额匹配）",
        "儿童补贴：每名符合条件子女最高约 300 欧元 / 年",
        "与税前扣除相关的常见口径约 1,800 欧元 / 年；总自付上限约 6,840 欧元 / 年",
      ],
      howMany2:
        "两个账户的实际好处在于策略分散（如一户偏股票 ETF、一户偏稳健）、新旧合同过渡，以及提领安排更灵活——总额度并不增加。",
      basicTitle: "基本补贴怎么算",
      basicItems: [
        "第一档：每年自付前 360 欧元 → 国家按 50% 匹配（存 360 欧元 → 基本补贴 180 欧元）。",
        "第二档：超过 360 欧元之后最多再 1,440 欧元自付 → 按 25% 匹配。自付合计 1,800 欧元时，基本补贴合计最高 540 欧元。",
        "最低自付：每年 120 欧元是门槛之一，不是拿到最高补贴的充分条件。",
      ],
      childTitle: "有孩子家庭怎么补贴",
      child:
        "每个符合条件的孩子，按父母自付金额提供最高每年 300 欧元的 100% 匹配（以法定资格与归属规则为准）。儿童补贴进入父母一方的账户，不可由父母双方对同一孩子重复领取。",
      exampleTitle: "算例：每月自付 30 欧元（年缴 360 欧元），父母符合直接资格",
      exampleRows: [
        { dt: "无孩 · 基本补贴", dd: "180 欧元" },
        { dt: "无孩 · 年底总额（自付360欧元 +补贴180欧元）", dd: "540 欧元" },
        { dt: "一孩 · 补贴合计", dd: "480 欧元" },
        { dt: "一孩 · 年底总额（自付360欧元 +补贴480欧元）", dd: "840 欧元" },
        { dt: "两孩 · 补贴合计", dd: "780 欧元" },
        { dt: "两孩 · 年底总额（自付360欧元 +补贴780欧元）", dd: "1,140 欧元" },
        { dt: "三孩 · 补贴合计", dd: "1,080 欧元" },
      ],
      exampleTotal: "三孩 · 年底总额（自付360欧元 +补贴1,080欧元）",
      exampleTotalVal: "1,440 欧元",
      exampleNote:
        "以上为条件全部满足时的总额，非保证账户市值。资格、孩子条件、补贴归属与合同认证缺一不可。只要成年孩子符合领儿童金条件，父母就享有同样的儿童补贴。同时成年孩子只要自己缴纳法定养老保险，也可以独立开立账户，自付缴费，满足条件时领取基础补贴。",
      riesterTitle: "现有 Riester 合同",
      riesterItems: [
        "既有合同保护（Bestandsschutz）：旧 Riester 合同不会自动失效，也不会自动变成 Altersvorsorgedepot；可以继续按旧制缴费。",
        "符合条件时，可选择转入新补贴体系，或另开认证养老投资账户；依法已获补贴通常不因合规转换而一律退还，但仍可能涉及费用、保证权益与风险变化。",
        "若持有多个旧合同：将其中一个转入新体系，可能影响其他合同——不能假设“只改一个、其余完全不受影响”。",
      ],
      nextCalc: "计算器",
      nextBefore: "可用 ",
      nextMid: " 比较不同缴费情景。接下来看账户里能买什么： ",
      nextInvest: "选基金 →",
    },
    investing: {
      title: "选基金 / 投资方向",
      lead:
        "法案框定的可投资产品、风险等级上限、标准账户（Standarddepot）配置，以及临近退休的强制降风险。",
      fourTitle: "可投资的四类产品（框架）",
      fourIntro:
        "养老投资账户中的资金须投向在德国获准销售、符合欧盟 PRIIPs 规范、且综合风险指标通常不超过第 5 级的产品，主要包括：",
      fourItems: [
        "OGAW / UCITS 公募基金与 ETF（须有 KID，风险等级 1–5）",
        "开放式公募 AIF（Publikums-AIF，依 KAGB 等规定）",
        "开放式 ELTIF（欧洲长期投资基金，风险 ≤ 5）",
        "欧元主权 / 公共机构债券：联邦、州、市镇、欧盟机构、EIB、EFSF 等发行的欧元债券",
      ],
      riskTitle: "风险等级上限：最高 Risikoklasse 5",
      risk:
        "在 EU PRIIPs 基本信息文件（KID）中，综合风险指标最高允许到第 5 级。第 6、7 级（极高波动衍生品、杠杆产品等）被排除。",
      etfTitle: "主流 ETF 能不能买？",
      etf:
        "可以——但必须是符合欧盟 UCITS、出具 PRIIPs KID 的欧洲版本。例如在欧洲注册的 S&P 500、MSCI World / FTSE All-World UCITS ETF，风险等级常见为第 4 级，落在 1–5 许可区间。不能直接买入仅在美国上市、未出具欧盟 KID 的原版份额（如部分 SPY/VOO 路径）。",
      standardTitle: "标准投资账户（Standarddepot）",
      standardItems: [
        "提供商须至少提供两类 OGAW：稳健（风险 1–2）与 增长（风险 3–5）。",
        "若稳健基金升至风险 4 及以上，或增长基金脱离 3–5 区间，提供商须强制替换调仓。",
        "Glidepath / Derisking：退休前 5 年，高风险组件（3–5）占比通常不得超过总资产 50%；退休前 2 年及提领开始时，通常不得超过 30%。",
      ],
      feesLabel: "费用：",
      fees:
        "标准账户积累期有效成本（Effektivkosten）法定封顶常见为每年 1.0%。销售/开户费须按规定平摊；转约费用有上限；未在产品信息页列明的费用投保人无需支付。每年应免费收到费用与资本明细。",
      riskTolerance:
        "取消强制最低本金保底后，投资者可在合规范围内提高股票型 ETF 比重——收益潜力与波动风险同步上升。判断产品是否值得，不能只看补贴，还要看长期净收益与自己能否承受回撤。如果不愿意承担市场波动风险的投资者，仍可选择大部分或全部投入本金及国家补贴保底的传统投资产品。",
      retireTitle: "到达退休年龄",
      retireBefore: "提领、迁居与税务安排见： ",
      retireLink: "退出 / 提领 →",
    },
    withdrawal: {
      title: "退出 / 提领",
      lead:
        "提领期起点、30% 一次性提取、有害提取、受补贴与未受补贴资金的税务差异，以及迁居时的路径选择。",
      startTitle: "提领期起点：最高 30% 一次性提取",
      start1:
        "进入发放阶段（Auszahlungsphase，通常在约 65–70 岁之间）时，认证合同一般赋予投保人一次性提取账户总资产最高 30% 的权利，无需特定用途理由。其余资金进入按月分期计划（至少发放至约 85 岁）或终身年金等法定安排。",
      eigenheim:
        "若尚未进入提领期、但需将养老资产用于自住房屋无障碍/节能改造，设有 Eigenheimbetrag 专项路径（需符合特定时间窗口、最低金额与技术证明等要求）。",
      harmfulTitle: "有害提取（schädliche Verwendung）",
      harmful1:
        "在提领期开始前强行解约取现，通常被视为有害提取：须退还历年国家补贴及已享受的相关税收优惠；自付本金与投资收益一般仍归个人，但对收益可能按常规规则补税。账户金额较小也不等于可在积累期“免罚买断”。",
      kleinLabel: "Kleinbetragsrente（微型养老金）",
      klein:
        "：在提领期起点，若折算月发放额不超过法定月度基准值（Bezugsgröße）的 1.5%，可一次性清偿且通常不视为有害提取；积累期中途不能以此为由免罚提取。",
      taxTitle: "受补贴 vs. 未受补贴资金的税务要点",
      taxItems: [
        "受补贴 / 税前扣除部分（常见口径：每年约不超过 1,800 欧元相关路径）：提领时适用后置征税（Nachgelagerte Besteuerung），发放额全额进入个税税基。",
        "超额未受补贴部分（自付可至约 6,840 欧元 / 年上限内超出补贴口径的部分）：存入时已是税后资金；提领时本金不二次全额征税，收益侧适用 Ertragsanteil（收益比例）等规则。例如 67 岁开始领取时，法定收益比例约 17%，即按月发放中约 17% 进入税基、约 83% 视为归还本金免税。",
      ],
      twoLabel: "两个合规账户：",
      two:
        "只要总数不超过 2 个，提取期税收优惠通常不会因分户而打折；反而可在 30% 一次性、按月发放、开领年龄（65–70）上做组合安排。具体以合同与当年税法为准。",
      moveTitle: "迁居：欧盟/EWR 内 vs. 区外",
      moveItems: [
        "解约取现：常构成有害提取——退还补贴与相关税优惠；本金与收益可带走（收益或需补税）。",
        "保留账户、暂停缴费：资金可继续投资；离境后通常不再获得新补贴。达退休年龄后可申请跨境发放。",
        "迁居至其他 EU/EWR 国家并保持账户，通常不因迁居本身即被认定为有害提取；彻底迁出并解约清算则按有害提取规则处理。",
      ],
      nextBefore: "用数字检验自己的缴费与提领情景： ",
      nextLink: "打开计算器 →",
    },
    film: {
      title: "影音资料",
      lead: "先听口播说明；成片与分镜将在后续里程碑上线。",
      audioTitle: "口播音频",
      audioCaption:
        "《德国养老金存300送1050》——用一个简单数字例子，说明缴费与补贴如何叠加（估算示意，非正式投顾意见）。",
      audioFallback: "您的浏览器不支持音频播放。",
      download: "下载音频",
      videoTitle: "影片制作中",
      videoNote: "正式介绍片将在此上线，并可与上方教育路径交叉链接。",
    },
  },
  en: {
    brandZh: "German pension investment account",
    nav: {
      home: "Overview",
      eligibility: "Eligibility",
      process: "Process",
      investing: "Investing",
      withdrawal: "Withdrawal",
      rechner: "Calculator",
      film: "Audio & video",
      aria: "Main navigation",
    },
    lang: {
      switchToEn: "English",
      switchToZh: "中文",
      aria: "Language",
      footerDefault: "语言：简体中文（zh-CN）",
      footerEn: "Language: English",
    },
    footer: {
      disclaimerLabel: "Disclaimer: ",
      disclaimer:
        "This site is formal educational material based on German Federal Ministry of Finance sources, Bundestag records, statutory pension bodies, and published statutes. It is not personalised investment, tax, or legal advice. Subsidy eligibility, contract certification, and tax outcomes depend on your situation; check official sources or a licensed adviser before deciding. Use the on-site calculator for estimates and rely on contracts and official rules.",
      calc: "On-site calculator",
      source: "Source",
      law: "Reference: AVR Gz 29Mai2026 (Altersvorsorgereformgesetz)",
    },
    home: {
      lead:
        "Germany’s certified pension investment account — from 2027 a new path for state-supported private retirement saving. This guide walks you through eligibility → process → investing → withdrawal, with an on-site calculator for scenarios.",
      ctaEligibility: "Start with eligibility",
      ctaCalc: "Open calculator",
      switchHint: "切换到中文",
      whyTitle: "Why it is worth understanding clearly",
      whyP1:
        "The familiar Riester-Rente will be gradually replaced from 2027 by a new state-supported private pension product framework. The most prominent piece is the certified Altersvorsorgedepot: within the rules, you can build retirement assets with funds and ETFs and receive state subsidies.",
      reminderLabel: "Note: ",
      reminder:
        "A high state subsidy does not mean every product is worth buying. Pensions are not only about today’s subsidy — they are about how much capital remains after decades.",
      timelineTitle: "Legislative timeline (summary)",
      timeline: [
        { time: "2025-12-17", text: "Federal Cabinet adopts the government draft" },
        { time: "2026-03-27", text: "Bundestag passes the amended law" },
        { time: "2026-05-08", text: "Bundesrat approves" },
        { time: "2026-05-29", text: "Altersvorsorgereformgesetz published (AVR Gz 29Mai2026)" },
        { time: "2027-01-01", text: "Main rules for new products and subsidies take effect" },
      ],
      pathAria: "Learning path",
      step: "Step",
      path: [
        {
          to: "/eligibility",
          step: "01",
          title: "Eligibility",
          text: "Who can receive subsidies directly or indirectly, plus minimum contribution and age thresholds.",
        },
        {
          to: "/process",
          step: "02",
          title: "Process",
          text: "Opening, contributions and subsidies: account limits, match rules, child-subsidy examples.",
        },
        {
          to: "/investing",
          step: "03",
          title: "Funds / investing",
          text: "Eligible products, risk-class caps, Standarddepot rules, and de-risking near retirement.",
        },
        {
          to: "/withdrawal",
          step: "04",
          title: "Withdrawal",
          text: "Payout phase, 30% lump sum, harmful withdrawals, tax treatment, and moving abroad.",
        },
      ],
    },
    eligibility: {
      title: "Eligibility",
      lead:
        "Who can open a certified pension investment account and receive Zulage: direct vs indirect entitlement, plus shared minimum contribution and age thresholds.",
      directTitle: "Directly entitled (Unmittelbar Förderberechtigte)",
      directIntro:
        "Under the reformed Income Tax Act framework (EStG § 10a), people under 67 who meet the conditions typically include:",
      groups: [
        {
          title: "Compulsory statutory pension insurees",
          body: ": employees and others paying into Germany’s statutory pension scheme.",
        },
        {
          title: "Civil servants, judges and soldiers",
          body: ": federal or state officials on salary, and those with comparable public-service pension cover.",
        },
        {
          title: "Self-employed and freelancers",
          body: ": under 67, with business or freelance income in the contribution year and a filed income-tax return (an important post-reform expansion).",
        },
        {
          title: "Members of professional pension schemes",
          body: ": e.g. compulsory members of medical, legal or architects’ schemes (when statutory conditions are met).",
        },
        {
          title: "Child-raising periods / unpaid leave for officials",
          body: ": including recognised Kindererziehungszeiten and similar cases.",
        },
        {
          title: "Comparable foreign statutory pension insurees",
          body: ": in a system similar to Germany’s statutory pension, with unlimited German tax liability.",
        },
      ],
      indirectTitle: "Indirectly entitled (Mittelbar Zulageberechtigte)",
      indirect:
        "If spouses are not permanently separated, live in the EU/EEA, and one is directly entitled, the other may receive a subsidy indirectly even without direct entitlement (rules and amounts follow current tax law; older rules often cited ~€175 — always check the official figure for the year).",
      thresholdsTitle: "Shared thresholds",
      minOwnLabel: "Minimum own contribution",
      minOwn:
        ": from contribution year 2027, usually at least €120 per year (~€10/month) to meet one basic-subsidy threshold. The subsidy still scales with contributions — €120 alone does not unlock the maximum.",
      ageLabel: "Age",
      age: ": for the self-employed, freelancers and some extended groups, applicants are typically under 67.",
      bonusLabel: "Under-25 Berufseinsteiger-Bonus: ",
      bonus:
        "If you are under 25 at the start of the contribution year and eligible, the basic subsidy can rise by a one-off extra €200 into the certified account (not paid in cash to a private bank account). Full-time students without statutory pension contributions usually lack direct entitlement until they become insured (e.g. via student jobs with contribution duty).",
      next: "Next: how many accounts, contributions and subsidy maths: ",
      nextLink: "Opening, contributions & subsidies →",
    },
    process: {
      title: "Opening, contributions & subsidies",
      whatTitle: "What is an Altersvorsorgedepot?",
      what1:
        "An Altersvorsorgedepot is a legally certified private pension product: within the rules you can build retirement assets with funds and ETFs and receive state subsidies plus related tax treatment.",
      what2a: "It is ",
      what2Not: "not",
      what2b:
        " an ordinary brokerage account. Buying ETFs monthly in a normal depot does not automatically create Zulage. The pension account must be certified; investing and withdrawals follow pension rules; early withdrawals outside the rules can trigger subsidy clawbacks and tax consequences.",
      openTitle: "Opening an account",
      open:
        "Eligible people can open a certified Altersvorsorgedepot with an authorised provider (or, where allowed, transfer an existing contract into the new subsidy system). After opening, pay yearly/monthly own contributions; subsidies are credited after verification in the following year.",
      howManyTitle: "How many accounts can one person open?",
      howMany1a:
        "Existing Riester contracts do not count toward this limit; a taxpayer may have at most ",
      howManyMax: "two",
      howMany1b:
        " certified retirement contracts that receive state tax relief and subsidies. Subsidy and contribution caps are ",
      howManyPer: "per person",
      howMany1c: " and do not multiply with more accounts:",
      howManyItems: [
        "Basic subsidy up to about €540 / year (matched to contributions)",
        "Child subsidy: up to about €300 / year per qualifying child",
        "Common tax-deduction reference about €1,800 / year; overall own-contribution cap about €6,840 / year",
      ],
      howMany2:
        "Two accounts help with strategy split (e.g. equity ETF vs defensive), old/new contract transition, and more flexible payout design — not a higher total allowance.",
      basicTitle: "How the basic subsidy is calculated",
      basicItems: [
        "Tier 1: first €360 of own contributions per year → 50% state match (€360 → €180 basic subsidy).",
        "Tier 2: up to another €1,440 above €360 → 25% match. At €1,800 own contributions, basic subsidy tops out at €540.",
        "Minimum own contribution: €120 / year is a threshold, not enough by itself for the maximum subsidy.",
      ],
      childTitle: "How do families with children get subsidies?",
      child:
        "For each qualifying child, parents can receive up to €300 / year as a 100% match of own contributions (subject to legal entitlement and assignment rules). Child subsidy goes into one parent’s account and cannot be claimed twice for the same child.",
      exampleTitle:
        "Example: €30 / month own (€360 / year), parents directly entitled",
      exampleRows: [
        { dt: "No child · basic subsidy", dd: "€180" },
        { dt: "No child · year-end total (own €360 + subsidy €180)", dd: "€540" },
        { dt: "One child · subsidy total", dd: "€480" },
        { dt: "One child · year-end total (own €360 + subsidy €480)", dd: "€840" },
        { dt: "Two children · subsidy total", dd: "€780" },
        { dt: "Two children · year-end total (own €360 + subsidy €780)", dd: "€1,140" },
        { dt: "Three children · subsidy total", dd: "€1,080" },
      ],
      exampleTotal: "Three children · year-end total (own €360 + subsidy €1,080)",
      exampleTotalVal: "€1,440",
      exampleNote:
        "These are totals when all conditions are met — not a guaranteed account market value. Eligibility, child conditions, subsidy assignment and contract certification all matter. If an adult child still qualifies for child benefit, parents keep the same child subsidy. An adult child who pays statutory pension contributions can also open their own account, pay their own contributions, and claim the basic subsidy when eligible.",
      riesterTitle: "Existing Riester contracts",
      riesterItems: [
        "Grandfathering (Bestandsschutz): old Riester contracts do not expire automatically and do not become an Altersvorsorgedepot by themselves; you may keep contributing under the old rules.",
        "Where allowed, you may move into the new subsidy system or open a separate certified depot; legally granted subsidies are usually not all clawed back solely because of a compliant transfer, but fees, guarantees and risk profile can change.",
        "With several old contracts: transferring one into the new system may affect the others — do not assume “change one, leave the rest untouched”.",
      ],
      nextCalc: "calculator",
      nextBefore: "Use the ",
      nextMid: " to compare contribution scenarios. Next, what you can buy: ",
      nextInvest: "Funds / investing →",
    },
    investing: {
      title: "Funds / investing",
      lead:
        "Eligible products under the statute, risk-class caps, Standarddepot design, and mandatory de-risking near retirement.",
      fourTitle: "Four product families (framework)",
      fourIntro:
        "Assets in the pension account must go into products that may be sold in Germany, meet EU PRIIPs rules, and usually have a summary risk indicator of at most class 5, mainly:",
      fourItems: [
        "OGAW / UCITS retail funds and ETFs (KID required, risk classes 1–5)",
        "Open-ended retail AIFs (Publikums-AIF under KAGB and related rules)",
        "Open-ended ELTIFs (European Long-Term Investment Funds, risk ≤ 5)",
        "Euro sovereign / public-sector bonds: federal, state, municipal, EU bodies, EIB, EFSF, etc.",
      ],
      riskTitle: "Risk-class cap: max Risikoklasse 5",
      risk:
        "In the EU PRIIPs Key Information Document (KID), the summary risk indicator may go up to class 5. Classes 6 and 7 (very high-volatility derivatives, leveraged products, etc.) are excluded.",
      etfTitle: "Can I buy mainstream ETFs?",
      etf:
        "Yes — but only European UCITS versions with a PRIIPs KID. Europe-domiciled S&P 500, MSCI World / FTSE All-World UCITS ETFs often sit in risk class 4 (within 1–5). You generally cannot hold US-listed shares without an EU KID (e.g. some SPY/VOO paths).",
      standardTitle: "Standarddepot",
      standardItems: [
        "Providers must offer at least two OGAW sleeves: defensive (risk 1–2) and growth (risk 3–5).",
        "If a defensive fund rises to risk 4+ or a growth fund leaves the 3–5 band, the provider must force a switch.",
        "Glidepath / derisking: in the 5 years before retirement, higher-risk sleeves (3–5) usually may not exceed 50% of assets; in the last 2 years and at payout start, usually not more than 30%.",
      ],
      feesLabel: "Fees: ",
      fees:
        "Effective costs (Effektivkosten) in the Standarddepot accumulation phase are commonly capped at 1.0% p.a. Sales/account fees must be amortised as required; transfer fees are capped; fees not listed on the product page need not be paid. You should receive a free annual fee and capital statement.",
      riskTolerance:
        "With no mandatory capital guarantee, investors may raise equity-ETF weight within the rules — higher return potential and higher drawdown risk. Judge products by long-term net return and your ability to bear losses, not by subsidy alone. Investors who prefer not to take market risk can still put most or all of their money into traditional products that guarantee own capital and state subsidies.",
      retireTitle: "Reaching retirement age",
      retireBefore: "For withdrawals, relocation and tax: ",
      retireLink: "Withdrawal →",
    },
    withdrawal: {
      title: "Withdrawal",
      lead:
        "Payout start, 30% lump sum, harmful withdrawals, tax differences for subsidised vs unsubsidised capital, and options when moving abroad.",
      startTitle: "Payout phase: up to 30% lump sum",
      start1:
        "When the Auszahlungsphase begins (typically around ages 65–70), certified contracts usually allow a one-off withdrawal of up to 30% of account assets with no special purpose. The rest goes into a monthly plan (at least until about age 85) or a lifelong annuity under statutory rules.",
      eigenheim:
        "If you are not yet in the payout phase but need pension assets for accessibility / energy renovations of your owner-occupied home, there is an Eigenheimbetrag pathway (time windows, minimum amounts and technical proof apply).",
      harmfulTitle: "Harmful withdrawal (schädliche Verwendung)",
      harmful1:
        "Cashing out before the payout phase usually counts as a harmful withdrawal: past state subsidies and related tax relief must be repaid; own capital and investment gains generally remain yours, but gains may be taxed under ordinary rules. A small balance does not mean a penalty-free buyout during accumulation.",
      kleinLabel: "Kleinbetragsrente (small pension)",
      klein:
        ": at payout start, if the converted monthly amount is at most 1.5% of the statutory monthly reference (Bezugsgröße), a one-off settlement is usually not treated as harmful; you cannot use this mid-accumulation to cash out penalty-free.",
      taxTitle: "Subsidised vs unsubsidised capital — tax notes",
      taxItems: [
        "Subsidised / pre-tax deduction path (often up to about €1,800 / year): payouts are taxed later (Nachgelagerte Besteuerung); the full payment enters the income-tax base.",
        "Excess unsubsidised part (own contributions up to about €6,840 / year beyond the subsidy path): contributions were after-tax; at payout the capital is not fully taxed again, while gains follow Ertragsanteil rules. E.g. starting at 67, the statutory earnings share is about 17% — roughly 17% of monthly payments enter the tax base and about 83% is treated as tax-free return of capital.",
      ],
      twoLabel: "Two compliant accounts: ",
      two:
        "As long as you hold no more than two, payout-phase tax relief is usually not reduced by splitting accounts; you can combine 30% lump sum, monthly payouts and start ages (65–70). Always check the contract and current tax law.",
      moveTitle: "Moving: inside vs outside the EU/EEA",
      moveItems: [
        "Cancel and cash out: often a harmful withdrawal — repay subsidies and related tax relief; capital and gains can leave (gains may need tax).",
        "Keep the account, pause contributions: assets can stay invested; new subsidies usually stop after leaving. After retirement age you may apply for cross-border payouts.",
        "Moving to another EU/EEA country while keeping the account is usually not harmful merely because of the move; full exit with cancellation is treated under harmful-withdrawal rules.",
      ],
      nextBefore: "Check your contribution and payout scenarios: ",
      nextLink: "Open calculator →",
    },
    film: {
      title: "Audio & video",
      lead: "Start with the voice-over; the finished film and storyboard will follow in a later milestone.",
      audioTitle: "Voice-over audio",
      audioCaption:
        "“German pension: save 300, get 1,050” — a simple numbers example of how contributions and subsidies stack (illustrative estimate, not advice).",
      audioFallback: "Your browser does not support audio playback.",
      download: "Download audio",
      videoTitle: "Film in production",
      videoNote: "The formal intro film will appear here and link into the learning path above.",
    },
  },
} as const;

export type Messages = (typeof messages)[Lang];
