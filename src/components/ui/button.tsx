import { Icons } from "./icons";
export function Button({ label, colorClass, icon, onClick }: { label: string; colorClass: string; icon?: React.ElementType; onClick?: () => void }) {
  return (
    <button className={`flex items-center gap-2 px-4 py-2 rounded ${colorClass} text-white text-sm font-medium hover:opacity-90 transition-opacity`} onClick={onClick}>
      {icon && <Icons LucideIcon={icon} size="16px" color="currentColor" />}
      {label}
    </button>
  )
}