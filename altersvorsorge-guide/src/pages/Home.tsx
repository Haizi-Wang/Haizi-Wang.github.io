import { Link } from "react-router-dom";

const path = [
  {
    to: "/eligibility",
    step: "01",
    title: "准入条件",
    text: "谁可以直接或间接享受补助，最低缴费与账户数量上限。",
  },
  {
    to: "/process",
    step: "02",
    title: "过程",
    text: "2027 起补助怎么算、有孩家庭算例，以及与旧 Riester 的关系。",
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
] as const;

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <p className="hero-kicker">教育指南 · Milestone 1</p>
        <h1 id="hero-title" className="hero-title">
          Altersvorsorgedepot
        </h1>
        <p className="hero-lead">
          德国养老投资账户——从 2027 年起逐步承接国家补助型私人养老的新路径。
          本站用正式、可核对的说明，带你走完：准入 → 过程 → 选基金 → 退出提领，并可打开计算器做情景测算。
        </p>
        <div className="cta-row">
          <Link className="btn btn-primary" to="/eligibility">
            从准入条件开始
          </Link>
          <Link className="btn btn-ghost" to="/rechner">
            打开计算器
          </Link>
        </div>
      </section>

      <section className="prose" aria-labelledby="why-title">
        <h2 id="why-title">为什么值得认真弄明白</h2>
        <p>
          过去熟悉的 Riester-Rente，将从 2027 年起由新的国家补助型私人养老产品体系逐步取代。
          其中最引人关注的是经过认证的 <strong>Altersvorsorgedepot</strong>：
          在符合规定的前提下，可用基金、ETF 等工具为退休积累资产，并获得国家补助。
        </p>
        <div className="callout">
          <strong>提醒：</strong>
          国家补助高，不等于任何产品都值得购买。养老金不只是看今天能获得多少补助，还要看几十年以后真正能够留下多少资产。
        </div>

        <h2>立法时间线（摘要）</h2>
        <ul className="timeline">
          <li>
            <time>2025-12-17</time>
            联邦内阁通过政府草案
          </li>
          <li>
            <time>2026-03-27</time>
            联邦议院通过修订后的法律
          </li>
          <li>
            <time>2026-05-08</time>
            联邦参议院批准
          </li>
          <li>
            <time>2026-05-29</time>
            《Altersvorsorgereformgesetz》正式公布（AVR Gz 29Mai2026）
          </li>
          <li>
            <time>2027-01-01</time>
            新产品及补助体系主要规定开始实施
          </li>
        </ul>
      </section>

      <nav className="path-grid" aria-label="学习路径">
        {path.map((item) => (
          <Link key={item.to} className="path-card" to={item.to}>
            <div className="step">步骤 {item.step}</div>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </Link>
        ))}
      </nav>
    </>
  );
}
