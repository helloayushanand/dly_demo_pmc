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

const financialYearMonths = [
  {
    month: "Apr",
    fullMonth: "April",
    weight: 0.17,
  },
  {
    month: "May",
    fullMonth: "May",
    weight: 0.18,
  },
  {
    month: "Jun",
    fullMonth: "June",
    weight: 0.19,
  },
  {
    month: "Jul",
    fullMonth: "July",
    weight: 0.21,
  },
  {
    month: "Aug",
    fullMonth: "August",
    weight: 0.25,
  },
];

const enrichDashboardRecord = (record) => {
  return {
    ...record,
    beneficiaryCategory:
      schemeBeneficiaryCategories[record.scheme] ||
      "Other",
  };
};

const getVisibleMonthCount = (dateRange) => {
  if (dateRange === "Last 30 Days") {
    return 1;
  }

  if (dateRange === "Last 90 Days") {
    return 3;
  }

  return 5;
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
        !beneficiaryCategory ||
        beneficiaryCategory === "All Categories" ||
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
    (record) => {
      return record.applicationStatus.approved;
    }
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
      value: sum(records, (record) => {
        return record.applicationStatus.received;
      }),
    },
    {
      name: "Under Verification",
      value: sum(records, (record) => {
        return record.applicationStatus
          .underVerification;
      }),
    },
    {
      name: "Approved",
      value: sum(records, (record) => {
        return record.applicationStatus.approved;
      }),
    },
    {
      name: "Sanctioned",
      value: sum(records, (record) => {
        return record.applicationStatus.sanctioned;
      }),
    },
    {
      name: "Rejected",
      value: sum(records, (record) => {
        return record.applicationStatus.rejected;
      }),
    },
    {
      name: "Disbursed",
      value: sum(records, (record) => {
        return record.applicationStatus.disbursed;
      }),
    },
  ];
};

export const calculatePaymentStatus = (
  records
) => {
  return [
    {
      name: "Successful",
      value: sum(records, (record) => {
        return record.paymentStatus.successful;
      }),
    },
    {
      name: "Failed",
      value: sum(records, (record) => {
        return record.paymentStatus.failed;
      }),
    },
    {
      name: "Pending",
      value: sum(records, (record) => {
        return record.paymentStatus.pending;
      }),
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
    .map(([name, beneficiaries]) => {
      return {
        name,
        beneficiaries,
      };
    })
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
    (record) => record.grievances.inProgress
  );

  const resolved = sum(
    records,
    (record) => record.grievances.resolved
  );

  const resolutionRate =
    total > 0
      ? (resolved / total) * 100
      : 0;

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
    (record) => {
      return record.applicationStatus.disbursed;
    }
  );

  const successful = sum(
    records,
    (record) => {
      return record.paymentStatus.successful;
    }
  );

  const failed = sum(
    records,
    (record) => {
      return record.paymentStatus.failed;
    }
  );

  const pending = sum(
    records,
    (record) => {
      return record.paymentStatus.pending;
    }
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

export const calculateDbtTrend = (
  records,
  dateRange
) => {
  const totalSanctionedAmount = sum(
    records,
    (record) => record.sanctionedAmount
  );

  const totalDisbursedAmount = sum(
    records,
    (record) => record.disbursedAmount
  );

  const successfulPayments = sum(
    records,
    (record) => {
      return record.paymentStatus.successful;
    }
  );

  const failedPayments = sum(
    records,
    (record) => {
      return record.paymentStatus.failed;
    }
  );

  const pendingPayments = sum(
    records,
    (record) => {
      return record.paymentStatus.pending;
    }
  );

  const totalPaymentAttempts =
    successfulPayments +
    failedPayments +
    pendingPayments;

  const failureRate =
    totalPaymentAttempts > 0
      ? failedPayments / totalPaymentAttempts
      : 0;

  /*
   * The source records contain annual aggregate
   * amounts. For the prototype, 42 percent of the
   * annual sanctioned amount is treated as released
   * from April through August.
   */
  const sanctionedTillAugust =
    totalSanctionedAmount * 0.42;

  /*
   * Disbursed funds cannot exceed the amount
   * sanctioned through August.
   */
  const disbursedTillAugust = Math.min(
    totalDisbursedAmount,
    sanctionedTillAugust * 0.94
  );

  /*
   * Returned or rejected funds are calculated using
   * the failed-payment ratio.
   */
  const returnedTillAugust = Math.min(
    disbursedTillAugust * failureRate,
    disbursedTillAugust
  );

  const completeTrend =
    financialYearMonths.map(
      (monthConfiguration) => {
        const monthlySanctioned =
          sanctionedTillAugust *
          monthConfiguration.weight;

        const monthlyDisbursed =
          disbursedTillAugust *
          monthConfiguration.weight;

        const monthlyReturned =
          returnedTillAugust *
          monthConfiguration.weight;

        return {
          month: monthConfiguration.month,

          fullMonth:
            monthConfiguration.fullMonth,

          amountSanctioned: Number(
            (
              monthlySanctioned /
              10_000_000
            ).toFixed(1)
          ),

          amountDisbursed: Number(
            (
              monthlyDisbursed /
              10_000_000
            ).toFixed(1)
          ),

          returnedRejected: Number(
            (
              monthlyReturned /
              10_000_000
            ).toFixed(1)
          ),
        };
      }
    );

  const visibleMonthCount =
    getVisibleMonthCount(dateRange);

  return completeTrend.slice(
    Math.max(
      completeTrend.length -
        visibleMonthCount,
      0
    )
  );
};

export const calculateSchemeHealth = (
  records
) => {
  const schemeTotals = records.reduce(
    (totals, record) => {
      const schemeName = record.scheme;

      if (!totals[schemeName]) {
        totals[schemeName] = {
          sanctionedAmount: 0,
          disbursedAmount: 0,
          successfulPayments: 0,
          failedPayments: 0,
          pendingPayments: 0,
          applications: 0,
          approvedApplications: 0,
        };
      }

      const schemeTotal =
        totals[schemeName];

      schemeTotal.sanctionedAmount +=
        record.sanctionedAmount;

      schemeTotal.disbursedAmount +=
        record.disbursedAmount;

      schemeTotal.successfulPayments +=
        record.paymentStatus.successful;

      schemeTotal.failedPayments +=
        record.paymentStatus.failed;

      schemeTotal.pendingPayments +=
        record.paymentStatus.pending;

      schemeTotal.applications +=
        record.applications;

      schemeTotal.approvedApplications +=
        record.applicationStatus.approved;

      return totals;
    },
    {}
  );

  const schemeStatuses = Object.entries(
    schemeTotals
  ).map(([scheme, totals]) => {
    const utilisationRate =
      totals.sanctionedAmount > 0
        ? totals.disbursedAmount /
          totals.sanctionedAmount
        : 0;

    const totalPaymentAttempts =
      totals.successfulPayments +
      totals.failedPayments +
      totals.pendingPayments;

    const paymentSuccessRate =
      totalPaymentAttempts > 0
        ? totals.successfulPayments /
          totalPaymentAttempts
        : 0;

    const approvalRate =
      totals.applications > 0
        ? totals.approvedApplications /
          totals.applications
        : 0;

    const healthScore =
      utilisationRate * 0.5 +
      paymentSuccessRate * 0.3 +
      approvalRate * 0.2;

    return {
      scheme,

      status: "Needs Review",

      utilisationRate: Number(
        (utilisationRate * 100).toFixed(1)
      ),

      paymentSuccessRate: Number(
        (paymentSuccessRate * 100).toFixed(1)
      ),

      approvalRate: Number(
        (approvalRate * 100).toFixed(1)
      ),

      healthScore: Number(
        (healthScore * 100).toFixed(1)
      ),

      sanctionedAmount:
        totals.sanctionedAmount,

      disbursedAmount:
        totals.disbursedAmount,
    };
  });

  const rankedSchemes = [
    ...schemeStatuses,
  ].sort((firstScheme, secondScheme) => {
    return (
      secondScheme.healthScore -
      firstScheme.healthScore
    );
  });

  const totalSchemes = rankedSchemes.length;

  rankedSchemes.forEach(
    (schemeStatus, index) => {
      /*
       * If one scheme is selected, classify the
       * scheme directly using its health score.
       */
      if (totalSchemes === 1) {
        if (schemeStatus.healthScore >= 75) {
          schemeStatus.status = "Completed";
        } else if (
          schemeStatus.healthScore >= 60
        ) {
          schemeStatus.status = "On Track";
        } else if (
          schemeStatus.healthScore >= 45
        ) {
          schemeStatus.status =
            "Needs Review";
        } else {
          schemeStatus.status = "Critical";
        }

        return;
      }

      /*
       * For two or three visible schemes, use
       * compact relative performance bands.
       */
      if (totalSchemes <= 3) {
        if (index === 0) {
          schemeStatus.status = "On Track";
        } else if (
          index === totalSchemes - 1
        ) {
          schemeStatus.status = "Critical";
        } else {
          schemeStatus.status =
            "Needs Review";
        }

        return;
      }

      /*
       * For four or more schemes:
       *
       * Highest-ranked scheme: Completed
       * Middle-high schemes: On Track
       * Middle-low schemes: Needs Review
       * Lowest-ranked scheme: Critical
       */
      const completedCount = 1;
      const criticalCount = 1;

      const reviewCount = Math.max(
        1,
        Math.round(totalSchemes * 0.29)
      );

      const onTrackEnd =
        totalSchemes -
        reviewCount -
        criticalCount;

      if (index < completedCount) {
        schemeStatus.status = "Completed";
      } else if (index < onTrackEnd) {
        schemeStatus.status = "On Track";
      } else if (
        index < totalSchemes - criticalCount
      ) {
        schemeStatus.status =
          "Needs Review";
      } else {
        schemeStatus.status = "Critical";
      }
    }
  );

  const statusByScheme = rankedSchemes.reduce(
    (statuses, schemeStatus) => {
      statuses[schemeStatus.scheme] =
        schemeStatus.status;

      return statuses;
    },
    {}
  );

  const finalSchemeStatuses =
    schemeStatuses.map((schemeStatus) => {
      return {
        ...schemeStatus,

        status:
          statusByScheme[schemeStatus.scheme],
      };
    });

  const statusCounts = {
    "On Track": 0,
    "Needs Review": 0,
    Critical: 0,
    Completed: 0,
  };

  finalSchemeStatuses.forEach(
    (schemeStatus) => {
      statusCounts[schemeStatus.status] += 1;
    }
  );

  const statusData = [
    {
      name: "On Track",
      value: statusCounts["On Track"],
    },
    {
      name: "Needs Review",
      value: statusCounts["Needs Review"],
    },
    {
      name: "Critical",
      value: statusCounts.Critical,
    },
    {
      name: "Completed",
      value: statusCounts.Completed,
    },
  ];

  return {
    totalSchemes:
      finalSchemeStatuses.length,

    statusData,

    schemes: finalSchemeStatuses,
  };
};

export const calculateFundUtilisation = (
  records
) => {
  const schemeTotals = records.reduce(
    (totals, record) => {
      const schemeName = record.scheme;

      if (!totals[schemeName]) {
        totals[schemeName] = {
          sanctionedAmount: 0,
          disbursedAmount: 0,
        };
      }

      totals[schemeName].sanctionedAmount +=
        record.sanctionedAmount;

      totals[schemeName].disbursedAmount +=
        record.disbursedAmount;

      return totals;
    },
    {}
  );

  return Object.entries(schemeTotals)
    .map(([scheme, totals]) => {
      const safeDisbursedAmount = Math.min(
        totals.disbursedAmount,
        totals.sanctionedAmount
      );

      const utilisationRate =
        totals.sanctionedAmount > 0
          ? (
              safeDisbursedAmount /
              totals.sanctionedAmount
            ) * 100
          : 0;

      const balanceAmount = Math.max(
        totals.sanctionedAmount -
          safeDisbursedAmount,
        0
      );

      return {
        scheme,

        sanctionedAmount:
          totals.sanctionedAmount,

        disbursedAmount:
          safeDisbursedAmount,

        balanceAmount,

        utilisationRate: Number(
          utilisationRate.toFixed(1)
        ),
      };
    })
    .sort((firstScheme, secondScheme) => {
      return (
        secondScheme.utilisationRate -
        firstScheme.utilisationRate
      );
    });
};

export const calculateDashboardAlerts = (
  records
) => {
  const schemeTotals = records.reduce(
    (totals, record) => {
      const schemeName = record.scheme;

      if (!totals[schemeName]) {
        totals[schemeName] = {
          sanctionedAmount: 0,
          disbursedAmount: 0,
          applications: 0,
          approvedApplications: 0,
          successfulPayments: 0,
          failedPayments: 0,
          pendingPayments: 0,
          totalGrievances: 0,
          openGrievances: 0,
        };
      }

      const schemeTotal =
        totals[schemeName];

      schemeTotal.sanctionedAmount +=
        record.sanctionedAmount;

      schemeTotal.disbursedAmount +=
        record.disbursedAmount;

      schemeTotal.applications +=
        record.applications;

      schemeTotal.approvedApplications +=
        record.applicationStatus.approved;

      schemeTotal.successfulPayments +=
        record.paymentStatus.successful;

      schemeTotal.failedPayments +=
        record.paymentStatus.failed;

      schemeTotal.pendingPayments +=
        record.paymentStatus.pending;

      schemeTotal.totalGrievances +=
        record.grievances.total;

      schemeTotal.openGrievances +=
        record.grievances.open;

      return totals;
    },
    {}
  );

  const alerts = [];
  let alertId = 1;

  const addAlert = ({
    severity,
    title,
    scheme,
    description,
    metric,
    timestamp,
  }) => {
    alerts.push({
      id: `alert-${alertId}`,
      severity,
      title,
      scheme,
      description,
      metric,
      timestamp,
    });

    alertId += 1;
  };

  Object.entries(schemeTotals).forEach(
    ([scheme, totals], schemeIndex) => {
      const utilisationRate =
        totals.sanctionedAmount > 0
          ? (
              totals.disbursedAmount /
              totals.sanctionedAmount
            ) * 100
          : 0;

      const totalPaymentAttempts =
        totals.successfulPayments +
        totals.failedPayments +
        totals.pendingPayments;

      const paymentFailureRate =
        totalPaymentAttempts > 0
          ? (
              totals.failedPayments /
              totalPaymentAttempts
            ) * 100
          : 0;

      const pendingPaymentRate =
        totalPaymentAttempts > 0
          ? (
              totals.pendingPayments /
              totalPaymentAttempts
            ) * 100
          : 0;

      const approvalRate =
        totals.applications > 0
          ? (
              totals.approvedApplications /
              totals.applications
            ) * 100
          : 0;

      const openGrievanceRate =
        totals.totalGrievances > 0
          ? (
              totals.openGrievances /
              totals.totalGrievances
            ) * 100
          : 0;

      const timestampOptions = [
        "12 minutes ago",
        "28 minutes ago",
        "1 hour ago",
        "2 hours ago",
        "Today, 10:15 AM",
        "Today, 9:40 AM",
        "Yesterday",
      ];

      const timestamp =
        timestampOptions[
          schemeIndex %
            timestampOptions.length
        ];

      if (utilisationRate < 45) {
        addAlert({
          severity: "high",
          title: "Low fund utilisation",
          scheme,
          description:
            "Fund utilisation is below the expected implementation threshold. Programme and finance teams should review pending releases.",
          metric: `${utilisationRate.toFixed(
            1
          )}% utilised`,
          timestamp,
        });
      } else if (utilisationRate < 70) {
        addAlert({
          severity: "medium",
          title: "Fund utilisation needs review",
          scheme,
          description:
            "Fund utilisation is progressing below the preferred level for the current reporting period.",
          metric: `${utilisationRate.toFixed(
            1
          )}% utilised`,
          timestamp,
        });
      }

      if (paymentFailureRate >= 3) {
        addAlert({
          severity: "high",
          title: "Elevated DBT failure rate",
          scheme,
          description:
            "Failed payment transactions have crossed the monitoring threshold. Bank account and payment-validation issues should be reviewed.",
          metric: `${paymentFailureRate.toFixed(
            1
          )}% failed`,
          timestamp,
        });
      } else if (paymentFailureRate >= 2) {
        addAlert({
          severity: "medium",
          title: "DBT failures require attention",
          scheme,
          description:
            "Payment failures are approaching the operational threshold and may require beneficiary account validation.",
          metric: `${paymentFailureRate.toFixed(
            1
          )}% failed`,
          timestamp,
        });
      }

      if (pendingPaymentRate >= 5) {
        addAlert({
          severity: "medium",
          title: "Pending payments accumulating",
          scheme,
          description:
            "A notable proportion of initiated DBT transactions remains pending and should be reconciled.",
          metric: `${pendingPaymentRate.toFixed(
            1
          )}% pending`,
          timestamp,
        });
      }

      if (approvalRate < 60) {
        addAlert({
          severity: "medium",
          title: "Application approval rate is low",
          scheme,
          description:
            "The application approval rate is below the expected programme threshold. Verification and rejection reasons should be reviewed.",
          metric: `${approvalRate.toFixed(
            1
          )}% approved`,
          timestamp,
        });
      }

      if (openGrievanceRate >= 20) {
        addAlert({
          severity: "medium",
          title: "Open grievances require action",
          scheme,
          description:
            "The proportion of unresolved grievances is above the preferred service-delivery threshold.",
          metric: `${openGrievanceRate.toFixed(
            1
          )}% open`,
          timestamp,
        });
      }

      if (
        utilisationRate >= 75 &&
        paymentFailureRate < 3 &&
        approvalRate >= 65
      ) {
        addAlert({
          severity: "info",
          title: "Scheme performance is stable",
          scheme,
          description:
            "Fund utilisation and DBT transaction performance are within the expected operating range.",
          metric: `${utilisationRate.toFixed(
            1
          )}% utilised`,
          timestamp,
        });
      }
    }
  );

  const severityOrder = {
    high: 1,
    medium: 2,
    info: 3,
  };

  const sortedAlerts = alerts.sort(
    (firstAlert, secondAlert) => {
      return (
        severityOrder[firstAlert.severity] -
        severityOrder[secondAlert.severity]
      );
    }
  );

  const criticalAlertCount =
    sortedAlerts.filter((alert) => {
      return alert.severity === "high";
    }).length;

  const warningAlertCount =
    sortedAlerts.filter((alert) => {
      return alert.severity === "medium";
    }).length;

  const informationAlertCount =
    sortedAlerts.filter((alert) => {
      return alert.severity === "info";
    }).length;

  return {
    alerts: sortedAlerts,
    totalAlertCount: sortedAlerts.length,
    criticalAlertCount,
    warningAlertCount,
    informationAlertCount,
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

    dbtTrend: calculateDbtTrend(
      filteredRecords,
      filters.dateRange
    ),
    
    fundUtilisation:
      calculateFundUtilisation(
        filteredRecords
      ),
    schemeHealth: calculateSchemeHealth(
        filteredRecords
      ),
    fundUtilisation:
        calculateFundUtilisation(
          filteredRecords
        ),

    alerts: calculateDashboardAlerts(
        filteredRecords
      ),
    
  };
};