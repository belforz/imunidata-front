import { toast } from 'react-toastify';

export function Notifications(type: "success" | "error" | "info" | "warn", message: string, description?: string) {
  const content = description ? (
    <div>
      <p className="font-semibold text-sm">{message}</p>
      <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    </div>
  ) : (
    <span>{message}</span>
  );

  switch (type) {
    case "success":
      toast.success(content);
      break;
    case "error":
      toast.error(content);
      break;
    case "info":
      toast.info(content);
      break;
    case "warn":
      toast.warn(content);
      break;
  }
}