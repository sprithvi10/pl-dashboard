// src/data.js
// Data for the Premier League 2025/26 Stats Dashboard (Assignment 5, SEG3125)
//
// GOALS DATA: compiled by hand from public 2025/26 Premier League season reporting
// (final Golden Boot standings, published after the season concluded on 24 May 2026).
// Source: FootballTransfers.com, "Premier League top scorers 2025/26: Haaland wins
// third Golden Boot" (updated 24 May 2026) -- https://www.footballtransfers.com
// Premier League official site, "Premier League Top Clubs Stats " -- https://www.premierleague.com
//
// RACE DATA (month-by-month progression for the line chart): the exact match-by-match
// goal log is not published as a simple table, so the monthly cumulative totals below
// were RECONSTRUCTED BY HAND from the season's narrative reporting (the same article)
// to illustrate the shape of the Golden Boot race. End-of-season totals match the real,
// published final tallies exactly; the in-season shape is an approximation for teaching
// purposes. 

export const TEAMS = [
  "Arsenal",
  "Aston Villa",
  "AFC Bournemouth",
  "Brentford",
  "Brighton & Hove Albion",
  "Burnley",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Leeds United",
  "Liverpool",
  "Manchester City",
  "Manchester United",
  "Newcastle United",
  "Nottingham Forest",
  "Sunderland Association",
  "Tottenham Hotspur",
  "West Ham United",
  "Wolverhampton Wanderers"
];

export const PLAYERS_GOALS = [
  { id: "haaland", name: "Erling Haaland", team: "Manchester City", goals: 27, leader: true },
  { id: "thiago", name: "Igor Thiago", team: "Brentford", goals: 22 },
  { id: "semenyo", name: "Antoine Semenyo", team: "Manchester City", goals: 17 },
  { id: "watkins", name: "Ollie Watkins", team: "Aston Villa", goals: 16 },
  { id: "joaopedro", name: "João Pedro", team: "Chelsea", goals: 15 },
  { id: "gibbswhite", name: "Morgan Gibbs-White", team: "Nottingham Forest", goals: 15 },
  { id: "gyokeres", name: "Viktor Gyökeres", team: "Arsenal", goals: 14 },
  { id: "calvertlewin", name: "Dominic Calvert-Lewin", team: "Leeds United", goals: 14 },
  { id: "welbeck", name: "Danny Welbeck", team: "Brighton & Hove Albion", goals: 13 },
  { id: "kroupi", name: "Eli Junior Kroupi", team: "AFC Bournemouth", goals: 13 },
];

// Months of the PL season, Aug -> May
export const MONTH_KEYS = ["aug", "sep", "oct", "nov", "dec", "jan", "feb", "mar", "apr", "may"];

export const RACE_PLAYERS = [
  { id: "haaland", name: "Erling Haaland", color: "#F2B705" },
  { id: "thiago", name: "Igor Thiago", color: "#4CC9F0" },
  { id: "semenyo", name: "Antoine Semenyo", color: "#FF6B6B" },
];

// Cumulative goals at the end of each month (approximate — see note above)
export const RACE_CUMULATIVE = {
  haaland: [2, 8, 13, 15, 19, 20, 21, 22, 25, 27],
  thiago: [1, 4, 7, 10, 10, 16, 18, 19, 21, 22],
  semenyo: [2, 6, 6, 6, 9, 11, 15, 15, 16, 17],
};

export const TRANSLATIONS = {
  en: {
    dir: "ltr",
    htmlLang: "en",
    langName: "English",
    siteTitle: "Premier League Player Statistics",
    siteTagline: "2025/26 Season ",
    seasonRange: "15 Aug. 2025 to 24 May 2026",
    intro:
      "A bilingual dashboard exploring player performance across the 2025/26 Premier League season.",
    langToggleLabel: "Language",
    ticker: [
      { labelKey: "tickerGoldenBoot", value: "Erling Haaland · 27 goals" },
      { labelKey: "tickerPlaymaker", value: "Bruno Fernandes · 21 assists" },
      { labelKey: "tickerGlove", value: "David Raya · 19 clean sheets" },
    ],
    tickerGoldenBoot: "Golden Boot",
    tickerPlaymaker: "Playmaker Award",
    tickerGlove: "Golden Glove",

    chart1Title: "Top goal scorers",
    chart1Context:
      "Compare the league's top scorers. Select how many players are shown, or narrow the list to a single club.",
    chart1ShowLabel: "Show",
    chart1Top5: "Top 5",
    chart1Top10: "Top 10",
    chart1ClubLabel: "Club",
    chart1ClubAll: "All clubs",
    chart1Unit: "goals",
    chart1UnitOne: "goal",
    chart1LeaderTag: "Golden Boot",
    chart1Empty: "No players from this club appear in the top scorers list.",
    chart1Source: "Source: premierleague.com & footballtransfers.com",

    chart2Title: "The Golden Boot race",
    chart2Context:
      "View the season-long scoring duel between Haaland, Thiago and Semenyo developed month by month. Toggle players on or off, and switch between running totals and monthly form.",
    chart2ViewLabel: "View",
    chart2ViewCumulative: "Running total",
    chart2ViewMonthly: "Goals per month",
    chart2PlayersLabel: "Players shown",
    chart2AxisGoals: "Goals",
    chart2AxisMonth: "Months",
    chart2Source: "Source: premierleague.com & footballtransfers.com",

    footerHeading: "About this dashboard",
    footerBody:
      "Built with React, HTML, CSS, JavaScript & Bootstrap 5",
    footerPortfolio: "← Back to portfolio",
  },

  fr: {
    dir: "ltr",
    htmlLang: "fr",
    langName: "Français",
    siteTitle: "Statistiques des joueurs de Premier League",
    siteTagline: "Saison 2025-2026",
    seasonRange: "15 Août 2025 à 24 Mai 2026",
    intro:
      "Un tableau de bord bilingue analysant les performances des joueurs au cours de la saison 2025-2026 de Premier League.",
    langToggleLabel: "Langue",
    ticker: [
      { labelKey: "tickerGoldenBoot", value: "Erling Haaland · 27 buts" },
      { labelKey: "tickerPlaymaker", value: "Bruno Fernandes · 21 passes décisives" },
      { labelKey: "tickerGlove", value: "David Raya · 19 matchs sans but encaissé" },
    ],
    tickerGoldenBoot: "Soulier d'or",
    tickerPlaymaker: "Prix du passeur",
    tickerGlove: "Gant d'or",

    chart1Title: "Meilleurs buteurs",
    chart1Context:
      "Comparez les meilleurs buteurs du championnat. Choisissez le nombre de joueurs à afficher ou restreignez la liste à un seul club.",
    chart1ShowLabel: "Afficher",
    chart1Top5: "Top 5",
    chart1Top10: "Top 10",
    chart1ClubLabel: "Club",
    chart1ClubAll: "Tous les clubs",
    chart1Unit: "buts",
    chart1UnitOne: "but",
    chart1LeaderTag: "Soulier d'or",
    chart1Empty: "Aucun joueur de ce club ne figure dans le classement des buteurs.",
    chart1Source: "Source: premierleague.com et footballtransfers.com",

    chart2Title: "La course au Soulier d'or",
    chart2Context:
      "Découvrez le duel de buteurs qui a opposé Haaland, Thiago et Semenyo tout au long de la saison, mois après mois. Activez ou désactivez l'affichage des joueurs et passez du cumul des buts à la forme du mois.",
    chart2ViewLabel: "Affichage",
    chart2ViewCumulative: "Total cumulatif",
    chart2ViewMonthly: "Buts par mois",
    chart2PlayersLabel: "Joueurs affichés",
    chart2AxisGoals: "Buts",
    chart2AxisMonth: "Mois",
    chart2Source: "Source: premierleague.com et footballtransfers.com",

    footerHeading: "À propos de ce tableau de bord",
    footerBody:
      "Développé avec React, HTML, CSS, JavaScript et Bootstrap 5",
    footerPortfolio: "← Retour au portfolio",
  },
};

export const MONTH_LABELS = {
  en: { aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec", jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May" },
  fr: { aug: "Août", sep: "Sept.", oct: "Oct.", nov: "Nov.", dec: "Déc.", jan: "Janv.", feb: "Févr.", mar: "Mars", apr: "Avr.", may: "Mai" },
};
