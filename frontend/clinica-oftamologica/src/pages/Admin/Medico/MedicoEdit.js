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
} from "@mui/material";
import { Sidebar } from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { drawerWidth, drawerWidthClosed } from "../../../components/Sidebar";
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../../Auth/api";

const API_URL = "http://localhost:8081/api/admin/medico";

const MedicoEdit = () => {
  const [open, setOpen] = useState(true);
  const [medico, setMedico] = useState({
    nome: "",
    crm: "",
    especialidade: "",
    telefone: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const medicoId = query.get("id");
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

  useEffect(() => {
    checkAuthorization();
    if (medicoId) {
      const token = getAuthToken();
      API
        .get(`${API_URL}/${medicoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const { consultasIds, _links, ...medicoData } = response.data;
          setMedico(medicoData);
        })
        .catch((error) => {
          setError("Erro ao carregar médico.");
          console.error("Erro ao carregar médico", error);
        });
    }
  }, [medicoId]);

  const handleChange = (e) => {
    setMedico({ ...medico, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (medicoId) {
        await API.put(`${API_URL}/${medicoId}`, medico, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post(API_URL, medico, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/medicos', {
        state: {
          message: "Médico editado com sucesso!",
          severity: "success"
        }
      });
    } catch (error) {
      setError("Erro ao salvar médico.");
      console.error("Erro ao salvar médico", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: 8 }}>
        <Header open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />

        <Container>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Link to="/medicos">
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
              {medicoId ? "Editar Médico" : "Cadastrar Médico"}
            </Typography>
          </Box>

          {error && <Typography color="error">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {Object.keys(medico).map((key) => (
                key !== "id" && (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1").trim()}
                      type="text"
                      name={key}
                      variant="outlined"
                      fullWidth
                      value={medico[key]}
                      onChange={handleChange}
                      required
                    />
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
                {medicoId ? "Salvar Alterações" : "Cadastrar Médico"}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default MedicoEdit;