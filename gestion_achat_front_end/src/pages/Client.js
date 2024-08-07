import React, { Component, useState } from 'react';


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
import { Button, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
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
import server from '../config/serverhost';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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


function EditDialog(props) {


    console.log(props.itemChoose)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const values = Object.fromEntries(data.entries());
        values.idClient = props.itemChoose.idClient
        
        props.sendEditData(values)

        props.onClose();
    }
    return (
        <React.Fragment>
            <Dialog
                {...props}
            /* open={open}
            onClose={handleClose} */
            /* PaperProps={{
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                const email = formJson.email;
                console.log(email);
                handleClose();
              },
            }} */
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Modifier le client {props.itemChoose.nom + " " + props.itemChoose.prenom}</DialogTitle>
                    <DialogContent>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: 'auto',
                            }}
                        >
                            <TextField
                                sx={{
                                    pb: 2,
                                }}
                                id=""
                                label="Nom du client"
                                type="text"
                                variant="standard"
                                name='nom'
                                defaultValue={props.itemChoose.nom}
                                /* onChange={handleChange} */
                            />
                            <TextField
                                sx={{
                                    pb: 2,
                                }}
                                id=""
                                label="Prenom du client"
                                type="text"
                                variant="standard"
                                name='prenom'
                                defaultValue={props.itemChoose.prenom}
                                /* onChange={handleChange} */
                            />
                            <TextField
                                sx={{
                                    //pb: 2,
                                }}
                                id=""
                                label="Numero de telephone du client"
                                type="text"
                                variant="standard"
                                name='telephone'
                                defaultValue={props.itemChoose.telephone}
                                /* onChange={handleChange} */
                            />
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Annuler</Button>
                        <Button type="submit" variant="contained" color="success" sx={{ mt: 3, mb: 2 }} /* onClick={handleSubmit} */>Valider</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

class Client extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            client: {},
            clients: [],
            search: '',
            showModalEdit: false,
            itemChoose: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {changeMenu} = this.context;
        changeMenu("client")
        this.load()
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({
            client: { ...prevState.client, [name]: value }
        }));
        console.log(this.state.client)
    }

    load = () => {
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
                this.setState({ clients: result.reverse() })
            })
            .catch(error => console.log('error', error));
    }

    add = () => {
        console.log(this.state.client)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify(this.state.client);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
        };

        fetch(server.url + "/addClient", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.load()
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
    }

    edit = async (data) => {
        this.setState({ itemChoose: '' })
        console.log(data)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var dataForServer = JSON.stringify(data);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: dataForServer,
        };

        await fetch(server.url + "/addClient", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.load()
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
                                        Nouveau client
                                    </Typography>
                                    <TextField
                                        sx={{
                                            pb: 2,
                                        }}
                                        id=""
                                        label="Nom du client"
                                        type="text"
                                        variant="standard"
                                        name='nom'
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <TextField
                                        sx={{
                                            pb: 2,
                                        }}
                                        id=""
                                        label="Prenom du client"
                                        type="text"
                                        variant="standard"
                                        name='prenom'
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <TextField
                                        sx={{
                                            pb: 2,
                                        }}
                                        id=""
                                        label="Numero de telephone du client"
                                        type="text"
                                        variant="standard"
                                        name='telephone'
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="success"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => this.add()}
                                    >
                                        Enregistrer
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
                                        Liste des clients
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
                                                    <StyledTableCell>Client</StyledTableCell>
                                                    <StyledTableCell >Numero</StyledTableCell>
                                                    <StyledTableCell ></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.clients
                                                    .filter((c) => {
                                                        if (this.state.search == "") {
                                                            return c
                                                        } else {
                                                            if ((c.nom.toLowerCase().includes(this.state.search.toLowerCase())) || (c.prenom.toLowerCase().includes(this.state.search.toLowerCase())) || (c.telephone.toLowerCase().includes(this.state.search.toLowerCase()))) {
                                                                return c;
                                                            }
                                                        }
                                                    })
                                                    .map((c) => (
                                                        <StyledTableRow key={c.idClient}>
                                                            <StyledTableCell >
                                                                {c.nom + ' ' + c.prenom}
                                                            </StyledTableCell>
                                                            <StyledTableCell >{c.telephone}</StyledTableCell>
                                                            <StyledTableCell >
                                                                <IconButton onClick={() => this.setState({ showModalEdit: true, itemChoose: c })} color="warming" aria-label="add to shopping cart">
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton disabled color="error" aria-label="add to shopping cart">
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <EditDialog
                    sendEditData={this.edit}
                    open={this.state.showModalEdit}
                    onClose={() => this.setState({ showModalEdit: false })}
                    itemChoose={this.state.itemChoose}
                />
                <ToastContainer></ToastContainer>
            </>
        );
    }
}

export default Client;
