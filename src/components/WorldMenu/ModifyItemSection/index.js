import React, { useState } from "react";
import { Button, Fab } from "@mui/material";
import { Add, Edit } from "@material-ui/icons";
import "./modifyItem.css";
import palette from "../../../constants/palette";

const ModifyItemSection = ({ triggerIsEdit, setCreationModalShow }) => {
  return (
    <div className="modifyContainer">
      <Fab data-testid="modify-item-create-modal" color="primary" onClick={() => setCreationModalShow(true)}>
        <Add />
      </Fab>
      <Fab color="warning" onClick={triggerIsEdit}>
        <Edit />
      </Fab>
    </div>
  );
};

export default ModifyItemSection;
