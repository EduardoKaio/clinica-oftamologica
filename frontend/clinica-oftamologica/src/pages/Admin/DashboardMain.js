import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box, Toolbar } from "@mui/material";
import { Sidebar, drawerWidth, drawerWidthClosed } from "../../components/Sidebar";
import Header from "../../components/Header";
import CardInfo from "../../components/CardInfo";
import { motion } from "framer-motion";
import axios from "axios"; // Importa o axios para fazer a requisição à API
import { Dashboard } from "@mui/icons-material";
import { Navigate } from "react-router-dom"; // Importa o Navigate para redirecionamento

const DashboardMain = () => {
  const [open, setOpen] = useState(true);
  const [patientCount, setPatientCount] = useState(0); // Estado para armazenar o número de pacientes
  const [doctorCount, setDoctorCount] = useState(0); // Estado para armazenar o número de médicos
  const [consultationCount, setConsultationCount] = useState(0); // Estado para armazenar o número de consultas
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState(""); // Para mensagens de erro
  const [redirect, setRedirect] = useState(false); // Estado para controle de redirecionamento
  const getAuthToken = () => localStorage.getItem("access_token");

  // Função para verificar o token e as permissões
  const checkAuthorization = () => {
    const token = getAuthToken(); // Obtém o token

    if (!token) {
      setRedirect(true); // Marca para redirecionar
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o JWT
        const roles = decodedToken.realm_access.roles;

        // Verifica se o usuário tem a role "ADMIN"
        if (!roles.includes("ADMIN")) {
          setRedirect(true); // Marca para redirecionar
        }
      } catch (err) {
        setRedirect(true); // Se falhar na decodificação, redireciona
      }
    }
  };

  // Função para buscar o número de pacientes
  const fetchPatientCount = async (token) => {
    try {
      const response = await axios.get("http://localhost:8081/api/admin/paciente/count", {
        headers: {
          Authorization: `Bearer ${token}`, // Passando o token de autorização
        },
      });
      setPatientCount(response.data.count); // Atualiza o estado com a contagem de pacientes
    } catch (error) {
      setError("Erro ao buscar a contagem de pacientes");
    }
  };

  // Função para buscar o número de médicos
  const fetchDoctorCount = async (token) => {
    try {
      const response = await axios.get("http://localhost:8081/api/admin/medico/count", {
        headers: {
          Authorization: `Bearer ${token}`, // Passando o token de autorização
        },
      });
      setDoctorCount(response.data.count); // Atualiza o estado com a contagem de médicos
    } catch (error) {
      setError("Erro ao buscar a contagem de médicos");
    }
  };

  // Função para buscar o número de consultas
  const fetchConsultationCount = async (token) => {
    try {
      const response = await axios.get("http://localhost:8081/api/admin/consulta/count", {
        headers: {
          Authorization: `Bearer ${token}`, // Passando o token de autorização
        },
      });
      setConsultationCount(response.data.count); // Atualiza o estado com a contagem de consultas
    } catch (error) {
      setError("Erro ao buscar a contagem de consultas");
    }
  };

  useEffect(() => {
    checkAuthorization(); // Verifica autorização ao carregar o componente

    // Se a autorização falhar, redireciona para o login
    if (redirect) return; 

    const token = getAuthToken(); // Obtém o token

    if (token) {
      fetchPatientCount(token); // Chama a função para buscar o número de pacientes
      fetchDoctorCount(token);  // Chama a função para buscar o número de médicos
      fetchConsultationCount(token); // Chama a função para buscar o número de consultas
    }

    setLoading(false); // Define o carregamento como falso
  }, [redirect]);

  if (loading) return <div>Carregando...</div>; // Exibe enquanto carrega os dados
  if (redirect) return <Navigate to="/login" />; // Redireciona para login se não autorizado

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
