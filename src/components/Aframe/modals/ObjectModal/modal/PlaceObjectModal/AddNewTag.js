import React from "react";
import {
  Stack,
  Avatar,
  Typography,
} from "@mui/material";
import { blue } from '@mui/material/colors';
import { Add } from "@material-ui/icons";

const AddNewTag = ({
  handleNewInput,
  isNewInput
}) => {
  if (isNewInput) {
    return null
  }

  return <Stack direction="row" justifyContent="center" spacing={1}>
    <Avatar style={{ cursor: "pointer" }} sx={{ bgcolor: blue[500] }} onClick={handleNewInput}>
      <Add />
    </Avatar>
    <Typography style={{ margin: "10px" }} sx={{ fontSize: 14 }} gutterBottom>
      Add new tags
    </Typography>
  </Stack>;
}

export default AddNewTag