export const financialYears = [
  "All Financial Years",
  "2022-23",
  "2023-24",
  "2024-25",
  "2025-26",
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
  "Maternal Assistance Scheme",
  "Girl Child Education Support",
  "Nutrition Support Programme",
  "Women Livelihood Assistance",
  "Child Care Assistance",
  "Social Security Pension",
  "Scholarship Support Scheme",
];

const districtMultipliers = {
  Central: 0.82,
  East: 1.08,
  "New Delhi": 0.64,
  North: 1.12,
  "North East": 1.18,
  "North West": 1.25,
  Shahdara: 0.88,
  South: 1.16,
  "South East": 1.02,
  "South West": 0.96,
  West: 1.21,
};

const schemeMultipliers = {
  "Maternal Assistance Scheme": 1.18,
  "Girl Child Education Support": 1.12,
  "Nutrition Support Programme": 1.25,
  "Women Livelihood Assistance": 0.92,
  "Child Care Assistance": 1.05,
  "Social Security Pension": 0.84,
  "Scholarship Support Scheme": 0.78,
};

const yearMultipliers = {
  "2022-23": 0.78,
  "2023-24": 0.89,
  "2024-25": 1,
  "2025-26": 1.08,
};

const activeFinancialYears = financialYears.filter(
  (year) => year !== "All Financial Years"
);

const activeDistricts = districts.filter(
  (district) => district !== "All Districts"
);

const activeSchemes = schemes.filter(
  (scheme) => scheme !== "All Schemes"
);

const createDashboardRecords = () => {
  const records = [];
  let recordId = 1;

  activeFinancialYears.forEach((financialYear, yearIndex) => {
    activeDistricts.forEach((district, districtIndex) => {
      activeSchemes.forEach((scheme, schemeIndex) => {
        const baseValue =
          760 +
          districtIndex * 43 +
          schemeIndex * 31 +
          yearIndex * 54;

        const weightedValue = Math.round(
          baseValue *
            districtMultipliers[district] *
            schemeMultipliers[scheme] *
            yearMultipliers[financialYear]
        );

        const beneficiaries = weightedValue;
        const applications = Math.round(beneficiaries * 1.31);
        const received = Math.round(applications * 0.11);
        const underVerification = Math.round(applications * 0.09);
        const approved = Math.round(applications * 0.44);
        const sanctioned = Math.round(applications * 0.16);
        const rejected = Math.round(applications * 0.08);

        const disbursed = Math.max(
          applications -
            received -
            underVerification -
            approved -
            sanctioned -
            rejected,
          0
        );

        const averageSanctionAmount =
          4200 + schemeIndex * 750 + districtIndex * 95;

        const sanctionedAmount =
          (approved + sanctioned + disbursed) * averageSanctionAmount;

        const disbursedAmount = Math.round(
          sanctionedAmount * (0.81 + (districtIndex % 5) * 0.025)
        );

        const successfulPayments = Math.round(disbursed * 0.91);
        const failedPayments = Math.round(disbursed * 0.055);
        const pendingPayments = Math.max(
          disbursed - successfulPayments - failedPayments,
          0
        );

        const totalGrievances = Math.round(applications * 0.035);
        const openGrievances = Math.round(totalGrievances * 0.19);
        const inProgressGrievances = Math.round(totalGrievances * 0.26);
        const resolvedGrievances = Math.max(
          totalGrievances - openGrievances - inProgressGrievances,
          0
        );

        records.push({
          id: recordId,
          financialYear,
          district,
          scheme,
          beneficiaries,
          applications,
          applicationStatus: {
            received,
            underVerification,
            approved,
            sanctioned,
            rejected,
            disbursed,
          },
          sanctionedAmount,
          disbursedAmount,
          paymentStatus: {
            successful: successfulPayments,
            failed: failedPayments,
            pending: pendingPayments,
          },
          grievances: {
            total: totalGrievances,
            open: openGrievances,
            inProgress: inProgressGrievances,
            resolved: resolvedGrievances,
          },
        });

        recordId += 1;
      });
    });
  });

  return records;
};

export const dashboardRecords = createDashboardRecords();