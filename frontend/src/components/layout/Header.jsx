import {
  Bell,
  CalendarDays,
  ChevronDown,
  Menu,
  UserRound,
} from "lucide-react";

function Header({ onToggleSidebar }) {
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "long",
  }).format(new Date());

  return (
    <header className="dashboard-header">
      <button
        className="mobile-menu-button"
        type="button"
        aria-label="Toggle navigation"
        onClick={onToggleSidebar}
      >
        <Menu size={22} />
      </button>

      <div className="header-title">
        <strong>
          Department of Social Welfare and Empowerment
        </strong>
        <span>Integrated Beneficiary Management System</span>
      </div>

      <div className="header-actions">
        <div className="current-date">
          <CalendarDays size={17} />
          <span>{formattedDate}</span>
          <ChevronDown size={15} />
        </div>

        <button
          className="notification-button"
          type="button"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span>3</span>
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">
            <UserRound size={20} />
          </div>

          <div className="admin-details">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Header;