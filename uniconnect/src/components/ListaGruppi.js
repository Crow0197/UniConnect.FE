import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, Modal, TextField, Alert, Box, Grid } from '@mui/material';
import axios from 'axios';
import useLocalStorage from './../utility/useLocalStorage';
import RichTextEditor from './RichTextEditor';
import { useLoaderData } from 'react-router-dom';

export default function ListaGruppi() {
    const [name, setCurentUser] = useLocalStorage('CURENTUSER', '');

    const [gruppiList, setgruppiList] = useState();
    const [token, setToken] = useLocalStorage('TOKEN', '');
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [request, setRequest] = useState({
        groupName: "",
        description: ""
    });

    const style = {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '45%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const loadData = () => {
        if (token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://localhost:44305/api/Gruppo/gruppi/' + name.id,
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token
                }
            };




            axios.request(config)
                .then((response) => {
                    if (!response.data.errors) {
                        setgruppiList(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }
    useEffect(() => {
        loadData();
    }, [token]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEditorChange = (value) => {
        if (value) {
            const data = JSON.stringify({
                "groupName": request.groupName,
                "description": value,
                "creationDate": new Date(),
                "idUser": name.id
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://localhost:44305/api/Gruppo',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    if (!response.data.errors) {
                        handleClose();
                        setSuccess(true);

                        // Nascondi il messaggio di successo dopo 10 secondi
                        setTimeout(() => {
                            setSuccess(false);
                        }, 10000);
                        loadData();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleLoginInputChange = (event) => {
        const { name, value } = event.target;
        setRequest((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const associationGruop = (groupId) => {
        let data = JSON.stringify({
            "userId": name.id,
            "groupId": groupId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:44305/api/Gruppo/user-group-association',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (!response.data.errors) {        
                    // Nascondi il messaggio di successo dopo 10 secondi
                    setTimeout(() => {
                        setSuccess(false);
                    }, 10000);
                    loadData();
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const disassociateGruop = (groupId) => {
        let data = JSON.stringify({
            "userId": name.id,
            "groupId": groupId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:44305/api/Gruppo/user-group-disassociate',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (!response.data.errors) {        
                    // Nascondi il messaggio di successo dopo 10 secondi
                    setTimeout(() => {
                        setSuccess(false);
                    }, 10000);
                    loadData();
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <div>
            {success && (
                <Alert severity="success" sx={{ marginBottom: '12px' }} onClick={() => setSuccess(false)}>
                    La creazione del gruppo è andata a buon fine.
                </Alert>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h4" sx={{ marginBottom: "2%" }}>
                    I tuoi gruppi
                </Typography>
                <Button
                    onClick={handleOpen}
                    sx={{
                        color: 'white', // Imposta il colore del testo su bianco
                        backgroundColor: '#272727', // Imposta lo sfondo su nero
                        '&:hover': {
                            backgroundColor: 'black', // Cambia lo sfondo al passaggio del mouse
                        },
                    }}
                >
                    Crea un nuovo gruppo
                </Button>
            </div>

            <Grid container spacing={2}>
                {gruppiList && gruppiList.gruppiAssociati.map((gruppo, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {gruppo.groupName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div dangerouslySetInnerHTML={{ __html: gruppo.description }} >
                                    </div>
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button size="small" variant="outlined" color="error"  onClick={()=>disassociateGruop(gruppo.groupId)}>ABBANDONA GRUPPO</Button>

                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <Typography variant="h4" component="h4" sx={{ marginBottom: "2%" }}>
                Gruppi creati da te
            </Typography>

            <Grid container spacing={2}>
                {gruppiList && gruppiList.gruppiCreati.map((gruppo, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {gruppo.groupName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div dangerouslySetInnerHTML={{ __html: gruppo.description }} >
                                    </div>
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button size="small"  variant="outlined" color="error" onClick={()=>disassociateGruop(gruppo.groupId)}>ABBANDONA GRUPPO</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <Typography variant="h4" component="h4" sx={{ marginBottom: "2%" }}>
                Cerchi qualcosa di nuovo ?
            </Typography>

            <Grid container spacing={2}>
                {gruppiList && gruppiList.altriGruppi.map((gruppo, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {gruppo.groupName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div dangerouslySetInnerHTML={{ __html: gruppo.description }} >
                                    </div>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="outlined"  onClick={()=>associationGruop(gruppo.groupId)}>UNISCITI</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Crea il tuo gruppo
                        </Typography>

                        <TextField
                            label="Nome Gruppo"
                            name="groupName"
                            value={request.groupName}
                            onChange={handleLoginInputChange}
                            fullWidth
                            margin="normal"
                        />

                        <RichTextEditor
                            value={request.description}
                            onSendClick={handleEditorChange}
                        />
                    </Box>
                </Modal>
            </div>
        </div >
    );
}
