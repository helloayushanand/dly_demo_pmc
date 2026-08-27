import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  formatIndianNumber,
} from "../../utils/formatters";

const CHART_COLORS = [
  "#2563eb",
  "#60a5fa",
  "#14b8a6",
  "#22c55e",
  "#ef4444",
  "#8b5cf6",
];

function ApplicationStatusChart({ data }) {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const tooltipFormatter = (value, name) => {
    const percentage =
      total > 0
        ? ((value / total) * 100).toFixed(1)
        : "0.0";

    return [
      `${formatIndianNumber(value)} (${percentage}%)`,
      name,
    ];
  };

  return (
    <article className="content-card chart-card">
      <div className="card-heading">
        <div>
          <span className="section-label">
            Applications
          </span>
          <h2>Applications by Status</h2>
        </div>

        <span className="live-data-badge">
          Live Filters
        </span>
      </div>

      {total > 0 ? (
        <div className="application-chart-layout">
          <div className="donut-chart-wrapper">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={1}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {data.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={
                        CHART_COLORS[
                          index % CHART_COLORS.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={tooltipFormatter}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e4eaf2",
                    boxShadow:
                      "0 8px 24px rgba(31, 49, 85, 0.12)",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-center-content">
              <strong>
                {formatIndianNumber(total)}
              </strong>
              <span>Total</span>
            </div>
          </div>

          <div className="chart-legend-list">
            {data.map((item, index) => {
              const percentage =
                total > 0
                  ? (item.value / total) * 100
                  : 0;

              return (
                <div
                  className="chart-legend-item"
                  key={item.name}
                >
                  <span
                    className="legend-color-dot"
                    style={{
                      backgroundColor:
                        CHART_COLORS[
                          index % CHART_COLORS.length
                        ],
                    }}
                  />

                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {formatIndianNumber(item.value)}
                      {" · "}
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="chart-empty-state">
          No application data is available for the
          selected filters.
        </div>
      )}
    </article>
  );
}

export default ApplicationStatusChart;