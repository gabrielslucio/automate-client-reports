import { SectionCard } from "@/components/ui/SectionCard";
import { textStyles } from "@/styles/variants";
import { ReportSummary } from "../types/report.types";
import { formatCurrency, formatNumber } from "../lib/formatters";

type ReportSummaryTextProps = {
  rowsCount: number;
  summary: ReportSummary;
};

export function ReportSummaryText({ rowsCount, summary }: ReportSummaryTextProps) {
  return (
    <SectionCard>
      <h3 className={textStyles.h3}>Resumo automático</h3>

      <p className={`mt-3 leading-7 ${textStyles.body}`}>
        O relatório analisou {rowsCount} linhas de dados. A receita total foi de{" "}
        <strong>{formatCurrency(summary.totalRevenue)}</strong>, com um custo
        total de <strong>{formatCurrency(summary.totalCost)}</strong>. O lucro
        estimado foi de <strong>{formatCurrency(summary.totalProfit)}</strong>.
        Foram registadas{" "}
        <strong>{formatNumber(summary.totalConversions)}</strong> conversões,
        com um custo médio por conversão de{" "}
        <strong>{formatCurrency(summary.averageCostPerConversion)}</strong>.
      </p>
    </SectionCard>
  );
}