import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "概览", end: true },
  { to: "/eligibility", label: "准入条件" },
  { to: "/process", label: "过程" },
  { to: "/investing", label: "选基金" },
  { to: "/withdrawal", label: "退出提领" },
  { to: "/rechner", label: "计算器" },
  { to: "/film", label: "介绍影片" },
] as const;

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" end>
            <span className="brand-de">Altersvorsorgedepot</span>
            <span className="brand-zh">德国养老投资账户</span>
          </NavLink>
          <nav className="nav" aria-label="主导航">
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
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p className="disclaimer">
            <strong>免责声明：</strong>
            本站为正式教育说明，依据德国联邦财政部、联邦议院立法记录、德国养老保险机构及公开法案整理，
            <strong>不构成个性化投资、税务或法律建议</strong>
            。补贴资格、合同认证与税务后果因个人情况而异；作出决定前请查阅官方资料或咨询持牌顾问。
            测算请使用站内计算器，并以合同与官方规则为准。
          </p>
          <div className="footer-meta">
            <span>默认语言：简体中文（zh-CN）</span>
            <a
              href="https://deutsch-alterversorge-rechner.apps.grok.bot"
              target="_blank"
              rel="noreferrer"
            >
              独立计算器
            </a>
            <a
              href="https://github.com/Haizi-Wang/Haizi-Wang.github.io/tree/main/altersvorsorge-guide"
              target="_blank"
              rel="noreferrer"
            >
              源码
            </a>
            <span>参考法规：AVR Gz 29Mai2026（Altersvorsorgereformgesetz）</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
