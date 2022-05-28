import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField  from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const PlaceObjectModal = ({ open, handleClose }) => {
    const [name, setName] = useState("")
    const [systemName, setSystemName] = useState("")

    const handleSystemNameInput = (evt) => setSystemName(evt.currentTarget.value)
    const handleNameInput = (evt) => setName(evt.currentTarget.value)


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new Object
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div>
                        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleNameInput}/>
                        <TextField id="outlined-basic" label="System Name" variant="outlined" onChange={handleSystemNameInput}/>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Button>Place</Button>
                </Typography>
            </Box>
        </Modal>
    )
}

export default PlaceObjectModal
