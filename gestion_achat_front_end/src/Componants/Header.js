import React, { Component } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ListItemButton, ListItemIcon, ListItemText, lighten } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { NavLink } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import AppContext, { AppContextProvider } from '../Context/AppContext';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

class Header extends Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            open: false
        };
    }

    logOut = ()=>{
        const {logOut} = this.context;
        logOut();
    }

    toggleDrawer = () => {
        /* this.setState(prevState => ({
            open: !prevState.open
        })); */
        this.setState({ open: !this.state.open })
    }

    render() {
        const {menu} = this.context;
        const {changeMenu} = this.context;
        console.log(menu)
        return (
            <>
                <AppBar position="absolute" open={this.state.open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => this.toggleDrawer()}
                            sx={{
                                marginRight: '36px',
                                ...(this.state.open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Gestion Achats
                        </Typography>
                        <IconButton color="inherit" onClick={() => this.logOut()}>
                            <Logout fontSize="lg" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={this.state.open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={() => this.toggleDrawer()}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <NavLink to="/" >
                            <ListItemButton onClick={() => changeMenu("dash")} sx={menu == "dash" ? {bgcolor: '#e7e9eb'} : ""}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink to="/Client" >
                            <ListItemButton onClick={() => changeMenu("client")} sx={menu == "client" ? {bgcolor: '#e7e9eb'} : ""}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Clients" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink to="/Produit" >
                            <ListItemButton onClick={() => changeMenu("produit")} sx={menu == "produit" ? {bgcolor: '#e7e9eb'} : ""}>
                                <ListItemIcon>
                                    <Inventory2Icon />
                                </ListItemIcon>
                                <ListItemText primary="Produits" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink to="/Achat" >
                            <ListItemButton onClick={() => changeMenu("achat")} sx={menu == "achat" ? {bgcolor: '#e7e9eb'} : ""}>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Achats" />
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Drawer>
            </>
        );
    }
}

export default Header;
