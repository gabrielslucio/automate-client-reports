"use client";

import Papa from "papaparse";
import { Upload } from "lucide-react";
import { RawCsvRow, ReportRow } from "@/types/report";
import { normalizeCsvRows } from "@/lib/report";

type CsvUploaderProps = {
  onDataLoaded: (rows: ReportRow[]) => void;
};

export function CsvUploader({ onDataLoaded }: CsvUploaderProps) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    Papa.parse<RawCsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const normalizedRows = normalizeCsvRows(result.data);
        onDataLoaded(normalizedRows);
      },
    });
  }

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <Upload className="h-6 w-6 text-slate-600" />
      </div>

      <h2 className="text-xl font-semibold text-slate-900">
        Carrega um ficheiro CSV
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Usa colunas como date, campaign, revenue, cost e conversions.
      </p>

      <label className="mt-6 inline-flex cursor-pointer rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700">
        Escolher ficheiro
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}