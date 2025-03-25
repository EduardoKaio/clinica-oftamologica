import React, { useState } from "react";
import { Container, Grid, Typography, Box, Toolbar } from "@mui/material";
import { SidebarPaciente, drawerWidth, drawerWidthClosed } from "../../../components/Paciente/SidebarPaciente";
import HeaderPaciente from "../../../components/Paciente/HeaderPaciente";
import ChatbotPaciente from "../../../components/Paciente/ChatBotPaciente"; // Importando o componente já criado
import { motion } from "framer-motion";

const ChatbotPacientePage = () => {
  const [open, setOpen] = useState(true);

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
        }}
      >
        <HeaderPaciente open={open} drawerWidth={drawerWidth} drawerWidthClosed={drawerWidthClosed} />
        <Toolbar />

        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h4" gutterBottom>
              Atendimento Virtual com Inteligência Artificial
            </Typography>

            <Grid container justifyContent="center">
              <Grid item xs={12} md={8} lg={6}>
                <ChatbotPaciente />
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default ChatbotPacientePage;
