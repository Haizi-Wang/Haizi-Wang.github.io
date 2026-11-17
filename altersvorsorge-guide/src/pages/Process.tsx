import { Link } from "react-router-dom";

export default function Process() {
  return (
    <>
      <header className="page-head">
        <h1>过程：缴费、补助与改革节奏</h1>
        <p>
          理解 Beitragsproportionale Zulage、儿童补助算例，以及旧 Riester
          合同在 2027 前后如何并存、转换与比较。
        </p>
      </header>

      <article className="prose">
        <h2>为什么要改革 Riester？</h2>
        <p>
          德国养老保障包含法定养老保险、企业养老金与私人养老金。Riester
          是国家补助型私人养老的代表，但对许多人来说：合同复杂、补助难懂、部分产品费用高、投资受限。改革希望让补助更直观、投资更灵活，并让更多人能通过长期资本市场积累——同时风险形态也会变化。
        </p>

        <h2>Altersvorsorgedepot 不是普通券商账户</h2>
        <p>
          认证养老投资账户可在规定范围内投资基金与 ETF 等产品，并享受国家补助与特殊税收待遇。但普通证券账户每月买
          ETF，并<strong>不会</strong>因此自动获得 Zulage。Altersvorsorgedepot
          须满足法定认证；投资与提款受养老制度约束；不符合规定的提前提取可能触发补助追回与税务后果。
        </p>

        <h2>基本补助怎么算？（2027 起）</h2>
        <p>新制度改为按个人缴费比例计算（Beitragsproportionale Zulage）：</p>
        <ul>
          <li>
            <strong>第一档</strong>：每年自付前 360 欧元 → 国家按 <strong>50%</strong>{" "}
            匹配（存 360 → 基本补助 180）。
          </li>
          <li>
            <strong>第二档</strong>：超过 360 之后最多再 1,440 欧元自付 → 按{" "}
            <strong>25%</strong> 匹配。自付合计 1,800 欧元时，基本补助合计最高{" "}
            <strong>540 欧元</strong>。
          </li>
          <li>
            <strong>最低自付</strong>：每年 120 欧元是门槛之一，不是拿到最高补助的充分条件。
          </li>
        </ul>

        <h2>有孩子的家庭</h2>
        <p>
          自 2027 年起，儿童补助不再按“2008 年前后出生”区分固定额，而是：每个符合条件的孩子，按父母自付金额提供最高每年{" "}
          <strong>300 欧元</strong>的 100% 匹配（以法定资格与归属规则为准）。儿童补助进入父母的养老合同，不可由父母双方对同一孩子重复领取。
        </p>

        <div className="example">
          <h3>算例：每月自付 25 欧元（年缴 300），父母符合直接资格</h3>
          <dl>
            <dt>无孩 · 基本补助</dt>
            <dd>150 €</dd>
            <dt>无孩 · 当年新增（自付+补助）</dt>
            <dd>450 €</dd>
            <dt>一孩 · 国家补助合计</dt>
            <dd>450 €</dd>
            <dt>一孩 · 当年新增</dt>
            <dd>750 €</dd>
            <dt>两孩 · 国家补助合计</dt>
            <dd>750 €</dd>
            <dt>两孩 · 当年新增</dt>
            <dd>1,050 €</dd>
            <dt>三孩 · 国家补助合计</dt>
            <dd>1,050 €</dd>
            <div className="total">
              <span>三孩 · 当年新增投入</span>
              <span>1,350 €</span>
            </div>
          </dl>
          <p style={{ margin: "0.8rem 0 0", fontSize: "0.9rem", color: "var(--muted)" }}>
            条件全部满足时的示意；非保证账户市值。资格、孩子条件、补助归属与合同认证缺一不可。
          </p>
        </div>

        <h2>已有 Riester 合同的人</h2>
        <ul>
          <li>
            <strong>Bestandsschutz</strong>
            ：旧合同不会因改革自动失效或自动转成 Altersvorsorgedepot；可继续按旧制缴费。
          </li>
          <li>
            从 2027 年起可选择转入新补助体系或符合条件的新产品；依法已获补助通常不因合规转换而一律退还，但仍可能涉及费用、保证权益与风险变化。
          </li>
          <li>
            有多个旧合同者：将其中一个转入新体系，可能影响其他合同——不能假设“只改一个、其余完全不受影响”。
          </li>
          <li>
            2026-12-31 前仍可新签旧制 Riester；不必因“年底截止”话术匆忙签约。长期费用与净收益比截止日期更重要。
          </li>
        </ul>

        <div className="callout">
          <strong>比较旧制与新制：</strong>
          不能只比宣传上的最高补助。低收入多孩家庭在旧制下有时仍可能更划算；应以同等自付下的补助与净收益比较。可用{" "}
          <Link to="/rechner">计算器</Link> 做情景估算。
        </div>

        <p>
          接下来看账户里能买什么、风险如何被限制： <Link to="/investing">选基金 →</Link>
        </p>
      </article>
    </>
  );
}
