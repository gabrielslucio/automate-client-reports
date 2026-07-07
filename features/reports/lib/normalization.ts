import { reportColumnAliases } from "../constants/report-columns";
import { RawCsvRow, ReportRow } from "../types/report.types";

function getValueFromAliases(row: RawCsvRow, aliases: string[]): string | undefined {
  return aliases.find((alias) => row[alias]) 
    ? row[aliases.find((alias) => row[alias]) as string]
    : undefined;
}

function parseNumber(value: string | undefined): number {
  if (!value) return 0;

  const normalized = value
    .replace("€", "")
    .replace(/\s/g, "")
    .replace(",", ".")
    .trim();

  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? 0 : parsed;
}

export function normalizeCsvRows(rows: RawCsvRow[]): ReportRow[] {
  return rows
    .map((row) => {
      const date = getValueFromAliases(row, reportColumnAliases.date) ?? "";

      const campaign =
        getValueFromAliases(row, reportColumnAliases.campaign) ?? "Sem campanha";

      const revenue = parseNumber(
        getValueFromAliases(row, reportColumnAliases.revenue)
      );

      const cost = parseNumber(
        getValueFromAliases(row, reportColumnAliases.cost)
      );

      const conversions = parseNumber(
        getValueFromAliases(row, reportColumnAliases.conversions)
      );

      return {
        date,
        campaign,
        revenue,
        cost,
        conversions,
      };
    })
    .filter((row) => row.date);
}