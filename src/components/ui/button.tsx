import { Icons } from "./icons";
export function Button({ label, colorClass, icon, onClick, style, disabled }: { label: string; colorClass?: string; icon?: React.ElementType; onClick?: () => void; style?: string; disabled?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded ${colorClass} text-white text-sm font-medium hover:opacity-90 transition-opacity ${style} disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icons LucideIcon={icon} size="16px" color="currentColor" />}
      {label}
    </button>
  );
}