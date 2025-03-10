import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Button, Typography } from "@mui/material";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardMain />} />
        <Route path="/pacientes" element={<PacienteList />} />
        <Route path="/pacientes/create" element={<PacienteCreate />} />
        <Route path="/pacientes/edit" element={<PacienteEdit />} />
        <Route path="/medicos" element={<MedicoList />} />
        <Route path="/medicos/edit" element={<MedicoEdit />} />
        <Route path="/medicos/create" element={<MedicoCreate />} />
        <Route path="/consultas" element={<ConsultaList />} />
        <Route path="/consultas/create" element={<ConsultaCreate />} />
        <Route path="/consultas/edit" element={<ConsultaEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
