import React, { useState } from "react";
import { Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, Typography, IconButton } from "@mui/material"
import { HouseRounded } from "@material-ui/icons";
import { styled, useTheme } from '@mui/material/styles';
import Pin from "./Pin"
import "./sideNavigation.css"
import CancelIcon from '@material-ui/icons/Cancel';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const drawerWidth = 200;

const SideNavigation = ({ pins, handleSetNewCurrentLocation, setCurrentPin, showSideNavigation, handleShowSideNavigation }) => {
  if (!showSideNavigation) {
    return null
  }
  const theme = useTheme();

  return (
    <Drawer 
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        color:"primary",
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
      variant="persistent"
      anchor="left"
      open={showSideNavigation}>
      <DrawerHeader >
        <Typography fontSize={20}>Houses</Typography>
        <IconButton onClick={handleShowSideNavigation}>
          <CancelIcon style={{ margin: "0 10px", fontSize: '20', cursor: "pointer" }}/>
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {
          pins && pins.map((pin) => {
            return (
              <ListItem key={pin.meta.nickname} disablePadding>
                <ListItemButton onClick={() => {
                  handleSetNewCurrentLocation(pin.point.coordinates[1], pin.point.coordinates[0]);
                  setCurrentPin(pin);
                }}>
                  <ListItemIcon>
                    <HouseRounded></HouseRounded>
                  </ListItemIcon>
                  <ListItemText primary={pin.meta.nickname} />
                </ListItemButton>
              </ListItem>
            )
          })
        }
      </List>
    </Drawer>);
}

export default SideNavigation
