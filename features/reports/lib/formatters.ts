import { appConfig } from "@/config/app.config";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(appConfig.locale, {
    style: "currency",
    currency: appConfig.currency,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(appConfig.locale, {
    maximumFractionDigits: 2,
  }).format(value);
}