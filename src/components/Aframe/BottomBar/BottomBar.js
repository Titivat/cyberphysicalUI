import * as React from "react";
import "./bottomBar.css";
import { red, blueGrey } from '@mui/material/colors';
import { Box, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useNavigate } from "react-router-dom";

const BottomBar = ({ handleOpenObjectModal, handleOpenRuleModal }) => {
  let navigate = useNavigate();

  return (
    <Box sx={{ height: "10vh" }}>
      <BottomNavigation style={{ backgroundColor: "#1D1135" }} showLabels>
        <BottomNavigationAction
          sx={{ color: blueGrey[50] }}
          onClick={handleOpenObjectModal}
          label="New Object"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          sx={{ color: blueGrey[50] }}
          onClick={handleOpenRuleModal}
          label="Rules"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          sx={{ position: 'fixed', right: 0, mt: "9.7px", color: red[600] }}
          onClick={() => navigate(-1)}
          label="Exit"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomBar;
