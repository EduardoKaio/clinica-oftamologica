import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { Sidebar } from "../../components/Sidebar";
import Header from "../../components/Header";
import { drawerWidth, drawerWidthClosed } from "../../components/Sidebar";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, TableChart, ViewModule } from "@mui/icons-material";
import { Link, useLocation,useNavigate } from "react-router-dom";
import API from "../Auth/api";


const MedicoList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [open, setOpen] = useState(true);
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [openDialog, setOpenDialog] = useState(false);
  const [medicoToDelete, setMedicoToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const API_URL = "/medico";
  const getAuthToken = () => localStorage.getItem("access_token");

  // Função para verificar o token e permissões
  const checkAuthorization = () => {
    const token = getAuthToken();

    if (!token) {
      navigate("/login"); // Redireciona para login se não houver token
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o JWT
        const roles = decodedToken.realm_access.roles;

        if (!roles.includes("ADMIN")) {
          navigate("/login"); // Redireciona para login se não for ADMIN
        }
      } catch (err) {
        navigate("/login"); // Redireciona se houver erro no token
      }
    }
  };

  useEffect(() => {
    checkAuthorization(); // Verifica autorização ao carregar o componente

    const token = getAuthToken();

    if (token) {
      fetchMedicos(token);
    }

    // Verifica se há uma mensagem de sucesso passada da página anterior
    if (state?.message) {
      setSnackbarMessage(state.message);
      setSnackbarSeverity(state.severity || "success");
      setSnackbarOpen(true);
    }
  }, [state]); // Dependência para atualizar a mensagem sempre que `state` mudar

  const fetchMedicos = async (token) => {
    try {
      const response = await API.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      });
      setMedicos(response.data._embedded.medicoDTOList); // Corrigido para armazenar a lista de médicos corretamente
    } catch (error) {
      console.error("Erro ao buscar médicos", error);
      setSnackbarMessage("Erro ao carregar médicos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id) => {
    const token = getAuthToken(); // Obtém o token

    try {
      await API.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token para autorização
        },
      });
      fetchMedicos(token);
      setSnackbarMessage("Médico excluído com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpenDialog(false);
    } catch (error) {
      console.error("Erro ao excluir médico", error);
      setSnackbarMessage("Erro ao excluir médico.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleOpenDialog = (medico) => {
    setMedicoToDelete(medico);
    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const filteredMedicos = medicos.filter((medico) =>
    medico.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Header open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />
        <Toolbar />

        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
              Médicos
            </Typography>
            <Box>
              <IconButton color="primary" onClick={() => setViewMode("cards")}>
                <ViewModule />
              </IconButton>
              <IconButton color="primary" onClick={() => setViewMode("table")}>
                <TableChart />
              </IconButton>
              <Link to="/medicos/create">
                <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#1976d2", ml: 2 }}>
                  Adicionar Médico
                </Button>
              </Link>
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
                      <Typography variant="h6" fontWeight="bold">
                        {medico.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        E-mail: {medico.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        CRM: {medico.crm}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Especialidade: {medico.especialidade}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Link to={`/medicos/edit?id=${medico.id}`}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton color="error" onClick={() => handleOpenDialog(medico)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nome</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>CRM</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>E-mail</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Especialidade</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMedicos.map((medico, index) => (
                    <TableRow 
                      key={medico.id} 
                      sx={{ 
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white", 
                        transition: "0.3s", '&:hover': { backgroundColor: "#e3f2fd" } 
                      }}
                    >
                      <TableCell>{medico.id}</TableCell>
                      <TableCell>{medico.nome}</TableCell>
                      <TableCell>{medico.crm}</TableCell>
                      <TableCell>{medico.email}</TableCell>
                      <TableCell>{medico.especialidade}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Link to={`/medicos/edit?id=${medico.id}`}>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton color="error" onClick={() => handleOpenDialog(medico)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Tem certeza que deseja excluir o médico {medicoToDelete?.nome}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(medicoToDelete.id)}
            color="error"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensagens de sucesso ou erro */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MedicoList;

