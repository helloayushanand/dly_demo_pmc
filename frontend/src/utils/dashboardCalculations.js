const sum = (records, selector) => {
  return records.reduce((total, record) => {
    return total + selector(record);
  }, 0);
};

const schemeBeneficiaryCategories = {
  "Delhi Lakshmi Yojana": "Women",
  "Delhi Lakhpati Bitiya Scheme": "Girl Child",
  "Delhi Ladli Scheme": "Girl Child",
  "Pradhan Mantri Matru Vandana Yojana (PMMVY)":
    "Mothers",
  "Delhi Pension Scheme to Women in Distress":
    "Women",
  "Widow's Daughter Marriage Scheme": "Women",
  "Saksham Anganwadi and Poshan 2.0":
    "Children and Adolescents",
};

const enrichDashboardRecord = (record) => {
  return {
    ...record,
    beneficiaryCategory:
      schemeBeneficiaryCategories[record.scheme] ||
      "Other",
  };
};

export const filterDashboardRecords = (
  records,
  filters
) => {
  const {
    financialYear,
    district,
    scheme,
    beneficiaryCategory,
  } = filters;

  return records
    .map(enrichDashboardRecord)
    .filter((record) => {
      const matchesFinancialYear =
        financialYear === "All Financial Years" ||
        record.financialYear === financialYear;

      const matchesDistrict =
        district === "All Districts" ||
        record.district === district;

      const matchesScheme =
        scheme === "All Schemes" ||
        record.scheme === scheme;

      const matchesBeneficiaryCategory =
        beneficiaryCategory ===
          "All Categories" ||
        record.beneficiaryCategory ===
          beneficiaryCategory;

      return (
        matchesFinancialYear &&
        matchesDistrict &&
        matchesScheme &&
        matchesBeneficiaryCategory
      );
    });
};

export const calculateKpis = (records) => {
  const totalBeneficiaries = sum(
    records,
    (record) => record.beneficiaries
  );

  const totalApplications = sum(
    records,
    (record) => record.applications
  );

  const approvedApplications = sum(
    records,
    (record) =>
      record.applicationStatus.approved
  );

  const totalAmountSanctioned = sum(
    records,
    (record) => record.sanctionedAmount
  );

  const totalAmountDisbursed = sum(
    records,
    (record) => record.disbursedAmount
  );

  const openGrievances = sum(
    records,
    (record) => record.grievances.open
  );

  return {
    totalBeneficiaries,
    totalApplications,
    approvedApplications,
    totalAmountSanctioned,
    totalAmountDisbursed,
    openGrievances,
  };
};

export const calculateApplicationStatus = (
  records
) => {
  return [
    {
      name: "Received",
      value: sum(
        records,
        (record) =>
          record.applicationStatus.received
      ),
    },
    {
      name: "Under Verification",
      value: sum(
        records,
        (record) =>
          record.applicationStatus
            .underVerification
      ),
    },
    {
      name: "Approved",
      value: sum(
        records,
        (record) =>
          record.applicationStatus.approved
      ),
    },
    {
      name: "Sanctioned",
      value: sum(
        records,
        (record) =>
          record.applicationStatus.sanctioned
      ),
    },
    {
      name: "Rejected",
      value: sum(
        records,
        (record) =>
          record.applicationStatus.rejected
      ),
    },
    {
      name: "Disbursed",
      value: sum(
        records,
        (record) =>
          record.applicationStatus.disbursed
      ),
    },
  ];
};

export const calculatePaymentStatus = (
  records
) => {
  return [
    {
      name: "Successful",
      value: sum(
        records,
        (record) =>
          record.paymentStatus.successful
      ),
    },
    {
      name: "Failed",
      value: sum(
        records,
        (record) => record.paymentStatus.failed
      ),
    },
    {
      name: "Pending",
      value: sum(
        records,
        (record) =>
          record.paymentStatus.pending
      ),
    },
  ];
};

export const calculateTopSchemes = (
  records
) => {
  const schemeTotals = records.reduce(
    (totals, record) => {
      totals[record.scheme] =
        (totals[record.scheme] || 0) +
        record.beneficiaries;

      return totals;
    },
    {}
  );

  return Object.entries(schemeTotals)
    .map(([name, beneficiaries]) => ({
      name,
      beneficiaries,
    }))
    .sort((first, second) => {
      return (
        second.beneficiaries -
        first.beneficiaries
      );
    })
    .slice(0, 5);
};

export const calculateGrievances = (
  records
) => {
  const total = sum(
    records,
    (record) => record.grievances.total
  );

  const open = sum(
    records,
    (record) => record.grievances.open
  );

  const inProgress = sum(
    records,
    (record) =>
      record.grievances.inProgress
  );

  const resolved = sum(
    records,
    (record) => record.grievances.resolved
  );

  const resolutionRate =
    total > 0 ? (resolved / total) * 100 : 0;

  return {
    total,
    open,
    inProgress,
    resolved,
    resolutionRate,
  };
};

export const calculateTransactionFlow = (
  records
) => {
  const initiated = sum(
    records,
    (record) =>
      record.applicationStatus.disbursed
  );

  const successful = sum(
    records,
    (record) =>
      record.paymentStatus.successful
  );

  const failed = sum(
    records,
    (record) => record.paymentStatus.failed
  );

  const pending = sum(
    records,
    (record) =>
      record.paymentStatus.pending
  );

  const successRate =
    initiated > 0
      ? (successful / initiated) * 100
      : 0;

  return {
    initiated,
    successful,
    failed,
    pending,
    successRate,
  };
};

export const calculateDashboardData = (
  records,
  filters
) => {
  const filteredRecords =
    filterDashboardRecords(records, filters);

  return {
    filteredRecords,
    hasData: filteredRecords.length > 0,
    recordCount: filteredRecords.length,

    kpis: calculateKpis(filteredRecords),

    applicationStatus:
      calculateApplicationStatus(
        filteredRecords
      ),

    paymentStatus:
      calculatePaymentStatus(
        filteredRecords
      ),

    topSchemes:
      calculateTopSchemes(filteredRecords),

    grievances:
      calculateGrievances(filteredRecords),

    transactionFlow:
      calculateTransactionFlow(
        filteredRecords
      ),
  };
};