"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateDailyMetrics, calculateSummary } from "@/lib/report";
import { ReportRow } from "@/types/report";

type ReportDashboardProps = {
  rows: ReportRow[];
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    maximumFractionDigits: 2,
  }).format(value);
}

export function ReportDashboard({ rows }: ReportDashboardProps) {
  const summary = calculateSummary(rows);
  const dailyMetrics = calculateDailyMetrics(rows);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-900">
          Relatório de performance
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Resumo automático com base no ficheiro carregado.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Receita total"
          value={formatCurrency(summary.totalRevenue)}
        />
        <MetricCard
          label="Custo total"
          value={formatCurrency(summary.totalCost)}
        />
        <MetricCard
          label="Lucro estimado"
          value={formatCurrency(summary.totalProfit)}
        />
        <MetricCard
          label="Conversões"
          value={formatNumber(summary.totalConversions)}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <MetricCard
          label="Custo por conversão"
          value={formatCurrency(summary.averageCostPerConversion)}
        />
        <MetricCard
          label="ROAS"
          value={`${formatNumber(summary.roas)}x`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Receita por dia
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0f172a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Custo vs Conversões
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#64748b" />
                <Bar dataKey="conversions" fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">
          Resumo automático
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          O relatório analisou {rows.length} linhas de dados. A receita total foi de{" "}
          <strong>{formatCurrency(summary.totalRevenue)}</strong>, com um custo
          total de <strong>{formatCurrency(summary.totalCost)}</strong>. O lucro
          estimado foi de <strong>{formatCurrency(summary.totalProfit)}</strong>.
          Foram registadas <strong>{formatNumber(summary.totalConversions)}</strong>{" "}
          conversões, com um custo médio por conversão de{" "}
          <strong>{formatCurrency(summary.averageCostPerConversion)}</strong>.
        </p>
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}