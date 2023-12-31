import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FileCard = ({ file, isImage }) => {
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleDownload = () => {
        // Creare un URL per il download del file
        const downloadUrl = `${file.base64}`;
        console.log(downloadUrl)
        // Creare un elemento a (link) per il download
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = file.fileName;
        a.style.display = 'none';

        // Aggiungere l'elemento a al documento e fare clic su di esso per avviare il download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const imageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/zip",
        "application/rar",
        // Aggiungi altri tipi di immagine supportati se necessario
    ];

    return (
        <Grid item >
            <Card>
                {isImage ? (
                    <CardMedia
                        component="img"
                        height="194"
                        image={file.base64}
                        alt={`Image ${file.fileId}`}
                        onClick={handleOpenModal}
                        style={{ cursor: 'pointer' }}
                    />
                ) : (
                    <CardContent>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                {isImage ?<ImageIcon /> : <InsertDriveFileIcon />}
                            </Grid>
                            <Grid item>
                                <div><b>Nome del file: </b>{file.fileName}</div>
                                <div><b>Tipo di file: </b>{file.fileType.split("/")[1]}</div>
                            </Grid>
                        </Grid>
                    </CardContent>
                )}
                

                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Button onClick={handleDownload}>Scarica</Button>
                </CardActions>

                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>Anteprima dell'immagine</DialogTitle>
                    <DialogContent>
                        <img src={file.base64} alt={`Image ${file.fileId}`} style={{ width: '100%' }} />
                    </DialogContent>
                </Dialog>
            </Card>
        </Grid>
    );
};

export default FileCard;
