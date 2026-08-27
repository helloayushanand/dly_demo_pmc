import {
  ArrowRight,
  Building2,
  Check,
  Landmark,
  Network,
  X,
} from "lucide-react";

import {
  formatIndianNumber,
} from "../../utils/formatters";

function FlowStep({
  icon: Icon,
  title,
  value,
  variant = "blue",
}) {
  return (
    <div className="flow-step">
      <div className={`flow-icon flow-icon-${variant}`}>
        <Icon size={19} />
      </div>

      <strong>{title}</strong>
      <span>{formatIndianNumber(value)}</span>
    </div>
  );
}

function TransactionFlow({ data }) {
  return (
    <article className="content-card transaction-card">
      <div className="card-heading">
        <div>
          <span className="section-label">
            Current Financial View
          </span>
          <h2>DBT Transaction Flow</h2>
        </div>

        <span className="transaction-success-label">
          {data.successRate.toFixed(1)}% success rate
        </span>
      </div>

      <div className="transaction-flow">
        <FlowStep
          icon={Building2}
          title="Department"
          value={data.initiated}
        />

        <ArrowRight className="flow-arrow" size={21} />

        <FlowStep
          icon={Network}
          title="NPCI"
          value={data.initiated}
        />

        <ArrowRight className="flow-arrow" size={21} />

        <FlowStep
          icon={Landmark}
          title="Bank"
          value={data.initiated}
        />

        <ArrowRight className="flow-arrow" size={21} />

        <FlowStep
          icon={Check}
          title="Successful"
          value={data.successful}
          variant="green"
        />

        <div className="flow-divider" />

        <FlowStep
          icon={X}
          title="Failed"
          value={data.failed}
          variant="red"
        />
      </div>

      <div className="transaction-progress-section">
        <div className="transaction-progress-heading">
          <span>Transaction completion rate</span>

          <strong>
            {data.successRate.toFixed(1)}%
          </strong>
        </div>

        <div className="transaction-progress-track">
          <div
            className="transaction-progress-value"
            style={{
              width: `${Math.min(
                data.successRate,
                100
              )}%`,
            }}
          />
        </div>

        <div className="transaction-meta">
          <span>
            Pending: {formatIndianNumber(data.pending)}
          </span>

          <span>
            Failed: {formatIndianNumber(data.failed)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default TransactionFlow;