import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((currentValue) => !currentValue);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-app">
      <div
        className={`sidebar-wrapper ${
          sidebarOpen ? "sidebar-wrapper-open" : ""
        }`}
      >
        <Sidebar onNavigate={handleCloseSidebar} />
      </div>

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          type="button"
          aria-label="Close navigation"
          onClick={handleCloseSidebar}
        />
      )}

      <div className="dashboard-main">
        <Header onToggleSidebar={handleToggleSidebar} />

        <main className="dashboard-content">
          <Outlet />
        </main>

        <footer className="dashboard-footer">
          © 2026 Integrated Beneficiary Management System.
          Prototype demonstration.
        </footer>
      </div>
    </div>
  );
}

export default AppLayout;