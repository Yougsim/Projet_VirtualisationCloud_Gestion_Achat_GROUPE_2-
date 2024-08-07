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
import { Autocomplete, Button, Fab, ListItemButton, ListItemIcon, ListItemText, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import NavigationIcon from '@mui/icons-material/Navigation';
import server from '../config/serverhost';

import AppContext, { AppContextProvider } from '../Context/AppContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


class Dash extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.produit = [];
        this.produitsToSend = [];
        this.montantAchat = 0;
        this.ordre = 1;
        this.state = {
            produit: {},
            produits: [],
            achatProduits: [],
            achatProduitsToSend: [],
            client: {},
            clients: [],
            achats: [],
            achat: {},
            valueTab: 0,
            produitToSend: {},
            search: '',
            dateAchat: "",
            montantAchat: 0,
            bestClients: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangetab = this.handleChangetab.bind(this);
    }

    componentDidMount() {
        console.log(server)
        const {changeMenu} = this.context;
        changeMenu("dash")
        this.loadClients();
        this.loadProduits();
        this.loadAchats();
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value)
        this.setState(prevState => ({
            produit: { ...prevState.produit, [name]: value }
        }));
        console.log(this.state.produit)
    }

    handleChangeDateAchat = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ dateAchat: value })
        console.log(value)
        /* this.setState(prevState => ({
            produit: { ...prevState.produit, [name]: value }
        }));
        //console.log(this.state.produit) */
    }

    chooseProduit = (event, value) => {
        this.setState({ produit: value })
        console.log(this.state.produit)
    }

    handleChangetab = (event, newValue) => {
        this.setState({ valueTab: newValue })
        console.log(this.setState.valueTab)
    };

    loadProduits = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify(this.state.produit);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(server.url + "/allProduits", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.setState({ produits: result })
            })
            .catch(error => console.log('error', error));
    }

    loadClients = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify(this.state.client);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        await fetch(server.url + "/allClients", requestOptions)
            .then(response => response.json())
            .then(async (result) => {
                console.log(result)
                var p = [];
                await result.forEach(async e => {
                    let x = e;
                    e.total = 0
                    await e.achats.forEach(async (a) => {
                        e.total = e.total + a.montant
                    })
                    //p.push(x)
                });
                await result.sort(function (a, b) { return b.total - a.total });
                console.log(result)
                await this.setState({ clients: result })
                //console.log(this.state.clients)
            })
            .catch(error => console.log('error', error));
    }

    loadAchats = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify(this.state.client);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch(server.url + "/allAchats", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                result.map((c) => {
                    this.montantAchat = this.montantAchat + c.montant
                    this.setState({ montantAchat: this.montantAchat })
                })
                this.setState({ achats: result.reverse() })
            })
            .catch(error => console.log('error', error));
    }

    renderBetsClients() {
        const renderedItems = [];
        for (let i = 0; i < this.state.clients.length; i++) {
            renderedItems.push(
                <StyledTableRow key={this.state.clients[i].idClient}>
                    <StyledTableCell >{ i+1 }</StyledTableCell>
                    <StyledTableCell >{this.state.clients[i].nom + ' ' + this.state.clients[i].prenom}</StyledTableCell>
                    <StyledTableCell >{this.state.clients[i].telephone}</StyledTableCell>
                    <StyledTableCell >{this.state.clients[i].achats.length}</StyledTableCell>
                    <StyledTableCell >{this.state.clients[i].total} FCFA</StyledTableCell>
                </StyledTableRow>
            );
        }
        return renderedItems;
    }

    render() {
        return (
            <>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}>
                    <Toolbar />
                    <Box sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 'auto',
                                    }}
                                >
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Nombre de clients
                                    </Typography>
                                    <Typography component="p" variant="h4">
                                        {this.state.clients.length}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 'auto',
                                        bgcolor: '#2196f3',
                                    }}
                                >
                                    <Typography component="h2" variant="h6" color="white" gutterBottom>
                                        Nombre de produit
                                    </Typography>
                                    <Typography component="p" color="white" variant="h4">
                                        {this.state.produits.length}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 'auto',
                                        bgcolor: '#ff9100',
                                    }}
                                >
                                    <Typography component="h2" variant="h6" color="black" gutterBottom>
                                        Nombre d'achat
                                    </Typography>
                                    <Typography component="p" color="black" variant="h4">
                                        {this.state.achats.length}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 'auto',
                                        bgcolor: '#4caf50',
                                    }}
                                >
                                    <Typography component="h2" variant="h6" color="white" gutterBottom>
                                        Total des achats (FCFA)
                                    </Typography>
                                    <Typography component="p" color="white" variant="h4">
                                        {this.state.montantAchat}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid >
                            <Grid sx={{ mt: 4 }} item xs={12} >
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 'auto',
                                    }}
                                >
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Meilleurs clients
                                    </Typography>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700, pb: 2 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell></StyledTableCell>
                                                    <StyledTableCell>Client</StyledTableCell>
                                                    <StyledTableCell >Numero de telephone</StyledTableCell>
                                                    <StyledTableCell >Nombre achat</StyledTableCell>
                                                    <StyledTableCell >Montan total des achats</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.renderBetsClients()}
                                                {/* {this.state.clients
                                                    .map((c) => (
                                                        <StyledTableRow key={c.idClient}>
                                                            <StyledTableCell >{parseInt(this.ordre++)}</StyledTableCell>
                                                            <StyledTableCell >{c.nom + ' ' + c.prenom}</StyledTableCell>
                                                            <StyledTableCell >{c.telephone}</StyledTableCell>
                                                            <StyledTableCell >{c.achats.length}</StyledTableCell>
                                                            <StyledTableCell >{c.total}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))} */}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </>
        );
    }
}

export default Dash;
