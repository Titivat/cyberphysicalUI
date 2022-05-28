import React, { useState } from 'react'
import { Typography,Modal,Box,Stack,TextField,Fade,Button } from "@mui/material";
import { Form } from 'react-bootstrap';
import "./addModal.css"

const AddModal = ({ open, handleClose, addNewObject }) => {
    const [file, setFile] = useState("")
    const [addName, setAddName] = useState("")

    const handleFileInput = (evt) => setFile(evt.target.files[0])
    const handleTextInput = (evt) => setAddName(evt.currentTarget.value)

    const handleCrateNewObject = () => {
        addNewObject(addName, file)
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={open}>
                <Box className="add-object-wrap">
                    <Stack className="add-object-stack">
                        <Typography sx={{ fontSize: "50px", textAlign: "center" }} className="label">
                            New Object
                        </Typography>
                        <TextField  onChange={handleTextInput} label="Object name" variant="outlined"/>
                        <Form.Control onChange={handleFileInput} type="file" size="lg"/>
                        <Button color="primary" variant="contained" onClick={handleCrateNewObject}>Save</Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    )
}

export default AddModal
