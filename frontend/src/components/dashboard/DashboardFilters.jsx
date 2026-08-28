import {
  CalendarDays,
  CalendarRange,
  Check,
  Download,
  FileDown,
  Landmark,
  MapPin,
  RotateCcw,
  TableProperties,
  UsersRound,
} from "lucide-react";

import {
  districts,
  financialYears,
  schemes,
} from "../../data/dashboardData";

export const beneficiaryCategories = [
  "All Categories",
  "Women",
  "Girl Child",
  "Mothers",
  "Children and Adolescents",
];

export const dateRanges = [
  "This Financial Year",
  "Last 30 Days",
  "Last 90 Days",
  "Last 6 Months",
  "Year to Date",
];

function DashboardFilters({
  filters,
  onFilterChange,
  onReset,
  onExportPdf,
  onDownloadCsv,
  onToggleTableMode,
  isTableMode,
  activeFilterCount,
}) {
  const handleChange = (event) => {
    onFilterChange(
      event.target.name,
      event.target.value
    );
  };

  return (
    <section
      className="dashboard-filter-panel"
      aria-label="Dashboard controls"
    >
      <div className="dashboard-filter-grid">
        <div className="filter-field">
          <Landmark
            size={17}
            aria-hidden="true"
          />

          <label htmlFor="scheme-filter">
            <span>Scheme Name</span>

            <select
              id="scheme-filter"
              name="scheme"
              value={filters.scheme}
              onChange={handleChange}
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

        <div className="filter-field">
          <MapPin
            size={17}
            aria-hidden="true"
          />

          <label htmlFor="district-filter">
            <span>District / Division</span>

            <select
              id="district-filter"
              name="district"
              value={filters.district}
              onChange={handleChange}
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
              onChange={handleChange}
            >
              {financialYears.map(
                (financialYear) => (
                  <option
                    value={financialYear}
                    key={financialYear}
                  >
                    {financialYear}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        <div className="filter-field">
          <UsersRound
            size={17}
            aria-hidden="true"
          />

          <label htmlFor="beneficiary-category-filter">
            <span>Beneficiary Category</span>

            <select
              id="beneficiary-category-filter"
              name="beneficiaryCategory"
              value={filters.beneficiaryCategory}
              onChange={handleChange}
            >
              {beneficiaryCategories.map(
                (category) => (
                  <option
                    value={category}
                    key={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        <div className="filter-field">
          <CalendarDays
            size={17}
            aria-hidden="true"
          />

          <label htmlFor="date-range-filter">
            <span>Date Range</span>

            <select
              id="date-range-filter"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleChange}
            >
              {dateRanges.map((dateRange) => (
                <option
                  value={dateRange}
                  key={dateRange}
                >
                  {dateRange}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="dashboard-filter-actions">
        <div
          className="filters-active-indicator"
          aria-live="polite"
        >
          <Check
            size={17}
            aria-hidden="true"
          />

          <span>
            {activeFilterCount > 0
              ? `${activeFilterCount} ${
                  activeFilterCount === 1
                    ? "Filter"
                    : "Filters"
                } Active`
              : "Default View"}
          </span>
        </div>

        <button
          className="dashboard-action-button dashboard-action-primary"
          type="button"
          onClick={onExportPdf}
        >
          <FileDown
            size={17}
            aria-hidden="true"
          />

          <span>Export PDF</span>
        </button>

        <button
          className="dashboard-action-button dashboard-action-secondary"
          type="button"
          onClick={onDownloadCsv}
        >
          <Download
            size={17}
            aria-hidden="true"
          />

          <span>Download CSV</span>
        </button>

        <button
          className={`dashboard-action-button dashboard-action-secondary ${
            isTableMode
              ? "dashboard-action-button-active"
              : ""
          }`}
          type="button"
          onClick={onToggleTableMode}
          aria-pressed={isTableMode}
        >
          <TableProperties
            size={17}
            aria-hidden="true"
          />

          <span>
            {isTableMode
              ? "Visual Dashboard"
              : "Tabular Mode"}
          </span>
        </button>

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
      </div>
    </section>
  );
}

export default DashboardFilters;