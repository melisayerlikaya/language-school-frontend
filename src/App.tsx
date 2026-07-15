import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/homepage";
import TeacherSchedulePage from "./components/TeacherSchedulePage";
import TeachersPage from "./pages/teachersPage";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/teachers" element={<TeachersPage />} />

        <Route
          path="/teachers/:id/schedule"
          element={<TeacherSchedulePage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;