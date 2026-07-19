import React from "react";

/**
 * Bilingual language switcher.
 * Design choice (localization guidelines): languages are represented by their
 * own name in text (English / Français), NOT by country flags — a language
 * is not a country, and flag icons are a well-documented localization pitfall
 * (e.g. English is spoken in many countries with different flags).
 * The active language is shown with a filled pill and aria-pressed for a11y.
 */
export default function LanguageSwitcher({ lang, setLang, label }) {
  const options = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  return (
    <div className="lang-switcher" role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          className={`lang-pill ${lang === opt.code ? "is-active" : ""}`}
          aria-pressed={lang === opt.code}
          onClick={() => setLang(opt.code)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
