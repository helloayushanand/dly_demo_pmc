import {
  Headphones,
  Mail,
} from "lucide-react";

function Sidebar() {
  return (
    <aside
      className="floating-support"
      aria-label="Support"
    >
      <a
        className="floating-support-button"
        href="mailto:support@example.gov.in"
        aria-label="Contact support by email"
      >
        <span className="floating-support-icon">
          <Headphones
            size={22}
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>

        <span className="floating-support-copy">
          <strong>Need help?</strong>

          <span>
            <Mail
              size={13}
              aria-hidden="true"
            />

            Contact Support
          </span>
        </span>
      </a>
    </aside>
  );
}

export default Sidebar;