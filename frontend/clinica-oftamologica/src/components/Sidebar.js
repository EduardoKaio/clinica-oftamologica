import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  CssBaseline,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Event as EventIcon,
  LocalHospital as LocalHospitalIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;
const drawerWidthClosed = 60;

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation(); // Para verificar a página atual e destacar no menu

  return (
    <>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        sx={{
          width: open ? drawerWidth : drawerWidthClosed,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : drawerWidthClosed,
            transition: "width 0.3s ease",
            zIndex: (theme) => theme.zIndex.drawer + 2,
          },
        }}
      >
        <List>
          {/* Botão do menu */}
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Menu" />}
          </ListItemButton>

          <Divider />

          {/* Links de navegação */}
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={location.pathname === "/dashboard"}
          >
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/pacientes"
            selected={location.pathname === "/pacientes"}
          >
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            {open && <ListItemText primary="Pacientes" />}
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/consultas"
            selected={location.pathname === "/consultas"}
          >
            <ListItemIcon>
              <EventIcon color="primary" />
            </ListItemIcon>
            {open && <ListItemText primary="Consultas" />}
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/medicos"
            selected={location.pathname === "/medicos"}
          >
            <ListItemIcon>
              <LocalHospitalIcon color="primary" />
            </ListItemIcon>
            {open && <ListItemText primary="Médicos" />}
          </ListItemButton>

          <Divider />

          {/* Botão de Sair */}
          <ListItemButton sx={{ color: "error.main" }}>
            <ListItemIcon>
              <ExitToAppIcon color="error" />
            </ListItemIcon>
            {open && <ListItemText primary="Sair" />}
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export { Sidebar, drawerWidth, drawerWidthClosed };
