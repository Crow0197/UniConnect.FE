import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import useLocalStorage from './../utility/useLocalStorage'; // Assicurati di specificare il percorso corretto
import { Alert, Avatar, Box, Grid, MenuItem, Modal, Select, Typography } from '@mui/material';
import CardPost from './CardPost';
import RichTextEditor from './RichTextEditor';
import moment from 'moment';

import UploadFile from './UploadFile'
import LoadingOverlay from './LoadingOverlay';

function HomePage() {
    const [token, setToken] = useLocalStorage('TOKEN', '');
    const [postList, setPostList] = React.useState();
    const [loading, setLoading] = React.useState(true);


    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [fileLoad, setFileLoad] = React.useState([]);


    useEffect(() => {
    }, [fileLoad]);



    useEffect(() => {
        loadData();
    }, []);

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




    const handleEditorChange = (value) => {
        if (value) {
            let data = JSON.stringify({
                "content": value,
                "timestamp": new Date(),
                "userId": name.id,
                "groupId": categoria,

                "filesBase": fileLoad.map(file => ({ "filesBase64": file.data, "fileName": file.name }))
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://localhost:44305/api/Post',
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

    const handleLoginInputChange = (e) => {

        const { name, value } = e.target;
        setRequest((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const [name, setCurentUser] = useLocalStorage('CURENTUSER', '');

    const [gruppiList, setgruppiList] = useState();
    const [categoria, setCategoria] = useState();

    const [success, setSuccess] = useState(false);
    const [request, setRequest] = useState({
        groupName: "",
        description: ""
    });

  

    const loadData = () => {
        setLoading(true);
        if (token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://localhost:44305/api/Gruppo/gruppi-master-data/' + name.id,
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


            config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://localhost:44305/api/Post',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };


            axios.request(config)
                .then((response) => {
                    if (!response.data.errors) {
                        setPostList(response.data);
                        setLoading(false);
                    }
                    else {

                    }


                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }







    return (<div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h4" sx={{ marginBottom: "2%" }}>
                Home
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
                Crea un nuovo post
            </Button>
        </div>

        {loading && <LoadingOverlay></LoadingOverlay>}



        {postList &&
            postList
                .map((post) => ({
                    ...post,
                    timestamp: moment(post.timestamp), // Converte la stringa timestamp in un oggetto moment
                }))
                .sort((a, b) => b.timestamp - a.timestamp) // Ordina in base al timestamp decrescente
                .map((post, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{marginBottom:"15px"}}>
                        <Card sx={{ backgroundColor: '#00000087', color: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                            <CardContent>
                                <CardPost>{post}</CardPost>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}



        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nuovo Post
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h7" component="h7">
                                Gruppo
                            </Typography>
                            <Select
                                sx={{ marginBottom: "10px" }}
                                placeholder="Nome Gruppo"
                                name="selectedGroupId"
                                value={request.selectedGroupId}
                                onChange={(e) => setCategoria(e.target.value)}
                                fullWidth
                                margin="normal"
                            >
                                {gruppiList && gruppiList.map((gruppo) => (
                                    <MenuItem key={gruppo.groupId} value={gruppo.groupId}>
                                        {gruppo.groupName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                            <UploadFile sx={{ paddingTop: "15px" }} onSendClick={setFileLoad}></UploadFile>
                        </Grid>
                    </Grid>

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

export default HomePage;
