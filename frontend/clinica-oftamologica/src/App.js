import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardMain from "./pages/Admin/DashboardMain"; // Importe a página do Dashboard
import PacienteList from "./pages/Admin/Paciente/PacienteList";
import PacienteCreate from "./pages/Admin/Paciente/PacienteCreate";
import PacienteEdit from "./pages/Admin/Paciente/PacienteEdit";
import MedicoList from "./pages/Admin/Medico/MedicoList";
import MedicoEdit from "./pages/Admin/Medico/MedicoEdit";
import MedicoCreate from "./pages/Admin/Medico/MedicoCreate";
import ConsultaList from "./pages/Admin/Consulta/ConsultaList";
import ConsultaCreate from "./pages/Admin/Consulta/ConsultaCreate";
import ConsultaEdit from "./pages/Admin/Consulta/ConsultaEdit";
import LoginPage from "./pages/Auth/Login";
import PrivateRoute from "./components/PrivateRoute"; // Importe a Rota Protegida
import RecoverPasswordPage from "./pages/Auth/RecoverPassword";
import UpdatePasswordPage from "./pages/Auth/UpdatePassword";
import HomePaciente from "./pages/Paciente/HomePaciente";
import MedicoListPaciente from "./pages/Paciente/Medicos/MedicoListPaciente";
import ChatbotPacientePage from "./pages/Paciente/Chatbot/ChatBotPacientePage";
import ConsultasPacientePage from "./pages/Paciente/Consultas/ConsultaPacientePage";
import AgendarConsultaPage from "./pages/Paciente/Consultas/AgendarConsultaPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recover-password" element={<RecoverPasswordPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />

        {/* admin */}
        <Route path="/admin/dashboard" element={<PrivateRoute element={<DashboardMain />} />} />
        <Route path="/admin/pacientes" element={<PrivateRoute element={<PacienteList />} />} />
        <Route path="/admin/pacientes/create" element={<PrivateRoute element={<PacienteCreate />} />} />
        <Route path="/admin/pacientes/edit" element={<PrivateRoute element={<PacienteEdit />} />} />
        <Route path="/admin/medicos" element={<PrivateRoute element={<MedicoList />} />} />
        <Route path="/admin/medicos/edit" element={<PrivateRoute element={<MedicoEdit />} />} />
        <Route path="/admin/medicos/create" element={<PrivateRoute element={<MedicoCreate />} />} />
        <Route path="/admin/consultas" element={<PrivateRoute element={<ConsultaList />} />} />
        <Route path="/admin/consultas/create" element={<PrivateRoute element={<ConsultaCreate />} />} />
        <Route path="/admin/consultas/edit" element={<PrivateRoute element={<ConsultaEdit />} />} />

        <Route path="/paciente/home" element={<PrivateRoute element={<HomePaciente />} />} />
        <Route path="/paciente/medicos" element={<PrivateRoute element={<MedicoListPaciente />} />} />
        <Route path="/paciente/consultas" element={<PrivateRoute element={<ConsultasPacientePage />} />} />
        <Route path="/paciente/chat" element={<PrivateRoute element={<ChatbotPacientePage />} />} />
        <Route path="/paciente/consultas/agendar-consulta" element={<PrivateRoute element={<AgendarConsultaPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
