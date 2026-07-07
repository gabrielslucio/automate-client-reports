export const layoutStyles = {
  page: "min-h-screen bg-slate-50 px-6 py-10",
  container: "mx-auto max-w-6xl",
  sectionSpacing: "space-y-8",
};

export const cardStyles = {
  base: "rounded-2xl bg-white shadow-sm ring-1 ring-slate-200",
  padded: "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200",
  dashed:
    "rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm transition-colors",
  dashedActive:
    "border-slate-900 bg-slate-50 ring-2 ring-slate-900/10",
};


export const textStyles = {
  eyebrow:
    "inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white",
  h1: "max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl",
  h2: "text-2xl font-bold text-slate-900",
  h3: "text-lg font-semibold text-slate-900",
  body: "text-slate-600",
  muted: "text-sm text-slate-500",
  metricLabel: "text-sm font-medium text-slate-500",
  metricValue: "mt-2 text-2xl font-bold text-slate-900",
};

export const buttonStyles = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700",
  secondary:
    "inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100",
};

export const chartStyles = {
  container: "h-80",
  gridStrokeDasharray: "3 3",
  primaryStroke: "#0f172a",
  secondaryFill: "#64748b",
  primaryFill: "#0f172a",
};


export const feedbackStyles = {
  error:
    "mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200",
  hint: "mt-3 text-xs text-slate-400",
};
