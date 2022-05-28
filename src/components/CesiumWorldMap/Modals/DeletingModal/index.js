import * as React from 'react';
import {Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeletingModal({
  currentPin,
  open,
  handleClose,
  handleDeleteHouse,
  setShowHouseEditingModal
}) {

  const handleConfirmationClick = () => {
    handleDeleteHouse(currentPin);
    handleClose();
    setShowHouseEditingModal(false);
  }

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Confirm deleting {currentPin.meta.nickname}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to delete this house? This action is irreversible and all objects will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmationClick}>Confirm</Button>
        </DialogActions>
      </Dialog>
  );
}