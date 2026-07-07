import { buttonStyles } from "@/styles/variants";
import { reportCopy } from "../constants/report-copy";

type ReportActionsProps = {
  onReset: () => void;
};

export function ReportActions({ onReset }: ReportActionsProps) {
  return (
    <div className="flex justify-end">
      <button onClick={onReset} className={buttonStyles.secondary}>
        {reportCopy.actions.uploadAnotherFile}
      </button>
    </div>
  );
}