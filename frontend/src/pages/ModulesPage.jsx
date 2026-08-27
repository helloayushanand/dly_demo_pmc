import {
  BadgeCheck,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  Landmark,
  MessageSquareText,
  Settings,
  UserCog,
  Users,
  WalletCards,
} from "lucide-react";

import ModulePage from "../components/common/ModulePage";

const MODULE_CONFIGURATION = {
  beneficiaries: {
    eyebrow: "Beneficiary Management",
    title: "Beneficiaries",
    description:
      "Search, review, and monitor registered beneficiaries across districts and schemes.",
    icon: Users,
    statistics: [
      {
        label: "Total Beneficiaries",
        value: "6,78,420",
        variant: "blue",
      },
      {
        label: "Active Beneficiaries",
        value: "6,32,184",
        variant: "green",
      },
      {
        label: "New This Month",
        value: "12,840",
        variant: "violet",
      },
      {
        label: "Pending Verification",
        value: "8,315",
        variant: "orange",
      },
    ],
    capabilities: [
      "Search beneficiaries using a reference number",
      "Filter records by district, scheme, and status",
      "Review beneficiary registration details",
      "Monitor verification and activation status",
    ],
  },

  schemes: {
    eyebrow: "Scheme Administration",
    title: "Schemes",
    description:
      "Monitor scheme enrolment, utilization, financial allocation, and current operational status.",
    icon: Landmark,
    statistics: [
      {
        label: "Total Schemes",
        value: "24",
        variant: "blue",
      },
      {
        label: "Active Schemes",
        value: "19",
        variant: "green",
      },
      {
        label: "Total Allocation",
        value: "₹ 842 Cr",
        variant: "violet",
      },
      {
        label: "Utilization",
        value: "81.4%",
        variant: "orange",
      },
    ],
    capabilities: [
      "Review scheme eligibility and benefit details",
      "Monitor district-wise scheme enrolment",
      "Compare sanctioned and utilized budgets",
      "Track active and inactive scheme status",
    ],
  },

  applications: {
    eyebrow: "Application Processing",
    title: "Applications",
    description:
      "Track applications from submission through verification, approval, sanction, and disbursement.",
    icon: FileText,
    statistics: [
      {
        label: "Total Applications",
        value: "8,88,730",
        variant: "blue",
      },
      {
        label: "Under Verification",
        value: "79,965",
        variant: "orange",
      },
      {
        label: "Approved",
        value: "3,91,041",
        variant: "green",
      },
      {
        label: "Rejected",
        value: "71,098",
        variant: "red",
      },
    ],
    capabilities: [
      "Search using an application reference number",
      "Filter applications by status and submission date",
      "Review verification and approval history",
      "Track applications through every processing stage",
    ],
  },

  approvals: {
    eyebrow: "Administrative Workflow",
    title: "Approvals & Sanctions",
    description:
      "Review pending decisions and monitor approval and financial sanction workflows.",
    icon: BadgeCheck,
    statistics: [
      {
        label: "Pending Approval",
        value: "18,462",
        variant: "orange",
      },
      {
        label: "Approved Today",
        value: "1,284",
        variant: "green",
      },
      {
        label: "Pending Sanction",
        value: "9,731",
        variant: "violet",
      },
      {
        label: "Amount Sanctioned",
        value: "₹ 486 Cr",
        variant: "blue",
      },
    ],
    capabilities: [
      "Review the pending approval queue",
      "Record prototype approval and rejection actions",
      "Monitor financial sanction processing",
      "View decision history and administrative remarks",
    ],
  },

  dbt: {
    eyebrow: "Direct Benefit Transfer",
    title: "DBT Monitoring",
    description:
      "Monitor payment initiation, bank processing, successful transfers, pending payments, and failures.",
    icon: WalletCards,
    statistics: [
      {
        label: "Transactions",
        value: "1,45,428",
        variant: "blue",
      },
      {
        label: "Successful",
        value: "1,32,339",
        variant: "green",
      },
      {
        label: "Pending",
        value: "5,090",
        variant: "orange",
      },
      {
        label: "Failed",
        value: "7,999",
        variant: "red",
      },
    ],
    capabilities: [
      "Search using payment and application references",
      "Filter transactions by bank and payment status",
      "Review pending and failed payment records",
      "Track department, NPCI, and bank processing stages",
    ],
  },

  reports: {
    eyebrow: "Decision Support",
    title: "Reports & Analytics",
    description:
      "Generate administrative reports and compare scheme, district, payment, and application performance.",
    icon: ChartNoAxesCombined,
    statistics: [
      {
        label: "Available Reports",
        value: "18",
        variant: "blue",
      },
      {
        label: "Generated Today",
        value: "42",
        variant: "green",
      },
      {
        label: "Scheduled Reports",
        value: "6",
        variant: "violet",
      },
      {
        label: "Data Coverage",
        value: "100%",
        variant: "orange",
      },
    ],
    capabilities: [
      "Generate district and scheme performance reports",
      "Apply financial-year and date-range filters",
      "Export prototype reports as CSV files",
      "Review performance and utilization trends",
    ],
  },

  grievances: {
    eyebrow: "Citizen Support",
    title: "Grievances",
    description:
      "Track complaints, service requests, resolution progress, and response timelines.",
    icon: MessageSquareText,
    statistics: [
      {
        label: "Total Grievances",
        value: "31,106",
        variant: "blue",
      },
      {
        label: "Open",
        value: "5,908",
        variant: "red",
      },
      {
        label: "In Progress",
        value: "8,087",
        variant: "orange",
      },
      {
        label: "Resolved",
        value: "17,111",
        variant: "green",
      },
    ],
    capabilities: [
      "Search grievances using reference numbers",
      "Filter complaints by category and resolution status",
      "Review response history and assigned authority",
      "Monitor grievance resolution turnaround time",
    ],
  },

  users: {
    eyebrow: "Access Administration",
    title: "User Management",
    description:
      "Manage administrative accounts, roles, organizational assignments, and access status.",
    icon: UserCog,
    statistics: [
      {
        label: "Total Users",
        value: "84",
        variant: "blue",
      },
      {
        label: "Active Users",
        value: "76",
        variant: "green",
      },
      {
        label: "Administrators",
        value: "8",
        variant: "violet",
      },
      {
        label: "Inactive Users",
        value: "8",
        variant: "orange",
      },
    ],
    capabilities: [
      "Search administrative user accounts",
      "Review role and district assignments",
      "Enable or disable prototype users",
      "Monitor account status and last login",
    ],
  },

  settings: {
    eyebrow: "Portal Administration",
    title: "System Settings",
    description:
      "Configure portal preferences, notification behavior, session policies, and AI assistant settings.",
    icon: Settings,
    statistics: [
      {
        label: "Portal Status",
        value: "Operational",
        variant: "green",
      },
      {
        label: "Session Timeout",
        value: "120 min",
        variant: "blue",
      },
      {
        label: "Notifications",
        value: "Enabled",
        variant: "violet",
      },
      {
        label: "Last Updated",
        value: "Today",
        variant: "orange",
      },
    ],
    capabilities: [
      "Configure general portal preferences",
      "Manage session and notification settings",
      "Review data refresh configuration",
      "Prepare configuration for the AI data assistant",
    ],
  },

  audit: {
    eyebrow: "Governance & Compliance",
    title: "Audit Trail",
    description:
      "Review administrative logins, data access, filter activity, and prototype actions.",
    icon: ClipboardList,
    statistics: [
      {
        label: "Events Today",
        value: "1,248",
        variant: "blue",
      },
      {
        label: "Login Events",
        value: "112",
        variant: "green",
      },
      {
        label: "Data Views",
        value: "864",
        variant: "violet",
      },
      {
        label: "Flagged Events",
        value: "3",
        variant: "red",
      },
    ],
    capabilities: [
      "Search events by administrator and action",
      "Filter activity by date and event type",
      "Review login and logout history",
      "Monitor administrative data access activity",
    ],
  },
};

function ModulesPage({ module }) {
  const configuration = MODULE_CONFIGURATION[module];

  if (!configuration) {
    return (
      <section className="content-card no-data-card">
        <h2>Module not found</h2>

        <p>
          The requested administration module is not
          configured.
        </p>
      </section>
    );
  }

  return <ModulePage {...configuration} />;
}

export default ModulesPage;