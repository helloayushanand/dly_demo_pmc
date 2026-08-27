import { ArrowUpRight } from "lucide-react";

function KpiCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  trend,
}) {
  return (
    <article className="kpi-card">
      <div className={`kpi-icon ${iconClassName}`}>
        <Icon size={21} strokeWidth={2} />
      </div>

      <div className="kpi-content">
        <span className="kpi-title">{title}</span>
        <strong className="kpi-value">{value}</strong>

        <div className="kpi-trend">
          <ArrowUpRight size={14} />
          <strong>{trend}</strong>
          <span>from last year</span>
        </div>
      </div>
    </article>
  );
}

export default KpiCard;