import React, { useState, useEffect } from 'react'
import InputNewTag from './InputNewTag';
import AddNewTag from './AddNewTag';
import DeviceTags from './DeviceTags';
import {
    Typography,
    Modal,
    Box,
    Stack,
    TextField,
    Fade,
    Button,
} from "@mui/material";
import "./placeObjectModal.css"
import Selector from "./Selector.js"

const DEVICE_TAGS = [
    { name: "onoff", widget: "slider", min: 0, max: 10 },
    { name: "brightness", widget: "switch", min: 0, max: 100 },
    { name: "volume", widget: "slider", min: 0, max: 100, },
]

const OBJECT_TYPE = ["device", "furniture"]

const PlaceObjectModal = ({ open, handleClose, placeObjectData }) => {
    const [deviceTypes, setDeviceTypes] = useState([])
    const [selectedDeviceType, setSelectedDeviceType] = useState("")
    const [selectedObjectType, setSelectedObjectType] = useState("")
    const [deviceName, setDeviceName] = useState("")
    const [systemName, setSystemName] = useState("")
    const [deviceTags, setDeviceTags] = useState("")
    const [isNewInput, setIsNewInput] = useState(false)

    const handleInputDeviceName = (evt) => setDeviceName(evt.currentTarget.value)
    const handleInputSystemName = (evt) => setSystemName(evt.currentTarget.value)

    useEffect(() => {
        const fetchApi = async () => {
            setDeviceTypes(["Tv", "Plug", "light bulb"])
            setDeviceTags(DEVICE_TAGS)
        }
        fetchApi()
    }, [])

    const handlePlaceObject = () => {
        console.log(selectedObjectType)
        console.log(selectedDeviceType)
        console.log(placeObjectData)
        console.log(deviceName)
        console.log(systemName)
        // handleClose()
    }

    const handleChangeDeviceType = (event) => setSelectedDeviceType(event.target.value);
    const handleChangeObjectType = (event) => setSelectedObjectType(event.target.value);

    const handleAddNewTags = (name, widget, min, max) => {
        const newTag = { name: name, widget: widget, min: parseInt(min), max: parseInt(max) }
        setDeviceTags([...deviceTags, newTag])
        setIsNewInput(false)
    }

    const handleDeleteTag = (name) => {
        const newDeviceTags = deviceTags.filter((tag) => tag.name !== name)
        setDeviceTags(newDeviceTags)
    }

    const handleNewInput = () => setIsNewInput(true)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={open}>
                <Box className="object-wrap" style={{minHeight:(selectedObjectType === "device") ? "650px" : "330px"}}>
                    <Stack className="object-stack">
                        <Typography sx={{ fontSize: "50px", textAlign: "center" }} className="label">
                            Place object
                        </Typography>
                        <Selector label="Object type" selectedType={selectedObjectType} handleChangeType={handleChangeObjectType} selects={OBJECT_TYPE} />
                        <TextField onChange={handleInputDeviceName} label="Object name" variant="outlined" />
                        {selectedObjectType === "device" && <>
                            <Selector label="Device Type" selectedType={selectedDeviceType} handleChangeType={handleChangeDeviceType} selects={deviceTypes} />
                            <TextField onChange={handleInputSystemName} label="System name" variant="outlined" />
                            <Typography sx={{ fontSize: "13px" }} className="label">
                                Tags
                            </Typography>
                            <DeviceTags deviceTags={deviceTags} handleDeleteTag={handleDeleteTag} />
                            <InputNewTag handleAddNewTags={handleAddNewTags} isNewInput={isNewInput} />
                            <AddNewTag handleNewInput={handleNewInput} isNewInput={isNewInput} />
                        </>
                        }
                        <Button color="primary" variant="contained" onClick={handlePlaceObject}>Save</Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    )
}

export default PlaceObjectModal
