import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Editor, EditorState, RichUtils } from 'draft-js';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send'; // Aggiungiamo l'import per l'icona di invio
import { stateToHTML } from 'draft-js-export-html'; // Importa la funzione stateToHTML


function RichTextEditor({ initialContent,onSendClick }) {

    const [editorState, setEditorState] = useState(
        initialContent
            ? EditorState.createWithContent(initialContent)
            : EditorState.createEmpty()
    );

    const handleBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };

    const handleItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    };

    const handleUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    };

    const handleLeftAlignClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'unstyled'));
    };

    const handleCenterAlignClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'center-aligned'));
    };

    const handleRightAlignClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'right-aligned'));
    };

    const handleJustifyClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'justify'));
    };


    const handleSendClick = () => {
        const contentState = editorState.getCurrentContent();
        const html = stateToHTML(contentState); // Ottieni il contenuto HTML dall'editor
        onSendClick(html); // Invia l'HTML all'oggetto padre
        setEditorState(EditorState.createEmpty());

    };

    return (
        <Grid sx={{ background: "#0e0e0ea8", padding: "5px" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleBoldClick}>
                    <FormatBoldIcon />
                </IconButton>
                <IconButton onClick={handleItalicClick}>
                    <FormatItalicIcon />
                </IconButton>
                <IconButton onClick={handleUnderlineClick}>
                    <FormatUnderlinedIcon />
                </IconButton>
                <div style={{ flex: 1 }}></div> {/* Spazio flessibile per allineare a destra */}
                <IconButton>
                    <SendIcon onClick={handleSendClick} />
                </IconButton>
            </div>
            <Grid sx={{ padding: "15px" }}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                />
            </Grid>
        </Grid>
    );
}

export default RichTextEditor;
