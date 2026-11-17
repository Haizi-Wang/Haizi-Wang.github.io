import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export default function Eligibility() {
  const { t } = useI18n();
  const e = t.eligibility;

  return (
    <>
      <header className="page-head">
        <h1>{e.title}</h1>
        <p>{e.lead}</p>
      </header>

      <article className="prose">
        <h2>{e.directTitle}</h2>
        <p>{e.directIntro}</p>
        <ul>
          {e.groups.map((g) => (
            <li key={g.title}>
              <strong>{g.title}</strong>
              {g.body}
            </li>
          ))}
        </ul>

        <h2>{e.indirectTitle}</h2>
        <p>{e.indirect}</p>

        <h2>{e.thresholdsTitle}</h2>
        <ul>
          <li>
            <strong>{e.minOwnLabel}</strong>
            {e.minOwn}
          </li>
          <li>
            <strong>{e.ageLabel}</strong>
            {e.age}
          </li>
        </ul>

        <div className="callout">
          <strong>{e.bonusLabel}</strong>
          {e.bonus}
        </div>

        <div className="prose-cta-spacer" aria-hidden="true" />
        <p className="prose-cta">
          {e.next} <Link to="/process">{e.nextLink}</Link>
        </p>
      </article>
    </>
  );
}
