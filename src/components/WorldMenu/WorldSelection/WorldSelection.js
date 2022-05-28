import React from "react";
import { WorldItem } from './WorldItem';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import "./worldSelection.css";

export default function WorldSelection({
  currentItems,
  isEdit,
  setEditingItem,
  setDeletingModalShow,
  setEditingModalShow,
}) {
  let navigate = useNavigate();

  const handleChangePage = (id) => {
    navigate("/worldMap", { state: { worldID: id } });
  };

  const displayEditItem = (isEdit, item) => {
    if (!isEdit) {
      return;
    }
    return (
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          data-testid="world-selection-editbtn"
          onClick={() => {
            setEditingItem(item);
            setEditingModalShow(true);
          }}
        >
          edit
        </Button>
        <Button
          data-testid="world-selection-delete"
          onClick={() => {
            setEditingItem(item);
            setDeletingModalShow(true);
          }}
        >
          delete
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <Grid container sx={{ flexGrow: 1, p: 4 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 20, xl: 24 }}>
      {currentItems &&
        currentItems.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} lg={4} xl={4} key={item.id}>
            <WorldItem
              data-testid={`world-item-${index}`}
              handleChangePage={handleChangePage}
              item={item}
              displayEditItem={displayEditItem}
              isEdit={isEdit}
            />
          </Grid>
        ))}
    </Grid>
  );
}