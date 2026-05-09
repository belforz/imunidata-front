import { ToastContainer} from "react-toastify"
import Page from "./components/page"
function App() {

  return (
    <>
      <div>
        <ToastContainer position="top-right"   // canto superior direito — padrão API explorer
        autoClose={4000}        // fecha sozinho em 4s
        hideProgressBar={false} // barra de progresso visível
        newestOnTop             // novos toasts aparecem acima dos anteriores
        closeOnClick            // clicou → fecha
        pauseOnHover            // hover pausa o timer
        draggable               // usuário pode arrastar pra fechar
        theme="light"           // combina com o design branco do card
         />
        <div className="min-h-screen bg-slate-100">
          <Page />
        </div>

      </div>
    </>
  )
}

export default App
