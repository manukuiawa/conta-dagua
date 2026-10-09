import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Questionnaire from "./pages/Questionnaire/Questionnaire";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/recuperar-senha" element={<ForgotPassword />} />
      <Route path="/questionario" element={<Questionnaire />} />
    </Routes>
  );
}

export default App;
