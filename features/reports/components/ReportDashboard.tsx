"use client";

import { MetricCard } from "@/components/ui/MetricCard";
import { layoutStyles, textStyles } from "@/styles/variants";
import { calculateDailyMetrics, calculateSummary } from "../lib/calculations";
import { formatCurrency, formatNumber } from "../lib/formatters";
import { ReportRow } from "../types/report.types";
import { reportCopy } from "../constants/report-copy";
import { RevenueChart } from "./RevenueChart";
import { CostConversionsChart } from "./CostConversionsChart";
import { ReportSummaryText } from "./ReportSummaryText";

type ReportDashboardProps = {
  rows: ReportRow[];
};

export function ReportDashboard({ rows }: ReportDashboardProps) {
  const summary = calculateSummary(rows);
  const dailyMetrics = calculateDailyMetrics(rows);

  return (
    <div className={layoutStyles.sectionSpacing}>
      <section>
        <h2 className={textStyles.h2}>{reportCopy.dashboard.title}</h2>
        <p className={`mt-1 ${textStyles.muted}`}>
          {reportCopy.dashboard.description}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label={reportCopy.metrics.totalRevenue}
          value={formatCurrency(summary.totalRevenue)}
        />
        <MetricCard
          label={reportCopy.metrics.totalCost}
          value={formatCurrency(summary.totalCost)}
        />
        <MetricCard
          label={reportCopy.metrics.totalProfit}
          value={formatCurrency(summary.totalProfit)}
        />
        <MetricCard
          label={reportCopy.metrics.totalConversions}
          value={formatNumber(summary.totalConversions)}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <MetricCard
          label={reportCopy.metrics.averageCostPerConversion}
          value={formatCurrency(summary.averageCostPerConversion)}
        />
        <MetricCard
          label={reportCopy.metrics.roas}
          value={`${formatNumber(summary.roas)}x`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={dailyMetrics} />
        <CostConversionsChart data={dailyMetrics} />
      </section>

      <ReportSummaryText rowsCount={rows.length} summary={summary} />
    </div>
  );
}