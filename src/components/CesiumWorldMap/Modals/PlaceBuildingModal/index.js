import React, { useState, Suspense } from "react";
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
import "./PlaceBuildingModal.css";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, ambientLight } from "@react-three/fiber";

const Model = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
};

export default function CreationModal({
  open,
  handleClose,
  currentCoords,
  handlePlaceBuilding,
}) {
  const [model, setModel] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [rotationHead, setRotationHead] = useState("");
  const [rotationPitch, setRotationPitch] = useState("");
  const [rotationRoll, setRotationRoll] = useState("");


  const handleFileInput = (evt) => {
    setModel(evt.target.files[0]);
  };

  const ModelPreview = ({ model }) => {
    return !model ? (
      <img></img>
    ) : (
      <Suspense fallback={<p>Loading...</p>}>
        <Canvas camera={{ position: [200, 100, 200], fov: 4 }}>
          <color attach="background" args={["white"]} />
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <Model modelUrl={renderGLTFModel()} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Canvas>
      </Suspense>
    );
  };

  const handleBuildingNameInput = (evt) => setBuildingName(evt.currentTarget.value);

  const handleSubmit = (e) => {
    handlePlaceBuilding({
      buildingname: buildingName,
      model: model,
      lat: currentCoords.latitude,
      lon: currentCoords.longitude,
      alt: currentCoords.altitude,
      head: rotationHead,
      pitch: rotationPitch,
      roll: rotationRoll,
    });
    handleClose();
  };

  const renderGLTFModel = () => {
    return URL.createObjectURL(model);
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
              Place Building
            </Typography>
            <Box className="avatar-holder">
              <ModelPreview model={model} />
            </Box>
            <Form.Control
              onChange={handleFileInput}
              type="file"
              size="lg"
              accept=".glb"
            />
            <TextField
              display="flex"
              onChange={handleBuildingNameInput}
              label="Building Name"
              variant="outlined"
            />
            {/* COORDINATES CONTAINER */}
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  label="Longitude"
                  variant="outlined"
                  defaultValue={currentCoords.latitude}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Latitude"
                  variant="outlined"
                  defaultValue={currentCoords.longitude}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Latitude"
                  variant="outlined"
                  defaultValue={currentCoords.altitude}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Rotation Head"
                  variant="outlined"
                  onChange={ (e) => setRotationHead(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Rotation Pitch"
                  variant="outlined"
                  onChange={ (e) => setRotationPitch(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Rotation Roll"
                  variant="outlined"
                  onChange={ (e) => setRotationRoll(e.target.value)}
                />
              </Grid>

            </Grid>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Place
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
