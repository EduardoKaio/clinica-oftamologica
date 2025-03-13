import React, { useState, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemIcon,
  Paper,
} from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ onLogout, onSupport }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null); // Estado para armazenar informações do usuário
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Função para realizar o logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  // Função para buscar as informações do usuário
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await fetch("http://localhost:8081/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        // Processando a role do usuário
        const roles = data.roles?.roles || [];
        const userRole = roles.includes("ADMIN")
          ? "ADMIN"
          : roles.includes("MEDICO")
          ? "MEDICO"
          : roles.includes("PACIENTE")
          ? "PACIENTE"
          : "USUÁRIO";

        setUser({ ...data, role: userRole }); // Atualiza o estado com as informações do usuário e a role
      } else {
        console.error("Falha ao obter as informações do usuário");
      }
    }
  };

  // Carregar as informações do usuário assim que o componente for montado
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleOpenMenu} size="small">
        <Avatar src={user?.photoUrl} alt={user?.name} sx={{ width: 40, height: 40 }}>
          {user?.name ? user.name.charAt(0) : ""}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          component: Paper,
          elevation: 4,
          sx: {
            mt: 1.5,
            borderRadius: 2,
            width: 240,
            overflow: "visible",
            filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.15))",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 16,
              width: 12,
              height: 12,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ p: 2, textAlign: "center", bgcolor: "primary.main", color: "white", borderRadius: "8px 8px 0 0" }}>
          <Avatar src={user?.photoUrl} alt={user?.name} sx={{ width: 56, height: 56, mx: "auto", mb: 1 }} />
          <Typography variant="subtitle1">{user?.name || "Usuário"}</Typography>
          <Typography variant="body2">{user?.email || "email@exemplo.com"}</Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic", opacity: 0.8 }}>
            {user?.role === "ADMIN"
              ? "Administrador"
              : user?.role === "MEDICO"
              ? "Médico"
              : user?.role === "PACIENTE"
              ? "Paciente"
              : "Usuário"}
          </Typography>
        </Box>

        <MenuItem onClick={handleCloseMenu} sx={{ px: 2, py: 1.5 }}>
          <ListItemIcon>
            <Settings fontSize="medium" />
          </ListItemIcon>
          <Typography variant="body1">Configuração</Typography>
        </MenuItem>

        <MenuItem onClick={handleLogout} sx={{ px: 2, py: 1.5, color: "error.main" }}>
          <ListItemIcon>
            <Logout fontSize="medium" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <Typography variant="body1">Sair</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
