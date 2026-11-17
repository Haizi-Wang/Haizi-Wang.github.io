import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export default function Withdrawal() {
  const { t } = useI18n();
  const w = t.withdrawal;

  return (
    <>
      <header className="page-head">
        <h1>{w.title}</h1>
        <p>{w.lead}</p>
      </header>

      <article className="prose">
        <h2>{w.startTitle}</h2>
        <p>{w.start1}</p>
        <p>{w.eigenheim}</p>

        <h2>{w.harmfulTitle}</h2>
        <p>{w.harmful1}</p>
        <p>
          <strong>{w.kleinLabel}</strong>
          {w.klein}
        </p>

        <h2>{w.taxTitle}</h2>
        <ul>
          {w.taxItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="callout">
          <strong>{w.twoLabel}</strong>
          {w.two}
        </div>

        <h2>{w.moveTitle}</h2>
        <ul>
          {w.moveItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{w.inheritTitle}</h2>
        <p>{w.inherit}</p>

        <h2>{w.feeTitle}</h2>
        <p>{w.fee}</p>

        <div className="prose-cta-spacer" aria-hidden="true" />
        <p className="prose-cta">
          {w.nextBefore}
          <Link to="/rechner">{w.nextLink}</Link>
        </p>
      </article>
    </>
  );
}
