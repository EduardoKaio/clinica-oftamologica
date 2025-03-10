import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Sidebar } from "../../components/Sidebar";
import Header from "../../components/Header";
import { drawerWidth, drawerWidthClosed } from "../../components/Sidebar";
import { ArrowBack as ArrowBackIcon, Add as AddIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom"; 

const API_URL = "http://localhost:8080/api/medico";

const MedicoCreate = () => {
  const [open, setOpen] = useState(true);
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medico = { nome, crm, especialidade, telefone, email };

    try {
      await axios.post(API_URL, medico);
      navigate('/medicos', {
        state: {
          message: "Médico criado com sucesso!",
          severity: "success"
        }
      });
    } catch (error) {
      setError("Erro ao criar médico.");
      console.error("Erro ao criar médico", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: 8 }}>
        <Header open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />
        
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Link to="/medicos">
              <IconButton
                sx={{
                  backgroundColor: "#1976d2", 
                  color: "white", 
                  borderRadius: "50%",
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: "#1565c0", 
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Link>

            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}>
              Adicionar Novo Médico
            </Typography>
            <Typography></Typography>
          </Box>

          {error && (
            <Box sx={{ mb: 2, color: "error.main" }}>
              <Typography>{error}</Typography>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nome Completo"
                  variant="outlined"
                  fullWidth
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="CRM"
                  variant="outlined"
                  fullWidth
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                  required
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Especialidade"
                  variant="outlined"
                  fullWidth
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  required
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefone"
                  variant="outlined"
                  fullWidth
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                startIcon={<AddIcon />} 
                sx={{
                  bgcolor: "#1976d2",
                  '&:hover': { bgcolor: "#1565c0" },
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Adicionar Médico
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default MedicoCreate;
