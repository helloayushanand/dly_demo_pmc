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
  const handleFinancialYearChange = (event) => {
    onFilterChange(
      "financialYear",
      event.target.value
    );
  };

  const handleDistrictChange = (event) => {
    onFilterChange(
      "district",
      event.target.value
    );
  };

  const handleSchemeChange = (event) => {
    onFilterChange(
      "scheme",
      event.target.value
    );
  };

  return (
    <section
      className="dashboard-filters"
      aria-label="Dashboard filters"
    >
      <div className="filter-field">
        <CalendarRange
          size={17}
          aria-hidden="true"
        />

        <label htmlFor="financial-year-filter">
          <span>Financial Year</span>

          <select
            id="financial-year-filter"
            name="financialYear"
            value={filters.financialYear}
            onChange={handleFinancialYearChange}
          >
            {financialYears.map((financialYear) => (
              <option
                value={financialYear}
                key={financialYear}
              >
                {financialYear}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-field">
        <MapPin
          size={17}
          aria-hidden="true"
        />

        <label htmlFor="district-filter">
          <span>District</span>

          <select
            id="district-filter"
            name="district"
            value={filters.district}
            onChange={handleDistrictChange}
          >
            {districts.map((district) => (
              <option
                value={district}
                key={district}
              >
                {district}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-field">
        <Landmark
          size={17}
          aria-hidden="true"
        />

        <label htmlFor="scheme-filter">
          <span>Scheme</span>

          <select
            id="scheme-filter"
            name="scheme"
            value={filters.scheme}
            onChange={handleSchemeChange}
          >
            {schemes.map((scheme) => (
              <option
                value={scheme}
                key={scheme}
              >
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
        aria-label="Reset dashboard filters"
      >
        <RotateCcw
          size={16}
          aria-hidden="true"
        />

        <span>Reset</span>
      </button>
    </section>
  );
}

export default DashboardFilters;