import React, { useState } from "react";
import {
  Stack,
  TextField,
  Avatar,
} from "@mui/material";
import { Add } from "@material-ui/icons";
import { blue } from '@mui/material/colors';
import Selector from "./Selector.js"

const OBJECT_TYPE = ["device", "furniture"]

const InputNewTag = ({
  handleAddNewTags,
  isNewInput
}) => {
  if (!isNewInput) return null

  const [newNameTag, setNewNameTag] = useState("")
  const [newMaxTag, setNewMaxTag] = useState("")
  const [newMinTag, setMinTag] = useState("")

  const [newSelectedWidgetTag, setNewSelectedWidgetTag] = useState("")
  const handleChangeWidgetType = (event) => setNewSelectedWidgetTag(event.target.value);

  const handleSubmitNewTag = () => handleAddNewTags(newNameTag, newSelectedWidgetTag, newMinTag, newMaxTag)
  // setMinTag
  // setNewMaxTag
  return <Stack style={{ margin: "5px" }} direction="row" spacing={1}>
    <TextField id="name" label="Name" variant="outlined" onChange={(evt) => setNewNameTag(evt.currentTarget.value)} />
    <Selector label="Widget" selectedType={newSelectedWidgetTag} handleChangeType={handleChangeWidgetType} selects={OBJECT_TYPE} />
    <TextField id="max" label="Min" variant="outlined" onChange={(evt) => setMinTag(evt.currentTarget.value)} />
    <TextField id="min" label="Max" variant="outlined" onChange={(evt) => setNewMaxTag(evt.currentTarget.value)} />
    <Avatar style={{ margin: "10px", cursor: "pointer" }} sx={{ bgcolor: blue[500], m: 1 }} onClick={handleSubmitNewTag}>
      <Add />
    </Avatar>
  </Stack>;
}

export default InputNewTag