import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = ({ open, drawerWidth, drawerWidthClosed }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "margin-left 0.3s, width 0.3s",
        width: `calc(100% - ${open ? drawerWidth : drawerWidthClosed}px)`,
        ml: `${open ? drawerWidth : drawerWidthClosed}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6">Administração da Clínica</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
