import { getLocale, setLocale } from "../paraglide/runtime.js";
import * as m from "../paraglide/messages.js";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

type Locale = "en" | "pt-BR";

const navigation = [
  { href: "#sobre", label: () => m.nav_about() },
  { href: "#projetos", label: () => m.nav_projects() },
  { href: "#atuacao", label: () => m.nav_skills() },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const locale = getLocale() as Locale;
  const nextLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {m.skip_link()}
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="wordmark" href="#inicio" aria-label={m.nav_home_aria()}>
            <span className="wordmark-mark" aria-hidden="true">
              b.
            </span>
            <span>brunosrz</span>
          </a>

          <nav
            id="site-navigation"
            className={`site-nav${menuOpen ? " is-open" : ""}`}
            aria-label={m.nav_aria()}
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label()}
              </a>
            ))}
            <a
              className="nav-cta"
              href="#contato"
              onClick={() => setMenuOpen(false)}
            >
              {m.nav_contact()}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="locale-toggle"
              aria-label={m.language_toggle_aria({
                current: locale === "en" ? "English" : "Português",
                target: nextLocale === "en" ? "English" : "Português",
              })}
              aria-describedby="language-switch-to"
              onClick={() => void setLocale(nextLocale)}
            >
              <span aria-hidden="true">{locale === "pt-BR" ? "PT" : "EN"}</span>
              <span className="locale-toggle-divider" aria-hidden="true">
                /
              </span>
              <span className="locale-toggle-next" aria-hidden="true">
                {nextLocale === "pt-BR" ? "PT" : "EN"}
              </span>
            </button>
            <span id="language-switch-to" className="sr-only" lang={nextLocale}>
              {m.language_switch_to({
                language: nextLocale === "en" ? "English" : "Português",
              })}
            </span>
            <button
              className="menu-toggle"
              ref={menuToggleRef}
              type="button"
              aria-label={menuOpen ? m.nav_close_menu() : m.nav_open_menu()}
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
