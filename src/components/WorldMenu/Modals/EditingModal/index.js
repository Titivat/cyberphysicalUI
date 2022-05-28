
import { Typography, Modal, Box, Stack, TextField, Fade, Button, Input, Divider, } from "@mui/material";
import React, { useState } from "react";
import "./editingModal.css"

export default function EditingModal({ open, handleClose, editingName, handleEditWorld }) {
  const [newAvatar, setNewAvatar] = useState("");
  const [newName, setNewName] = useState("");

  const handleFileInput = (evt) => {
    setNewAvatar(evt.target.files[0]);
  };

  const handleNewNameInput = (evt) => {
    setNewName(evt.currentTarget.value);
  };

  const handleSubmit = () => {
    handleEditWorld(editingName, newName, newAvatar);
    handleClose();
  };

  const renderImage = () => {
    if (!newAvatar) return null;
    return URL.createObjectURL(newAvatar);
  };


  return (
    <Modal
      data-testid="world-menu-edit-modal"
      open={open}
      onClose={handleClose}
    >
      <Fade in={open}>
        <Box className="editing-wrap">
          <Stack className="create-world-stack" direction={"column"} alignContent={"center"} sx={{ alignContent: "center" }}>
            <Typography
              sx={{ fontSize: "50px", textAlign: "center" }}
              className="label"
            >
              Editing {editingName}
            </Typography>
            <img id="img" data-testid="edit-mode-image" src={renderImage()} width={100} height={100} />
            <label htmlFor="contained-button-file" >
              <Button data-testid="edit-mode-file-input" onChange={handleFileInput} style={{ width: "100%" }} variant="contained" component="span">
                Upload
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  hidden
                  type="file"
                />
              </Button>
            </label>
            <TextField
              inputProps={{ "data-testid": "edit-modal-text-input" }}
              onChange={handleNewNameInput}
              label="New World Name"
              variant="outlined"
              style={{ width: "100%" }}
            />
            <Button data-testid="edit-model-submit-btn" style={{ width: "100%" }} color="primary" onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
