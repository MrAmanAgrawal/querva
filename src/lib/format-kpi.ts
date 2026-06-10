export function formatKpiValue(
  value: number,
  title: string,
  fullData: any[]
) {
  const currency =
    fullData?.[0]?.currency || "";

  const lowerTitle =
    title.toLowerCase();

  // Counts should not have decimals
  if (
    lowerTitle.includes("count") ||
    lowerTitle.includes("number")
  ) {
    return Math.round(value).toString();
  }

  let formattedValue = "";

  // Large number formatting
  if (value >= 1000000) {
    formattedValue =
      `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    formattedValue =
      `${(value / 1000).toFixed(2)}K`;
  } else {
    formattedValue =
      value.toFixed(2);
  }

  // Add currency for financial KPIs
  if (
    currency &&
    (
      lowerTitle.includes("revenue") ||
      lowerTitle.includes("budget") ||
      lowerTitle.includes("sales") ||
      lowerTitle.includes("profit")
    )
  ) {
    return `${formattedValue} ${currency}`;
  }

  return formattedValue;
}