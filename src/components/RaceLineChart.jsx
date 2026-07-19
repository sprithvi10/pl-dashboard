import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RACE_PLAYERS, RACE_CUMULATIVE, MONTH_KEYS, MONTH_LABELS } from "../data";

function toMonthly(cumulative) {
  return cumulative.map((v, i) => (i === 0 ? v : v - cumulative[i - 1]));
}

export default function RaceLineChart({ t, lang }) {
  const [view, setView] = useState("cumulative"); // 'cumulative' | 'monthly'
  const [visible, setVisible] = useState(() => new Set(RACE_PLAYERS.map((p) => p.id)));

  const monthLabels = MONTH_LABELS[lang];

  const data = useMemo(() => {
    return MONTH_KEYS.map((m, i) => {
      const row = { month: m };
      RACE_PLAYERS.forEach((p) => {
        const values = view === "cumulative" ? RACE_CUMULATIVE[p.id] : toMonthly(RACE_CUMULATIVE[p.id]);
        row[p.id] = values[i];
      });
      return row;
    });
  }, [view]);

  const toggle = (id) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id); // keep at least one line visible
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const rows = payload.filter((p) => visible.has(p.dataKey));
    if (!rows.length) return null;
    return (
      <div className="chart-tooltip-card">
        <p className="tooltip-month">{monthLabels[label]}</p>
        {rows.map((row) => {
          const player = RACE_PLAYERS.find((p) => p.id === row.dataKey);
          return (
            <p key={row.dataKey} className="tooltip-row">
              <span className="tooltip-dot" style={{ background: player.color }} />
              {player.name}
              <strong>{row.value}</strong>
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <section className="chart-card" aria-labelledby="chart2-title">
      <h2 id="chart2-title" className="chart-title">{t.chart2Title}&nbsp; 🏅</h2>
      <p className="chart-context">{t.chart2Context}</p>

      <div className="chart-controls">
        <div className="control-group">
          <span className="control-label" id="view-label">{t.chart2ViewLabel}</span>
          <div className="segmented" role="group" aria-labelledby="view-label">
            <button
              type="button"
              className={`segmented-btn ${view === "cumulative" ? "is-active" : ""}`}
              aria-pressed={view === "cumulative"}
              onClick={() => setView("cumulative")}
            >
              {t.chart2ViewCumulative}
            </button>
            <button
              type="button"
              className={`segmented-btn ${view === "monthly" ? "is-active" : ""}`}
              aria-pressed={view === "monthly"}
              onClick={() => setView("monthly")}
            >
              {t.chart2ViewMonthly}
            </button>
          </div>
        </div>

        <div className="control-group">
          <span className="control-label" id="players-label">{t.chart2PlayersLabel}</span>
          <div className="legend-toggles" role="group" aria-labelledby="players-label">
            {RACE_PLAYERS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`legend-chip ${visible.has(p.id) ? "is-active" : "is-muted"}`}
                aria-pressed={visible.has(p.id)}
                onClick={() => toggle(p.id)}
                style={{ "--chip-color": p.color }}
              >
                <span className="legend-swatch" />
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="line-chart">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 4" stroke="var(--pl-panel-border)" vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={(m) => monthLabels[m]}
              tick={{ fill: "var(--pl-muted-2)", fontSize: 12 }}
              axisLine={{ stroke: "var(--pl-panel-border)" }}
              tickLine={false}
              label={{
              value: t.chart2AxisMonth,
              position: "insideBottom",
              offset: -14,
              fill: "var(--pl-muted-2)",
              fontSize: 12,
            }}

            />
            <YAxis
              tick={{ fill: "var(--pl-muted-2)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={32}
              label={{
                value: t.chart2AxisGoals,
                angle: -90,
                position: "insideLeft",
                fill: "var(--pl-muted-2)",
                fontSize: 12,
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--pl-panel-border)", strokeWidth: 1 }} />
            {RACE_PLAYERS.map(
              (p) =>
                visible.has(p.id) && (
                  <Line
                    key={p.id}
                    type="monotone"
                    dataKey={p.id}
                    name={p.name}
                    stroke={p.color}
                    strokeWidth={3}
                    dot={{ r: 4, fill: p.color, stroke: "var(--pl-bg)", strokeWidth: 1.5 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="chart-source">{t.chart2Source}</p>
    </section>
  );
}