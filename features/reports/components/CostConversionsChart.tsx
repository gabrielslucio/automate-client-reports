"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionCard } from "@/components/ui/SectionCard";
import { chartStyles, textStyles } from "@/styles/variants";
import { DailyMetric } from "../types/report.types";
import { reportCopy } from "../constants/report-copy";

type CostConversionsChartProps = {
  data: DailyMetric[];
};

export function CostConversionsChart({ data }: CostConversionsChartProps) {
  return (
    <SectionCard>
      <h3 className={`mb-4 ${textStyles.h3}`}>
        {reportCopy.charts.costVsConversions}
      </h3>

      <div className={chartStyles.container}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray={chartStyles.gridStrokeDasharray} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill={chartStyles.secondaryFill} />
            <Bar dataKey="conversions" fill={chartStyles.primaryFill} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}