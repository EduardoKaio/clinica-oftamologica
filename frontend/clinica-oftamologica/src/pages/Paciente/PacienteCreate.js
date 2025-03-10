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
import { Link,useNavigate } from "react-router-dom"; // Importando o Link

const API_URL = "http://localhost:8080/api/paciente";

const PacienteCreate = () => {
  const [open, setOpen] = useState(true);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [genero, setGenero] = useState("");
  const [historicoMedico, setHistoricoMedico] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paciente = { nome, cpf, email, celular, dataDeNascimento, endereco, genero, historicoMedico };

    try {
      await axios.post(API_URL, paciente);
      navigate('/pacientes', {
        state: {
          message: "Paciente criado com sucesso!",
          severity: "success"
        }
      });
    } catch (error) {
      setError("Erro ao criar paciente.");
      console.error("Erro ao criar paciente", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: 8 }}>
        <Header open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />
        
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Link to="/pacientes">
                    <IconButton
                        sx={{
                        backgroundColor: "#1976d2", // Cor de fundo azul
                        color: "white", // Cor da seta branca
                        borderRadius: "50%",
                        boxShadow: 2,
                        '&:hover': {
                            backgroundColor: "#1565c0", // Cor de fundo azul escuro ao passar o mouse
                        },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Link>

                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center"}}>
                Adicionar Novo Paciente
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center"}}>
                
                </Typography>
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
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Celular"
                  variant="outlined"
                  fullWidth
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  required
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data de Nascimento"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={dataDeNascimento}
                  onChange={(e) => setDataDeNascimento(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Endereço"
                  variant="outlined"
                  fullWidth
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required sx={{ borderRadius: 1 }}>
                  <InputLabel>Gênero</InputLabel>
                  <Select
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    label="Gênero"
                  >
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="feminino">Feminino</MenuItem>
                    <MenuItem value="outro">Outro</MenuItem>
                  </Select>
                  <FormHelperText>Selecione o gênero do paciente</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Histórico Médico"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={historicoMedico}
                  onChange={(e) => setHistoricoMedico(e.target.value)}
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
                startIcon={<AddIcon />} // Ícone de "+" no botão
                sx={{
                  bgcolor: "#1976d2",
                  '&:hover': { bgcolor: "#1565c0" },
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Adicionar Paciente
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default PacienteCreate;
