export default function Page() {
  //     const [activeId, setActiveId] = useState<string>(ROUTES[0].id)

  //   const activeRoute = ROUTES.find((r) => r.id === activeId)!
  //   const activeStyle = METHOD_STYLES[activeRoute.method]

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

      
    </>
  );
}
