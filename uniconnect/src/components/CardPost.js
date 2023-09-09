import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import RichTextEditor from './RichTextEditor';
import { Badge, Grid } from '@mui/material';
import moment from 'moment';
import axios from 'axios';
import useLocalStorage from './../utility/useLocalStorage'; // Assicurati di specificare il percorso corretto



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CardPost(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [listacommenti, setCommenti] = React.useState(false);
    const [reload, setReload] = React.useState(false);


    const handleExpandClick = () => {

        setExpanded(!expanded);
        if (!expanded) { loading(); }


    };

    const loading = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://localhost:44305/api/Commento?postId=' + props.children.postId,
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token
            }
        };


        axios.request(config)
            .then((response) => {
                if (!response.data.errors) {
                    setCommenti(response.data);
                    console.log("gruppi", response.data)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const [editorValue, setEditorValue] = React.useState('');
    const [token, setToken] = useLocalStorage('TOKEN', '');





    useEffect(() => {
        console.clear()
        console.log(props)
    }, []);

    const [request, setRequest] = useState({
        groupName: "",
        description: ""
    });

    const [name, setCurentUser] = useLocalStorage('CURENTUSER', '');

    const handleEditorChange = (value) => {
        console.log(value);
        if (value) {

            console.log(request)
            const data = JSON.stringify({
                "content": value,
                "timestamp": new Date(),
                "userId": name.id,
                "postId": props.children.postId,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://localhost:44305/api/Commento',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    if (!response.data.errors) {

                        loading();

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    return (
        <Card sx={{ marginBottom: "15px" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={props.children.user.avatar}>

                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.children.user.userName}
                subheader={moment(props.children.timestamp).format("DD/MM/YYYY HH:mm")}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image="https://e0.pxfuel.com/wallpapers/370/538/desktop-wallpaper-nika-the-sun-god%E3%80%8Camv%E3%80%8Done-piece-my-fight-%E1%B4%B4%E1%B4%B0-sun-god-nika.jpg"
                alt="Paella dish"
            /> */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">

                    <div dangerouslySetInnerHTML={{ __html: props.children.content }} >
                    </div>



                </Typography>


            </CardContent>
            <CardActions disableSpacing>



                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ transform: 'none' }}
                >
                    <Badge badgeContent={props.children.numeroCommenti} color="primary">
                        <ChatIcon />
                    </Badge>


                </ExpandMore>

            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container sx={{ padding: "10px" }}>
                    <Grid item xs={12}>
                        
                        <RichTextEditor
                            value={request.description}
                            onSendClick={handleEditorChange}
                        />
                    </Grid>

                </Grid>




                <CardContent >

                    {listacommenti &&
                        listacommenti
                            .map((commento) => ({
                                ...commento,
                                timestamp: moment(commento.timestamp), // Converte la stringa timestamp in un oggetto moment
                            }))
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .map((commento, index) => (
                                <Card sx={{ background: "black", marginBottom: "10px" }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={commento.user.avatar}>
                                                {/* {props.avatar} */}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={commento.user.userName}
                                        subheader={moment(commento.timestamp).format("DD/MM/YYYY HH:mm")}

                                    />
                                    <CardContent>
                                        <Typography paragraph> <div dangerouslySetInnerHTML={{ __html: commento.content }} >
                                        </div></Typography>

                                    </CardContent>
                                </Card>


                            ))}



                </CardContent>

            </Collapse>
        </Card>
    );
}