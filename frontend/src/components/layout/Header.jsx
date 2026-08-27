import { useState } from "react";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  UserRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const [profileMenuOpen, setProfileMenuOpen] =
    useState(false);

  const formattedDate = new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "long",
    }
  ).format(new Date());

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  const handleToggleProfileMenu = () => {
    setProfileMenuOpen(
      (currentValue) => !currentValue
    );
  };

  return (
    <header className="dashboard-header">
      <button
        className="mobile-menu-button"
        type="button"
        aria-label="Open navigation menu"
        onClick={onToggleSidebar}
      >
        <Menu size={22} />
      </button>

      <div className="header-title">
        <strong>
          Department of Women and Child Development
        </strong>

        <span>
          Integrated Beneficiary Management System
        </span>
      </div>

      <div className="header-actions">
        <div className="current-date">
          <CalendarDays
            size={17}
            aria-hidden="true"
          />

          <span>{formattedDate}</span>
        </div>

        <button
          className="notification-button"
          type="button"
          aria-label="View notifications"
        >
          <Bell
            size={20}
            aria-hidden="true"
          />

          <span>3</span>
        </button>

        <div className="admin-profile-wrapper">
          <button
            className="admin-profile"
            type="button"
            aria-label="Open administrator menu"
            aria-expanded={profileMenuOpen}
            onClick={handleToggleProfileMenu}
          >
            <div className="admin-avatar">
              <UserRound
                size={20}
                aria-hidden="true"
              />
            </div>

            <div className="admin-details">
              <strong>
                {admin?.displayName || "Admin User"}
              </strong>

              <span>
                {admin?.role || "Administrator"}
              </span>
            </div>

            <ChevronDown
              size={16}
              aria-hidden="true"
              className={
                profileMenuOpen
                  ? "profile-chevron-open"
                  : ""
              }
            />
          </button>

          {profileMenuOpen && (
            <div className="admin-profile-menu">
              <div className="profile-menu-identity">
                <strong>
                  {admin?.displayName || "Admin User"}
                </strong>

                <span>
                  Signed in as{" "}
                  {admin?.username || "admin"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
              >
                <LogOut
                  size={16}
                  aria-hidden="true"
                />

                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;