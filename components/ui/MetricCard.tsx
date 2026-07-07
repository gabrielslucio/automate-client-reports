import { cardStyles, textStyles } from "@/styles/variants";

type MetricCardProps = {
  label: string;
  value: string;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className={cardStyles.padded}>
      <p className={textStyles.metricLabel}>{label}</p>
      <p className={textStyles.metricValue}>{value}</p>
    </div>
  );
}