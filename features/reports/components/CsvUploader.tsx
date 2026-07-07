"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Upload } from "lucide-react";
import { buttonStyles, cardStyles, textStyles } from "@/styles/variants";
import { normalizeCsvRows } from "../lib/normalization";
import { RawCsvRow, ReportRow } from "../types/report.types";
import { reportCopy } from "../constants/report-copy";
import {
  validateCsvHeaders,
  validateCsvRowsCount,
  validateUploadedFile,
} from "../lib/file-validation";

type CsvUploaderProps = {
  onDataLoaded: (rows: ReportRow[]) => void;
};

export function CsvUploader({ onDataLoaded }: CsvUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setError(null);

    if (!file) return;

    const fileValidation = validateUploadedFile(file);

    if (!fileValidation.isValid) {
      setError(fileValidation.error);
      event.target.value = "";
      return;
    }

    Papa.parse<RawCsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const headers = result.meta.fields ?? [];

        const headersValidation = validateCsvHeaders(headers);

        if (!headersValidation.isValid) {
          setError(headersValidation.error);
          event.target.value = "";
          return;
        }

        const normalizedRows = normalizeCsvRows(result.data);

        const rowsValidation = validateCsvRowsCount(normalizedRows.length);

        if (!rowsValidation.isValid) {
          setError(rowsValidation.error);
          event.target.value = "";
          return;
        }

        onDataLoaded(normalizedRows);
      },
      error: () => {
        setError("Não foi possível ler o ficheiro CSV.");
        event.target.value = "";
      },
    });
  }

  return (
    <div className={cardStyles.dashed}>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <Upload className="h-6 w-6 text-slate-600" />
      </div>

      <h2 className={`text-xl ${textStyles.h3}`}>
        {reportCopy.uploader.title}
      </h2>

      <p className={`mt-2 ${textStyles.muted}`}>
        {reportCopy.uploader.description}
      </p>

      <label className={`${buttonStyles.primary} mt-6 cursor-pointer`}>
        {reportCopy.uploader.button}

        <input
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {error ? (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}
``