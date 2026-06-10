export function calculateKpiValue(
  data: any[],
  column: string,
  operation: string
) {
  const values = data
    .map((row) => Number(row[column]))
    .filter((value) => !isNaN(value));

  switch (operation) {
    case "sum":
      return values.reduce(
        (sum, value) => sum + value,
        0
      );

    case "avg":
      if (!values.length) return 0;

      return (
        values.reduce(
          (sum, value) => sum + value,
          0
        ) / values.length
      ).toFixed(2);

    case "max":
      return Math.max(...values);

    case "min":
      return Math.min(...values);

    case "count":
      return data.length;

    default:
      return "N/A";
  }
}