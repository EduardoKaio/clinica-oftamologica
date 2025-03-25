import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SidebarPaciente } from "../../../components/Paciente/SidebarPaciente"; // Importe a Sidebar
import HeaderPaciente from "../../../components/Paciente/HeaderPaciente"; // Importe o Header
import { drawerWidth, drawerWidthClosed } from "../../../components/Paciente/SidebarPaciente"; // Tamanhos da Sidebar

const ConsultasPacientePage = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true); // Controla se a sidebar está aberta
  const navigate = useNavigate();

  useEffect(() => {
    // Mockando dados de consultas
    mockConsultas();
  }, []);

  const mockConsultas = () => {
    const consultasMock = [
      { id: 1, medico: { nome: "Dr. João Silva" }, data: "2025-03-25T09:00:00" },
      { id: 2, medico: { nome: "Dra. Maria Souza" }, data: "2025-03-28T10:30:00" },
    ];
    setConsultas(consultasMock);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarPaciente open={open} setOpen={setOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          transition: "margin-left 0.3s",
        }}
      >
        {/* Header */}
        <HeaderPaciente open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />

        <Typography variant="h4" gutterBottom>
          Minhas Consultas
        </Typography>

        {/* Lista de Consultas */}
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Consultas Agendadas</Typography>
          {loading ? (
            <CircularProgress />
          ) : consultas.length === 0 ? (
            <Typography color="textSecondary">Nenhuma consulta agendada.</Typography>
          ) : (
            <List>
              {consultas.map((consulta) => (
                <ListItem key={consulta.id} divider>
                  <ListItemText
                    primary={`Dr. ${consulta.medico.nome}`}
                    secondary={`Data: ${new Date(consulta.data).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {/* Botão para Agendar Nova Consulta */}
        <Button variant="contained" color="primary" onClick={() => navigate("/paciente/consultas/agendar-consulta")}> 
          Agendar Nova Consulta
        </Button>
      </Box>
    </Box>
  );
};

export default ConsultasPacientePage;