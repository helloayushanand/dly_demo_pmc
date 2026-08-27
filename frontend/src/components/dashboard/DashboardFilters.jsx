import {
  CalendarRange,
  Landmark,
  MapPin,
  RotateCcw,
} from "lucide-react";

import {
  districts,
  financialYears,
  schemes,
} from "../../data/dashboardData";

function DashboardFilters({
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <section
      className="dashboard-filters"
      aria-label="Dashboard filters"
    >
      <div className="filter-field">
        <CalendarRange size={17} />

        <label>
          <span>Financial Year</span>

          <select
            value={filters.financialYear}
            onChange={(event) =>
              onFilterChange(
                "financialYear",
                event.target.value
              )
            }
          >
            {financialYears.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-field">
        <MapPin size={17} />

        <label>
          <span>District</span>

          <select
            value={filters.district}
            onChange={(event) =>
              onFilterChange(
                "district",
                event.target.value
              )
            }
          >
            {districts.map((district) => (
              <option value={district} key={district}>
                {district}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-field">
        <Landmark size={17} />

        <label>
          <span>Scheme</span>

          <select
            value={filters.scheme}
            onChange={(event) =>
              onFilterChange(
                "scheme",
                event.target.value
              )
            }
          >
            {schemes.map((scheme) => (
              <option value={scheme} key={scheme}>
                {scheme}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        className="reset-filters-button"
        type="button"
        onClick={onReset}
      >
        <RotateCcw size={16} />
        Reset
      </button>
    </section>
  );
}

export default DashboardFilters