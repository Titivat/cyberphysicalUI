import React, { Suspense, useState } from "react";
import { Typography,Modal,Box,Stack,TextField,Fade,Button, Checkbox, Divider, } from "@mui/material";
import { Slide } from '@mui/material';

import "./login.css";
export default function LoginModal({ open, handleClose, handleOnSignIn, handleSignUpModal }) {

const initialState = {username : "", password : "", rePassword : ""};
const [registerState, setRegisterState] = useState(initialState);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [rememberPassword, setRememberPassword] = useState(false);

const handleRememberPassword = (e) => setRememberPassword(e.target.value)
const handleUsernameInput = (e) => setUsername(e.target.value)
const handlePasswordInput = (e) => setPassword(e.target.value)
const handleSignIn = () => {
    handleOnSignIn(username, password)
}
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <Box className="login-wrap">
          <Stack className="login-stack">
            <Typography sx={{ fontSize: "50px", textAlign:"center" }} className="label">
              Sign in
            </Typography>
            <TextField onChange={handleUsernameInput} label="Username" variant="outlined" />
            <TextField onChange={handlePasswordInput} label="Password" type="password" variant="outlined" />
            <Box sx={{display:"flex"}}>
              <Checkbox size="small" onChange={handleRememberPassword}></Checkbox>
              <Typography mt="7px">Stay logged in</Typography>
            </Box>
            <Button color="primary" onClick={handleSignIn} variant="contained">Sign In</Button>
            <Divider sx={{marginTop:"20px"}} light />
            <Button onClick={handleSignUpModal}variant="text">Don't have an account? Sign up</Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
