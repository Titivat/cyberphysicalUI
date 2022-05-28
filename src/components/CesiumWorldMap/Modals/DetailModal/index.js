import React, { useState } from "react";
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
import "./detailModal.css";
import { pink } from "@mui/material/colors";
import { CONTENT_PATH_NAME } from "../../../../constants/apiPath";

export default function DetailModal({
  open,
  handleClose,
  currentPin,
  handleJoinHouse,
  setShowHouseEditingModal,
}) {

  const handleJoinHouseClick = () => {
    handleJoinHouse(currentPin.meta.nickname);
    handleClose();
  };

  const handleEditHouseClick = () => {
    handleClose();
    setShowHouseEditingModal(true);
  }

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
              {currentPin.meta.nickname}
            </Typography>
            <Box className="avatar-holder">
              <Avatar
                alt="House Avatar"
                src={`${CONTENT_PATH_NAME + currentPin.meta.avatar}?${Date.now()}`}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
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
                  variant="outlined"
                  defaultValue={currentPin.point.coordinates[2]}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <TextField label="SCADA Host" variant="outlined" disabled={true} defaultValue={currentPin.scadaData.host}/>
            <TextField label="SCADA Token" variant="outlined" disabled={true} defaultValue={currentPin.scadaData.token}/>
            <Button
              color="primary"
              variant="contained"
              onClick={handleJoinHouseClick}
            >
              Join House
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleEditHouseClick}
            >
              Edit House
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
