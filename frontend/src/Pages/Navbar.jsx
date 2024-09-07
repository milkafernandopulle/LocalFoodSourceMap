import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import YardIcon from '@mui/icons-material/Yard';

const NavBar = () => {

  const handleLogin = () => {
    window.location.href = '/login';
};

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';

  };

  const user = JSON.parse(localStorage.getItem('user'));

  const navStyle = {
    backgroundColor: 'green', // Dark blue color for the AppBar, adjust the color to match your brand
    color: 'white', // Text and icons color
    height: '64px', // Fixed height for the NavBar
  };

  return (
    <AppBar position="static" style={{ backgroundColor: navStyle.backgroundColor, height: navStyle.height }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <YardIcon /> 
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Farmer {/* Replace with your brand name */}
        </Typography>
        <Box>
          {/* For proper alignment and spacing of the buttons, wrap them in a Box */}
          {user ? (
            <Button variant="contained" color="primary" sx={{ margin: '0 8px' ,bgcolor:'black'}} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="contained" color="primary" sx={{ margin: '0 8px' ,bgcolor:'black'}} onClick={handleLogin}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
