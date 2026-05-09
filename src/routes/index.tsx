type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Route {
  id: string;
  method: HttpMethod;
  path: string;
  label: string;
  description: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const METHOD_STYLES: Record<
  HttpMethod,
  {
    badge: string;
    bg: string;
    border: string;
    text: string;
  }
> = {
  GET: {
    badge: "bg-green-700",
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-800",
  },
  POST: {
    badge: "bg-blue-800",
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-800",
  },
  PUT: {
    badge: "bg-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-800",
  },
  DELETE: {
    badge: "bg-red-600",
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-800",
  },
  PATCH: {
    badge: "bg-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-300",
    text: "text-purple-800",
  },
};

export const ROUTES: Route[] = [
  {
    id: "get-vacinacao",
    method: "GET",
    path: "/vacinacao",
    label: "Buscar Vacinação",
    description: "Busca uma vacinação pelo ID",
  },
  {
    id: "post-vacinacao",
    method: "POST",
    path: "/vacinacao",
    label: "Cadastrar Vacinação",
    description: "Cadastra uma nova vacinação no sistema",
  },
  {
    id: "put-vacinacao",
    method: "PUT",
    path: "/vacinacao/{id}",
    label: "Atualizar Vacinação",
    description: "Atualiza dados de uma vacinação existente",
  },
  {
    id: "delete-vacinacao",
    method: "DELETE",
    path: "/vacinacao/{id}",
    label: "Remover Vacinação",
    description: "Remove permanentemente o registro da vacinação",
  },
  {
    id: "get-vacinacao-cidade",
    method: "GET",
    path: "/vacinacao?cidade={cidade}",
    label: "Buscar Vacinação por Cidade",
    description: "Lista vacinas com filtros opcionais",
  },
  {
    id: "get-vacinacao-estado",
    method: "GET",
    path: "/vacinacao?estado={estado}",
    label: "Buscar Vacinação por Estado",
    description: "Lista vacinas com filtros opcionais",
  },
];

export function Routers({ routes, activeId, onActiveChange }: { routes: Route[], activeId: string, onActiveChange: (id: string) => void }) {

  return (
    <div className="flex items-end gap-1 border-b-2 border-blue-800 overflow-x-auto">
      {routes.map((route) => {
        const isActive = route.id === activeId;
        const ms = METHOD_STYLES[route.method as HttpMethod];
        return (
          <button
            key={route.id}
            onClick={() => onActiveChange(route.id)}
            className={[
              "flex flex-col gap-1 min-w-[140px] rounded-t-lg px-4 py-2.5 text-left",
              "transition-colors duration-100",
              isActive
                ? "bg-white border-[1.5px] border-blue-800 border-b-2 border-b-white -mb-0.5 z-10"
                : "bg-slate-200 border border-slate-300 border-b-0 hover:bg-slate-300",
            ].join(" ")}
          >
            <span
              className={`${ms.badge} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm tracking-wide self-start`}
            >
              {route.method}
            </span>
            <span
              className={`text-[13px] leading-tight ${
                isActive
                  ? "font-semibold text-slate-800"
                  : "font-normal text-slate-500"
              }`}
            >
              {route.label}
            </span>
            <span className="font-mono text-[10.5px] text-slate-400">
              /{route.path.split("/").at(-1)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
