import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { SidebarPaciente } from "../../../components/Paciente/SidebarPaciente";
import HeaderPaciente from "../../../components/Paciente/HeaderPaciente";
import { drawerWidth, drawerWidthClosed } from "../../../components/Sidebar";
import { TableChart, ViewModule } from "@mui/icons-material";
import API from "../../Auth/api";

const MedicoListPaciente = () => {
  const [open, setOpen] = useState(true);
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  
  const API_URL = "/paciente/medico";
  const getAuthToken = () => localStorage.getItem("access_token");

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchMedicos(token);
    }
  }, []);

  const fetchMedicos = async (token) => {
    try {
      const response = await API.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicos(response.data._embedded.medicoDTOList);
    } catch (error) {
      console.error("Erro ao buscar médicos", error);
    }
  };

  const filteredMedicos = medicos.filter((medico) =>
    medico.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarPaciente open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <HeaderPaciente open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />
        <Toolbar />

        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
              Médicos Disponíveis
            </Typography>
            <Box>
              <IconButton color="primary" onClick={() => setViewMode("cards")}>
                <ViewModule />
              </IconButton>
              <IconButton color="primary" onClick={() => setViewMode("table")}>
                <TableChart />
              </IconButton>
            </Box>
          </Box>

          <TextField
            label="Buscar Médico"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {viewMode === "cards" ? (
            <Grid container spacing={3}>
              {filteredMedicos.map((medico) => (
                <Grid item xs={12} sm={6} md={4} key={medico.id}>
                  <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", '&:hover': { transform: "scale(1.03)" } }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">{medico.nome}</Typography>
                      <Typography variant="body2" color="text.secondary">CRM: {medico.crm}</Typography>
                      <Typography variant="body2" color="text.secondary">Especialidade: {medico.especialidade}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nome</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>CRM</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Especialidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMedicos.map((medico, index) => (
                    <TableRow key={medico.id} sx={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                      <TableCell>{medico.nome}</TableCell>
                      <TableCell>{medico.crm}</TableCell>
                      <TableCell>{medico.especialidade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default MedicoListPaciente;