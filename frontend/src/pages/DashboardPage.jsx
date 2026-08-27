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
};

function DashboardPage() {
  const [filters, setFilters] = useState(
    DEFAULT_FILTERS
  );

  const dashboardData = useMemo(() => {
    return calculateDashboardData(
      dashboardRecords,
      filters
    );
  }, [filters]);

  const handleFilterChange = (
    filterName,
    value
  ) => {
    setFilters((currentFilters) => {
      if (filterName === "financialYear") {
        return {
          ...currentFilters,
          financialYear: value,
        };
      }

      if (filterName === "district") {
        return {
          ...currentFilters,
          district: value,
        };
      }

      if (filterName === "scheme") {
        return {
          ...currentFilters,
          scheme: value,
        };
      }

      return currentFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
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
          <h1>Dashboard</h1>

          <p>
            Welcome to the Integrated Beneficiary
            Management System
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
      />

      <section className="active-filter-summary">
        <span>Showing data for:</span>

        <strong>{filters.financialYear}</strong>
        <strong>{filters.district}</strong>
        <strong>{filters.scheme}</strong>

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
          <section className="primary-chart-grid">
            <ApplicationStatusChart
              data={dashboardData.applicationStatus}
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
              data={dashboardData.transactionFlow}
            />

            <GrievanceOverview
              data={dashboardData.grievances}
            />
          </section>
        </>
      ) : (
        <section className="content-card no-data-card">
          <MessageSquareText
            size={28}
            aria-hidden="true"
          />

          <h2>No dashboard data available</h2>

          <p>
            No records match the selected filters. Reset
            the filters and try again.
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