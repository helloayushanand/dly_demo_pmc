import {
  AlertTriangle,
  BellRing,
  CircleAlert,
  Info,
} from "lucide-react";

const alertConfiguration = {
  high: {
    label: "High",
    icon: CircleAlert,
    className: "monitoring-alert-high",
  },
  medium: {
    label: "Medium",
    icon: AlertTriangle,
    className: "monitoring-alert-medium",
  },
  info: {
    label: "Info",
    icon: Info,
    className: "monitoring-alert-info",
  },
};

function AlertsPanel({
  alerts = [],
  criticalAlertCount = 0,
}) {
  const hasAlerts = alerts.length > 0;

  const handleViewAllAlerts = () => {
    const alertsSection = document.getElementById(
      "dashboard-alert-list"
    );

    alertsSection?.scrollTo({
      top: alertsSection.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <article className="content-card alerts-panel-card">
      <div className="alerts-panel-heading">
        <div>
          <span className="section-label">
            Monitoring and action
          </span>

          <h2>Alerts and Actions</h2>

          <p>
            Operational issues identified from the
            currently selected dashboard data
          </p>
        </div>

        <div className="alerts-heading-summary">
          <BellRing
            size={18}
            aria-hidden="true"
          />

          <span>
            <strong>{criticalAlertCount}</strong>
            Critical
          </span>
        </div>
      </div>

      {hasAlerts ? (
        <>
          <div
            id="dashboard-alert-list"
            className="monitoring-alert-list"
            aria-label="Dashboard monitoring alerts"
            tabIndex="0"
          >
            {alerts.map((alert) => {
              const configuration =
                alertConfiguration[alert.severity] ||
                alertConfiguration.info;

              const AlertIcon =
                configuration.icon;

              return (
                <section
                  className={`monitoring-alert-item ${configuration.className}`}
                  key={alert.id}
                >
                  <div className="monitoring-alert-icon">
                    <AlertIcon
                      size={17}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="monitoring-alert-content">
                    <div className="monitoring-alert-title-row">
                      <strong>{alert.title}</strong>

                      <span className="monitoring-alert-severity">
                        {configuration.label}
                      </span>
                    </div>

                    <span className="monitoring-alert-scheme">
                      {alert.scheme}
                    </span>

                    <p>{alert.description}</p>

                    <div className="monitoring-alert-footer">
                      <span>{alert.timestamp}</span>

                      <span>{alert.metric}</span>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <button
            className="view-all-alerts-button"
            type="button"
            onClick={handleViewAllAlerts}
          >
            View All Alerts
          </button>
        </>
      ) : (
        <div className="alerts-empty-state">
          <Info
            size={22}
            aria-hidden="true"
          />

          <strong>No active alerts</strong>

          <p>
            No operational issues were identified for
            the selected dashboard filters.
          </p>
        </div>
      )}
    </article>
  );
}

export default AlertsPanel;