import { ToastContainer} from "react-toastify"
import Page from "./components/page"
function App() {

  return (
    <>
      <div>
        <ToastContainer position="top-right"   
        autoClose={4000}        
        hideProgressBar={false} 
        newestOnTop             
        closeOnClick            
        pauseOnHover            
        draggable               
        theme="light"           
         />
        <div className="min-h-screen bg-slate-100">
          <Page />
        </div>

      </div>
    </>
  )
}

export default App
