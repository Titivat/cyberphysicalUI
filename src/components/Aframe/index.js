import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomBar from "./BottomBar";
import "./AFrame.css";
import ground from "./assets/dirt_floor.jpg";
import lightbulb from "./assets/Lightbulb.glb";
import tv from "./assets/smarttv.glb";
import lefthand from "./assets/avatar/lefthand.glb"
import righthand from "./assets/avatar/righthand.glb"
import head from "./assets/avatar/head.glb"
import useToggleModal from "./BottomBar/tool/useToggleModal.js";
import { PlaceModal, ObjectModal, RulesModal } from "./modals";

import "aframe";
import "super-hands";
import "aframe-event-set-component";
require("aframe-gui");
require("aframe-extras");
require("aframe-lerp-component");
require("aframe-simple-sun-sky");

import "./a-frame-components/EnterVRListeners.js";
import "./a-frame-components/device.js";
import "./a-frame-components/aframe-aterrain-component.js";
import "./a-frame-components/isGrab.js"
import "./systems/cyber-ws.js"
import { API_PATH_NAME, CONTENT_PATH_NAME } from "../../constants/apiPath";

const sampleDevices = [
  JSON.stringify({
    id: 123456,
    meta: {
      nickname: "Hue1",
      avatar: "",
    },
    tags: [
      { name: "onoff", value: 1, min: 0, max: 1, widget: "switch" },
      { name: "brightness", value: 100, min: 0, max: 100, widget: "slider" },
      {
        name: "color",
        value: "#eeeeee",
        min: null,
        max: null,
        widget: "color_picker",
      },
    ],
  }),
  JSON.stringify({
    id: 123458,
    meta: {
      nickname: "LGTVHD+",
      avatar: "",
    },
    tags: [
      { name: "onoff", value: 1, max: 1, widget: "switch" },
      { name: "brightness", value: 100, max: 100, widget: "slider" },
      { name: "channel", value: "100", max: 144, widget: "slider" },
      { name: "volume", value: "20", max: 100, widget: "slider" },
    ],
  }),
];

const Aframe = () => {
  let navigate = useNavigate();
  let state = useLocation().state;
  console.log(state);
  const [isPlaceObjectOpen, handleOpenObjectModal, handleCloseObjectModal] =
    useToggleModal();
  const [isRuleModalOpen, handleOpenRuleModal, handleCloseRuleModal] =
    useToggleModal();

  useEffect(() => {
    return () => {
      window.location.reload(false);
    };
  }, []);

  const websocket_host = API_PATH_NAME.replace("https","wss")+"ws/"+state.world+"/"+state.house+"/"
  console.log(websocket_host)
  const token = localStorage.getItem("authToken")
  const content_host = CONTENT_PATH_NAME

  return (
    <div className="AframeBox">
      <a-scene cyber-physical-system={`host:${websocket_host};token:${token};content_host:${content_host}`} embedded vrmodelistener>
        <a-assets id="assets">
          <img id="ground" src={ground} />
          <a-asset-item id="lefthandmodel" src={lefthand}/>
          <a-asset-item id="righthandmodel" src={righthand}/>
          <a-asset-item id="headmodel" src={head}/>

          <a-mixin
            id="pointer"
            raycaster="showLine: true; lineColor: black; objects: .cube, .link, [gui-interactable]; far: 7; origin: 0 0 0.1; fuse: false;"
            super-hands="colliderEvent: raycaster-intersection;
                               colliderEventProperty: els;
                               colliderEndEvent:raycaster-intersection-cleared;
                               colliderEndEventProperty: clearedEls;"
          ></a-mixin>
          <a-mixin
            id="controller-right"
            mixin="pointer"
            hand-controls="hand: right"
          ></a-mixin>
          <a-mixin
            id="controller-left"
            mixin="pointer"
            hand-controls="hand: left"
          ></a-mixin>
          <a-mixin
            id="cube"
            geometry="primitive: box; width: 0.5; height: 0.5; depth: 0.5"
            hoverable=""
            grabbable=""
            shadow=""
          ></a-mixin>
        </a-assets>

        <a-entity
          id="rig"
          movement-controls="fly: false; speed: 0.15 enabled:true"
          look-controls="enabled:true"
        >
          <a-entity
            id="camera"
            camera="active:true"
            position="0 0 0"
          ></a-entity>
          <a-entity id="cursor" super-hands="colliderEvent: raycaster-intersection;
                               colliderEventProperty: els;
                               colliderEndEvent:raycaster-intersection-cleared;
                               colliderEndEventProperty: clearedEls;"
            cursor="rayOrigin: mouse"></a-entity>
          {/* <a-entity id="rhand" mixin="controller-right"></a-entity>
          <a-gui-cursor id="lhand" mixin="controller-left" ></a-gui-cursor> */}
        </a-entity>
        <a-entity text="value: Hello World;"></a-entity>
        <a-entity
          class="cube"
          mixin="cube"
          position="0 1 -1.25"
          material="color: red"
          isgrab
        ></a-entity>

        <a-entity
          id="bulb"
          gltf-model={lightbulb}
          position="0 0.5 -5"
          device={
            "type:lightbulb;system:CyberPhys;deviceData:" + sampleDevices[0]
          }
        ></a-entity>

        <a-entity
          id="smarttv"
          gltf-model={tv}
          position="4.5 .14 -4.5"
          rotation="0 -45 0"
          device={"type:tv;system:CyberPhys;deviceData:" + sampleDevices[1]}
        ></a-entity>
        <a-plane
          src="#ground"
          repeat="500 500"
          height="1000"
          width="1000"
          rotation="-90 0 0"
          position="0 -.5 0"
        ></a-plane>

        {/* GLOBAL LIGHTING */}
        <a-entity
          position="0 100 0"
          light="type: ambient;intensity: 0.5;color: #FFFFFF"
        ></a-entity>
        <a-entity
          position="0 100 0"
          light="type: directional;intensity: 0.2;color: #FFFFFF"
        ></a-entity>
        <a-simple-sun-sky
          sun-position="1 5 0"
          fog-color="#04aee2"
        ></a-simple-sun-sky>
      </a-scene>

      <BottomBar
        style={{ backgroundColor: "#1D1135" }}
        handleOpenObjectModal={handleOpenObjectModal}
        handleOpenRuleModal={handleOpenRuleModal}
      />
      <ObjectModal
        open={isPlaceObjectOpen}
        handleClose={handleCloseObjectModal}
      />
      <RulesModal open={isRuleModalOpen} handleClose={handleCloseRuleModal} />
    </div>
  );
};

export default Aframe;
