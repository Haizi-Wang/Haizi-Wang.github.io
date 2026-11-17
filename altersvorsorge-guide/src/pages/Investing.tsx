import { Link } from "react-router-dom";

export default function Investing() {
  return (
    <>
      <header className="page-head">
        <h1>选基金 / 投资方向</h1>
        <p>
          法案框定的可投资产品、风险等级上限、标准账户（Standarddepot）配置，以及临近退休的强制降风险。
        </p>
      </header>

      <article className="prose">
        <h2>可投资的四类产品（框架）</h2>
        <p>
          养老投资账户中的资金须投向在德国获准销售、符合欧盟 PRIIPs
          规范、且综合风险指标通常不超过第 5 级的产品，主要包括：
        </p>
        <ol>
          <li>
            <strong>OGAW / UCITS</strong> 公募基金与 ETF（须有 KID，风险等级 1–5）
          </li>
          <li>
            <strong>开放式公募 AIF</strong>（Publikums-AIF，依 KAGB 等规定）
          </li>
          <li>
            <strong>开放式 ELTIF</strong>（欧洲长期投资基金，风险 ≤ 5）
          </li>
          <li>
            <strong>欧元主权 / 公共机构债券</strong>
            ：联邦、州、市镇、欧盟机构、EIB、EFSF 等发行的欧元债券
          </li>
        </ol>

        <h2>风险等级上限：最高 Risikoklasse 5</h2>
        <p>
          在 EU PRIIPs 基本信息文件（KID）中，综合风险指标最高允许到第 5
          级。第 6、7 级（极高波动衍生品、杠杆产品等）被排除。
        </p>

        <h2>主流 ETF 能不能买？</h2>
        <p>
          <strong>可以</strong>——但必须是符合欧盟 UCITS、出具 PRIIPs KID
          的欧洲版本。例如在欧洲注册的 S&amp;P 500、MSCI World / FTSE All-World
          UCITS ETF，风险等级常见为第 4 级，落在 1–5 许可区间。不能直接买入仅在美国上市、未出具欧盟
          KID 的原版份额（如部分 SPY/VOO 路径）。
        </p>

        <h2>标准投资账户（Standarddepot）</h2>
        <ul>
          <li>
            提供商须至少提供两类 OGAW：<strong>稳健</strong>（风险 1–2）与{" "}
            <strong>增长</strong>（风险 3–5）。
          </li>
          <li>
            若稳健基金升至风险 4 及以上，或增长基金脱离 3–5
            区间，提供商须强制替换调仓。
          </li>
          <li>
            <strong>Glidepath / Derisking</strong>：退休前 5
            年，高风险组件（3–5）占比通常不得超过总资产 50%；退休前 2
            年及提领开始时，通常不得超过 30%。
          </li>
        </ul>

        <div className="callout">
          <strong>费用：</strong>
          标准账户积累期有效成本（Effektivkosten）法定封顶常见为每年{" "}
          <strong>1.0%</strong>
          。销售/开户费须按规定平摊；转约费用有上限；未在产品信息页列明的费用投保人无需支付。每年应免费收到费用与资本明细。
        </div>

        <p>
          取消强制最低本金保底后，投资者可在合规范围内提高股票型 ETF
          比重——收益潜力与波动风险同步上升。判断产品是否值得，不能只看补助，还要看长期净收益与自己能否承受回撤。
        </p>

        <p>
          退休后怎么取、迁居与税务怎么区分： <Link to="/withdrawal">退出 / 提领 →</Link>
        </p>
      </article>
    </>
  );
}
