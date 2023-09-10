import React, { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Modal, Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';


const UploadFile = ({ onSendClick, label = "Upload file", sigleMode = false }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    onSendClick(files);
  }, [files]);


  const handleChange = (event) => {
    const file = event.target.files[0];

    // Leggi il file come base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      console.log("base64Data", base64Data)

      if (sigleMode) {
        setFiles([{ name: file.name, data: base64Data }]);
      }
      else {
        setFiles([...files, { name: file.name, data: base64Data }]);
      }


    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        href="#file-upload"
        sx={{ marginTop: "15" }}
      >
        {label}
        <VisuallyHiddenInput type="file" onChange={handleChange} />
      </Button>

      {!sigleMode && <Grid container spacing={2} sx={{ marginTop: "10px" }} >
        {files.map((file) => (
          <Grid item key={file.name} xs={12} sm={6} md={4} lg={3}>
            <Card>
              {/* Contenuto della mini card */}
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="textSecondary">
                  {file.name}
                </Typography>
                <IconButton
                  color="error"
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDelete(file)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>}

    </div>
  );
};
export default UploadFile;
