"use client";

import { useState } from "react";
import { CsvUploader } from "@/components/CsvUploader";
import { ReportDashboard } from "@/components/ReportDashboard";
import { ReportRow } from "@/types/report";

export default function HomePage() {
  const [rows, setRows] = useState<ReportRow[]>([]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <div className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
            ClientReports MVP
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Transforma ficheiros CSV em relatórios profissionais.
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Carrega dados de campanhas, vendas ou performance e gera um relatório
            visual em segundos.
          </p>
        </header>

        {rows.length === 0 ? (
          <CsvUploader onDataLoaded={setRows} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setRows([])}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Carregar outro ficheiro
              </button>
            </div>

            <ReportDashboard rows={rows} />
          </div>
        )}
      </div>
    </main>
  );
}