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
import { Link,useLocation } from "react-router-dom"; // Importando o Link

const API_URL = "http://localhost:8080/api/paciente";

const PacienteList = () => {
  const location = useLocation();
  const { state } = location;
  const [open, setOpen] = useState(true);
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [openDialog, setOpenDialog] = useState(false); // Controla a visibilidade do modal
  const [patientToDelete, setPatientToDelete] = useState(null); // Armazena o paciente a ser excluído
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Controla o Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensagem do Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Tipo de mensagem (sucesso, erro)

  useEffect(() => {
    fetchPacientes();
    if (state?.message) {
      setSnackbarMessage(state.message);
      setSnackbarSeverity(state.severity);
      setSnackbarOpen(true);
    }
  }, [state]);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get(API_URL);
      setPacientes(response.data._embedded.pacienteDTOList);
    } catch (error) {
      console.error("Erro ao buscar pacientes", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPacientes();
      setSnackbarMessage("Paciente excluído com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpenDialog(false); // Fecha o modal após a exclusão
    } catch (error) {
      console.error("Erro ao excluir paciente", error);
      setSnackbarMessage("Erro ao excluir paciente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleOpenDialog = (paciente) => {
    setPatientToDelete(paciente);
    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(search.toLowerCase())
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
              Pacientes
            </Typography>
            <Box>
              <IconButton color="primary" onClick={() => setViewMode("cards")}>
                <ViewModule />
              </IconButton>
              <IconButton color="primary" onClick={() => setViewMode("table")}>
                <TableChart />
              </IconButton>
              <Link to="/pacientes/create">
                <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#1976d2", ml: 2 }}>
                  Adicionar Paciente
                </Button>
              </Link>
            </Box>
          </Box>

          <TextField
            label="Buscar Paciente"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {viewMode === "cards" ? (
            <Grid container spacing={3}>
              {filteredPacientes.map((paciente) => (
                <Grid item xs={12} sm={6} md={4} key={paciente.id}>
                  <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", '&:hover': { transform: "scale(1.03)" } }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {paciente.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        E-mail: {paciente.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        CPF: {paciente.cpf}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Celular: {paciente.celular}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Link to={`/pacientes/edit?id=${paciente.id}`}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton color="error" onClick={() => handleOpenDialog(paciente)}>
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
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>CPF</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>E-mail</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Celular</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPacientes.map((paciente, index) => (
                    <TableRow 
                      key={paciente.id} 
                      sx={{ 
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white", 
                        transition: "0.3s", '&:hover': { backgroundColor: "#e3f2fd" } 
                      }}
                    >
                      <TableCell>{paciente.id}</TableCell>
                      <TableCell>{paciente.nome}</TableCell>
                      <TableCell>{paciente.cpf}</TableCell>
                      <TableCell>{paciente.email}</TableCell>
                      <TableCell>{paciente.celular}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Link to={`/pacientes/edit?id=${paciente.id}`}>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton color="error" onClick={() => handleOpenDialog(paciente)}>
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
            Tem certeza que deseja excluir o paciente {patientToDelete?.nome}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(patientToDelete.id)}
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

export default PacienteList;
