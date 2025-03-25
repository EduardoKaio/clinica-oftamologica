import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box, Toolbar, Button } from "@mui/material";
import { SidebarPaciente, drawerWidth, drawerWidthClosed } from "../../components/Paciente/SidebarPaciente";
import HeaderPaciente from "../../components/Paciente/HeaderPaciente";
import CardInfo from "../../components/CardInfo";
import { motion } from "framer-motion";
import axios from "axios";
import { Navigate } from "react-router-dom";

const HomePaciente = () => {
  const [open, setOpen] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const getAuthToken = () => localStorage.getItem("access_token");

  const checkAuthorization = () => {
    const token = getAuthToken();
    if (!token) {
      setRedirect(true);
    }
  };

  const fetchAppointments = async (token) => {
    try {
      const response = await axios.get("http://localhost:8081/api/paciente/consultas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar consultas", error);
    }
  };

  useEffect(() => {
    checkAuthorization();
    if (redirect) return;
    const token = getAuthToken();
    if (token) fetchAppointments(token);
    setLoading(false);
  }, [redirect]);

  if (loading) return <div>Carregando...</div>;
  if (redirect) return <Navigate to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
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
        <HeaderPaciente open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />
        <Toolbar />
        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h4" gutterBottom>
              Olá, bem-vindo à sua área do paciente!
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <CardInfo title="Próximas Consultas" count={appointments.length} color="#1976d2" icon="event" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardInfo title="Médicos Disponíveis" count={10} color="#ff5722" icon="local_hospital" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardInfo title="Exames Agendados" count={3} color="#4caf50" icon="description" />
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePaciente;
