import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Code2,
  GitBranch,
  Globe2,
  Layers3,
  Mail,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import * as m from "../paraglide/messages.js";
import { projectSiteUrls } from "../data/project-sites";
import Reveal from "./Reveal";

const projectCards = [
  {
    className: "project-card ability-card",
    eyebrow: () => m.ability_eyebrow(),
    title: () => m.ability_title(),
    body: () => m.ability_body(),
    detail: () => m.ability_detail(),
    status: () => m.ability_status(),
    repo: "https://github.com/brunosrz/AbilitySystem",
    repoLabel: () => m.ability_repo(),
    icon: Braces,
    futureSiteUrl: projectSiteUrls.ability,
  },
  {
    className: "project-card delivery-card",
    eyebrow: () => m.delivery_eyebrow(),
    title: () => m.delivery_title(),
    body: () => m.delivery_body(),
    detail: () => m.delivery_detail(),
    status: () => m.delivery_status(),
    repo: "https://github.com/brunosrz/Delivery",
    repoLabel: () => m.delivery_repo(),
    icon: Layers3,
    futureSiteUrl: projectSiteUrls.delivery,
  },
];

const expertiseCards = [
  {
    title: () => m.skill_agents_title(),
    body: () => m.skill_agents_body(),
    icon: Bot,
    number: "01",
  },
  {
    title: () => m.skill_systems_title(),
    body: () => m.skill_systems_body(),
    icon: TerminalSquare,
    number: "02",
  },
  {
    title: () => m.skill_product_title(),
    body: () => m.skill_product_body(),
    icon: Code2,
    number: "03",
  },
  {
    title: () => m.skill_quality_title(),
    body: () => m.skill_quality_body(),
    icon: ShieldCheck,
    number: "04",
  },
];

export default function PortfolioLandingPage() {
  return (
    <main id="conteudo" className="portfolio-page" tabIndex={-1}>
      <section id="inicio" className="hero-section section-wrap">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-pulse" aria-hidden="true" />
            {m.hero_eyebrow()}
          </p>
          <h1>
            {m.hero_title_start()} <span>{m.hero_title_accent()}</span>
          </h1>
          <p className="hero-description">{m.hero_body()}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">
              {m.hero_primary()}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#contato">
              {m.hero_secondary()}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="hero-location">
            <Globe2 size={15} aria-hidden="true" />
            <span>{m.hero_location()}</span>
          </div>
        </div>

        <Reveal className="hero-visual">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="hero-monogram" aria-hidden="true">
            <span>b</span>
            <i />
          </div>
          <div className="terminal-window" aria-hidden="true">
            <div className="terminal-topbar" aria-hidden="true">
              <span />
              <span />
              <span />
              <small>~/brunosrz/portfolio</small>
            </div>
            <div className="terminal-content">
              <p>
                <span className="terminal-prompt">$</span> whoami
              </p>
              <p className="terminal-output">{m.hero_terminal_label()}</p>
              <p>
                <span className="terminal-prompt">01</span>{" "}
                {m.hero_terminal_line1()}
              </p>
              <p>
                <span className="terminal-prompt">02</span>{" "}
                {m.hero_terminal_line2()}
              </p>
              <p>
                <span className="terminal-prompt">03</span>{" "}
                {m.hero_terminal_line3()}
              </p>
              <span className="terminal-cursor" aria-hidden="true" />
            </div>
          </div>
          <div className="hero-orbit-label">
            <Sparkles size={14} aria-hidden="true" />
            {m.hero_status()}
          </div>
        </Reveal>

        <a className="hero-scroll" href="#projetos">
          <ArrowDown size={15} aria-hidden="true" />
          <span>{m.projects_eyebrow()}</span>
        </a>
      </section>

      <section className="proof-strip section-wrap" aria-label={m.proof_aria()}>
        <div className="proof-item">
          <span className="proof-value">{m.proof_since()}</span>
          <span>{m.proof_since_desc()}</span>
        </div>
        <div className="proof-item">
          <span className="proof-value">{m.proof_stack()}</span>
          <span>{m.proof_stack_desc()}</span>
        </div>
        <div className="proof-item">
          <span className="proof-value">{m.proof_focus()}</span>
          <span>{m.proof_focus_desc()}</span>
        </div>
      </section>

      <section id="projetos" className="projects-section section-wrap">
        <Reveal className="section-heading">
          <p className="eyebrow">{m.projects_eyebrow()}</p>
          <h2>{m.projects_title()}</h2>
          <p>{m.projects_intro()}</p>
        </Reveal>

        <Reveal className="vectora-card project-card">
          <div className="vectora-copy">
            <div className="project-meta">
              <span className="project-icon vectora-icon">
                <Bot size={21} aria-hidden="true" />
              </span>
              <span className="project-status">
                <span className="status-pulse" aria-hidden="true" />
                {m.status_active()}
              </span>
            </div>
            <p className="eyebrow">{m.vectora_eyebrow()}</p>
            <h3>{m.vectora_title()}</h3>
            <p className="project-body">{m.vectora_body()}</p>
            <p className="project-detail">{m.vectora_detail()}</p>
            <div className="feature-tags">
              <span>{m.vectora_feature1()}</span>
              <span>{m.vectora_feature2()}</span>
              <span>{m.vectora_feature3()}</span>
            </div>
            <div className="project-actions">
              <a
                href="https://vectora.chat/features"
                target="_blank"
                rel="noreferrer"
              >
                {m.vectora_site()}
                <span className="sr-only"> {m.opens_new_tab()}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                className="text-link-muted"
                href="https://github.com/vectora-ltda/vectora"
                target="_blank"
                rel="noreferrer"
              >
                {m.vectora_repo()}
                <span className="sr-only"> {m.opens_new_tab()}</span>
              </a>
            </div>
          </div>

          <div className="vectora-visual" aria-hidden="true">
            <div className="vectora-window">
              <div className="vectora-window-bar">
                <span className="vectora-window-brand">
                  <i /> vectora
                </span>
                <span className="window-menu">···</span>
              </div>
              <div className="vectora-workspace">
                <div className="vectora-sidebar">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="vectora-chat">
                  <span className="mock-kicker">WORKBENCH / AGENT</span>
                  <span className="mock-line mock-line-long" />
                  <span className="mock-line mock-line-medium" />
                  <div className="mock-agent-row">
                    <span className="mock-agent-mark">
                      <Bot size={13} />
                    </span>
                    <span className="mock-line mock-line-short" />
                    <span className="mock-agent-state">ready</span>
                  </div>
                  <span className="mock-line mock-line-long" />
                  <span className="mock-line mock-line-medium" />
                  <div className="mock-input">
                    <span>Ask about your codebase...</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
              <div className="vectora-window-footer">
                <span>
                  <GitBranch size={11} /> main
                </span>
                <span>
                  <Sparkles size={11} /> context ready
                </span>
              </div>
            </div>
            <div className="visual-caption">
              <span /> Native agent loop · Shared project context
            </div>
          </div>
        </Reveal>

        <div className="project-grid">
          {projectCards.map((project, index) => {
            const Icon = project.icon;

            return (
              <Reveal
                key={project.title()}
                className={project.className}
                delay={index * 0.08}
              >
                <div className="project-meta">
                  <span className="project-icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="project-status status-neutral">
                    {m.status_in_progress()}
                  </span>
                </div>
                <p className="eyebrow">{project.eyebrow()}</p>
                <h3>{project.title()}</h3>
                <p className="project-body">{project.body()}</p>
                <p className="project-detail">{project.detail()}</p>
                <p className="project-status-note">
                  <span className="status-pulse" aria-hidden="true" />
                  {project.status()}
                </p>
                <div className="project-actions project-actions-bottom">
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    {project.repoLabel()}
                    <span className="sr-only"> {m.opens_new_tab()}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  {project.futureSiteUrl ? (
                    <a
                      className="future-site"
                      href={project.futureSiteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Globe2 size={14} aria-hidden="true" />
                      {m.future_site_link()}
                      <span className="sr-only"> {m.opens_new_tab()}</span>
                    </a>
                  ) : (
                    <span className="future-site">
                      <Globe2 size={14} aria-hidden="true" />
                      {m.future_site()}
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="atuacao" className="expertise-section section-wrap">
        <Reveal className="section-heading">
          <p className="eyebrow">{m.expertise_eyebrow()}</p>
          <h2>{m.expertise_title()}</h2>
          <p>{m.expertise_intro()}</p>
        </Reveal>
        <div className="expertise-grid">
          {expertiseCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                className="expertise-card"
                key={item.number}
                delay={index * 0.05}
              >
                <div className="expertise-card-top">
                  <span className="expertise-icon">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="expertise-number">{item.number}</span>
                </div>
                <h3>{item.title()}</h3>
                <p>{item.body()}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="sobre" className="about-section section-wrap">
        <Reveal className="about-card">
          <div className="about-copy">
            <p className="eyebrow">{m.about_eyebrow()}</p>
            <h2>{m.about_title()}</h2>
            <p>{m.about_body1()}</p>
            <p>{m.about_body2()}</p>
          </div>
          <div className="principle-card">
            <span className="principle-icon">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <p className="eyebrow">{m.about_principle_label()}</p>
            <p className="principle-quote">“{m.about_principle()}”</p>
            <span className="principle-signature">— Bruno</span>
          </div>
        </Reveal>
      </section>

      <section id="contato" className="contact-section section-wrap">
        <Reveal className="contact-card">
          <div className="contact-orb" aria-hidden="true" />
          <div className="contact-copy">
            <p className="eyebrow">{m.contact_eyebrow()}</p>
            <h2>{m.contact_title()}</h2>
            <p>{m.contact_body()}</p>
          </div>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href="mailto:bruno.soarxz@gmail.com"
            >
              <Mail size={17} aria-hidden="true" />
              {m.contact_email()}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              className="button button-quiet"
              href="https://github.com/brunosrz"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={17} aria-hidden="true" />
              {m.contact_github()}
              <span className="sr-only"> {m.opens_new_tab()}</span>
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
