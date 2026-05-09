export function ResponseArea({ response }: { response: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
        Resposta da API Imunidata
      </p>
      <div className="bg-slate-900 rounded-lg p-4 min-h-[90px] relative">
        <span className="absolute top-2 right-3 text-[10px] font-semibold text-slate-600 tracking-widest">
          JSON
        </span>
        <span className="font-mono text-[12.5px] text-slate-500 italic">
          {`${response}`}
        </span>
      </div>
    </div>
  );
}
