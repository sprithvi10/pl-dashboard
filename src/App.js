import React, { useState } from "react";
import "./App.css";
import { TRANSLATIONS } from "./data";
import LanguageSwitcher from "./components/LanguageSwitcher";
import GoalsBarChart from "./components/GoalsBarChart";
import RaceLineChart from "./components/RaceLineChart";

export default function App() {
  const [lang, setLang] = useState("en");
  const t = TRANSLATIONS[lang];

  return (
    <div className="pl-app" lang={t.htmlLang} dir={t.dir}>
      <header className="pl-hero">
        <div className="container">
          <div className="hero-top">
            <span className="hero-top-filler"></span>
            <LanguageSwitcher lang={lang} setLang={setLang} label={t.langToggleLabel} />
          </div>

          <h1 className="hero-title">⚽ &nbsp;{t.siteTitle}</h1>
          <p className="hero-tagline">{t.siteTagline} &middot; {t.seasonRange}</p>
          <p className="hero-intro">{t.intro}</p>
        </div>

        {/* Signature element: an LED-scoreboard style ticker of the season's headline stats */}
        <div className="ticker" role="list" aria-label={t.siteTagline}>
          <div className="ticker-track">
            {[...t.ticker, ...t.ticker].map((item, i) => (
              <span className="ticker-item" role="listitem" key={i}>
                <span className="ticker-label">{t[item.labelKey]}</span>
                <span className="ticker-value">{item.value}</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="container pl-main">
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <GoalsBarChart t={t} />
          </div>
          <div className="col-12 col-lg-6">
            <RaceLineChart t={t} lang={lang} />
          </div>
        </div>
      </main>

      <footer className="pl-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h2 className="footer-heading">{t.footerHeading}</h2>
              <p className="footer-body">{t.footerBody}</p>
              <p className="footer-body"><a href="https://sprithvi10.github.io/seg3125-portfolio/">Prithviraj Sowdermett</a> · SEG3125 · uOttawa</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
