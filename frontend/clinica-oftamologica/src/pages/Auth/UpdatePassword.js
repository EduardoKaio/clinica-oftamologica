import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

// Estilos
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

const UpdatePasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Captura o token da URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true); // Para validar se o token é válido

  // Se não houver token na URL, exibe erro
  useEffect(() => {
    if (!token) {
      setValidToken(false);
      setMessage("Token de recuperação inválido.");
    }
  }, [token]);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      // Envia a nova senha para o Keycloak
      await axios.post("http://localhost:8080/auth/realms/clinica-oftamologica/login-actions/reset-credentials", {
        token,
        password,
      });

      setMessage("Senha alterada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 3000); // Redireciona para o login
    } catch (error) {
      setMessage("Erro ao redefinir senha. O token pode estar expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Root>
      <PaperWrapper>
        <Title variant="h5">Atualizar Senha</Title>

        {!validToken ? (
          <Typography color="error">{message}</Typography>
        ) : (
          <>
            {message && <Typography color="textSecondary">{message}</Typography>}
            <form onSubmit={handleUpdatePassword}>
              <TextField
                label="Nova Senha"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                label="Confirmar Senha"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Alterar Senha"}
              </Button>
            </form>
          </>
        )}
      </PaperWrapper>
    </Root>
  );
};

export default UpdatePasswordPage;
