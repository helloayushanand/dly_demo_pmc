import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  formatIndianNumber,
} from "../../utils/formatters";

const shortenSchemeName = (name) => {
  const replacements = {
    "Maternal Assistance Scheme":
      "Maternal Assistance",
    "Girl Child Education Support":
      "Girl Child Education",
    "Nutrition Support Programme":
      "Nutrition Support",
    "Women Livelihood Assistance":
      "Women Livelihood",
    "Child Care Assistance":
      "Child Care",
    "Social Security Pension":
      "Social Security Pension",
    "Scholarship Support Scheme":
      "Scholarship Support",
  };

  return replacements[name] || name;
};

function TopSchemesChart({ data }) {
  const formattedData = data.map((item) => ({
    ...item,
    shortName: shortenSchemeName(item.name),
  }));

  const tooltipFormatter = (value) => {
    return [
      formatIndianNumber(value),
      "Beneficiaries",
    ];
  };

  const tooltipLabelFormatter = (
    _label,
    payload
  ) => {
    return payload?.[0]?.payload?.name || "";
  };

  return (
    <article className="content-card chart-card">
      <div className="card-heading">
        <div>
          <span className="section-label">
            Scheme Performance
          </span>

          <h2>Top Schemes by Beneficiaries</h2>
        </div>
      </div>

      {formattedData.length > 0 ? (
        <div className="horizontal-chart-container">
          <ResponsiveContainer width="100%" height={275}>
            <BarChart
              data={formattedData}
              layout="vertical"
              margin={{
                top: 8,
                right: 18,
                bottom: 4,
                left: 12,
              }}
            >
              <CartesianGrid
                stroke="#edf1f7"
                horizontal={false}
              />

              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#667085",
                  fontSize: 9,
                }}
                tickFormatter={(value) =>
                  formatIndianNumber(value)
                }
              />

              <YAxis
                type="category"
                dataKey="shortName"
                width={120}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#344054",
                  fontSize: 9,
                  fontWeight: 600,
                }}
              />

              <Tooltip
                formatter={tooltipFormatter}
                labelFormatter={tooltipLabelFormatter}
                cursor={{
                  fill: "rgba(21, 94, 239, 0.05)",
                }}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e4eaf2",
                  boxShadow:
                    "0 8px 24px rgba(31, 49, 85, 0.12)",
                  fontSize: "11px",
                }}
              />

              <Bar
                dataKey="beneficiaries"
                fill="#2878e8"
                radius={[0, 6, 6, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="chart-empty-state">
          No scheme data is available for the selected
          filters.
        </div>
      )}
    </article>
  );
}

export default TopSchemesChart;