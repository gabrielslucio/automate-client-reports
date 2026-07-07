import { ReactNode } from "react";
import { layoutStyles } from "@/styles/variants";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <main className={layoutStyles.page}>
      <div className={layoutStyles.container}>{children}</div>
    </main>
  );
}