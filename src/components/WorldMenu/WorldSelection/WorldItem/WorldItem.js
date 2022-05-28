import React from "react";
import { CONTENT_PATH_NAME } from "../../../../constants/apiPath"
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  ButtonGroup,
  Box,
  Grid,
  Typography,
  CardActionArea,
} from "@mui/material";

export default function WorldItem({
  handleChangePage,
  item,
  displayEditItem,
  isEdit,
}) {
  return (
    <Box>
      <Card
        sx={{
          height: "400",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea data-testid="world-card" onClick={() => handleChangePage(item.id)}>
          <CardMedia
            component="img"
            src={CONTENT_PATH_NAME + item.meta.avatar}
            alt={item.meta.nickname}
            height="200"
          />
          <Typography className="item-text">{item.meta.nickname}</Typography>
        </CardActionArea>
      </Card>
      {displayEditItem(isEdit, item)}
    </Box>
  );
}
