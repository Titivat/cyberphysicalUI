import { Typography,Modal,Box,Stack,TextField,Fade,Button } from "@mui/material";
import React, { Suspense, useState } from "react";
import { toast } from "react-toastify";
import "./register.css";

export default function Register({open,handleClose,handleOnSignUp}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [pwdValidated, setPwdValidated] = useState(false);

    const handleUsernameInput = (e) => setUsername(e.target.value);
    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
        PasswordValidation(e.target.value,rePassword)
    }
    const handleRePasswordInput = (e) => {
        setRePassword(e.target.value);
        PasswordValidation(password,e.target.value)
    }
    const PasswordValidation = (pwd,rpwd) => {
        if (pwd.length < 8) {
            setPwdError("Password must be more than 8 characters.")
            setPwdValidated(false)
        }
        else if (pwd != rpwd) {
            setPwdError("Password and Confirmation password should match.")
            setPwdValidated(false)
        }
        else {
            setPwdError("")
            setPwdValidated(true)
        }
    }
    const handleSignUp = () => {
        handleOnSignUp(username, password, rePassword);
  };

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
            Sign up
          </Typography>
          <TextField onChange={handleUsernameInput} label="Username" variant="outlined" />
          <TextField onChange={handlePasswordInput} label="Password" type="password" variant="outlined" />
          <TextField onChange={handleRePasswordInput} label="Confirm Password" type="password" variant="outlined" />
          <Typography sx={{color:"red"}}>{pwdError}</Typography>
          <Button onClick={handleSignUp} disabled={!pwdValidated} variant="contained">Sign up</Button>
        </Stack>
      </Box>
    </Fade>
  </Modal>
  )
}
