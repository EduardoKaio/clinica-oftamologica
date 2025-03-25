import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Estilos com `styled`
const Root = styled(Box)({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f4f6f8",
});

const PaperWrapper = styled(Paper)({
  padding: 32,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
});

const Title = styled(Typography)({
  marginBottom: 24,
});

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Mensagem de status
  const [loading, setLoading] = useState(false); // Para controlar o estado de carregamento

  const navigate = useNavigate();

  const handleRecoverPassword = async (event) => {
    event.preventDefault();
    setLoading(true); // Inicia o carregamento

    try {
      // Requisição para o backend para enviar a recuperação de senha
      const response = await axios.post("http://localhost:8081/api/recover-password", email, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      

      // Sucesso - Mostra a mensagem
      setMessage("Instruções de recuperação de senha enviadas para o seu e-mail.");
    } catch (error) {
      // Erro - Mostra mensagem de erro
      setMessage("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <Root>
      <PaperWrapper>
        <Title variant="h5">Recuperar Senha</Title>
        {message && <Typography color="textSecondary" sx={{ marginBottom: 2 }}>{message}</Typography>}
        <form onSubmit={handleRecoverPassword}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Recuperar Senha"}
          </Button>
        </form>
      </PaperWrapper>
    </Root>
  );
};

export default RecoverPasswordPage;
