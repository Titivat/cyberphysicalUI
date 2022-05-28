import React from "react";
import {
  Stack,
  Chip,
  Avatar,
  Typography
} from "@mui/material";
import { Clear } from "@material-ui/icons";
import { red } from '@mui/material/colors';

const DeviceTags = ({
  deviceTags,
  handleDeleteTag,
}) => {
  if( deviceTags === []){
    return null
  }else if(!deviceTags){
    return null
  }

  return <div style={{
    display: "flex",
    flexDirection: "column",
    height: `${deviceTags.length * 50}px`,
    overflowY: "scroll",
    gap: "5px"
  }}>
    {deviceTags.map(tag => {
      const { name: name, widget: widget,min: min,max: max} = tag;
      return (<Stack id={`stack-${name}`} direction="row" spacing={1} onClick={() => handleDeleteTag(name)}>
        <Avatar style={{cursor: "pointer"}} sx={{bgcolor: red[500]}}>
          <Clear />
        </Avatar>
        <Chip label={name} variant="outlined" />
        <Chip label={widget} variant="outlined" />
        <Chip label={min} variant="outlined" />
        <Chip label={max} variant="outlined" />
      </Stack>
      )
    })}
  </div>;
}

export default DeviceTags
