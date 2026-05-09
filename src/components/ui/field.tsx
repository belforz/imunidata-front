import type { FieldProps } from "../../vite.env";

export function Field({ label, placeholder, type = "text", options, className }: FieldProps) {
    const inputClass = `w-full px-3 py-2 border rounded ${className || 'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'}`;

    return (
        <div className={className}>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                {label}
            </label>
            {options ? (
                <select className={inputClass}>
                    <option value=""> Selecione </option>
                    {options.map((opt) => {
                        return <option key={opt} value={opt}>{opt}</option>
                    })}
                </select>
            ) : (
                <input type={type} className={inputClass} placeholder={placeholder} />
            )}
        </div>
    )

}