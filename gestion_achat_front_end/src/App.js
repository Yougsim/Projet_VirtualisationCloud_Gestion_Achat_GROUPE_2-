import logo from './logo.svg';
import './App.css';
import { AppBar, Badge, Box, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Client from './pages/Client';
import Header from './Componants/Header';
import Produit from './pages/Produit';

const defaultTheme = createTheme();
function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter basename="/gestionachats">
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header/>
        <Routes>
          <Route index element={<Client/>} />
          <Route path="/Produit" element={<Produit />} />
        </Routes>
      </Box>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
