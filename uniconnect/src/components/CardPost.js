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
import FileCard from './FileCard';



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
    const [newComment, setNewComment] = React.useState(0);




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
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const [editorValue, setEditorValue] = React.useState('');
    const [token, setToken] = useLocalStorage('TOKEN', '');
    const [filesUpload, setFilesUpload] = React.useState();


    const imageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        // Aggiungi altri tipi di immagine supportati se necessario
    ];




    useEffect(() => {
        setFilesUpload(props.children.files)
    }, [props]);

    const [request, setRequest] = useState({
        groupName: "",
        description: ""
    });

    const [name, setCurentUser] = useLocalStorage('CURENTUSER', '');

    const handleEditorChange = (value) => {
        if (value) {

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
                        setNewComment(newComment + 1);
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


            {props.children.files.base64File && props.children.base64File
                .filter(file => imageTypes.includes(file.fileType))
                .map(file => (
                    <CardMedia
                        key={file.fileId}
                        component="img"
                        height="194"
                        image={file.base64} // Usa la base64 come immagine
                        alt={`Image ${file.fileId}`}
                    />
                ))}





            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: props.children.content }} >
                </div>


                <Grid container spacing={2}>
                    {filesUpload && filesUpload
                        .map((file, index) => (

                            <Grid item xs={12} sm={6} key={index}>
                                <FileCard file={file} isImage={imageTypes.includes(file.fileType)} />
                            </Grid>

                        ))}
                </Grid>





            </CardContent>
            <CardActions disableSpacing>



                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ transform: 'none' }}
                >
                    <Badge badgeContent={props.children.numeroCommenti + newComment} color="primary">
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