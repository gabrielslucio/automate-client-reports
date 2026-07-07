export type RawCsvRow = Record<string, string>;

export type ReportRow = {
  date: string;
  campaign?: string;
  revenue: number;
  cost: number;
  conversions: number;
};

export type ReportSummary = {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  totalConversions: number;
  averageCostPerConversion: number;
  roas: number;
};

export type DailyMetric = {
  date: string;
  revenue: number;
  cost: number;
  conversions: number;
};