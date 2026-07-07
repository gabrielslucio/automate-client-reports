import { ReactNode } from "react";
import { cardStyles } from "@/styles/variants";

type SectionCardProps = {
  children: ReactNode;
};

export function SectionCard({ children }: SectionCardProps) {
  return <section className={cardStyles.padded}>{children}</section>;
}