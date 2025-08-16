// src/utils/format.ts
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) return '0.00%';
  return `${value.toFixed(2)}%`;
}
