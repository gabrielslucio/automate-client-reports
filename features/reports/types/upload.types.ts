export type FileValidationResult =
  | {
      isValid: true;
    }
  | {
      isValid: false;
      error: string;
    };

export type CsvContentValidationResult =
  | {
      isValid: true;
    }
  | {
      isValid: false;
      error: string;
    };