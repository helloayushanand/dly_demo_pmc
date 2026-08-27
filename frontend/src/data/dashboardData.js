export const financialYears = [
  "All Financial Years",
  "2022-23",
  "2023-24",
  "2024-25",
  "2025-26",
  "2026-27",
];

export const districts = [
  "All Districts",
  "Central",
  "East",
  "New Delhi",
  "North",
  "North East",
  "North West",
  "Shahdara",
  "South",
  "South East",
  "South West",
  "West",
];

export const schemes = [
  "All Schemes",
  "Delhi Lakshmi Yojana",
  "Delhi Lakhpati Bitiya Scheme",
  "Delhi Ladli Scheme",
  "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
  "Delhi Pension Scheme to Women in Distress",
  "Widow's Daughter Marriage Scheme",
  "Saksham Anganwadi and Poshan 2.0",
];

/*
 * District shares are synthetic but calibrated to create
 * realistic Delhi-wide distribution patterns.
 *
 * All district shares add up to 1.00.
 */

const districtShares = {
  Central: 0.07,
  East: 0.1,
  "New Delhi": 0.03,
  North: 0.09,
  "North East": 0.13,
  "North West": 0.14,
  Shahdara: 0.08,
  South: 0.08,
  "South East": 0.09,
  "South West": 0.09,
  West: 0.1,
};

/*
 * FY 2026-27 planning-scale scheme profiles.
 *
 * These figures are synthetic prototype estimates calibrated
 * against publicly available programme scope and benefit rates.
 *
 * The values must not be presented as official live statistics.
 */

const schemeProfiles = {
  "Delhi Lakshmi Yojana": {
    launchFinancialYear: "2026-27",
    targetBeneficiaries: 1_700_000,
    targetApplications: 2_050_000,
    annualSanctionedAmount: 51_000_000_000,
    disbursementRatio: 0.42,
    approvalRate: 0.58,
    rejectionRate: 0.1,
    grievanceRate: 0.012,
  },

  "Delhi Lakhpati Bitiya Scheme": {
    launchFinancialYear: "2026-27",
    targetBeneficiaries: 140_000,
    targetApplications: 172_000,
    annualSanctionedAmount: 1_280_000_000,
    disbursementRatio: 0.38,
    approvalRate: 0.61,
    rejectionRate: 0.08,
    grievanceRate: 0.013,
  },

  "Delhi Ladli Scheme": {
    launchFinancialYear: "2022-23",
    targetBeneficiaries: 185_000,
    targetApplications: 230_000,
    annualSanctionedAmount: 3_330_000_000,
    disbursementRatio: 0.76,
    approvalRate: 0.68,
    rejectionRate: 0.07,
    grievanceRate: 0.015,
  },

  "Pradhan Mantri Matru Vandana Yojana (PMMVY)": {
    launchFinancialYear: "2022-23",
    targetBeneficiaries: 95_000,
    targetApplications: 118_000,
    annualSanctionedAmount: 522_500_000,
    disbursementRatio: 0.81,
    approvalRate: 0.72,
    rejectionRate: 0.06,
    grievanceRate: 0.014,
  },

  "Delhi Pension Scheme to Women in Distress": {
    launchFinancialYear: "2022-23",
    targetBeneficiaries: 350_000,
    targetApplications: 382_000,
    annualSanctionedAmount: 10_500_000_000,
    disbursementRatio: 0.89,
    approvalRate: 0.79,
    rejectionRate: 0.05,
    grievanceRate: 0.018,
  },

  "Widow's Daughter Marriage Scheme": {
    launchFinancialYear: "2022-23",
    targetBeneficiaries: 12_000,
    targetApplications: 16_500,
    annualSanctionedAmount: 360_000_000,
    disbursementRatio: 0.84,
    approvalRate: 0.66,
    rejectionRate: 0.09,
    grievanceRate: 0.017,
  },

  "Saksham Anganwadi and Poshan 2.0": {
    launchFinancialYear: "2022-23",
    targetBeneficiaries: 850_000,
    targetApplications: 925_000,
    annualSanctionedAmount: 4_250_000_000,
    disbursementRatio: 0.83,
    approvalRate: 0.82,
    rejectionRate: 0.03,
    grievanceRate: 0.009,
  },
};

/*
 * Historical factors create a plausible year-on-year trend.
 *
 * A scheme is excluded from any financial year before its
 * configured launch financial year.
 */

const financialYearFactors = {
  "2022-23": 0.78,
  "2023-24": 0.84,
  "2024-25": 0.9,
  "2025-26": 0.95,
  "2026-27": 1,
};

const financialYearOrder = {
  "2022-23": 1,
  "2023-24": 2,
  "2024-25": 3,
  "2025-26": 4,
  "2026-27": 5,
};

const activeFinancialYears = financialYears.filter(
  (financialYear) =>
    financialYear !== "All Financial Years"
);

const activeDistricts = districts.filter(
  (district) => district !== "All Districts"
);

const activeSchemes = schemes.filter(
  (scheme) => scheme !== "All Schemes"
);

const isSchemeAvailable = (
  financialYear,
  launchFinancialYear
) => {
  return (
    financialYearOrder[financialYear] >=
    financialYearOrder[launchFinancialYear]
  );
};

/*
 * Distributes an integer total across all districts.
 *
 * The final district receives the remaining balance so the
 * district values always add up exactly to the original total.
 */

const distributeIntegerAcrossDistricts = (
  totalValue
) => {
  let allocatedValue = 0;

  return activeDistricts.reduce(
    (distribution, district, index) => {
      const isLastDistrict =
        index === activeDistricts.length - 1;

      const districtValue = isLastDistrict
        ? totalValue - allocatedValue
        : Math.round(
            totalValue * districtShares[district]
          );

      distribution[district] = Math.max(
        districtValue,
        0
      );

      allocatedValue += districtValue;

      return distribution;
    },
    {}
  );
};

/*
 * Monetary distribution uses the same district weighting.
 *
 * The final district receives any rounding balance so the
 * distributed amounts equal the original programme total.
 */

const distributeMoneyAcrossDistricts = (
  totalValue
) => {
  let allocatedValue = 0;

  return activeDistricts.reduce(
    (distribution, district, index) => {
      const isLastDistrict =
        index === activeDistricts.length - 1;

      const districtValue = isLastDistrict
        ? totalValue - allocatedValue
        : Math.round(
            totalValue * districtShares[district]
          );

      distribution[district] = Math.max(
        districtValue,
        0
      );

      allocatedValue += districtValue;

      return distribution;
    },
    {}
  );
};

const calculateApplicationStatus = (
  applications,
  profile
) => {
  const approved = Math.round(
    applications * profile.approvalRate
  );

  const rejected = Math.round(
    applications * profile.rejectionRate
  );

  const received = Math.round(
    applications * 0.08
  );

  const underVerification = Math.round(
    applications * 0.1
  );

  const sanctioned = Math.round(
    applications * 0.08
  );

  const disbursed = Math.max(
    applications -
      approved -
      rejected -
      received -
      underVerification -
      sanctioned,
    0
  );

  return {
    received,
    underVerification,
    approved,
    sanctioned,
    rejected,
    disbursed,
  };
};

const calculatePaymentStatus = (
  disbursedApplications,
  disbursementRatio
) => {
  const baseSuccessRate =
    0.91 + disbursementRatio * 0.05;

  const successful = Math.min(
    Math.round(
      disbursedApplications * baseSuccessRate
    ),
    disbursedApplications
  );

  const failed = Math.min(
    Math.round(disbursedApplications * 0.025),
    Math.max(
      disbursedApplications - successful,
      0
    )
  );

  const pending = Math.max(
    disbursedApplications -
      successful -
      failed,
    0
  );

  return {
    successful,
    failed,
    pending,
  };
};

const calculateGrievances = (
  applications,
  grievanceRate
) => {
  const total = Math.round(
    applications * grievanceRate
  );

  const open = Math.round(total * 0.17);

  const inProgress = Math.round(
    total * 0.23
  );

  const resolved = Math.max(
    total - open - inProgress,
    0
  );

  return {
    total,
    open,
    inProgress,
    resolved,
  };
};

/*
 * Produces one aggregate record for every valid combination
 * of financial year, scheme, and district.
 */

const createDashboardRecords = () => {
  const records = [];
  let recordId = 1;

  activeFinancialYears.forEach(
    (financialYear) => {
      const financialYearFactor =
        financialYearFactors[financialYear];

      activeSchemes.forEach((scheme) => {
        const profile = schemeProfiles[scheme];

        if (
          !isSchemeAvailable(
            financialYear,
            profile.launchFinancialYear
          )
        ) {
          return;
        }

        const yearlyBeneficiaries = Math.round(
          profile.targetBeneficiaries *
            financialYearFactor
        );

        const yearlyApplications = Math.round(
          profile.targetApplications *
            financialYearFactor
        );

        const yearlySanctionedAmount = Math.round(
          profile.annualSanctionedAmount *
            financialYearFactor
        );

        const yearlyDisbursedAmount = Math.round(
          yearlySanctionedAmount *
            profile.disbursementRatio
        );

        const beneficiaryDistribution =
          distributeIntegerAcrossDistricts(
            yearlyBeneficiaries
          );

        const applicationDistribution =
          distributeIntegerAcrossDistricts(
            yearlyApplications
          );

        const sanctionedAmountDistribution =
          distributeMoneyAcrossDistricts(
            yearlySanctionedAmount
          );

        const disbursedAmountDistribution =
          distributeMoneyAcrossDistricts(
            yearlyDisbursedAmount
          );

        activeDistricts.forEach((district) => {
          const beneficiaries =
            beneficiaryDistribution[district];

          const applications =
            applicationDistribution[district];

          const applicationStatus =
            calculateApplicationStatus(
              applications,
              profile
            );

          const paymentStatus =
            calculatePaymentStatus(
              applicationStatus.disbursed,
              profile.disbursementRatio
            );

          const grievances =
            calculateGrievances(
              applications,
              profile.grievanceRate
            );

          records.push({
            id: recordId,
            financialYear,
            district,
            scheme,
            beneficiaries,
            applications,

            applicationStatus: {
              received:
                applicationStatus.received,
              underVerification:
                applicationStatus.underVerification,
              approved:
                applicationStatus.approved,
              sanctioned:
                applicationStatus.sanctioned,
              rejected:
                applicationStatus.rejected,
              disbursed:
                applicationStatus.disbursed,
            },

            sanctionedAmount:
              sanctionedAmountDistribution[district],

            disbursedAmount:
              disbursedAmountDistribution[district],

            paymentStatus: {
              successful:
                paymentStatus.successful,
              failed:
                paymentStatus.failed,
              pending:
                paymentStatus.pending,
            },

            grievances: {
              total:
                grievances.total,
              open:
                grievances.open,
              inProgress:
                grievances.inProgress,
              resolved:
                grievances.resolved,
            },
          });

          recordId += 1;
        });
      });
    }
  );

  return records;
};

export const dashboardRecords =
  createDashboardRecords();