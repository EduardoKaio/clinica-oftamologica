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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Sidebar } from "../../components/Sidebar";
import Header from "../../components/Header";
import { drawerWidth, drawerWidthClosed } from "../../components/Sidebar";
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../Auth/api";

const API_URL = "/paciente";

const PacienteEdit = () => {
  const [open, setOpen] = useState(true);
  const [paciente, setPaciente] = useState({
    nome: "",
    cpf: "",
    email: "",
    celular: "",
    dataDeNascimento: "",
    endereco: "",
    genero: "",
    historicoMedico: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const pacienteId = query.get("id");
  const getAuthToken = () => localStorage.getItem("access_token");

  const checkAuthorization = () => {
    const token = getAuthToken(); // Obtém o token

    if (!token) {
      navigate("/login");
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const roles = decodedToken.realm_access.roles;

        if (!roles.includes("ADMIN")) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    checkAuthorization();
    if (pacienteId) {
      const token = getAuthToken(); // Obtém o token
      API
      .get(`${API_URL}/${pacienteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const { consultasIds, _links, ...pacienteData } = response.data;
          setPaciente(pacienteData);
        })
        .catch((error) => {
          setError("Erro ao carregar paciente.");
          console.error("Erro ao carregar paciente", error);
        });
    }
  }, [pacienteId]);

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken(); // Obtém o token
      if (pacienteId) {
        await API.put(`${API_URL}/${pacienteId}`, paciente, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post(API_URL, paciente, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/pacientes', {
        state: {
          message: "Paciente editado com sucesso!",
          severity: "success"
        }
      });
    } catch (error) {
      setError("Erro ao salvar paciente.");
      console.error("Erro ao salvar paciente", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: 8 }}>
        <Header open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />

        <Container>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Link to="/pacientes">
              <IconButton
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  borderRadius: "50%",
                  boxShadow: 2,
                  '&:hover': { backgroundColor: "#1565c0" },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2", mx: "auto" }}>
              {pacienteId ? "Editar Paciente" : "Cadastrar Paciente"}
            </Typography>
          </Box>

          {error && <Typography color="error">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {Object.keys(paciente).map((key) => (
                key !== "id" && (
                  <Grid item xs={12} sm={6} key={key}>
                    {key === "genero" ? (
                      <FormControl fullWidth required>
                        <InputLabel>Gênero</InputLabel>
                        <Select name={key} value={paciente[key]} onChange={handleChange}>
                          <MenuItem value="masculino">Masculino</MenuItem>
                          <MenuItem value="feminino">Feminino</MenuItem>
                          <MenuItem value="outro">Outro</MenuItem>
                        </Select>
                        <FormHelperText>Selecione o gênero do paciente</FormHelperText>
                      </FormControl>
                    ) : (
                      <TextField
                        label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1").trim()}
                        type={key === "dataDeNascimento" ? "date" : "text"}
                        name={key}
                        variant="outlined"
                        fullWidth
                        value={paciente[key]}
                        onChange={handleChange}
                        required
                        InputLabelProps={key === "dataDeNascimento" ? { shrink: true } : {}}
                      />
                    )}
                  </Grid>
                )
              ))}
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                startIcon={<SaveIcon />}
                sx={{ bgcolor: "#1976d2", '&:hover': { bgcolor: "#1565c0" }, borderRadius: 1 }}
              >
                {pacienteId ? "Salvar Alterações" : "Cadastrar Paciente"}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default PacienteEdit;