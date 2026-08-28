import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const STATUS_COLORS = {
  "On Track": "#12b76a",
  "Needs Review": "#f79009",
  Critical: "#d92d20",
  Completed: "#155eef",
};

function SchemeHealthTooltip({
  active,
  payload,
}) {
  if (
    !active ||
    !payload ||
    payload.length === 0
  ) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item) {
    return null;
  }

  return (
    <div className="scheme-health-tooltip">
      <div
        className="scheme-health-tooltip-dot"
        style={{
          backgroundColor:
            STATUS_COLORS[item.name],
        }}
      />

      <div>
        <span>{item.name}</span>

        <strong>
          {item.value}{" "}
          {item.value === 1
            ? "scheme"
            : "schemes"}
        </strong>
      </div>
    </div>
  );
}

function SchemeHealthChart({
  data = [],
  totalSchemes = 0,
}) {
  const hasData =
    totalSchemes > 0 &&
    data.some((item) => item.value > 0);

  return (
    <article className="content-card scheme-health-card">
      <div className="scheme-health-heading">
        <div>
          <span className="section-label">
            Programme monitoring
          </span>

          <h2>Scheme Health</h2>

          <p>
            Current operational status based on fund
            utilisation and DBT performance
          </p>
        </div>

        <span className="scheme-health-live-badge">
          Live Status
        </span>
      </div>

      {hasData ? (
        <>
          <div className="scheme-health-chart-wrapper">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="64%"
                  outerRadius="86%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((item) => (
                    <Cell
                      key={item.name}
                      fill={
                        STATUS_COLORS[item.name]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  content={
                    <SchemeHealthTooltip />
                  }
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="scheme-health-center">
              <strong>{totalSchemes}</strong>

              <span>Total Schemes</span>
            </div>
          </div>

          <div className="scheme-health-legend">
            {data.map((item) => (
              <div
                className="scheme-health-legend-item"
                key={item.name}
              >
                <span
                  className="scheme-health-status-dot"
                  style={{
                    backgroundColor:
                      STATUS_COLORS[item.name],
                  }}
                />

                <div>
                  <span>{item.name}</span>

                  <strong>{item.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="chart-empty-state">
          No scheme-health information is available
          for the selected filters.
        </div>
      )}
    </article>
  );
}

export default SchemeHealthChart;