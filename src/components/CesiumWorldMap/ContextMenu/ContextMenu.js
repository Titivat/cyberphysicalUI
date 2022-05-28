import React from "react";

import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Check } from "@material-ui/icons";

export default function ContextMenu({ contextMenu, handleClose, setShowCreationModal,setShowPlaceBuildingModal }) {

  const handleCreationClick=()=>{
    console.log(true)
    setShowCreationModal(true)
    handleClose()
  }

  const handleAddBuildingClick=()=>{
    setShowPlaceBuildingModal(true)
    handleClose()
  }

  return (
    <Menu className="contextMenu"
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={handleCreationClick}>Create House Here</MenuItem>
      <MenuItem onClick={handleAddBuildingClick}>Place Building</MenuItem>
    </Menu>
  );
}
