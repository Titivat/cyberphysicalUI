import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import AppBar from "@mui/material/AppBar";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Canvas } from '@react-three/fiber'
import AddIcon from '@material-ui/icons/Add';
import "./ObjectModal.css";
import useToggleModal from "../../BottomBar/tool/useToggleModal.js"
import AddModal from "./modal/addModal"
import ObjectItem from "../ObjectItem"
import PlaceObjectModal from "./modal/PlaceObjectModal";

export default function ObjectModal({
    open,
    handleClose,
}) {   
    const [isOpenAddModal, handleOpenAddModal, handleCloseAddModal] = useToggleModal()
    const [isOpenPlaceModal, handleOpenPlaceModal, handleClosePlaceModal] = useToggleModal()
    const [devices, setDevices] = useState([])
    const [trigger, setTrigger] = useState(false)
    const [placeObjectData, setPlaceObjectData] = useState({})

    useEffect(() => {
        async function fetchMyAPI() {
            //   const response = await getApi("cyber/universe/worlds/")
            //   setItems(response.data)
            setDevices(itemData)
        }
        fetchMyAPI()
    }, [trigger])

    const addNewObject = (name, file) => {
        console.log(name)
        console.log(file)
        setTrigger(prevTrigger => !prevTrigger)
    }


    return <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}>
        <AppBar sx={{
            position: "relative"
        }}>
            <Toolbar>
                <Typography sx={{
                    ml: 1,
                    flex: 1
                }} variant="h6" component="div">
                    Object
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                    Close
                </Button>
            </Toolbar>
        </AppBar>
        <ImageList sx={{
            width: "100%",
            height: 450
        }} cols={3} rowHeight={200} gap={10}>
            <Fab sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }}
                color="primary">
                <AddIcon onClick={handleOpenAddModal} />
            </Fab>
            <ObjectItem itemData={devices} handleOpenPlaceModal={handleOpenPlaceModal} setPlaceObjectData={setPlaceObjectData} />
        </ImageList>
        <AddModal open={isOpenAddModal} handleClose={handleCloseAddModal} addNewObject={addNewObject} />
        <PlaceObjectModal open={isOpenPlaceModal} handleClose={handleClosePlaceModal} placeObjectData={placeObjectData} />
    </Dialog >;
}

// https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0
const itemData = [
    {
        img: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF/AntiqueCamera.gltf",
        title: "Breakfast",
        id: 1,
    },
    {
        img: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf",
        title: "Burger",
        id: 2,
    },
    {
        img: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF/BoomBox.gltf",
        title: "Tomato basil",
        id: 3,
    },
    {
        img: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF/Corset.gltf',
        title: 'Honey',
        id: 4,
    },
    {
        img: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Suzanne/glTF/Suzanne.gltf',
        title: 'Coffee',
        id: 5,
    },
    {
        img: 'https://thinkuldeep.com/modelviewer/Astronaut.glb',
        title: 'Fern',
        id: 6,
    },
];