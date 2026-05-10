import { useState } from "react";
import { Routers, ROUTES, METHOD_STYLES } from "../routes";
import { Card } from "./card";
import type { GetMode } from "../types";

function computeGetMode(routeId: string): GetMode {
  if (routeId === "get-vacinacao-estado") return "estado";
  if (routeId === "get-vacinacao-vacina") return "vacina";
  if (routeId === "get-vacinacao-todos") return "todos";
  if (routeId === "get-vacinacao-filtros") return "ambos";
  return "id";
}

export default function Page() {
  const [activeId, setActiveId] = useState<string>(ROUTES[0].id);

  const activeRoute = ROUTES.find((r) => r.id === activeId)!;
  const activeStyle = METHOD_STYLES[activeRoute.method];

  return (
    <>
       {/* CABECALHO */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg, #1351B4 60%, #168821 100%)",
        }}
      />
        {/* HEADER */}
      <header
        className="h-16 flex items-center gap-5 px-6"
        style={{ background: "#1351B4" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="ImuniData Logo"
              className="h-8 w-auto"
            />
          </div>

          <div className="w-px h-8 bg-white/25" />
          <div>
            <p className="text-[10px] text-white/65 uppercase tracking-widest font-medium">
              Ministério da Saúde
            </p>
            <p className="text-[15px] text-white/65 uppercase tracking-widest font-medium">
              ImuniData API
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-7">
        {/* TAB BAR */}
        <Routers routes={ROUTES} activeId={activeId} onActiveChange={setActiveId} />
        {/* CONTEUDO */}
        <div
          className="bg-white border-[1.5px] border-blue-800 border-t-0 rounded-b-xl p-7"
          style={{ boxShadow: '0 6px 24px rgba(19, 81, 180, 0.07)' }}
        >
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-200">
            <div
              className={`inline-flex items-center gap-2 ${activeStyle.bg} ${activeStyle.border} border rounded-md px-3 py-1.5`}
            >
              <span
                className={`${activeStyle.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide`}
              >
                {activeRoute.method}
              </span>
              <code className={`font-mono text-[13px] font-medium ${activeStyle.text}`}>
                {activeRoute.path}
              </code>
            </div>
            <span className="text-[13px] text-slate-400">{activeRoute.description}</span>
          </div>

          {/* Card Dinamico */}
          <Card key={activeId} httpMethod={activeRoute.method} getMode={computeGetMode(activeId)} />


        </div>
      </main>


    </>
  );
}
