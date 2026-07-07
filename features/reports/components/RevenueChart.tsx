"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionCard } from "@/components/ui/SectionCard";
import { chartStyles, textStyles } from "@/styles/variants";
import { DailyMetric } from "../types/report.types";
import { formatCurrency } from "../lib/formatters";
import { reportCopy } from "../constants/report-copy";

type RevenueChartProps = {
  data: DailyMetric[];
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <SectionCard>
      <h3 className={`mb-4 ${textStyles.h3}`}>
        {reportCopy.charts.revenueByDay}
      </h3>

      <div className={chartStyles.container}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray={chartStyles.gridStrokeDasharray} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={chartStyles.primaryStroke}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}