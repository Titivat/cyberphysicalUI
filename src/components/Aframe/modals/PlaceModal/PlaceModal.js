import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@material-ui/icons/Menu";

export default function PlaceModal({
    open,
    handleClose,
}) {



    return <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}>
        <AppBar sx={{
            position: "relative"
        }}>
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography sx={{
                    ml: 2,
                    flex: 1
                }} variant="h6" component="div">
                    Furniture
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                    Close
                </Button>
            </Toolbar>
        </AppBar>

        <ImageList sx={{
            width: "100%",
            height: 450
        }} cols={4} rowHeight={250} gap={10}>
            {itemData.map(item => <ImageListItem key={item.img}>
                <img src={`${item.img}?w=480&fit=crop&auto=format`} srcSet={`${item.img}?w=480&fit=crop&auto=format&dpr=4 4x`} alt={item.title} loading="lazy" />
                <ImageListItemBar title={item.title} actionIcon={<IconButton sx={{
                    color: "rgba(255, 255, 255, 0.54)"
                }} aria-label={`info about ${item.title}`}>
                </IconButton>} />
            </ImageListItem>)}
        </ImageList>
    </Dialog>;
}


const itemData = [
    {
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        id: 1,
    },
    {
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Burger",
        id: 2,
    },
    {
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Tomato basil",
        id: 3,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        id: 4,
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        id: 5,
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        id: 6,
    },
];
