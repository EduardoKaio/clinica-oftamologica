import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Autocomplete,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Sidebar } from "../../components/Sidebar";
import Header from "../../components/Header";
import { drawerWidth, drawerWidthClosed } from "../../components/Sidebar";
import { ArrowBack as ArrowBackIcon, Add as AddIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom"; // Importando o Link

const API_MEDICO_URL = "http://localhost:8080/api/medico";
const API_PACIENTE_URL = "http://localhost:8080/api/paciente";
const API_CONSULTA_URL = "http://localhost:8080/api/consulta";

const ConsultaCreate = () => {
  const [open, setOpen] = useState(true);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicoId, setMedicoId] = useState(null); // Inicializando como null
  const [pacienteId, setPacienteId] = useState(null); // Inicializando como null
  const [dataHora, setDataHora] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch médicos e pacientes ao carregar o componente
    fetchMedicos();
    fetchPacientes();
  }, []);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get(API_MEDICO_URL);
      setMedicos(response.data._embedded.medicoDTOList);
    } catch (error) {
      setError("Erro ao buscar médicos.");
      console.error("Erro ao buscar médicos", error);
    }
  };

  const fetchPacientes = async () => {
    try {
      const response = await axios.get(API_PACIENTE_URL);
      setPacientes(response.data._embedded.pacienteDTOList);
    } catch (error) {
      setError("Erro ao buscar pacientes.");
      console.error("Erro ao buscar pacientes", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const consulta = { medico: { id: medicoId }, paciente: { id: pacienteId }, dataHora, observacoes };

    try {
      await axios.post(API_CONSULTA_URL, consulta);
      setSuccess("Consulta criada com sucesso!");
      navigate("/consultas", {
        state: {
          message: "Consulta criada com sucesso!",
          severity: "success"
        }
      });
    } catch (error) {
      setError("Erro ao criar consulta.");
      console.error("Erro ao criar consulta", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: 8 }}>
        <Header open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />

        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Link to="/consultas">
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

            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}>
              Adicionar Nova Consulta
            </Typography>
            <Typography></Typography>
          </Box>

          {error && (
            <Box sx={{ mb: 2, color: "error.main" }}>
              <Typography>{error}</Typography>
            </Box>
          )}
          {success && (
            <Box sx={{ mb: 2, color: "success.main" }}>
              <Typography>{success}</Typography>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={medicoId ? medicos.find((medico) => medico.id === medicoId) : null}
                  onChange={(e, newValue) => setMedicoId(newValue ? newValue.id : null)}
                  options={medicos}
                  getOptionLabel={(option) => `${option.nome} - ${option.especialidade}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Médico" variant="outlined" fullWidth />
                  )}
                  disableClearable
                />
                <FormHelperText>Selecione o médico da consulta</FormHelperText>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={pacienteId ? pacientes.find((paciente) => paciente.id === pacienteId) : null}
                  onChange={(e, newValue) => setPacienteId(newValue ? newValue.id : null)}
                  options={pacientes}
                  getOptionLabel={(option) => `${option.nome} - ${option.cpf}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Paciente" variant="outlined" fullWidth />
                  )}
                  disableClearable
                />
                <FormHelperText>Selecione o paciente para a consulta</FormHelperText>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data e Hora"
                  type="datetime-local"
                  variant="outlined"
                  fullWidth
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                  required
                  sx={{ borderRadius: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Observações"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
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
                Adicionar Consulta
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default ConsultaCreate;
