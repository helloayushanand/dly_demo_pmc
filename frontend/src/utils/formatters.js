export const formatIndianNumber = (value = 0) => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
};

export const formatIndianCurrency = (value = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
};

export const formatCurrencyCompact = (value = 0) => {
  const numericValue = Number(value) || 0;

  if (numericValue >= 10_000_000) {
    return `₹ ${(numericValue / 10_000_000).toFixed(2)} Cr`;
  }

  if (numericValue >= 100_000) {
    return `₹ ${(numericValue / 100_000).toFixed(2)} L`;
  }

  if (numericValue >= 1_000) {
    return `₹ ${(numericValue / 1_000).toFixed(1)} K`;
  }

  return `₹ ${formatIndianNumber(numericValue)}`;
};

export const formatPercentage = (value = 0, digits = 1) => {
  const numericValue = Number(value) || 0;
  return `${numericValue.toFixed(digits)}%`;
};