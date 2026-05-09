import { InfoIcon } from "lucide-react";
import { Icons } from "./icons";

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5">
      <Icons size="16px" color="#1E40AF" LucideIcon={InfoIcon} />
      <p className="text-[12.5px] text-blue-700 leading-relaxed">
        {children}
      </p>
    </div>
  );
}
