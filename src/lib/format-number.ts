export function formatNumber(
  value: number | string
) {
  const num = Number(value);

  if (isNaN(num)) {
    return String(value);
  }

  if (num >= 1000000) {
    return (
      (num / 1000000).toFixed(2) + "M"
    );
  }

  if (num >= 1000) {
    return (
      (num / 1000).toFixed(2) + "K"
    );
  }

  return num.toFixed(2);
}