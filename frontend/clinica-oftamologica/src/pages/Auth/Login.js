import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton, Link, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Usado para email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Controla a visibilidade da senha
  const [role, setRole] = useState(""); // Armazena o papel selecionado
  const [error, setError] = useState(null); // Mensagem de erro

  const navigate = useNavigate(); // Para redirecionar após o login bem-sucedido

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Chama o backend para obter o token do Keycloak
      const response = await axios.post(
        "http://localhost:8081/api/token", // Substitua com o URL correto do seu backend
        {
          username,
          password,
          clientId: "clinica-oftamologica-app", // Ajuste conforme sua configuração
          grantType: "password",
          role, // Envia o papel selecionado no login
        }
      );

      // Armazene o token JWT no localStorage
      localStorage.setItem("access_token", response.data.access_token);

      // Verifique se o token contém a role selecionada
      const token = response.data.access_token;
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o JWT

      const roles = decodedToken.realm_access.roles;
      if (roles.includes(role)) {
        // Redireciona para a página principal após login
        navigate("/dashboard"); // Redireciona para a página de acesso restrito
      } else {
        setError("Você não tem permissão para acessar o sistema.");
      }
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Alterna a visibilidade da senha
  };

  return (
    <Root>
      <PaperWrapper>
        <Title variant="h5">Login</Title>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"} // Alterna o tipo entre texto e senha
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Selecione o papel</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Selecione o papel"
              required
            >
              <MenuItem value="ADMIN">Administrador</MenuItem>
              <MenuItem value="MEDICO">Médico</MenuItem>
              <MenuItem value="PACIENTE">Paciente</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Entrar
          </Button>
        </form>

       {/* Link para "Esqueceu a senha?" */}
       <Link href="/recover-password" variant="body2" sx={{ marginTop: 2 }}>
          Esqueceu a senha?
        </Link>
      </PaperWrapper>
    </Root>
  );
};

export default LoginPage;
