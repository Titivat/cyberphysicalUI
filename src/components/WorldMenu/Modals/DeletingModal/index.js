
import { Typography,Modal,Box,Stack,TextField,Fade,Button, Checkbox, Divider, } from "@mui/material";
import React, { useState } from "react";
import "./deletingModal.css"

export default function DeletingModal({open, handleClose, editingItem , handleDeleteWorld}) {

  const handleSubmit = () => {
    handleDeleteWorld(editingItem.id);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Fade in={open}>
        <Box className="editing-wrap">
          <Stack>
            <Typography
              sx={{ fontSize: "20px", textAlign: "center" }}
              className="label"
            >
              Are you sure to delete {editingItem.meta.nickname}?
            </Typography>
            <Button data-testid="submit-delete-world" color="primary" onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
