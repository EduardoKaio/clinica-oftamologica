import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import UserMenu from '../UserMenu';

const HeaderPaciente = ({ open, drawerWidth, drawerWidthClosed, user, onLogout }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: 'margin-left 0.3s, width 0.3s',
        width: `calc(100% - ${open ? drawerWidth : drawerWidthClosed}px)`,
        ml: `${open ? drawerWidth : drawerWidthClosed}px`,
      }}
    >
      <Toolbar>
        {/* Área de usuário: avatar com menu */}
        
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Typography variant="h6">
            Clínica Oftamológica
          </Typography>
        </Box>

        <UserMenu user={user} onLogout={onLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPaciente;
