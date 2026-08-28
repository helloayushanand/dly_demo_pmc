import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatCrore = (value) => {
  const numericValue = Number(value || 0);

  return `₹${numericValue.toLocaleString("en-IN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} Cr`;
};

function DbtTrendTooltip({
  active,
  payload,
  label,
}) {
  if (
    !active ||
    !payload ||
    payload.length === 0
  ) {
    return null;
  }

  const values = payload.reduce(
    (result, entry) => {
      result[entry.dataKey] = entry.value;
      return result;
    },
    {}
  );

  return (
    <div className="dbt-trend-tooltip">
      <strong>{label}</strong>

      <div>
        <span>Amount Sanctioned</span>

        <b>
          {formatCrore(
            values.amountSanctioned
          )}
        </b>
      </div>

      <div>
        <span>Amount Disbursed</span>

        <b>
          {formatCrore(
            values.amountDisbursed
          )}
        </b>
      </div>

      <div>
        <span>Returned / Rejected</span>

        <b>
          {formatCrore(
            values.returnedRejected
          )}
        </b>
      </div>
    </div>
  );
}

function DbtDisbursementTrend({
  data = [],
  financialYear,
  dateRange,
}) {
  const hasTrendData = data.some((item) => {
    return (
      item.amountSanctioned > 0 ||
      item.amountDisbursed > 0 ||
      item.returnedRejected > 0
    );
  });

  return (
    <section className="content-card dbt-trend-card">
      <div className="dbt-trend-heading">
        <div>
          <span className="section-label">
            Financial monitoring
          </span>

          <h2>
            DBT Disbursement Trend (₹ Cr)
          </h2>

          <p>
            Monthly reconciliation of sanctioned,
            disbursed and returned DBT funds
          </p>
        </div>

        <div className="dbt-trend-context">
          <span>{financialYear}</span>

          <strong>{dateRange}</strong>
        </div>
      </div>

      {hasTrendData ? (
        <div className="dbt-trend-chart">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 18,
                bottom: 4,
                left: 2,
              }}
            >
              <defs>
                <linearGradient
                  id="disbursedAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#08afc0"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="100%"
                    stopColor="#08afc0"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#e8eef6"
                strokeDasharray="4 4"
                vertical
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={{
                  fill: "#667085",
                  fontSize: 9,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                width={54}
                domain={[0, "auto"]}
                tick={{
                  fill: "#667085",
                  fontSize: 9,
                }}
                tickFormatter={(value) => {
                  return Number(value).toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    }
                  );
                }}
              />

              <Tooltip
                content={<DbtTrendTooltip />}
                cursor={{
                  stroke: "#98a2b3",
                  strokeWidth: 1,
                }}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  paddingTop: "16px",
                  fontSize: "9px",
                }}
              />

              <Line
                type="monotone"
                dataKey="amountSanctioned"
                name="Amount Sanctioned"
                stroke="#173f7a"
                strokeWidth={2.8}
                dot={{
                  r: 3,
                  fill: "#173f7a",
                  stroke: "#ffffff",
                  strokeWidth: 1.5,
                }}
                activeDot={{
                  r: 5,
                  fill: "#173f7a",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />

              <Area
                type="monotone"
                dataKey="amountDisbursed"
                name="Amount Disbursed"
                stroke="#08afc0"
                strokeWidth={2.5}
                fill="url(#disbursedAreaGradient)"
                dot={{
                  r: 3,
                  fill: "#08afc0",
                  stroke: "#ffffff",
                  strokeWidth: 1.5,
                }}
                activeDot={{
                  r: 5,
                  fill: "#08afc0",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />

              <Line
                type="monotone"
                dataKey="returnedRejected"
                name="Returned / Rejected"
                stroke="#e52d2d"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{
                  r: 2.5,
                  fill: "#e52d2d",
                  stroke: "#ffffff",
                  strokeWidth: 1,
                }}
                activeDot={{
                  r: 4,
                  fill: "#e52d2d",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="chart-empty-state">
          No monthly DBT data is available for
          the selected filters.
        </div>
      )}
    </section>
  );
}

export default DbtDisbursementTrend;