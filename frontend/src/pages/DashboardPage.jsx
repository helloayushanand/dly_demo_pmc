import { useMemo, useState } from "react";

import {
  BadgeCheck,
  BadgeIndianRupee,
  FileText,
  MessageSquareText,
  Users,
  WalletCards,
} from "lucide-react";

import ApplicationStatusChart from "../components/charts/ApplicationStatusChart";
import PaymentOverviewChart from "../components/charts/PaymentOverviewChart";
import TopSchemesChart from "../components/charts/TopSchemesChart";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import GrievanceOverview from "../components/dashboard/GrievanceOverview";
import KpiCard from "../components/dashboard/KpiCard";
import TransactionFlow from "../components/dashboard/TransactionFlow";

import { dashboardRecords } from "../data/dashboardData";

import { calculateDashboardData } from "../utils/dashboardCalculations";

import {
  formatCurrencyCompact,
  formatIndianNumber,
} from "../utils/formatters";

const DEFAULT_FILTERS = {
  financialYear: "2026-27",
  district: "All Districts",
  scheme: "All Schemes",
  beneficiaryCategory: "All Categories",
  dateRange: "This Financial Year",
};

const CSV_HEADERS = [
  "Financial Year",
  "District",
  "Scheme",
  "Beneficiary Category",
  "Beneficiaries",
  "Applications",
  "Approved Applications",
  "Rejected Applications",
  "Sanctioned Amount",
  "Disbursed Amount",
  "Successful Payments",
  "Failed Payments",
  "Pending Payments",
  "Open Grievances",
];

const escapeCsvValue = (value) => {
  const stringValue = String(value ?? "");

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replaceAll(
      '"',
      '""'
    )}"`;
  }

  return stringValue;
};

const createCsvContent = (records) => {
  const rows = records.map((record) => {
    return [
      record.financialYear,
      record.district,
      record.scheme,
      record.beneficiaryCategory,
      record.beneficiaries,
      record.applications,
      record.applicationStatus.approved,
      record.applicationStatus.rejected,
      record.sanctionedAmount,
      record.disbursedAmount,
      record.paymentStatus.successful,
      record.paymentStatus.failed,
      record.paymentStatus.pending,
      record.grievances.open,
    ];
  });

  return [CSV_HEADERS, ...rows]
    .map((row) => {
      return row
        .map(escapeCsvValue)
        .join(",");
    })
    .join("\n");
};

const downloadTextFile = (
  content,
  fileName,
  contentType
) => {
  const blob = new Blob([content], {
    type: contentType,
  });

  const downloadUrl = URL.createObjectURL(blob);
  const temporaryLink =
    document.createElement("a");

  temporaryLink.href = downloadUrl;
  temporaryLink.download = fileName;

  document.body.appendChild(temporaryLink);
  temporaryLink.click();
  temporaryLink.remove();

  URL.revokeObjectURL(downloadUrl);
};

function DashboardPage() {
  const [filters, setFilters] = useState(
    DEFAULT_FILTERS
  );

  const [isTableMode, setIsTableMode] =
    useState(false);

  const dashboardData = useMemo(() => {
    return calculateDashboardData(
      dashboardRecords,
      filters
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    return Object.keys(DEFAULT_FILTERS).reduce(
      (count, filterName) => {
        return filters[filterName] !==
          DEFAULT_FILTERS[filterName]
          ? count + 1
          : count;
      },
      0
    );
  }, [filters]);

  const handleFilterChange = (
    filterName,
    value
  ) => {
    setFilters((currentFilters) => {
      return {
        ...currentFilters,
        value,
      };
    });
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleToggleTableMode = () => {
    setIsTableMode(
      (currentTableMode) => !currentTableMode
    );
  };

  const handleDownloadCsv = () => {
    const csvContent = createCsvContent(
      dashboardData.filteredRecords
    );

    const safeFinancialYear =
      filters.financialYear.replaceAll(" ", "-");

    downloadTextFile(
      `\uFEFF${csvContent}`,
      `dashboard-report-${safeFinancialYear}.csv`,
      "text/csv;charset=utf-8"
    );
  };

  const handleExportPdf = () => {
    window.print();
  };

  const { kpis } = dashboardData;

  const kpiCards = [
    {
      title: "Total Beneficiaries",
      value: formatIndianNumber(
        kpis.totalBeneficiaries
      ),
      icon: Users,
      iconClassName: "kpi-icon-blue",
      trend: "8.5%",
    },
    {
      title: "Total Applications",
      value: formatIndianNumber(
        kpis.totalApplications
      ),
      icon: FileText,
      iconClassName: "kpi-icon-violet",
      trend: "10.3%",
    },
    {
      title: "Approved Applications",
      value: formatIndianNumber(
        kpis.approvedApplications
      ),
      icon: BadgeCheck,
      iconClassName: "kpi-icon-green",
      trend: "9.6%",
    },
    {
      title: "Amount Sanctioned",
      value: formatCurrencyCompact(
        kpis.totalAmountSanctioned
      ),
      icon: BadgeIndianRupee,
      iconClassName: "kpi-icon-orange",
      trend: "12.7%",
    },
    {
      title: "Amount Disbursed",
      value: formatCurrencyCompact(
        kpis.totalAmountDisbursed
      ),
      icon: WalletCards,
      iconClassName: "kpi-icon-cyan",
      trend: "11.2%",
    },
    {
      title: "Open Grievances",
      value: formatIndianNumber(
        kpis.openGrievances
      ),
      icon: MessageSquareText,
      iconClassName: "kpi-icon-red",
      trend: "4.2%",
    },
  ];

  return (
    <div className="dashboard-page">
      <section className="dashboard-heading-row">
        <div>
          <h1>Integrated MIS Dashboard</h1>

          <p>
            Punjab social welfare scheme monitoring,
            beneficiary services and DBT management
          </p>
        </div>

        <div className="prototype-badge">
          Prototype
        </div>
      </section>

      <DashboardFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        onExportPdf={handleExportPdf}
        onDownloadCsv={handleDownloadCsv}
        onToggleTableMode={
          handleToggleTableMode
        }
        isTableMode={isTableMode}
        activeFilterCount={activeFilterCount}
      />

      <section className="active-filter-summary">
        <span>Showing data for:</span>

        <strong>{filters.financialYear}</strong>
        <strong>{filters.district}</strong>
        <strong>{filters.scheme}</strong>
        <strong>
          {filters.beneficiaryCategory}
        </strong>
        <strong>{filters.dateRange}</strong>

        <span className="record-count">
          {dashboardData.recordCount} aggregated{" "}
          {dashboardData.recordCount === 1
            ? "record"
            : "records"}
        </span>
      </section>

      <section className="kpi-grid">
        {kpiCards.map((card) => (
          <KpiCard
            key={card.title}
            {...card}
          />
        ))}
      </section>

      {dashboardData.hasData ? (
        <>
          {isTableMode ? (
            <section className="content-card accessible-table-card">
              <div className="accessible-table-heading">
                <div>
                  <span className="section-label">
                    Accessible data view
                  </span>

                  <h2>
                    Filtered dashboard records
                  </h2>

                  <p>
                    The table contains the same
                    aggregated records used by the
                    dashboard visualisations.
                  </p>
                </div>

                <span className="table-record-badge">
                  {dashboardData.recordCount}{" "}
                  {dashboardData.recordCount === 1
                    ? "record"
                    : "records"}
                </span>
              </div>

              <div className="accessible-table-wrapper">
                <table className="accessible-dashboard-table">
                  <caption className="visually-hidden">
                    Filtered social welfare
                    dashboard records
                  </caption>

                  <thead>
                    <tr>
                      <th scope="col">
                        Financial Year
                      </th>
                      <th scope="col">
                        District
                      </th>
                      <th scope="col">
                        Scheme
                      </th>
                      <th scope="col">
                        Category
                      </th>
                      <th scope="col">
                        Beneficiaries
                      </th>
                      <th scope="col">
                        Applications
                      </th>
                      <th scope="col">
                        Approved
                      </th>
                      <th scope="col">
                        Sanctioned Amount
                      </th>
                      <th scope="col">
                        Disbursed Amount
                      </th>
                      <th scope="col">
                        Open Grievances
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {dashboardData.filteredRecords.map(
                      (record) => (
                        <tr key={record.id}>
                          <td>
                            {record.financialYear}
                          </td>
                          <td>{record.district}</td>
                          <td>{record.scheme}</td>
                          <td>
                            {
                              record.beneficiaryCategory
                            }
                          </td>
                          <td>
                            {formatIndianNumber(
                              record.beneficiaries
                            )}
                          </td>
                          <td>
                            {formatIndianNumber(
                              record.applications
                            )}
                          </td>
                          <td>
                            {formatIndianNumber(
                              record
                                .applicationStatus
                                .approved
                            )}
                          </td>
                          <td>
                            {formatCurrencyCompact(
                              record.sanctionedAmount
                            )}
                          </td>
                          <td>
                            {formatCurrencyCompact(
                              record.disbursedAmount
                            )}
                          </td>
                          <td>
                            {formatIndianNumber(
                              record.grievances.open
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <>
              <section className="primary-chart-grid">
                <ApplicationStatusChart
                  data={
                    dashboardData.applicationStatus
                  }
                />

                <TopSchemesChart
                  data={dashboardData.topSchemes}
                />

                <PaymentOverviewChart
                  data={dashboardData.paymentStatus}
                  disbursedAmount={formatCurrencyCompact(
                    kpis.totalAmountDisbursed
                  )}
                />
              </section>

              <section className="secondary-dashboard-grid">
                <TransactionFlow
                  data={
                    dashboardData.transactionFlow
                  }
                />

                <GrievanceOverview
                  data={dashboardData.grievances}
                />
              </section>
            </>
          )}
        </>
      ) : (
        <section className="content-card no-data-card">
          <MessageSquareText
            size={28}
            aria-hidden="true"
          />

          <h2>No dashboard data available</h2>

          <p>
            No records match the selected filters.
            Reset the filters and try again.
          </p>

          <button
            type="button"
            onClick={handleResetFilters}
          >
            Reset dashboard filters
          </button>
        </section>
      )}
    </div>
  );
}

export default DashboardPage;