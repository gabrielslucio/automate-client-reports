"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CsvUploader } from "@/features/reports/components/CsvUploader";
import { ReportActions } from "@/features/reports/components/ReportActions";
import { ReportDashboard } from "@/features/reports/components/ReportDashboard";
import { ReportRow } from "@/features/reports/types/report.types";

export default function HomePage() {
  const [rows, setRows] = useState<ReportRow[]>([]);

  function handleReset() {
    setRows([]);
  }

  return (
    <AppShell>
      <PageHeader />

      {rows.length === 0 ? (
        <CsvUploader onDataLoaded={setRows} />
      ) : (
        <div className="space-y-6">
          <ReportActions onReset={handleReset} />
          <ReportDashboard rows={rows} />
        </div>
      )}
    </AppShell>
  );
}