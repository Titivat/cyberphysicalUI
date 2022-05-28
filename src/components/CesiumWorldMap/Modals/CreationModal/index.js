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
import "./creationModal.css";

export default function CreationModal({
  open,
  handleClose,
  currentCoords,
  handleCreateHouse,
}) {
  const [avatar, setAvatar] = useState("");
  const [houseName, setHouseName] = useState("");
  const [altitude, setAltitude] = useState(0);
  const [scadaHost, setScadaHost] = useState("");
  const [scadaToken, setScadaToken] = useState("");

  useEffect(()=>{
    setAltitude(currentCoords.altitude)
  },[currentCoords])

  const handleFileInput = (evt) => {
    setAvatar(evt.target.files[0]);
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleHousenameInput = (evt) => {
    setHouseName(evt.currentTarget.value);
  };

  const handleSubmit = (e) => {
    handleCreateHouse({
      housename: houseName,
      photo: avatar,
      lat: currentCoords.latitude,
      lon: currentCoords.longitude,
      alt: altitude,
      scadaData: {
        host: scadaHost,
        token: scadaToken
      }
    });
    handleClose();
  };

  const renderImage = () => {
    if (!avatar) return placeHolderWorldAvatar;
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
              New House
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
              variant="outlined"
            />
            {/* COORDINATES CONTAINER */}
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  display="flex"
                  label="Longitude"
                  variant="outlined"
                  defaultValue={currentCoords.latitude}
                  disabled={true}
                  helperText="locked at clicked"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  display="flex"
                  label="Latitude"
                  variant="outlined"
                  defaultValue={currentCoords.longitude}
                  disabled={true}
                  helperText="locked at clicked"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={(e)=>{setAltitude(e.target.value)}}
                  display="flex"
                  label="Altitude"
                  variant="outlined"
                  defaultValue={currentCoords.altitude}
                  helperText="*default at ground altitude"
                />
              </Grid>
            </Grid>
            <TextField onChange={(e)=>{setScadaHost(e.target.value)}} label="SCADA Host" variant="outlined" />
            <TextField onChange={(e)=>{setScadaToken(e.target.value)}} label="SCADA Token" variant="outlined" />
            <Button
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Create House
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
