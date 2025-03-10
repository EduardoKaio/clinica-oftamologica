import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton, Link } from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

  const handleLogin = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação depois
    console.log("Login com", { username, password });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Alterna a visibilidade da senha
  };

  return (
    <Root>
      <PaperWrapper>
        <Title variant="h5">Login</Title>
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
        <Link href="#" variant="body2" sx={{ marginTop: 2 }}>
          Esqueceu a senha?
        </Link>
      </PaperWrapper>
    </Root>
  );
};

export default LoginPage;
