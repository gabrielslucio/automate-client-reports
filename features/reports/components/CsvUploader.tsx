"use client";

import { useRef, useState } from "react";
import Papa from "papaparse";
import { Upload } from "lucide-react";
import { buttonStyles, cardStyles, feedbackStyles, textStyles } from "@/styles/variants";
import { cn } from "@/lib/utils";
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
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function resetInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function processFile(file: File) {
    setError(null);

    const fileValidation = validateUploadedFile(file);

    if (!fileValidation.isValid) {
      setError(fileValidation.error);
      resetInput();
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
          resetInput();
          return;
        }

        const normalizedRows = normalizeCsvRows(result.data);

        const rowsValidation = validateCsvRowsCount(normalizedRows.length);

        if (!rowsValidation.isValid) {
          setError(rowsValidation.error);
          resetInput();
          return;
        }

        onDataLoaded(normalizedRows);
      },
      error: () => {
        setError("Não foi possível ler o ficheiro CSV.");
        resetInput();
      },
    });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    processFile(file);
  }

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }

    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    processFile(file);
  }

  return (
    <div
      className={cn(cardStyles.dashed, isDragging && cardStyles.dashedActive)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Área para carregar ficheiro CSV"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <Upload className="h-6 w-6 text-slate-600" />
      </div>

      <h2 className={`text-xl ${textStyles.h3}`}>
        {isDragging ? reportCopy.uploader.dragging : reportCopy.uploader.title}
      </h2>

      <p className={`mt-2 ${textStyles.muted}`}>
        {reportCopy.uploader.description}
      </p>

      <label className={`${buttonStyles.primary} mt-6 cursor-pointer`}>
        {reportCopy.uploader.button}

        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      <p className={feedbackStyles.hint}>{reportCopy.uploader.hint}</p>

      {error ? <p className={feedbackStyles.error}>{error}</p> : null}
    </div>
  );
}