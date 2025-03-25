import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Event as EventIcon,
  LocalHospital as LocalHospitalIcon,
  ExitToApp as ExitToAppIcon,
  Assignment as AssignmentIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;
const drawerWidthClosed = 60;

const SidebarPaciente = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

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
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Menu" />}
          </ListItemButton>

          <Divider />

          <ListItemButton component={Link} to="/paciente/home" selected={location.pathname === "/paciente/home"}>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>

          <ListItemButton component={Link} to="/exames" selected={location.pathname === "/exames"}>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            {open && <ListItemText primary="Exames" />}
          </ListItemButton>

          <ListItemButton component={Link} to="/paciente/consultas" selected={location.pathname === "/paciente/consultas"}>
            <ListItemIcon>
              <EventIcon color="primary" />
            </ListItemIcon>
            {open && <ListItemText primary="Consultas" />}
          </ListItemButton>

          <ListItemButton component={Link} to="/paciente/medicos" selected={location.pathname === "/paciente/medicos"}>
            <ListItemIcon>
              <LocalHospitalIcon color="primary" />
            </ListItemIcon>
            {open && <ListItemText primary="Médicos" />}
          </ListItemButton>

          <Divider />

          <ListItemButton sx={{ color: "error.main" }} onClick={handleLogout}>
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

export { SidebarPaciente, drawerWidth, drawerWidthClosed };
