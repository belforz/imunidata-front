export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[15px] font-semibold text-slate-800 pb-3 border-b border-slate-200 mb-5">
      {children}
    </h3>
  )
}