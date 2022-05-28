import React, { useState, Suspense } from "react";
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
import "./detailBuildingModal.css";
import { pink } from "@mui/material/colors";
import { CONTENT_PATH_NAME } from "../../../../constants/apiPath";
import { Canvas, ambientLight } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ modelUrl }) => {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} />;
};

export default function BuildingDetailModal({
    open,
    handleClose,
    currentBuilding,
    setShowBuildingEditingModal,
}) {
    const ModelPreview = ({ model }) => {
        return !model ? (
            <img></img>
        ) : (
            <Suspense fallback={<p>Loading...</p>}>
                <Canvas camera={{ position: [200, 40, 200], fov: 4 }}>
                    <color attach="background" args={["white"]} />
                    <ambientLight intensity={2} />
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <directionalLight position={[-10, -10, -5]} intensity={1} />
                    <Model modelUrl={model} />
                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                    />
                </Canvas>
            </Suspense>
        );
    };

    const handleEditHouseClick = () => {
        handleClose();
        setShowBuildingEditingModal(true);
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
                            {currentBuilding.meta.nickname}
                        </Typography>
                        <Box className="avatar-holder">
                            <ModelPreview model={`${CONTENT_PATH_NAME + currentBuilding.meta.avatar}`} />
                        </Box>
                        {/* COORDINATES CONTAINER */}
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="Longitude"
                                    variant="outlined"
                                    defaultValue={currentBuilding.point.coordinates[0]}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="Latitude"
                                    variant="outlined"
                                    defaultValue={currentBuilding.point.coordinates[1]}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="Altitude"
                                    variant="outlined"
                                    defaultValue={currentBuilding.point.coordinates[2]}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="rotation head"
                                    variant="outlined"
                                    defaultValue={currentBuilding.rotation.x}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="rotation pitch"
                                    variant="outlined"
                                    defaultValue={currentBuilding.rotation.y}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="rotation roll"
                                    variant="outlined"
                                    defaultValue={currentBuilding.rotation.z}
                                    disabled={true}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleEditHouseClick}
                        >
                            Edit Building
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}
