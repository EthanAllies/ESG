import {Link,Outlet,Route,Routes} from "react-router-dom"
import MainLayout from "./layouts/mainLayout"
import PdfPage from "./pages/PdfPage"
import DashBoardPage from "./pages/DashBoardPage"
import AudioPage from "./pages/AudioPage"
import QuizPage from "./pages/QuizPage"
import FaqPage from "./pages/FaqPage"

function App() {

  return (
<Routes>
  <Route path="/" element={<MainLayout/>}>
    <Route index element={<PdfPage/>} />
    <Route path="pdf" element={<PdfPage/>} />
    <Route path="dashboard" element={<DashBoardPage/>}/>
    <Route path="audio" element={<AudioPage/>}/>
    <Route path="quiz" element={<QuizPage/>}/>
    <Route path="faqs" element={<FaqPage/>}/>
  </Route>
</Routes>
  )
}

export default App
