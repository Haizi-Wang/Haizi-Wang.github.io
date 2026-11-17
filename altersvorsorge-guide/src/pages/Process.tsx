import { Link } from "react-router-dom";

export default function Process() {
  return (
    <>
      <header className="page-head">
        <h1>开户、缴费和补助</h1>
        <p>
          认证账户如何开立与并存、每年怎么缴费、国家补助（含儿童补助）如何按自付计算，以及与旧
          Riester 合同并存时的实务要点。
        </p>
      </header>

      <article className="prose">
        <h2>Altersvorsorgedepot 不是普通券商账户</h2>
        <p>
          认证养老投资账户可在规定范围内投资基金与 ETF 等产品，并享受国家补助与特殊税收待遇。但普通证券账户每月买
          ETF，并<strong>不会</strong>因此自动获得 Zulage。Altersvorsorgedepot
          须满足法定认证；投资与提款受养老制度约束；不符合规定的提前提取可能触发补助追回与税务后果。
        </p>

        <h2>一个人可以开几个账户？</h2>
        <p>
          可以开多个账户，但自 2027-01-01
          起，一名纳税人<strong>最多 2 个</strong>享受国家税收优惠与补贴的认证养老合同。第
          3 个及以后按签署先后判定，通常不再视为受补贴缴费。补贴与缴费上限按<strong>人头合计</strong>，不会因账户变多而翻倍：
        </p>
        <ul>
          <li>基础补贴最高约 540 欧元 / 年（按缴费比例规则）</li>
          <li>儿童补助：每名符合条件子女最高约 300 欧元 / 年</li>
          <li>税前扣除相关口径常见上限约 1,800 欧元 / 年；总自付上限约 6,840 欧元 / 年</li>
        </ul>
        <p>
          两个账户的实际好处在于策略分散（如一户偏股票 ETF、一户偏稳健）、新旧合同过渡，以及提领期时间与形式更灵活——总额度并不增加。
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

        <h2>已有 Riester 合同时怎么缴费与开户</h2>
        <ul>
          <li>
            <strong>Bestandsschutz</strong>
            ：旧合同不会因改革自动失效或自动转成 Altersvorsorgedepot；可继续按旧制缴费。
          </li>
          <li>
            符合条件时可选择转入新补助体系或新开认证账户；依法已获补助通常不因合规转换而一律退还，但仍可能涉及费用、保证权益与风险变化。
          </li>
          <li>
            有多个旧合同者：将其中一个转入新体系，可能影响其他合同——不能假设“只改一个、其余完全不受影响”。
          </li>
        </ul>

        <div className="callout">
          <strong>比较补助时：</strong>
          不能只比宣传上的最高金额。应以同等自付下的补助与净收益比较。可用{" "}
          <Link to="/rechner">计算器</Link> 做情景估算。
        </div>

        <p>
          接下来看账户里能买什么、风险如何被限制： <Link to="/investing">选基金 →</Link>
        </p>
      </article>
    </>
  );
}
