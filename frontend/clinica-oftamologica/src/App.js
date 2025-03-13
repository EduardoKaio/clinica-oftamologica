import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardMain from "./pages/DashboardMain"; // Importe a página do Dashboard
import PacienteList from "./pages/Paciente/PacienteList";
import PacienteCreate from "./pages/Paciente/PacienteCreate";
import PacienteEdit from "./pages/Paciente/PacienteEdit";
import MedicoList from "./pages/Medico/MedicoList";
import MedicoEdit from "./pages/Medico/MedicoEdit";
import MedicoCreate from "./pages/Medico/MedicoCreate";
import ConsultaList from "./pages/Consulta/ConsultaList";
import ConsultaCreate from "./pages/Consulta/ConsultaCreate";
import ConsultaEdit from "./pages/Consulta/ConsultaEdit";
import LoginPage from "./pages/Auth/Login";
import PrivateRoute from "./components/PrivateRoute"; // Importe a Rota Protegida
import RecoverPasswordPage from "./pages/Auth/RecoverPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recover-password" element={<RecoverPasswordPage />} />

        {/* Proteja as rotas com o PrivateRoute */}
        <Route path="/dashboard" element={<PrivateRoute element={<DashboardMain />} />} />
        <Route path="/pacientes" element={<PrivateRoute element={<PacienteList />} />} />
        <Route path="/pacientes/create" element={<PrivateRoute element={<PacienteCreate />} />} />
        <Route path="/pacientes/edit" element={<PrivateRoute element={<PacienteEdit />} />} />
        <Route path="/medicos" element={<PrivateRoute element={<MedicoList />} />} />
        <Route path="/medicos/edit" element={<PrivateRoute element={<MedicoEdit />} />} />
        <Route path="/medicos/create" element={<PrivateRoute element={<MedicoCreate />} />} />
        <Route path="/consultas" element={<PrivateRoute element={<ConsultaList />} />} />
        <Route path="/consultas/create" element={<PrivateRoute element={<ConsultaCreate />} />} />
        <Route path="/consultas/edit" element={<PrivateRoute element={<ConsultaEdit />} />} />
      </Routes>
    </Router>
  );
}

export default App;
