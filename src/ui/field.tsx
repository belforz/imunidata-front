import type { FieldProps } from "../vite.env";

export function Field({ label, placeholder, type = "text", options, className, value = "", onChange, isVisible = true }: FieldProps) {
    const inputClass = `w-full px-3 py-2 border rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200`;

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`${className} ${isVisible ? "block" : "hidden"}`}>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                {label}
            </label>
            {options ? (
                <select className={inputClass} value={value} onChange={(e) => onChange?.(e.target.value)}>
                    <option value=""> Selecione </option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className={inputClass}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    {...(type === "number" ? { min: 0, step: 1, max: 10000 } : {})}
                />
            )}
        </div>
    );
}