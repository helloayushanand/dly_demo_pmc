import {
  AlertTriangle,
  BadgeCheck,
  CircleAlert,
  WalletCards,
} from "lucide-react";

import {
  formatCurrencyCompact,
} from "../../utils/formatters";

const getUtilisationStatus = (
  utilisationRate
) => {
  if (utilisationRate >= 75) {
    return {
      label: "Healthy",
      className: "fund-status-healthy",
      progressClassName:
        "fund-progress-healthy",
      icon: BadgeCheck,
    };
  }

  if (utilisationRate >= 50) {
    return {
      label: "Needs Attention",
      className: "fund-status-review",
      progressClassName:
        "fund-progress-review",
      icon: AlertTriangle,
    };
  }

  return {
    label: "Low Utilisation",
    className: "fund-status-critical",
    progressClassName:
      "fund-progress-critical",
    icon: CircleAlert,
  };
};

function FundUtilisation({
  data = [],
}) {
  const hasData = data.length > 0;

  return (
    <article className="content-card fund-utilisation-card">
      <div className="fund-utilisation-heading">
        <div>
          <span className="section-label">
            Financial performance
          </span>

          <h2>Scheme-wise Fund Utilisation</h2>

          <p>
            Comparison of sanctioned and disbursed
            amounts across visible schemes
          </p>
        </div>

        <div className="fund-utilisation-heading-icon">
          <WalletCards
            size={19}
            aria-hidden="true"
          />
        </div>
      </div>

      {hasData ? (
        <div className="fund-utilisation-list">
          {data.map((scheme) => {
            const status =
              getUtilisationStatus(
                scheme.utilisationRate
              );

            const StatusIcon = status.icon;

            const progressWidth = Math.min(
              Math.max(
                scheme.utilisationRate,
                0
              ),
              100
            );

            return (
              <section
                className="fund-utilisation-item"
                key={scheme.scheme}
              >
                <div className="fund-utilisation-item-heading">
                  <div className="fund-scheme-details">
                    <strong>
                      {scheme.scheme}
                    </strong>

                    <span>
                      {formatCurrencyCompact(
                        scheme.disbursedAmount
                      )}{" "}
                      disbursed of{" "}
                      {formatCurrencyCompact(
                        scheme.sanctionedAmount
                      )}
                    </span>
                  </div>

                  <div className="fund-utilisation-result">
                    <strong>
                      {scheme.utilisationRate.toFixed(
                        1
                      )}
                      %
                    </strong>

                    <span
                      className={`fund-status-badge ${status.className}`}
                    >
                      <StatusIcon
                        size={12}
                        aria-hidden="true"
                      />

                      {status.label}
                    </span>
                  </div>
                </div>

                <div
                  className="fund-progress-track"
                  role="progressbar"
                  aria-label={`${scheme.scheme} fund utilisation`}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={Math.round(
                    progressWidth
                  )}
                >
                  <div
                    className={`fund-progress-value ${status.progressClassName}`}
                    style={{
                      width: `${progressWidth}%`,
                    }}
                  />
                </div>

                <div className="fund-utilisation-meta">
                  <span>
                    Sanctioned:{" "}
                    <strong>
                      {formatCurrencyCompact(
                        scheme.sanctionedAmount
                      )}
                    </strong>
                  </span>

                  <span>
                    Disbursed:{" "}
                    <strong>
                      {formatCurrencyCompact(
                        scheme.disbursedAmount
                      )}
                    </strong>
                  </span>

                  <span>
                    Balance:{" "}
                    <strong>
                      {formatCurrencyCompact(
                        scheme.balanceAmount
                      )}
                    </strong>
                  </span>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="chart-empty-state">
          No fund-utilisation information is available
          for the selected filters.
        </div>
      )}

      {hasData && (
        <div className="fund-utilisation-legend">
          <span>
            <i className="fund-legend-green" />
            Healthy: 75% and above
          </span>

          <span>
            <i className="fund-legend-orange" />
            Needs Attention: 50% to 74.9%
          </span>

          <span>
            <i className="fund-legend-red" />
            Low Utilisation: below 50%
          </span>
        </div>
      )}
    </article>
  );
}

export default FundUtilisation;