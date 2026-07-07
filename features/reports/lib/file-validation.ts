import { reportColumnAliases } from "../constants/report-columns";
import { uploadConfig } from "../constants/upload.constants";
import {
  CsvContentValidationResult,
  FileValidationResult,
} from "../types/upload.types";

function getFileExtension(fileName: string): string {
  return fileName.toLowerCase().slice(fileName.lastIndexOf("."));
}

function hasAtLeastOneAlias(headers: string[], aliases: string[]): boolean {
  const normalizedHeaders = headers.map((header) =>
    header.trim().toLowerCase()
  );

  return aliases.some((alias) =>
    normalizedHeaders.includes(alias.toLowerCase())
  );
}

export function validateUploadedFile(file: File): FileValidationResult {
  const fileExtension = getFileExtension(file.name);

  if (!uploadConfig.acceptedExtensions.includes(fileExtension)) {
    return {
      isValid: false,
      error: "Tipo de ficheiro inválido. Por favor carrega um ficheiro CSV.",
    };
  }

  if (file.type && !uploadConfig.acceptedMimeTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "O formato do ficheiro não parece ser CSV válido.",
    };
  }

  if (file.size === 0) {
    return {
      isValid: false,
      error: "O ficheiro está vazio.",
    };
  }

  const maxFileSizeInBytes = uploadConfig.maxFileSizeInMb * 1024 * 1024;

  if (file.size > maxFileSizeInBytes) {
    return {
      isValid: false,
      error: `O ficheiro é demasiado grande. O limite é ${uploadConfig.maxFileSizeInMb}MB.`,
    };
  }

  return {
    isValid: true,
  };
}

export function validateCsvHeaders(headers: string[]): CsvContentValidationResult {
  const requiredGroups = [
    {
      field: "data",
      aliases: reportColumnAliases.date,
    },
    {
      field: "receita",
      aliases: reportColumnAliases.revenue,
    },
    {
      field: "custo",
      aliases: reportColumnAliases.cost,
    },
    {
      field: "conversões",
      aliases: reportColumnAliases.conversions,
    },
  ];

  const missingFields = requiredGroups
    .filter((group) => !hasAtLeastOneAlias(headers, group.aliases))
    .map((group) => group.field);

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `O CSV não tem as colunas obrigatórias: ${missingFields.join(", ")}.`,
    };
  }

  return {
    isValid: true,
  };
}

export function validateCsvRowsCount(rowCount: number): CsvContentValidationResult {
  if (rowCount === 0) {
    return {
      isValid: false,
      error: "O CSV não contém linhas de dados válidas.",
    };
  }

  return {
    isValid: true,
  };
}