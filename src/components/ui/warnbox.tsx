import { LucideTriangleAlert } from "lucide-react";
import { Icons } from "./icons";

export function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 bg-red-50 border border-red-200 rounded-lg p-3 mb-5">
      <Icons size="16px" color="#e6dc72" LucideIcon={LucideTriangleAlert} />
      <p className="text-[12.5px] text-red-700 leading-relaxed">{children}</p>
    </div>
  );
}
