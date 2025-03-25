import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SidebarPaciente } from "../../../components/Paciente/SidebarPaciente";
import HeaderPaciente from "../../../components/Paciente/HeaderPaciente";
import { drawerWidth, drawerWidthClosed } from "../../../components/Paciente/SidebarPaciente";

const mockMedicos = [
  { id: 1, nome: "Dr. João Silva", especialidade: "Oftalmologista" },
  { id: 2, nome: "Dra. Maria Souza", especialidade: "Optometrista" },
  { id: 3, nome: "Dr. Pedro Oliveira", especialidade: "Oftalmologista" },
];

const mockHorarios = {
  1: ["09:00", "10:00", "11:00", "13:00"],
  2: ["10:00", "14:00", "16:00"],
  3: ["08:00", "09:30", "11:30", "13:30", "15:00"],
};

const AgendarConsultaPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [open, setOpen] = useState(true);

  const handleSelectTime = (medicoId, hora) => {
    setSelectedMedico(medicoId);
    setSelectedTime(hora);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarPaciente open={open} setOpen={setOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          transition: "margin-left 0.3s",
          mt: 8,
        }}
      >
        <HeaderPaciente open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />
        
        <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: "center", borderRadius: "16px" }}>
          <Typography variant="h4" gutterBottom>
            Agendar Nova Consulta
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Escolha um dia para sua consulta
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              minDate={new Date()}
              calendarClassName="custom-calendar"
            />
          </Box>
        </Paper>

        {selectedDate && (
          <>
            <Typography variant="h6" sx={{ mt: 3, textAlign: "center" }}>
              Escolha um horário disponível
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {mockMedicos.map((medico) => (
                <Grid item xs={12} sm={6} md={4} key={medico.id}>
                  <Card sx={{ p: 2, boxShadow: 3, textAlign: "center", borderRadius: "16px" }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">{medico.nome}</Typography>
                      <Typography color="text.secondary">{medico.especialidade}</Typography>
                      <Grid container spacing={1} sx={{ mt: 2, justifyContent: "center" }}>
                        {mockHorarios[medico.id].map((hora) => (
                          <Grid item key={hora}>
                            <Button
                              variant={
                                selectedMedico === medico.id && selectedTime === hora
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() => handleSelectTime(medico.id, hora)}
                              sx={{ m: 0.5, borderRadius: "12px" }}
                            >
                              {hora}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {selectedTime && selectedMedico && (
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5, borderRadius: "12px" }}>
                  Confirmar Agendamento
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AgendarConsultaPage;
