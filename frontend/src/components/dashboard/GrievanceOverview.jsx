import {
  CheckCircle2,
  Clock3,
  MessageSquareText,
  Timer,
} from "lucide-react";

import {
  formatIndianNumber,
} from "../../utils/formatters";

const GRIEVANCE_ITEMS = [
  {
    key: "total",
    label: "Total Grievances",
    icon: MessageSquareText,
    variant: "blue",
  },
  {
    key: "open",
    label: "Open",
    icon: Clock3,
    variant: "red",
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: Timer,
    variant: "orange",
  },
  {
    key: "resolved",
    label: "Resolved",
    icon: CheckCircle2,
    variant: "green",
  },
];

function GrievanceOverview({ data }) {
  return (
    <article className="content-card grievance-card">
      <div className="card-heading">
        <div>
          <span className="section-label">
            Citizen Support
          </span>
          <h2>Grievances Overview</h2>
        </div>
      </div>

      <div className="grievance-metric-grid">
        {GRIEVANCE_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className={`grievance-metric grievance-${item.variant}`}
              key={item.key}
            >
              <div className="grievance-metric-heading">
                <span>{item.label}</span>
                <Icon size={15} />
              </div>

              <strong>
                {formatIndianNumber(data[item.key])}
              </strong>
            </div>
          );
        })}
      </div>

      <div className="resolution-section">
        <div className="resolution-heading">
          <div>
            <span>Grievance resolution rate</span>

            <strong>
              {data.resolutionRate.toFixed(1)}%
            </strong>
          </div>

          <span className="resolution-target">
            Target: 85%
          </span>
        </div>

        <div className="resolution-track">
          <div
            className="resolution-value"
            style={{
              width: `${Math.min(
                data.resolutionRate,
                100
              )}%`,
            }}
          />
        </div>

        <p>
          Based on grievances resolved under the current
          dashboard filter selection.
        </p>
      </div>
    </article>
  );
}

export default GrievanceOverview;