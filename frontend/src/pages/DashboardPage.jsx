import { useMemo, useState } from "react";
import {
  BadgeIndianRupee,
  BadgeCheck,
  FileText,
  MessageSquareText,
  Users,
  WalletCards,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DashboardFilters from
  "../components/dashboard/DashboardFilters";
import KpiCard from
  "../components/dashboard/KpiCard";

import {
  dashboardRecords,
} from "../data/dashboardData";

import {
  calculateDashboardData,
} from "../utils/dashboardCalculations";

import {
  formatCurrencyCompact,
  formatIndianNumber,
} from "../utils/formatters";

const defaultFilters = {
  financialYear: "2024-25",
  district: "All Districts",
  scheme: "All Schemes",
};

function DashboardPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dashboardData = useMemo(() => {
    return calculateDashboardData(
      dashboardRecords,
      filters
    );
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
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
    <div className="dashboard-app">
      <div
        className={`sidebar-wrapper ${
          sidebarOpen ? "sidebar-wrapper-open" : ""
        }`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="dashboard-main">
        <Header
          onToggleSidebar={() =>
            setSidebarOpen((current) => !current)
          }
        />

        <main className="dashboard-content">
          <section className="dashboard-heading-row">
            <div>
              <h1>Dashboard</h1>
              <p>
                Welcome to the Integrated Beneficiary
                Management System
              </p>
            </div>

            <div className="prototype-badge">
              P0 Prototype
            </div>
          </section>

          <DashboardFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          <section className="kpi-grid">
            {kpiCards.map((card) => (
              <KpiCard
                key={card.title}
                {...card}
              />
            ))}
          </section>

          <section className="dashboard-placeholder-grid">
            <article className="content-card placeholder-card">
              <div>
                <span className="section-label">
                  Applications Status
                </span>
                <h2>Application distribution</h2>
              </div>

              <p>
                The application status doughnut chart will
                appear here in the next step.
              </p>
            </article>

            <article className="content-card placeholder-card">
              <div>
                <span className="section-label">
                  Top Schemes
                </span>
                <h2>Beneficiaries by scheme</h2>
              </div>

              <p>
                The top schemes bar chart will appear here
                in the next step.
              </p>
            </article>

            <article className="content-card placeholder-card">
              <div>
                <span className="section-label">
                  Payment Overview
                </span>
                <h2>DBT payment status</h2>
              </div>

              <p>
                The payment overview chart will appear here
                in the next step.
              </p>
            </article>
          </section>
        </main>

        <footer className="dashboard-footer">
          © 2026 Integrated Beneficiary Management System.
          Prototype demonstration.
        </footer>
      </div>
    </div>
  );
}

export default DashboardPage;