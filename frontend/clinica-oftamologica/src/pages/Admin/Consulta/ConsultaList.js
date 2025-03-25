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
import { Sidebar } from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { drawerWidth, drawerWidthClosed } from "../../../components/Sidebar";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, TableChart, ViewModule } from "@mui/icons-material";
import { Link, useLocation,useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8081/api/admin/consulta";

const ConsultaList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [open, setOpen] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [openDialog, setOpenDialog] = useState(false); // Controla a visibilidade do modal
  const [consultaToDelete, setConsultaToDelete] = useState(null); // Armazena a consulta a ser excluída
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Controla o Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensagem do Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Tipo de mensagem (sucesso, erro)

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
    const token = getAuthToken();
    if (token) {
      fetchConsultas(token);
    }
  
    if (state?.message) {
      setSnackbarMessage(state.message);
      setSnackbarSeverity(state.severity);
      setSnackbarOpen(true);
    }
  }, [state]);

  const fetchConsultas = async (token) => {
    
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultas(response.data._embedded.consultaDTOList);
    } catch (error) {
      console.error("Erro ao buscar consultas", error);
      setSnackbarMessage("Erro ao carregar consultas.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id) => {
    const token = getAuthToken();
    try {
      await axios.delete(`${API_URL}/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchConsultas(token);
      setSnackbarMessage("Consulta excluída com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpenDialog(false); // Fecha o modal após a exclusão
    } catch (error) {
      console.error("Erro ao excluir consulta", error);
      setSnackbarMessage("Erro ao excluir consulta.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleOpenDialog = (consulta) => {
    setConsultaToDelete(consulta);
    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const filteredConsultas = consultas.filter((consulta) =>
    consulta.paciente.nome.toLowerCase().includes(search.toLowerCase()) || 
    consulta.medico.nome.toLowerCase().includes(search.toLowerCase())
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
              Consultas
            </Typography>
            <Box>
              <IconButton color="primary" onClick={() => setViewMode("cards")}>
                <ViewModule />
              </IconButton>
              <IconButton color="primary" onClick={() => setViewMode("table")}>
                <TableChart />
              </IconButton>
              <Link to="/consultas/create">
                <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#1976d2", ml: 2 }}>
                  Adicionar Consulta
                </Button>
              </Link>
            </Box>
          </Box>

          <TextField
            label="Buscar Consulta"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {viewMode === "cards" ? (
            <Grid container spacing={3}>
              {filteredConsultas.map((consulta) => (
                <Grid item xs={12} sm={6} md={4} key={consulta.id}>
                  <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", '&:hover': { transform: "scale(1.03)" } }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {consulta.paciente.nome} - {consulta.medico.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Data: {new Date(consulta.dataHora).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Observações: {consulta.observacoes}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Link to={`/consultas/edit?id=${consulta.id}`}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton color="error" onClick={() => handleOpenDialog(consulta)}>
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
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Paciente</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Médico</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Data</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Observações</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredConsultas.map((consulta, index) => (
                    <TableRow 
                      key={consulta.id} 
                      sx={{ 
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white", 
                        transition: "0.3s", '&:hover': { backgroundColor: "#e3f2fd" } 
                      }}
                    >
                      <TableCell>{consulta.id}</TableCell>
                      <TableCell>{consulta.paciente.nome}</TableCell>
                      <TableCell>{consulta.medico.nome}</TableCell>
                      <TableCell>{new Date(consulta.dataHora).toLocaleString()}</TableCell>
                      <TableCell>{consulta.observacoes}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Link to={`/consultas/edit?id=${consulta.id}`}>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton color="error" onClick={() => handleOpenDialog(consulta)}>
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
            Tem certeza que deseja excluir a consulta de {consultaToDelete?.paciente.nome} com {consultaToDelete?.medico.nome}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(consultaToDelete.id)}
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

export default ConsultaList;
