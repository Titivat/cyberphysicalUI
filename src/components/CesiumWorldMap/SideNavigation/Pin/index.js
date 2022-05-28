import React from 'react'
import "./pin.css"
// import PushPinIcon from '@mui/icons-material/PushPin';
// import PersonPinIcon from "@material-ui/icons/PersonPinIcon";
// import PushPin from '@material-ui/icons/PushPin';
const Pin = ({ setNewLocation, children }) => {
    return (
        <div onClick={setNewLocation} className='pin-container'>{children}</div>
    )
}

export default Pin
