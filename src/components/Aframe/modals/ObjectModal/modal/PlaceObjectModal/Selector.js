import React from "react";

import {
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from "@mui/material";

const Selector = ({ label, selectedType, handleChangeType, selects }) => {
  return (<FormControl fullWidth>
    <InputLabel id="device-select-input-label">{label}</InputLabel>
    <Select labelId="device-select-select-label" id="demo-simple-select" value={selectedType} label={label} onChange={handleChangeType}>
      {selects.map(select => {
        return <MenuItem id={`select-menu-item-${select}`} value={select}>{select}</MenuItem>;
      })}
    </Select>
  </FormControl>);
}

export default Selector
