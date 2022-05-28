import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Aframe,
  WorldMenu,
  LandingPage,
  CesiumWorldMap,
} from "./components";
import "./fonts/Roboto.ttf";
import "./App.css";
// bottstap to be injdect to the project
import "bootstrap/dist/css/bootstrap.min.css";
// for map icon to be show
import "mapbox-gl/dist/mapbox-gl.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Container } from "@material-ui/core";
import Header from "./components/Header"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1d1135',
    },
    secondary: {
      main: '#0c164f',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#5643fd',
    },
    success: {
      main: '#4caf50',
    },
  }});
function App() {
  const [isAuth, setIsAuth ] = useState(false)
//  auth
  // if( !aulth){
  //   return <LandingPage></LandingPage>
  // }


  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <ThemeProvider theme={theme}>
      <Header isAuth={isAuth}/>
        <Routes>
          <Route path="/" element={<LandingPage setIsAuth={setIsAuth}/>}></Route>
          <Route path="/worldMenu" element={<WorldMenu itemsPerPage={6} />}></Route>
          <Route path="/aframe" element={<Aframe />}></Route>
          <Route path="/worldMap" element={<CesiumWorldMap />}></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
