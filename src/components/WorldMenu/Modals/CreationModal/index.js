import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import placeHolderWorldAvatar from '../../../../placeholder/worldPlaceholder.png'
import {
  Typography,
  Modal,
  Box,
  Stack,
  TextField,
  Fade,
  Button,
  Checkbox,
  Divider,
} from "@mui/material";
import "./creationModal.css"

export default function CreationModal({ open, handleClose, handleCreateWorld }) {
  const [avatar, setAvatar] = useState("");
  const [worldName, setWorldName] = useState("");

  const handleFileInput = (evt) => {
    setAvatar(evt.target.files[0]);
  };

  const Input = styled('input')({
    display: 'none',
  });

  const handleWorldNameInput = (evt) => {
    setWorldName(evt.currentTarget.value);
  };

  const handleSubmit = () => {
    handleCreateWorld(worldName, avatar);
    handleClose()
  };

  const renderImage = () => {
    if (!avatar) return placeHolderWorldAvatar;
    return URL.createObjectURL(avatar);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box className="editing-wrap">
          <Stack className="create-world-stack" direction={"column"} alignContent={"center"} sx={{ alignContent: "center" }}>
            <Typography
              sx={{ fontSize: "35px", textAlign: "center" }}
              className="label"
            >
              Creating New World
            </Typography>
            <img data-testid="avata-img" src={renderImage()} width={100} height={100} />
            <label htmlFor="contained-button-file" >
              <Input
                onChange={handleFileInput}
                data-testid="input-file"
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button style={{ width: "100%" }} variant="contained" component="span">
                Upload
              </Button>
            </label>
            <TextField
              inputProps={{ "data-testid": "name-input" }}
              style={{ width: "100%" }}
              onChange={handleWorldNameInput}
              label="World Name"
              variant="outlined"
            />
            <Button  data-testid="submit-new-world" style={{ width: "100%" }} color="primary" onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
