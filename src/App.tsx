import { ToastContainer} from "react-toastify"
import Page from "./components/page"
function App() {

  return (
    <>
      <div>
        <ToastContainer />
        <div className="min-h-screen bg-slate-100">
          <Page />
        </div>

      </div>
    </>
  )
}

export default App
