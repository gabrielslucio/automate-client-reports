import {
  DailyMetric,
  ReportRow,
  ReportSummary,
} from "../types/report.types";

export function calculateSummary(rows: ReportRow[]): ReportSummary {
  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalCost = rows.reduce((sum, row) => sum + row.cost, 0);
  const totalConversions = rows.reduce(
    (sum, row) => sum + row.conversions,
    0
  );

  const totalProfit = totalRevenue - totalCost;

  const averageCostPerConversion =
    totalConversions > 0 ? totalCost / totalConversions : 0;

  const roas = totalCost > 0 ? totalRevenue / totalCost : 0;

  return {
    totalRevenue,
    totalCost,
    totalProfit,
    totalConversions,
    averageCostPerConversion,
    roas,
  };
}

export function calculateDailyMetrics(rows: ReportRow[]): DailyMetric[] {
  const grouped = new Map<string, DailyMetric>();

  for (const row of rows) {
    const current = grouped.get(row.date) ?? {
      date: row.date,
      revenue: 0,
      cost: 0,
      conversions: 0,
    };

    current.revenue += row.revenue;
    current.cost += row.cost;
    current.conversions += row.conversions;

    grouped.set(row.date, current);
  }

  return Array.from(grouped.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}