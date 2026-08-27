import {
  LayoutDashboard,
  Users,
  Landmark,
  FileText,
  BadgeCheck,
  WalletCards,
  ChartNoAxesCombined,
  MessageSquareText,
  UserCog,
  Settings,
  ClipboardList,
  Headphones,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Beneficiaries",
    icon: Users,
  },
  {
    label: "Schemes",
    icon: Landmark,
  },
  {
    label: "Applications",
    icon: FileText,
  },
  {
    label: "Approvals & Sanctions",
    icon: BadgeCheck,
  },
  {
    label: "DBT Monitoring",
    icon: WalletCards,
  },
  {
    label: "Reports & Analytics",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Grievances",
    icon: MessageSquareText,
  },
  {
    label: "User Management",
    icon: UserCog,
  },
  {
    label: "System Settings",
    icon: Settings,
  },
  {
    label: "Audit Trail",
    icon: ClipboardList,
  },
];

function Sidebar() {
  const handleNavigation = (label) => {
    if (label !== "Dashboard") {
      window.alert(
        `${label} is not included in the current P0 prototype.`
      );
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-symbol" aria-hidden="true">
          IB
        </div>

        <div className="brand-copy">
          <strong>Beneficiary Portal</strong>
          <span>Government Services</span>
        </div>
      </div>

      <nav
        className="sidebar-navigation"
        aria-label="Main navigation"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className={`navigation-item ${
                item.active ? "navigation-item-active" : ""
              }`}
              key={item.label}
              onClick={() => handleNavigation(item.label)}
              type="button"
            >
              <Icon size={18} strokeWidth={1.9} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="support-card">
        <div className="support-icon">
          <Headphones size={21} />
        </div>

        <div>
          <strong>Need help?</strong>
          <button type="button">Contact Support</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;