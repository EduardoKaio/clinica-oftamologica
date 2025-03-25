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
import { Sidebar } from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { drawerWidth, drawerWidthClosed } from "../../../components/Sidebar";
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_URL_CONSULTA = "http://localhost:8081/api/admin/consulta"; // URL para consulta
const API_URL_MEDICO = "http://localhost:8081/api/admin/medico"; // URL para médico
const API_URL_PACIENTE = "http://localhost:8081/api/admin/paciente"; // URL para paciente

const ConsultaEdit = () => {
  const [open, setOpen] = useState(true);
  const [consulta, setConsulta] = useState({
    dataHora: "",
    observacoes: "",
    medico: { id: "", nome: "" },
    paciente: { id: "", nome: "" },
  });
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const consultaId = query.get("id");
  const getAuthToken = () => localStorage.getItem("access_token");
  

  const checkAuthorization = () => {
    const token = getAuthToken();
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

  // Carregar médicos
  useEffect(() => {
    checkAuthorization();
    const token = getAuthToken();
    axios
      .get(API_URL_MEDICO, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const medicosUnicos = [
          ...new Map(response.data._embedded.medicoDTOList.map((medico) => [medico.id, medico])).values(),
        ];
        setMedicos(medicosUnicos);
      })
      .catch((error) => {
        setError("Erro ao carregar médicos.");
        console.error("Erro ao carregar médicos", error);
      });
  }, []);

  // Carregar pacientes
  useEffect(() => {
    checkAuthorization();
    const token = getAuthToken();
    axios
      .get(API_URL_PACIENTE,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const pacientesUnicos = [
          ...new Map(response.data._embedded.pacienteDTOList.map((paciente) => [paciente.id, paciente])).values(),
        ];
        setPacientes(pacientesUnicos);
      })
      .catch((error) => {
        setError("Erro ao carregar pacientes.");
        console.error("Erro ao carregar pacientes", error);
      });
  }, []);

  // Carregar consulta para edição
  useEffect(() => {
    checkAuthorization();
    const token = getAuthToken();
    if (consultaId) {
      axios
        .get(`${API_URL_CONSULTA}/${consultaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const { _embedded, ...consultaData } = response.data;
          setConsulta(consultaData);
        })
        .catch((error) => {
          setError("Erro ao carregar consulta.");
          console.error("Erro ao carregar consulta", error);
        });
    }
  }, [consultaId]);

  const handleChange = (e) => {
    setConsulta({ ...consulta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (consultaId) {
        await axios.put(`${API_URL_CONSULTA}/${consultaId}`, consulta, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API_URL_CONSULTA, consulta, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/consultas', {
        state: {
          message: "Consulta salva com sucesso!",
          severity: "success",
        },
      });
    } catch (error) {
      setError("Erro ao salvar consulta.");
      console.error("Erro ao salvar consulta", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: 8 }}>
        <Header open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />

        <Container>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Link to="/consultas">
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
              {consultaId ? "Editar Consulta" : "Cadastrar Consulta"}
            </Typography>
          </Box>

          {error && <Typography color="error">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data e Hora"
                  type="datetime-local"
                  name="dataHora"
                  variant="outlined"
                  fullWidth
                  value={consulta.dataHora}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Observações"
                  variant="outlined"
                  fullWidth
                  name="observacoes"
                  value={consulta.observacoes}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Selecione o Médico</InputLabel>
                  <Select
                    value={consulta.medico.id || ""}
                    onChange={(e) => setConsulta({ ...consulta, medico: { id: e.target.value } })}
                  >
                    {medicos.map((medico) => (
                      <MenuItem key={medico.id} value={medico.id}>
                        {medico.nome} ({medico.especialidade})
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Selecione o médico para a consulta</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Selecione o Paciente</InputLabel>
                  <Select
                    value={consulta.paciente.id || ""}
                    onChange={(e) => setConsulta({ ...consulta, paciente: { id: e.target.value } })}
                  >
                    {pacientes.map((paciente) => (
                      <MenuItem key={paciente.id} value={paciente.id}>
                        {paciente.nome}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Selecione o paciente para a consulta</FormHelperText>
                </FormControl>
              </Grid>
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
                {consultaId ? "Salvar Alterações" : "Cadastrar Consulta"}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default ConsultaEdit;
