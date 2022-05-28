import React, { useEffect, useState, Suspense } from "react";
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
import "./editingBuildingModal.css";
import { CONTENT_PATH_NAME } from "../../../../constants/apiPath";
import DeletingModal from "../DeletingModal";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, ambientLight } from "@react-three/fiber";

const Model = ({ modelUrl }) => {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} />;
};

export default function BuildingEditingModal({
    open,
    handleClose,
    currentBuilding,
    handleEditBuilding,
    setShowHouseDeletingModal,
}) {
    const [avatar, setAvatar] = useState("");
    const [houseName, setHouseName] = useState(currentBuilding.meta.nickname);
    const [altitude, setAltitude] = useState(currentBuilding.point.coordinates[2]);
    const [rotationHead, setRotationHead] = useState(currentBuilding.rotation.x);
    const [rotationPitch, setRotationPitch] = useState(currentBuilding.rotation.y);
    const [rotationRoll, setRotationRoll] = useState(currentBuilding.rotation.z);

    useEffect(() => {
        setAvatar(null)
    }, [currentBuilding])

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
        handleEditBuilding({
            model: avatar,
            lat: currentBuilding.point.coordinates[0],
            lon: currentBuilding.point.coordinates[1],
            alt: currentBuilding.point.coordinates[2],
            head: rotationHead,
            pitch: rotationPitch,
            roll: rotationRoll,
        });
        handleClose();
    };

    const ModelPreview = () => {
        return (
            <Suspense fallback={<p>Loading...</p>}>
                <Canvas camera={{ position: [200, 40, 200], fov: 4 }}>
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

    const renderGLTFModel = () => {
        if (!avatar) return `${CONTENT_PATH_NAME + currentBuilding.meta.avatar}`
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
                            Editing {currentBuilding.meta.nickname}
                        </Typography>
                        <Box className="avatar-holder">
                            <ModelPreview />
                        </Box>
                        <Form.Control
                            onChange={handleFileInput}
                            type="file"
                            size="lg"
                            accept=".glb"
                        />
                        <TextField
                            display="flex"
                            onChange={handleHousenameInput}
                            label="House Name"
                            defaultValue={currentBuilding.meta.nickname}
                            variant="outlined"
                        />
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
                                    onChange={(e) => { setAltitude(e.target.value) }}
                                    variant="outlined"
                                    defaultValue={currentBuilding.point.coordinates[2]}
                                    disabled={true}
                                />
                            </Grid>
                            {/*  */}
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="Rotation Head"
                                    variant="outlined"
                                    defaultValue={currentBuilding.rotation.x}
                                    onChange={(e) => setRotationHead(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="Rotation Pitch"
                                    variant="outlined"
                                    defaultValue={currentBuilding.rotation.y}
                                    onChange={(e) => setRotationPitch(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    display="flex"
                                    label="Rotation Roll"
                                    variant="outlined"
                                    defaultValue={currentBuilding.rotation.z}
                                    onChange={(e) => setRotationRoll(e.target.value)}
                                />
                            </Grid>
                        </Grid>
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
                            Delete Building
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}
