import {
  ArrowUpRight,
  Clock3,
  Construction,
  Database,
  Search,
  ShieldCheck,
} from "lucide-react";

function ModulePage({
  eyebrow,
  title,
  description,
  icon: Icon,
  statistics = [],
  capabilities = [],
}) {
  return (
    <div className="module-page">
      <section className="module-page-heading">
        <div>
          <span className="module-eyebrow">
            {eyebrow}
          </span>

          <h1>{title}</h1>

          <p>{description}</p>
        </div>

        <div
          className="module-heading-icon"
          aria-hidden="true"
        >
          <Icon size={28} />
        </div>
      </section>

      <section
        className="module-stat-grid"
        aria-label={`${title} statistics`}
      >
        {statistics.map((statistic) => (
          <article
            className="module-stat-card"
            key={statistic.label}
          >
            <div>
              <span>{statistic.label}</span>
              <strong>{statistic.value}</strong>
            </div>

            <div
              className={`module-stat-indicator module-stat-${statistic.variant}`}
              aria-hidden="true"
            >
              <ArrowUpRight size={17} />
            </div>
          </article>
        ))}
      </section>

      <section className="module-content-grid">
        <article className="content-card module-preview-card">
          <div className="module-card-heading">
            <div>
              <span className="section-label">
                Module Preview
              </span>

              <h2>{title} workspace</h2>
            </div>

            <span className="module-status-badge">
              Prototype
            </span>
          </div>

          <div className="module-search-preview">
            <Search
              size={18}
              aria-hidden="true"
            />

            <span>
              Search and filter capabilities will appear
              in this workspace
            </span>
          </div>

          <div className="module-placeholder-area">
            <div
              className="placeholder-row"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <div
              className="placeholder-row"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <div
              className="placeholder-row"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <div className="module-development-message">
              <Construction
                size={26}
                aria-hidden="true"
              />

              <strong>
                Module interface is ready for data
              </strong>

              <p>
                This route is now functional. Detailed
                records and actions will be connected to
                the shared dummy dataset next.
              </p>
            </div>
          </div>
        </article>

        <article className="content-card module-capability-card">
          <div className="module-card-heading">
            <div>
              <span className="section-label">
                Capabilities
              </span>

              <h2>Included in this module</h2>
            </div>
          </div>

          <div className="module-capability-list">
            {capabilities.map((capability, index) => {
              const capabilityIcons = [
                Database,
                Search,
                ShieldCheck,
                Clock3,
              ];

              const CapabilityIcon =
                capabilityIcons[
                  index % capabilityIcons.length
                ];

              return (
                <div
                  className="module-capability-item"
                  key={capability}
                >
                  <div aria-hidden="true">
                    <CapabilityIcon size={17} />
                  </div>

                  <span>{capability}</span>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
}

export default ModulePage;