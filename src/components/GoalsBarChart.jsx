import React, { useMemo, useState } from "react";
import { PLAYERS_GOALS, PLAYERS_ASSISTS, TEAMS } from "../data";

const ROW_H = 40;
const ROW_GAP = 10;
const CHART_LEFT = 190; // room for name/club label
const CHART_RIGHT = 46; // room for value label
const CHART_WIDTH = 640;

// Normalizes both datasets to a common { id, name, team, value, leader } shape
// so the chart only needs one rendering path regardless of metric.
const METRICS = {
  goals: {
    source: PLAYERS_GOALS,
    field: "goals",
    titleKey: "chart1TitleGoals",
    contextKey: "chart1ContextGoals",
    unitKey: "chart1Unit",
    unitOneKey: "chart1UnitOne",
    leaderTagKey: "chart1LeaderTag",
  },
  assists: {
    source: PLAYERS_ASSISTS,
    field: "assists",
    titleKey: "chart1TitleAssists",
    contextKey: "chart1ContextAssists",
    unitKey: "chart1UnitAssists",
    unitOneKey: "chart1UnitAssistsOne",
    leaderTagKey: "chart1LeaderTagAssists",
  },
};

export default function GoalsBarChart({ t }) {
  const [metric, setMetric] = useState("goals");
  const [topN, setTopN] = useState(10);
  const [club, setClub] = useState("all");

  const config = METRICS[metric];

  const allRows = useMemo(
    () => config.source.map((p) => ({ ...p, value: p[config.field] })),
    [config]
  );

  const rows = useMemo(() => {
    let data = [...allRows];
    if (club !== "all") data = data.filter((p) => p.team === club);
    data.sort((a, b) => b.value - a.value);
    return data.slice(0, topN);
  }, [allRows, topN, club]);

  const maxValue = useMemo(
    () => Math.max(...allRows.map((p) => p.value)),
    [allRows]
  );

  const plotWidth = CHART_WIDTH - CHART_LEFT - CHART_RIGHT;
  const height = Math.max(rows.length, 1) * (ROW_H + ROW_GAP) + 20;
  const scale = (value) => (value / maxValue) * plotWidth;

  const unit = t[config.unitKey];
  const unitOne = t[config.unitOneKey];
  const title = t[config.titleKey];

  return (
    <section className="chart-card" aria-labelledby="chart1-title">
      <h2 id="chart1-title" className="chart-title">{title}&nbsp; 👟</h2>
      <p className="chart-context">{t[config.contextKey]}</p>

      <div className="chart-controls">
        <div className="control-group">
          <span className="control-label" id="metric-label">{t.chart1MetricLabel}</span>
          <div className="segmented" role="group" aria-labelledby="metric-label">
            {["goals", "assists"].map((m) => (
              <button
                key={m}
                type="button"
                className={`segmented-btn ${metric === m ? "is-active" : ""}`}
                aria-pressed={metric === m}
                onClick={() => setMetric(m)}
              >
                {m === "goals" ? t.chart1MetricGoals : t.chart1MetricAssists}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <span className="control-label" id="topn-label">{t.chart1ShowLabel}</span>
          <div className="segmented" role="group" aria-labelledby="topn-label">
            {[5, 10].map((n) => (
              <button
                key={n}
                type="button"
                className={`segmented-btn ${topN === n ? "is-active" : ""}`}
                aria-pressed={topN === n}
                onClick={() => setTopN(n)}
              >
                {n === 5 ? t.chart1Top5 : t.chart1Top10}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label className="control-label" htmlFor="club-select">{t.chart1ClubLabel}</label>
          <select
            id="club-select"
            className="form-select pl-select"
            value={club}
            onChange={(e) => setClub(e.target.value)}
          >
            <option value="all">{t.chart1ClubAll}</option>
            {TEAMS.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="chart-empty">{t.chart1Empty}</p>
      ) : (
        <svg
          className="bar-chart"
          viewBox={`0 0 ${CHART_WIDTH} ${height}`}
          role="img"
          aria-label={`${title}: ${rows.map((r) => `${r.name} ${r.value}`).join(", ")}`}
        >
          <line
            x1={CHART_LEFT}
            y1={8}
            x2={CHART_LEFT}
            y2={height - 12}
            stroke="var(--pl-line)"
            strokeWidth="1"
          />
          {rows.map((p, i) => {
            const y = 12 + i * (ROW_H + ROW_GAP);
            const w = scale(p.value);
            return (
              <g key={p.id} className="bar-row">
                <text
                  x={CHART_LEFT - 14}
                  y={y + ROW_H / 2 - 4}
                  textAnchor="end"
                  className="bar-name"
                >
                  {p.name}
                  {p.leader && <tspan className="bar-star"> ★</tspan>}
                </text>
                <text
                  x={CHART_LEFT - 14}
                  y={y + ROW_H / 2 + 12}
                  textAnchor="end"
                  className="bar-club"
                >
                  {p.team}
                </text>
                <rect
                  x={CHART_LEFT}
                  y={y}
                  width={Math.max(w, 2)}
                  height={ROW_H - 12}
                  rx="4"
                  className={p.leader ? "bar-rect bar-rect-leader" : "bar-rect"}
                >
                  <title>{`${p.name} — ${p.value} ${p.value === 1 ? unitOne : unit}`}</title>
                </rect>
                <text
                  x={CHART_LEFT + w + 10}
                  y={y + (ROW_H - 12) / 2 + 5}
                  className="bar-value"
                >
                  {p.value}
                </text>
                {p.leader && (
                  <text
                    x={CHART_LEFT + 8}
                    y={y + (ROW_H - 12) / 2 + 5}
                    className="bar-leader-tag"
                  >
                    {t[config.leaderTagKey]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      )}

      <p className="chart-source">{t.chart1Source}</p>
    </section>
  );
}