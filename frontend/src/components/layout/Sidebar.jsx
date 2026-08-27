import {
  BadgeCheck,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  Headphones,
  Landmark,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  UserCog,
  Users,
  WalletCards,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const NAVIGATION_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Beneficiaries",
    path: "/beneficiaries",
    icon: Users,
  },
  {
    label: "Schemes",
    path: "/schemes",
    icon: Landmark,
  },
  {
    label: "Applications",
    path: "/applications",
    icon: FileText,
  },
  {
    label: "Approvals & Sanctions",
    path: "/approvals",
    icon: BadgeCheck,
  },
  {
    label: "DBT Monitoring",
    path: "/dbt-monitoring",
    icon: WalletCards,
  },
  {
    label: "Reports & Analytics",
    path: "/reports",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Grievances",
    path: "/grievances",
    icon: MessageSquareText,
  },
  {
    label: "User Management",
    path: "/users",
    icon: UserCog,
  },
  {
    label: "System Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    label: "Audit Trail",
    path: "/audit-trail",
    icon: ClipboardList,
  },
];

function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div
          className="brand-symbol"
          aria-hidden="true"
        >
          IB
        </div>

        <div className="brand-copy">
          <strong>Beneficiary Portal</strong>
          <span>Government of NCT of Delhi</span>
        </div>
      </div>

      <nav
        className="sidebar-navigation"
        aria-label="Main navigation"
      >
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                return [
                  "navigation-item",
                  isActive
                    ? "navigation-item-active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ");
              }}
              onClick={() => {
                if (typeof onNavigate === "function") {
                  onNavigate();
                }
              }}
            >
              <Icon
                size={18}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-support-section">
        <div className="support-card">
          <div className="support-icon">
            <Headphones
              size={21}
              aria-hidden="true"
            />
          </div>

          <div className="support-copy">
            <strong>Need help?</strong>

            <a
              href="mailto:support@example.gov.in"
              aria-label="Contact support by email"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;