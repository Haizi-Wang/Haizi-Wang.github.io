import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export default function Layout() {
  const { pathname } = useLocation();
  const isRechner = pathname === "/rechner";
  const { lang, t, setLang } = useI18n();

  const links = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/eligibility", label: t.nav.eligibility },
    { to: "/process", label: t.nav.process },
    { to: "/investing", label: t.nav.investing },
    { to: "/withdrawal", label: t.nav.withdrawal },
    { to: "/rechner", label: t.nav.rechner },
    { to: "/film", label: t.nav.film },
  ] as const;

  return (
    <div className="site">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" end>
            <span className="brand-de">Altersvorsorgedepot</span>
            <span className="brand-zh">{t.brandZh}</span>
          </NavLink>
          <div className="header-tools">
            <nav className="nav" aria-label={t.nav.aria}>
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={"end" in link ? link.end : false}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="lang-toggle" role="group" aria-label={t.lang.aria}>
              <button
                type="button"
                className={lang === "zh" ? "active" : undefined}
                aria-pressed={lang === "zh"}
                onClick={() => setLang("zh")}
              >
                {t.lang.switchToZh}
              </button>
              <button
                type="button"
                className={lang === "en" ? "active" : undefined}
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
              >
                {t.lang.switchToEn}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={isRechner ? "main main--rechner" : "main"}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p className="disclaimer">
            <strong>{t.footer.disclaimerLabel}</strong>
            {t.footer.disclaimer}
          </p>
          <div className="footer-meta">
            <span>{lang === "zh" ? t.lang.footerDefault : t.lang.footerEn}</span>
            <NavLink to="/rechner">{t.footer.calc}</NavLink>
            <a
              href="https://github.com/Haizi-Wang/Haizi-Wang.github.io/tree/main/altersvorsorge-guide"
              target="_blank"
              rel="noreferrer"
            >
              {t.footer.source}
            </a>
            <span>{t.footer.law}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
