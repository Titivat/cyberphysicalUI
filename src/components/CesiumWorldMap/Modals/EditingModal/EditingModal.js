import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import placeHolderWorldAvatar from "../../../../placeholder/worldPlaceholder.png";
import {
  Avatar,
  Typography,
  Modal,
  Box,
  Stack,
  TextField,
  Fade,
  Button,
  Grid,
} from "@mui/material";
import { Form } from "react-bootstrap";
import "./editingModal.css";
import { CONTENT_PATH_NAME } from "../../../../constants/apiPath";
import DeletingModal from "../DeletingModal";

export default function EditingModal({
  open,
  handleClose,
  currentPin,
  handleEditHouse,
  setShowHouseDeletingModal,
}) {
  const [avatar, setAvatar] = useState(null);
  const [houseName, setHouseName] = useState(currentPin.meta.nickname);
  const [altitude, setAltitude] = useState(currentPin.point.coordinates[2]);
  const [scadaHost, setScadaHost] = useState(currentPin.scadaData.host);
  const [scadaToken, setScadaToken] = useState(currentPin.scadaData.token);

  useEffect(()=>{
    setAvatar(null)
    setHouseName(currentPin.meta.nickname)
    setAltitude(currentPin.point.coordinates[2])
    setScadaHost(currentPin.scadaData.host)
    setScadaToken(currentPin.scadaData.token)
  },[currentPin])
  const handleFileInput = (evt) => {
    setAvatar(evt.target.files[0]);
  };

  const handleHousenameInput = (evt) => {
    setHouseName(evt.currentTarget.value);
  };

  const handleDeleteHouseClick = () => {
    handleClose();
    setShowHouseDeletingModal(true);
  }

  const handleSubmit = (e) => {
    handleEditHouse({
      photo: avatar,
      lat: currentPin.point.coordinates[0],
      lon: currentPin.point.coordinates[1],
      alt: altitude,
      scadaHost : scadaHost,
      scadaToken : scadaToken,
      });
    handleClose();
  };

  const renderImage = () => {
    if (!avatar) return `${CONTENT_PATH_NAME + currentPin.meta.avatar}?${Date.now()}`
    return URL.createObjectURL(avatar);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Fade in={open}>
        <Box className="housecreate-wrap">
          <Stack
            display={"flex"}
            justifyContent={"center"}
            className="housecreate-stack"
          >
            <Typography
              sx={{ fontSize: "50px", textAlign: "center" }}
              className="label"
            >
              Editing {currentPin.meta.nickname}
            </Typography>
            <Box className="avatar-holder">
              <Avatar
                alt="House Avatar"
                src={renderImage()}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
            <Form.Control
              onChange={handleFileInput}
              type="file"
              size="lg"
              accept="image/*"
            />
            <TextField
              display="flex"
              onChange={handleHousenameInput}
              label="House Name"
              defaultValue= {currentPin.meta.nickname}
              variant="outlined"
              disabled={true}
            />
            {/* COORDINATES CONTAINER */}
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  display="flex"
                  label="Longitude"
                  variant="outlined"
                  defaultValue={currentPin.point.coordinates[0]}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  display="flex"
                  label="Latitude"
                  variant="outlined"
                  defaultValue={currentPin.point.coordinates[1]}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  display="flex"
                  label="Altitude"
                  onChange={(e) => {setAltitude(e.target.value)}}
                  variant="outlined"
                  defaultValue={currentPin.point.coordinates[2]}
                />
              </Grid>
            </Grid>
            <TextField label="SCADA Host" onChange={(e) => {setScadaHost(e.target.value)}} defaultValue={currentPin.scadaData.host} variant="outlined" />
            <TextField label="SCADA Token" onChange={(e) => {setScadaToken(e.target.value)}} defaultValue={currentPin.scadaData.token} variant="outlined" />
            <Button
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              color="warning"
              variant="contained"
              onClick={handleDeleteHouseClick}
            >
              Delete House
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
