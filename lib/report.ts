import { DailyMetric, RawCsvRow, ReportRow, ReportSummary } from "@/types/report";

function parseNumber(value: string | undefined): number {
  if (!value) return 0;

  const normalized = value
    .replace("€", "")
    .replace(",", ".")
    .trim();

  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? 0 : parsed;
}

export function normalizeCsvRows(rows: RawCsvRow[]): ReportRow[] {
  return rows
    .map((row) => {
      const date =
        row.date ||
        row.Date ||
        row.data ||
        row.Data ||
        "";

      const campaign =
        row.campaign ||
        row.Campaign ||
        row.campanha ||
        row.Campanha ||
        "Sem campanha";

      const revenue = parseNumber(
        row.revenue ||
          row.Revenue ||
          row.receita ||
          row.Receita ||
          row.sales ||
          row.Sales
      );

      const cost = parseNumber(
        row.cost ||
          row.Cost ||
          row.custo ||
          row.Custo ||
          row.spend ||
          row.Spend
      );

      const conversions = parseNumber(
        row.conversions ||
          row.Conversions ||
          row.conversoes ||
          row.Conversoes ||
          row.leads ||
          row.Leads
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

export function calculateSummary(rows: ReportRow[]): ReportSummary {
  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalCost = rows.reduce((sum, row) => sum + row.cost, 0);
  const totalConversions = rows.reduce((sum, row) => sum + row.conversions, 0);

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
    const current = grouped.get(row.date) || {
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