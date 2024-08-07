import logo from './logo.svg';
import './App.css';
import { AppBar, Badge, Box, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Client from './pages/Client';
import Header from './Componants/Header';
import Produit from './pages/Produit';
import Achat from './pages/Achat';
import Dash from './pages/Dash';
import Login from './pages/Login';
import AppContext,{AppContextProvider} from './Context/AppContext';


const defaultTheme = createTheme();
function App() {
  const [open, setOpen] = React.useState(true);

  const [connected, setConnected] = React.useState(false);
  const {isconnected} = useContext(AppContext)

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter basename="/gestionachats">
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {isconnected ?
            <>
              <Header />
              <Routes>
                <Route index element={<Dash />} />
                <Route path="/Client" element={<Client />} />
                <Route path="/Produit" element={<Produit />} />
                <Route path="/Achat" element={<Achat />} />
              </Routes>
            </>
            :
            <Routes>
              <Route index element={<Login />} />
            </Routes>
          }

        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
