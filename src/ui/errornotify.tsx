import { LucideXCircle } from "lucide-react";
import { Icons } from "./icons";


export function ErrorNotify({ message, onClose, className, ToastContainerClassName }: { message: string; onClose: () => void; className?: string; ToastContainerClassName?: string }) {
  return (
    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`} role="alert">
      <strong className="font-bold">Erro!</strong>
      <span className="block sm:inline">{message}</span>
      <span className={`absolute top-0 bottom-0 right-0 px-4 py-3 ${ToastContainerClassName}`} onClick={onClose}>
        <Icons LucideIcon={LucideXCircle} size="16px" color="#B91C1C" />
        Fechar
      </span>
    </div>
  );
}