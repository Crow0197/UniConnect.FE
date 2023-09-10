import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import useLocalStorage from './../utility/useLocalStorage'; // Assicurati di specificare il percorso corretto
import { Alert, Avatar, Box, Grid, Typography } from '@mui/material';
import UploadFile from './UploadFile';


function SignedIn() {
    const [name, setCurentUser] = useLocalStorage('CURENTUSER', '');
    const [token, setToken] = useLocalStorage('TOKEN', '');

    const [activeTab, setActiveTab] = useState(0);

    const [errorLogin, setErrorLogin] = useState();
    const [errorRegister, setErrorRegister] = useState();

    const [fileLoad, setFileLoad] = React.useState([]);



    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: '',
        avatar: null,
    });

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleLoginInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegistrationInputChange = (event) => {
        const { name, value } = event.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const startLogin = (event) => {
        if (event) event.preventDefault();
        let data = JSON.stringify({
            "email": loginData.email,
            "password": loginData.password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:44305/api/AuthManagement/Login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (!response.data.errors) {
                    setCurentUser(response.data.user);
                    setToken(response.data.token);
                    window.location.reload();
                }
                else {

                    setErrorLogin(response.data.errors);
                }


            })
            .catch((error) => {
                console.log(error);
            });

    };


    const startRegister = (event) => {

        let data = JSON.stringify({
            "email": registrationData.email,
            "name": registrationData.name,
            "password": registrationData.password,
            "avatar": fileLoad[0] ? fileLoad[0].data : "",
            "universita": registrationData.universita,
        });


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:44305/api/AuthManagement/Register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (!response.data.errors) {
                    setCurentUser(response.data.user);
                    setToken(response.data.token);
                    window.location.href = '/';

                }
                else {

                    setErrorRegister(response.data.errors);
                }

            })
            .catch((error) => {
                console.log(error);
            });

    };


    return (<div>

        <Typography variant="h4" component="h4" sx={{ marginBottom: "2%" }}>
            Accedi o Registrati
        </Typography>

        {errorLogin &&
            <Alert severity="error" sx={{ marginBottom: '12px' }}>
                "Mi dispiace, ma il login non è riuscito. Verifica le tue credenziali e assicurati di inserire le informazioni corrette. Se hai dimenticato la tua password, puoi reimpostarla seguendo le istruzioni appropriate. Per ulteriori assistenza, contatta il nostro supporto tecnico."
            </Alert>
        }

        {errorRegister &&
            <Alert severity="error" sx={{ marginBottom: '12px' }}>
                Ops! Qualcosa è andato storto durante la registrazione. Si prega di verificare di aver inserito tutte le informazioni corrette e di riprovare. Se il problema persiste, contattare il supporto tecnico per ulteriori assistenza.
            </Alert>
        }



        <Card sx={{ backgroundColor: '#00000087', color: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>

            <CardContent>
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ color: 'white' }}>
                    <Tab label="Login" />
                    <Tab label="Registrazione" />
                </Tabs>

                {activeTab === 0 && (
                    <form onSubmit={startLogin}>
                        <Grid container spacing={2} alignItems="center" sx={{
                            paddingLeft: "4%"
                        }}>

                            <Grid item xs={5} sm={12} lg={5}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={loginData.email}
                                    onChange={handleLoginInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={5} sm={12} lg={5}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={handleLoginInputChange}
                                    fullWidth
                                    margin="normal"
                                /></Grid>
                            <Grid item xs={2} sm={12} lg={2}>
                                <Box display="flex" >
                                    <Button variant="contained" color="primary" onClick={startLogin}>
                                        <Typography
                                            variant="h5"
                                            noWrap
                                            component="a"
                                            href="/"
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: 'white', // Colore del testo bianco
                                                textDecoration: 'none',
                                                fontSize: "15px"
                                            }}
                                        >
                                            Accedi
                                        </Typography>
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                )}

                {activeTab === 1 && (
                    <form >
                        <Grid container spacing={2} padding={4}>
                            <Grid item xs={9}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    type="text"
                                    value={registrationData.name}
                                    onChange={handleRegistrationInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={registrationData.email}
                                    onChange={handleRegistrationInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Università"
                                    name="universita"
                                    type="text"
                                    value={registrationData.universita}
                                    onChange={handleRegistrationInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={registrationData.password}
                                    onChange={handleRegistrationInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Conferma Password"
                                    name="cPassword"
                                    type="password"
                                    value={registrationData.cPassword}
                                    onChange={handleRegistrationInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Grid container>
                                    <Grid item xs={6} sx={{ alignItems: "flex-end" }}> <Button variant="contained" color="primary" onClick={() => startRegister()} disabled={registrationData.password === '' || registrationData.password !== registrationData.cPassword}>
                                        Registrati
                                    </Button></Grid>

                                </Grid>





                            </Grid>
                            <Grid item xs={3}>

                                <Grid item xs={12}>
                                    <Avatar
                                        alt={registrationData.name}
                                        src={fileLoad[0] ? fileLoad[0].data : ""}
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            margin: '0 auto',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}  sx={{ paddingTop: "5px", marginTop: "5px", paddingLeft:"35px" }}>
                                    <UploadFile sx={{ paddingTop: "15px" }} onSendClick={setFileLoad} label="CARICA AVATAR" sigleMode="true"></UploadFile>
                                </Grid>
                                <Typography mt={2}>

                                    <b>Dati inseriti:</b>
                                    <br />
                                    <b>Nome</b>: {registrationData.name}
                                    <br />
                                    <b>Email</b>: {registrationData.email}
                                    <br />
                                    <br />

                                </Typography>
                            </Grid>
                        </Grid>

                    </form>
                )
                }
            </CardContent >

        </Card ></div >
    );
}

export default SignedIn;
