import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export default function Home() {
  const { lang, t, setLang } = useI18n();
  const h = t.home;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero-title">
          Altersvorsorgedepot
        </h1>
        <p className="hero-lead">{h.lead}</p>
        <div className="cta-row">
          <Link className="btn btn-primary" to="/eligibility">
            {h.ctaEligibility}
          </Link>
          <Link className="btn btn-ghost" to="/rechner">
            {h.ctaCalc}
          </Link>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
          >
            {lang === "zh" ? h.switchHint : t.lang.switchToZh}
          </button>
        </div>
      </section>

      <section className="prose" aria-labelledby="why-title">
        <h2 id="why-title">{h.whyTitle}</h2>
        <p>{h.whyP1}</p>
        <div className="callout">
          <strong>{h.reminderLabel}</strong>
          {h.reminder}
        </div>

        <h2>{h.timelineTitle}</h2>
        <ul className="timeline">
          {h.timeline.map((item) => (
            <li key={item.time}>
              <time>{item.time}</time>
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      <nav className="path-grid" aria-label={h.pathAria}>
        {h.path.map((item) => (
          <Link key={item.to} className="path-card" to={item.to}>
            <div className="step">
              {h.step} {item.step}
            </div>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </Link>
        ))}
      </nav>
    </>
  );
}
