import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { LoginModal, RegisterModal } from "./Modals";
import "./landingpage.css";
import moon1 from "./assets/moon1.png";
import moon2 from "./assets/moon2.png";
import debris1 from "./assets/debris1.png";
import debris2 from "./assets/debris2.png";
import bigdebris1 from "./assets/bigdebris1.png";
import bigdebris2 from "./assets/bigdebris2.png";
import background from "./assets/background.png";
import { ArrowForward } from "@material-ui/icons";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import PALETTE from "../../constants/palette";
import { register, login, logout, userDetail } from "../../api"

const LandingPage = ({ setIsAuth }) => {
  let navigate = useNavigate();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  const handleOnEnter = async () => {
    let alreadyAuthorized = false;
    let token = localStorage.getItem("authToken");
    if (token == null) {
      setLoginModalShow(true);
    } else {
      const r = await userDetail(token);
      if (r.status == 200) {
        alreadyAuthorized = true;
        toast.info(`Already logged in as ${r.data.username}`);
        setIsAuth(auth => !auth)
      }
    }
    if (alreadyAuthorized) {
      navigate("/worldMenu");
      setIsAuth(auth => !auth)
    } else setLoginModalShow(true);
  };

  const handleSignUpModalShow = () => {
    setLoginModalShow(false);
    setRegisterModalShow(true);
    toast("Sign UP!");
  };

  const handleOnSignIn = async (username, password) => {
    const response = await login(username, password);
    if(response){
      toast(`Logged in as ${username}`)
      navigate("/worldMenu")
    }
    else{
      toast.warning("ID and Password does not match any account.")
    }
  };

  const handleOnSignUp = async (username, password, rePassword) => {
    const response = register(username, password, rePassword);
    toast.promise(response, {
      loading: "Signing up...",
      success: "Signed up!",
      error: response.data,
    });
  };

  const calc = (x, y) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2,
  ];

  const trans1 = (x, y) => `translate3d(${x / 20}px,${y / 20}px,0)`;
  const trans2 = (x, y) => `translate3d(${x / 16}px,${y / 10}px,0)`;
  const trans3 = (x, y) => `translate3d(${x / 30}px,${y / 32}px,0)`;
  const trans4 = (x, y) => `translate3d(${x / 20}px,${y / 35}px,0)`;
  const trans5 = (x, y) => `translate3d(${x / 30}px,${y / 14}px,0)`;
  const trans6 = (x, y) => `translate3d(${x / 16}px,${y / 20}px,0)`;

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 400, friction: 140 },
  }));

  return (
    <div className="parallax" style={{ backgroundImage: `url(${background})` }}>
      <Parallax pages={6}>
        <ParallaxLayer
          offset={0}
          speed={2.5}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="scene"
              onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xy: calc(x, y) })
              }
            >
              <animated.div style={{ transform: props.xy.to(trans1) }}>
                <img src={moon1} className="moon1" draggable="false"></img>
              </animated.div>
              <animated.div style={{ transform: props.xy.to(trans2) }}>
                <img src={moon2} className="moon2" draggable="false"></img>
              </animated.div>
              <animated.div style={{ transform: props.xy.to(trans3) }}>
                <img
                  src={bigdebris1}
                  className="bigdebris1"
                  draggable="false"
                ></img>
              </animated.div>
              <animated.div style={{ transform: props.xy.to(trans6) }}>
                <img src={debris2} className="debris2" draggable="false"></img>
              </animated.div>
              <animated.div style={{ transform: props.xy.to(trans4) }}>
                <img
                  src={bigdebris2}
                  className="bigdebris2"
                  draggable="false"
                ></img>
              </animated.div>
              <animated.div style={{ transform: props.xy.to(trans5) }}>
                <img src={debris1} className="debris1" draggable="false"></img>
              </animated.div>
            </div>

            <div className="login-container">
              <p className="title">CYBER PHYSICAL SYSTEM</p>
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: PALETTE.blue,
                  fontSize: "1vw",
                }}
                className="login-btn"
                variant="outlined"
                onClick={handleOnEnter}
                size="large"
              >
                Enter
                <ArrowForward style={{ fontSize: "1vw", gap: "15px" }} />
              </Button>
            </div>
            <LoginModal
              open={loginModalShow}
              handleClose={() => setLoginModalShow(false)}
              handleOnSignIn={handleOnSignIn}
              handleSignUpModal={handleSignUpModalShow}
            />
            <RegisterModal
              open={registerModalShow}
              handleClose={() => setRegisterModalShow(false)}
              handleOnSignUp={handleOnSignUp}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
          }}
        >
          <p className="card">About</p>
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 2, end: 4 }}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            color: "purple",
            marginLeft: "17%"
          }}
        >
          <p className="card">Features</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
            margin: "0 20%"
          }}
        >
          <p className="card">Multiple worlds</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
            margin: "0 20%"
          }}
        >
          <p className="card">Cesium world map</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
            margin: "0 20%"
          }}
        >
          <p className="card">VR House Representation</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={3.5}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
            margin: "0 20%"
          }}
        >
          <p className="card">Automated house rules</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={4}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
            margin: "0 20%"
          }}
        >
          <p className="card">Multi-user VR experience</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={5}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
          }}
        >
          <p className="card">Create by</p>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default LandingPage;
