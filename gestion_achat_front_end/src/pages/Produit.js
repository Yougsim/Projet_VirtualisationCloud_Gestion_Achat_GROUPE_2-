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


class Produit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {},
            produits: [],
            search:'',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log(server)
        this.load()
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({
            produit: { ...prevState.produit, [name]: value }
        }));
        console.log(this.state.produit)
    }

    load = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify(this.state.produit);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(server.url+"/allProduits", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.setState({ produits: result })
            })
            .catch(error => console.log('error', error));
    }

    add = () => {
        console.log(this.state.produit)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify(this.state.produit);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
        };

        fetch(server.url+"/addProduit", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.load()
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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                                        Nouveau produit
                                    </Typography>
                                    <TextField
                                        sx={{
                                            pb: 2,
                                        }}
                                        id=""
                                        label="designation du produit"
                                        type="text"
                                        variant="standard"
                                        name='designation'
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <TextField
                                        sx={{
                                            pb: 2,
                                        }}
                                        id=""
                                        label="prix du produit"
                                        type="number"
                                        variant="standard"
                                        name='prix'
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
                                        Liste des produits
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
                                                <TextField onChange={(e) => this.setState({ search: e.target.value })} sx={{width: '330px'}} id="" placeholder='rechercher' label="" variant="standard" />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700, pb: 2 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>produit</StyledTableCell>
                                                    <StyledTableCell >Prix</StyledTableCell>
                                                    <StyledTableCell ></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.produits
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
                                                        <StyledTableCell >
                                                            {c.designation}
                                                        </StyledTableCell>
                                                        <StyledTableCell >{c.prix}</StyledTableCell>
                                                        <StyledTableCell >
                                                            <IconButton color="warming" aria-label="add to shopping cart">
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton color="error" aria-label="add to shopping cart">
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
                    </Container>
                </Box>
            </>
        );
    }
}

export default Produit;
