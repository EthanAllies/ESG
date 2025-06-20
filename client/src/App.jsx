import { Link, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import PdfPage from "./pages/PdfPage";
import PdfViewer from "./pages/PdfViewer";
import DashBoardPage from "./pages/DashBoardPage";
import AudioPage from "./pages/AudioPage";
import QuizPage from "./pages/QuizPage";
import QuizDetailPage from "./pages/QuizDetailPage";
import FaqPage from "./pages/FaqPage";
import ProfilePage from "./pages/ProfilePage";
import AskQuestion from "./pages/AskQuestion";

function App() {
  return (
<Routes>
  <Route path="/" element={<MainLayout/>}>
    <Route index element={<DashBoardPage/>} />
    <Route path="ask-question" element={<AskQuestion/>} />
    <Route path="pdf" element={<PdfPage/>} />
    <Route path="pdf-viewer/:id" element={<PdfViewer />} />
    <Route path="dashboard" element={<DashBoardPage/>}/>
    <Route path="audio" element={<AudioPage/>}/>
    <Route path="quiz" element={<QuizPage/>}/>
    <Route path="quiz/:quizId" element={<QuizDetailPage />} />    
    <Route path="faqs" element={<FaqPage/>}/>
    <Route path="profile" element={<ProfilePage/>}/>
  </Route>
</Routes>
  )
}

export default App;
