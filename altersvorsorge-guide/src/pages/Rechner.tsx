const CALC_URL = "https://deutsch-alterversorge-rechner.apps.grok.bot";

export default function Rechner() {
  return (
    <>
      <header className="page-head">
        <h1>计算器</h1>
        <p>
          使用已发布的 Altersvorsorgedepot
          情景计算器（中 / 德 / 英等界面）。结果为估算，非正式投顾意见。
        </p>
      </header>

      <section className="film-placeholder" aria-labelledby="calc-launch-title">
        <p
          id="calc-launch-title"
          style={{
            fontFamily: "var(--display)",
            fontSize: "1.45rem",
            color: "var(--primary)",
            marginBottom: "0.6rem",
          }}
        >
          打开养老投资账户计算器
        </p>
        <p>
          线上应用当前设置了 <code>X-Frame-Options: DENY</code>，无法被本站
          iframe 内嵌。请在新标签打开完整计算器；日后若把{" "}
          <code>alterversorge/</code> 与本指南部署到同域，即可改为页内嵌入。
        </p>
        <p style={{ marginTop: "1.1rem" }}>
          <a className="btn btn-primary" href={CALC_URL} target="_blank" rel="noreferrer">
            在新标签打开计算器
          </a>
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          源码：仓库内 <code>alterversorge/</code> · 地址：{" "}
          <a href={CALC_URL} target="_blank" rel="noreferrer">
            {CALC_URL}
          </a>
        </p>
      </section>
    </>
  );
}
