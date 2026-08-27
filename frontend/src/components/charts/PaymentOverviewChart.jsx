import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import {
  formatIndianNumber,
} from "../../utils/formatters";

const PAYMENT_CONFIGURATION = {
  Successful: {
    color: "#2563eb",
    icon: CheckCircle2,
  },
  Failed: {
    color: "#ef4444",
    icon: XCircle,
  },
  Pending: {
    color: "#f59e0b",
    icon: Clock3,
  },
};

function PaymentOverviewChart({
  data,
  disbursedAmount,
}) {
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
            DBT Monitoring
          </span>

          <h2>Payment Overview</h2>
        </div>
      </div>

      {total > 0 ? (
        <>
          <div className="donut-chart-wrapper payment-donut-wrapper">
            <ResponsiveContainer width="100%" height={205}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={81}
                  paddingAngle={2}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {data.map((item) => (
                    <Cell
                      key={item.name}
                      fill={
                        PAYMENT_CONFIGURATION[item.name]
                          ?.color || "#94a3b8"
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

              <span>Transactions</span>
            </div>
          </div>

          <div className="payment-summary-list">
            {data.map((item) => {
              const configuration =
                PAYMENT_CONFIGURATION[item.name];

              const Icon = configuration.icon;

              const percentage =
                total > 0
                  ? (item.value / total) * 100
                  : 0;

              return (
                <div
                  className="payment-summary-item"
                  key={item.name}
                >
                  <div
                    className="payment-status-icon"
                    style={{
                      color: configuration.color,
                      backgroundColor:
                        `${configuration.color}12`,
                    }}
                  >
                    <Icon size={15} />
                  </div>

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

          <div className="payment-amount-strip">
            <span>Total amount disbursed</span>
            <strong>{disbursedAmount}</strong>
          </div>
        </>
      ) : (
        <div className="chart-empty-state">
          No payment data is available for the selected
          filters.
        </div>
      )}
    </article>
  );
}

export default PaymentOverviewChart