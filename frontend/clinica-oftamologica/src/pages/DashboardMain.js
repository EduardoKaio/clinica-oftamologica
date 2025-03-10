import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box, Toolbar } from "@mui/material";
import { Sidebar, drawerWidth, drawerWidthClosed } from "../components/Sidebar";
import Header from "../components/Header";
import CardInfo from "../components/CardInfo";
import { motion } from "framer-motion";
import axios from "axios"; // Importa o axios para fazer a requisição à API
import { Dashboard } from "@mui/icons-material";

const DashboardMain = () => {
  const [open, setOpen] = useState(true);
  const [patientCount, setPatientCount] = useState(0); // Estado para armazenar o número de pacientes
  const [doctorCount, setDoctorCount] = useState(0); // Estado para armazenar o número de médicos
  const [consultationCount, setConsultationCount] = useState(0); // Estado para armazenar o número de consultas

  // Função para buscar o número de pacientes
  const fetchPatientCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/paciente/count"); 
      setPatientCount(response.data.count); // Atualiza o estado com a contagem de pacientes
    } catch (error) {
      console.error("Erro ao buscar a contagem de pacientes", error);
    }
  };

  // Função para buscar o número de médicos
  const fetchDoctorCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/medico/count"); // URL da API para contar médicos
      setDoctorCount(response.data.count); // Atualiza o estado com a contagem de médicos
    } catch (error) {
      console.error("Erro ao buscar a contagem de médicos", error);
    }
  };

  // Função para buscar o número de consultas
  const fetchConsultationCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/consulta/count"); // URL da API para contar consultas
      setConsultationCount(response.data.count); // Atualiza o estado com a contagem de consultas
    } catch (error) {
      console.error("Erro ao buscar a contagem de consultas", error);
    }
  };

  useEffect(() => {
    fetchPatientCount(); // Chama a função para buscar o número de pacientes ao carregar o componente
    fetchDoctorCount();  // Chama a função para buscar o número de médicos
    fetchConsultationCount(); // Chama a função para buscar o número de consultas
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Conteúdo Principal */}
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
        <Header open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />

        {/* Adiciona espaço para evitar sobreposição do conteúdo com o Header */}
        <Toolbar />

        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h4" gutterBottom>
              Painel de Administração
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                {/* Passa o número de pacientes para o CardInfo */}
                <CardInfo title="Pacientes" count={patientCount} color="#1976d2" icon="person" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {/* Passa o número de médicos para o CardInfo */}
                <CardInfo title="Médicos" count={doctorCount} color="#ff5722" icon="local_hospital" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {/* Passa o número de consultas para o CardInfo */}
                <CardInfo title="Consultas" count={consultationCount} color="#4caf50" icon="event" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardInfo title="Funcionários" count={8} color="#9c27b0" icon="work" />
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardMain;
