import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export default function Process() {
  const { t } = useI18n();
  const p = t.process;

  return (
    <>
      <header className="page-head">
        <h1>{p.title}</h1>
      </header>

      <article className="prose">
        <h2>{p.whatTitle}</h2>
        <p>{p.what1}</p>
        <p>
          {p.what2a}
          <strong>{p.what2Not}</strong>
          {p.what2b}
        </p>

        <h2>{p.openTitle}</h2>
        <p>{p.open}</p>

        <h3>{p.typesTitle}</h3>
        <p>{p.types}</p>

        <h3>{p.howManyTitle}</h3>
        <p>
          {p.howMany1a}
          <strong>{p.howManyMax}</strong>
          {p.howMany1b}
          <strong>{p.howManyPer}</strong>
          {p.howMany1c}
        </p>
        <ul>
          {p.howManyItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{p.howMany2}</p>

        <h2>{p.basicTitle}</h2>
        <ul>
          {p.basicItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{p.childTitle}</h2>
        <p>{p.child}</p>

        <div className="example">
          <h3>{p.exampleTitle}</h3>
          <dl>
            {p.exampleRows.flatMap((row) => [
              <dt key={`${row.dt}-dt`}>{row.dt}</dt>,
              <dd key={`${row.dt}-dd`}>{row.dd}</dd>,
            ])}
            <div className="total">
              <span>{p.exampleTotal}</span>
              <span>{p.exampleTotalVal}</span>
            </div>
          </dl>
          <p style={{ margin: "0.8rem 0 0", fontSize: "0.9rem", color: "var(--muted)" }}>
            {p.exampleNote}
          </p>
        </div>

        <h2>{p.riesterTitle}</h2>
        <ul>
          {p.riesterItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="prose-cta">
          {p.nextBefore}
          <Link to="/rechner">{p.nextCalc}</Link>
          {p.nextMid}
          <Link to="/investing">{p.nextInvest}</Link>
        </p>
      </article>
    </>
  );
}
