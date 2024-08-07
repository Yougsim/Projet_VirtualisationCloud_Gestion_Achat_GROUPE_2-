import React, { Component } from 'react';

import server from '../config/serverhost';

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
import { Guid } from 'js-guid';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{}}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class Achat extends Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.produit = [];
        this.produitsToSend = [];
        this.montantAchat = 0;
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
            montantAchat: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangetab = this.handleChangetab.bind(this);
    }

    componentDidMount() {
        console.log(server)
        const {changeMenu} = this.context;
        changeMenu("achat")
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

    loadClients = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify(this.state.client);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch(server.url + "/allClients", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.setState({ clients: result })
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
                this.setState({ achats: result.reverse() })
            })
            .catch(error => console.log('error', error));
    }

    deleteFromPanier = (produit) => {
        console.log(produit.id)
        let prod = this.state.achatProduits
        const index = prod.indexOf(produit);
        console.log(index)

        const delatedProduit = prod.splice(index, 1);
        this.montantAchat = this.montantAchat - produit.quantite * produit.prix
        this.setState({ montantAchat: this.montantAchat })

        this.setState({ achatProduits: prod })
    }

    addTopanier = async () => {

        console.log(this.state.produit)
        var p = {
            "idProduit": this.state.produit.idProduit,
            "quantite": this.state.produit.quantite,
            "id_produit": this.state.produit.idProduit
        }

        const name = "id";
        await this.setState(prevState => ({
            produit: { ...prevState.produit, [name]: Guid.newGuid().toString() }
        }));
        console.log(p)
        this.montantAchat = this.montantAchat + this.state.produit.quantite * this.state.produit.prix
        this.setState({ montantAchat: this.montantAchat })
        this.produit?.push(this.state.produit)
        console.log(this.produit)
        this.produitsToSend?.push(p)
        this.setState({ achatProduits: this.produit })
        this.setState({ achatProduitsToSend: this.produitsToSend })
        console.log(this.state.achatProduits)
        console.log(this.state.achatProduitsToSend)
    }

    addAchat = async () => {
        console.log(this.state.client)
        console.log(this.state.achatProduitsToSend)
        console.log(this.state.montantAchat)
        let prod = []
        if (this.state.client.idClient && this.state.achatProduits.length !== 0) {
            this.state.achatProduits.forEach(a => {
                this.montantAchat = this.montantAchat + a.quantite * a.prix
                var p = {
                    "idProduit": a.idProduit,
                    "quantite": a.quantite,
                    "id_produit": a.idProduit
                }
                prod.push(p)
            });
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var data = JSON.stringify({
                "dateAchat": this.state.dateAchat,
                "montant": this.state.montantAchat,
                "produits": prod
            });

            console.log(data)

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: data,
            };


            await fetch(server.url + "/addAchat/" + this.state.client.idClient, requestOptions)
                .then(response => response.json())
                .then(async (result) => {
                    console.log(result)
                    this.produit = [];
                    this.produitsToSend = [];
                    this.montantAchat = 0;
                    await this.setState({ achatProduits: new Array(), produit: {},montantAchat:0 })
                    this.loadAchats()
                    this.handleChangetab("e", 1)
                    toast.success('Operation reussie', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                })
                .catch(error => console.log('error', error));
        } else {
            console.log("error")
            toast.error('Veuillez selectionnez des produits et un client', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }

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
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Container sx={{ mt: 2 }}>
                            <Tabs value={this.state.valueTab} aria-label="basic tabs example">
                                <Tab label="Nouvel achat" {...a11yProps(0)} onClick={(e) => this.handleChangetab(e, 0)} />
                                <Tab label="Liste des achats" {...a11yProps(1)} onClick={(e) => this.handleChangetab(e, 1)} />
                            </Tabs>
                        </Container>
                    </Box>
                    <CustomTabPanel value={this.state.valueTab} index={0}>
                        <Box sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 'auto',
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Achat
                                        </Typography>
                                        <Autocomplete
                                            id="size-small-standard"
                                            size="small"
                                            options={this.state.produits}
                                            getOptionLabel={(option) => option.designation}
                                            autoSelect={true}
                                            sx={{ pb: 2, }}
                                            onChange={(event, value) => this.chooseProduit(event, value)}
                                            /* defaultValue={top100Films[13]} */
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Produit"
                                                    placeholder="selectionnez un produit"

                                                />
                                            )}
                                        />
                                        <TextField
                                            sx={{
                                                pb: 2,
                                            }}
                                            id=""
                                            label="Quantité achheté"
                                            type="number"
                                            variant="standard"
                                            name='quantite'
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={() => this.addTopanier()}
                                        >
                                            Ajouter au panier
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={8} lg={8}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 'auto',
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Panier | {this.state.montantAchat}  FCFA
                                        </Typography>
                                        <Box sx={{ pb: 2 }} >
                                            <Autocomplete
                                                id="size-small-standard"
                                                size="md"
                                                options={this.state.clients}
                                                getOptionLabel={(option) => option.nom + " " + option.prenom + " " + option.telephone}
                                                autoSelect={true}
                                                sx={{ pb: 2, }}
                                                onChange={(event, value) => this.setState({ client: value })}
                                                /* defaultValue={top100Films[13]} */
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Client"
                                                        placeholder="selectionnez un client"

                                                    />
                                                )}
                                            />
                                        </Box>
                                        <Box sx={{ pb: 2 }} >
                                            <Typography variant="caption" display="block" gutterBottom>
                                                Date de l'achat
                                            </Typography>
                                            <TextField
                                                sx={{
                                                    pb: 2, width: '100%'
                                                }}
                                                id=""
                                                type="date"
                                                variant="standard"
                                                name='date'
                                                onChange={(e) => this.handleChangeDateAchat(e)}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', pb: 2 }} >
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="flex-end"
                                                alignItems="flex-end"
                                            >
                                                <Grid >
                                                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                    <TextField onChange={(e) => this.setState({ search: e.target.value })} sx={{ width: '330px' }} id="" placeholder='rechercher' label="" variant="standard" />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700, pb: 2 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell>produit</StyledTableCell>
                                                        <StyledTableCell >Prix</StyledTableCell>
                                                        <StyledTableCell >Quantité</StyledTableCell>
                                                        <StyledTableCell >Montant</StyledTableCell>
                                                        <StyledTableCell ></StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.achatProduits
                                                        .filter((c) => {
                                                            if (this.state.search == "") {
                                                                return c
                                                            } else {
                                                                if ((c.designation.toLowerCase().includes(this.state.search.toLowerCase())) || c.prix == this.state.search) {
                                                                    return c;
                                                                }
                                                            }
                                                        })
                                                        .map((c) => (
                                                            <StyledTableRow key={c.id}>
                                                                <StyledTableCell >{c.designation}</StyledTableCell>
                                                                <StyledTableCell >{c.prix}</StyledTableCell>
                                                                <StyledTableCell >{c.quantite}</StyledTableCell>
                                                                <StyledTableCell >{c.quantite * c.prix}</StyledTableCell>
                                                                <StyledTableCell >
                                                                    <IconButton color="warming" aria-label="add to shopping cart">
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                    <IconButton color="error" onClick={() => this.deleteFromPanier(c)} aria-label="add to shopping cart">
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                    <Fab onClick={() => this.addAchat()} variant="extended" color="success" sx={{ position: 'absolute', top: 100, right: 155, }}>
                                        <NavigationIcon sx={{
                                            mr: 1,
                                        }} />
                                        Enregistrer l'achat
                                    </Fab>
                                </Grid>
                            </Grid>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={this.state.valueTab} index={1}>
                        <Box sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }}>
                            <Grid spacing={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 'auto',
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        Les achats
                                    </Typography>
                                    <Box sx={{ display: 'flex', pb: 2 }} >
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <Grid >
                                                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField onChange={(e) => this.setState({ search: e.target.value })} sx={{ width: '330px' }} id="" placeholder='rechercher' label="" variant="standard" />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700, pb: 2 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Date</StyledTableCell>
                                                    <StyledTableCell >Montant</StyledTableCell>
                                                    <StyledTableCell >Client</StyledTableCell>
                                                    <StyledTableCell >Montant</StyledTableCell>
                                                    <StyledTableCell ></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.achats
                                                    .filter((c) => {
                                                        if (this.state.search == "") {
                                                            return c
                                                        } else {
                                                            if ((c.client.nom.toLowerCase().includes(this.state.search.toLowerCase()))) {
                                                                return c;
                                                            }
                                                        }
                                                    })
                                                    .map((c) => (
                                                        <StyledTableRow key={c.id}>
                                                            <StyledTableCell >{c.dateAchat}</StyledTableCell>
                                                            <StyledTableCell >{c.montant}</StyledTableCell>
                                                            <StyledTableCell >{c.client.nom + " " + c.client.prenom}</StyledTableCell>
                                                            <StyledTableCell >{ }</StyledTableCell>
                                                            <StyledTableCell >
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Box>
                    </CustomTabPanel>
                </Box>
                <ToastContainer></ToastContainer>
            </>
        );
    }
}

export default Achat;
