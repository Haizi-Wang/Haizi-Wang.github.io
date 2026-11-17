import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export default function Investing() {
  const { t } = useI18n();
  const i = t.investing;

  return (
    <>
      <header className="page-head">
        <h1>{i.title}</h1>
        <p>{i.lead}</p>
      </header>

      <article className="prose">
        <h2>{i.fourTitle}</h2>
        <p>{i.fourIntro}</p>
        <ol>
          {i.fourItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>

        <h2>{i.riskTitle}</h2>
        <p>{i.risk}</p>

        <h2>{i.etfTitle}</h2>
        <p>{i.etf}</p>

        <h2>{i.standardTitle}</h2>
        <ul>
          {i.standardItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="callout">
          <strong>{i.feesLabel}</strong>
          {i.fees}
        </div>

        <p>{i.riskTolerance}</p>

        <h2>{i.retireTitle}</h2>
        <p>
          {i.retireBefore}
          <Link to="/withdrawal">{i.retireLink}</Link>
        </p>
      </article>
    </>
  );
}
