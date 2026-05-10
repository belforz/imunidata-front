interface ResponseAreaProps {
  response: unknown | null;
  loading: boolean;
  error: string | null;
}

export function ResponseArea({ response, loading, error }: ResponseAreaProps) {
  function renderContent() {
    if (loading) return <span className="font-mono text-[12.5px] text-slate-400 italic">Carregando...</span>;
    if (error) return <span className="font-mono text-[12.5px] text-red-400">{error}</span>;
    if (response === undefined) return <span className="font-mono text-[12.5px] text-slate-500 italic">Aguardando requisição...</span>;
    if (response === null) return <span className="font-mono text-[12.5px] text-slate-400 italic">Nenhum resultado encontrado.</span>;
    return (
      <pre className="font-mono text-[12.5px] text-green-300 whitespace-pre-wrap break-all">
        {JSON.stringify(response, null, 2)}
      </pre>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
        Resposta da API Imunidata
      </p>
      <div className="bg-slate-900 rounded-lg p-4 min-h-[90px] relative">
        <span className="absolute top-2 right-3 text-[10px] font-semibold text-slate-600 tracking-widest">
          JSON
        </span>
        {renderContent()}
      </div>
    </div>
  );
}
