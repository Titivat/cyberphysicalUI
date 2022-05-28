import { HousePin } from "./HousePin";
import { Building } from "./Building"
// https://resium.reearth.io/
import React, { useEffect, useState } from "react";
import "./cesiumMap.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Viewer,
  Entity,
  PointGraphics,
  EntityDescription,
  CameraFlyTo,
  BillboardGraphics,
  Primitive,
  Cesium3DTileset,
  ScreenSpaceEvent,
  ScreenSpaceEventHandler,
  ModelGraphics,
} from "resium";
import {
  Cartesian3,
  Ion,
  IonResource,
  CesiumTerrainProvider,
  Color,
  ScreenSpaceEventType,
  Transforms,
  HeadingPitchRoll,
  Math,
} from "cesium";
import { CONTENT_PATH_NAME } from "../../constants/apiPath";
import { CESIUM_TOKEN } from "../../constants/cesiumToken";
// import { MAP_PIN } from "../../constants/pins";
import ecc from "../Aframe/assets/ecc.glb";

import SideNavigation from "./SideNavigation";
import MenuIcon from "@material-ui/icons/Menu";
import { getApi, postApi, deleteApi } from "../../api";
import {
  DeletingModal,
  EditingModal,
  CreationModal,
  DetailModal,
  PlaceBuildingModal,
  BuildingDetailModal,
  BuildingDeletingModal,
  BuildingEditingModal
} from "./Modals";
import ContextMenu from "./ContextMenu";
import {  blueGrey } from '@mui/material/colors';
import { CesiumEventHandler } from "./cesiumEventHandler";

Ion.defaultAccessToken = CESIUM_TOKEN;
const ionTerrainProvider = IonResource.fromAssetId(1);
const terrainProvider = new CesiumTerrainProvider({ url: ionTerrainProvider });
const osmBuildings = IonResource.fromAssetId(96188);

const CesiumWorldMap = (props) => {
  let navigate = useNavigate();
  let state = useLocation().state;
  let initialPin = {
    id: "",
    meta: { nickname: "", avatar: "" },
    point: { coordinates: [0, 0, 0] },
    scadaData: { host: "", token: "" },
  };

  let initialBuilding = {
    id: "",
    meta: { nickname: "", avatar: "" },
    point: { coordinates: [0, 0, 0] },
    rotation: [0,0,0]
  }
  const [isUpdate, setIsUpdate] = useState(null);
  // World States
  const [pins, setPins] = useState(null);
  const [buildings, setBuildings] = useState([
    {
      id: "eccBuilding",
      meta: {
        nickname: "ecc",
        avatar: "/userUploadedModel/ecc.glb",
      },
      model: { ecc },
      rotation: {
        x: 90,
        y: 0,
        z: 0,
      },
      point: {
        coordinates: [
          13.729021564727693, 100.77477890119582, -27.88629368305824,
        ],
      },
    },
  ]);

  //Selection States
  const [currentPin, setCurrentPin] = useState(initialPin);
  const [currentBuilding, setCurrentBuilding] = useState(buildings[0]);
  const [currentCoords, setCurrentCoords] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  //Modal States
  const [showHouseCreateModal, setShowHouseCreateModal] = useState(false);
  const [showHouseEditingModal, setShowHouseEditingModal] = useState(false);
  const [showHouseDeletingModal, setShowHouseDeletingModal] = useState(false);
  const [showHouseDetailModal, setShowHouseDetailModal] = useState(false);

  const [showPlaceBuildingModal, setShowPlaceBuildingModal] = useState(false);
  const [showBuildingEditingModal, setShowBuildingEditingModal] =
    useState(false);
  const [showBuildingDeletingModal, setShowBuildingDeletingModal] =
    useState(false);
  const [showBuildingDetailModal, setShowBuildingDetailModal] = useState(false);

  const [showSideNavigation, setShowSideNavigation] = useState(false);
  //Context Menu
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      //get Houses
      const housesRespond = await getApi(
        `cyber/universe/${state.worldID}/houses/`
      );
      if (housesRespond.status !== 200) {
        alert("fail to fetch");
      }
      setPins(housesRespond && housesRespond.data);
      console.log(housesRespond.data)
      // get Buildings
      const buildingsRespond = await getApi(
        `cyber/universe/${state.worldID}/buildings/`
      );
      if (buildingsRespond.status !== 200) {
        alert("fail to fetch building data");
      }
      setBuildings(buildingsRespond && buildingsRespond.data);
      console.log(buildingsRespond.data)
      // setPins(MAP_PIN);
    }
    fetchMyAPI();
  }, [isUpdate]);

  const handleContextMenu = (position) => {
    const scrPos = position.position;
    console.log(position);
    setContextMenu({
      mouseX: scrPos.x,
      mouseY: scrPos.y,
    });
  };

  const handleJoinHouse = (houseid) => {
    // navigate("/aframe", {
    //   state: { world: state.worldID, house: houseid },
    // });
    navigate("/aframe", {
      state: { world: state.worldID, house: currentPin.id },
    });
  };

  const handleCreateHouse = async (houseData) => {
    houseData.scadaData = JSON.stringify(houseData.scadaData);
    const response = await postApi(
      `cyber/universe/${state.worldID}/houses/`,
      houseData
    );
    if (response.status === 200) setIsUpdate(!isUpdate);
  };
  const handleEditHouse = async (houseData) => {
    console.log(houseData);
    const response = await postApi(
      `cyber/universe/${state.worldID}/house/${currentPin.id}/details/`,
      houseData
    );
    if (response.status === 200) setIsUpdate(!isUpdate);
  };

  const handleDeleteHouse = async (pin) => {
    const data = { houseID: pin.id };
    const response = await deleteApi(
      `cyber/universe/${state.worldID}/houses/`,
      data
    );
    if (response.status === 200) setIsUpdate(!isUpdate);
  };

  const handleSetNewCurrentLocation = (long, lat) => {
    setCurrentLocation({
      longitude: long,
      latitude: lat,
    });
  };

  const handlePlaceBuilding = async (buildingData) => {
    console.log(buildingData)
    const response = await postApi(
      `cyber/universe/${state.worldID}/buildings/`,
      buildingData
    );
    if (response.status === 200) setIsUpdate(!isUpdate);
  };

  const handleDeleteBuilding = async () => {
    const data = { buildingID: currentBuilding.id };
    const response = await deleteApi(
      `cyber/universe/${state.worldID}/buildings/`,
      data
    );
    if (response.status === 200) setIsUpdate(!isUpdate);
  }

  const handleEditBuilding = async (buildingData) => {
    console.log(buildingData)
    const response = await postApi(
      `cyber/universe/${state.worldID}/building/${currentBuilding.id}/details/`,
      buildingData
    );
    if (response.status === 200) setIsUpdate(!isUpdate);
  }

  const handleCloseContextMenu = () => setContextMenu(null);

  return (
    <div>
      <div
        className="three-d-map-container"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <ContextMenu
          contextMenu={contextMenu}
          handleClose={handleCloseContextMenu}
          setShowCreationModal={setShowHouseCreateModal}
          setShowPlaceBuildingModal={setShowPlaceBuildingModal}
        />
        <SideNavigation
          pins={pins}
          handleSetNewCurrentLocation={handleSetNewCurrentLocation}
          setCurrentPin={setCurrentPin}
          showSideNavigation={showSideNavigation}
          handleShowSideNavigation={() => setShowSideNavigation(false)}
        />
        {/* CESIUM SCENE */}
        <Viewer
          timeline={false}
          animation={false}
          navigationHelpButton={true}
          scene3DOnly={true}
          geocoder={false}
          className="three-d-map"
          terrainProvider={terrainProvider}
        >
          {/* 3D OSM BUILDINGS */}
          {/* <Primitive>
            <Cesium3DTileset url={osmBuildings}></Cesium3DTileset>
          </Primitive> */}
          {/* Side Navigation Button */}
          {!showSideNavigation && (
            <MenuIcon
              style={{ fontSize: "50", color: blueGrey[50] }}
              className="hamburger-menu"
              onClick={() => setShowSideNavigation(true)}
            />
          )}
          {/* Self written handler, see more on cesiumEventHandler.js */}
          <CesiumEventHandler
            handleContextMenu={handleContextMenu}
            setCurrentCoords={setCurrentCoords}
            terrainProvider={terrainProvider}
          />
          {/* HOUSE PINS */}
          {pins &&
            pins.map((pin) => {
              return (
                <HousePin
                  key={pin.id}
                  pin={pin}
                  setCurrentLocation={setCurrentLocation}
                  setCurrentPin={setCurrentPin}
                />
              );
            })}
          {/* WORLD BUILDINGS */}
          {buildings &&
            buildings.map((building) => {
              return (
                <Building
                  setShowBuildingDetailModal={setShowBuildingDetailModal}
                  building={building}
                  key={building.id}
                  setCurrentLocation={setCurrentLocation}
                  setCurrentBuilding={setCurrentBuilding}
                />
              );
            })}
          {/* FOR FLYING TO */}
          {currentLocation && (
            <CameraFlyTo
              destination={Cartesian3.fromDegrees(
                currentLocation.longitude,
                currentLocation.latitude,
                100
              )}
              onComplete={() => {
                setCurrentLocation(null);
                setShowHouseDetailModal(true);
              }}
            />
          )}
        </Viewer>
      </div>

      {/*HOUSES CRUD MODALS*/}
      <DetailModal
        open={showHouseDetailModal}
        handleClose={() => setShowHouseDetailModal(false)}
        handleJoinHouse={handleJoinHouse}
        setShowHouseEditingModal={setShowHouseEditingModal}
        currentPin={currentPin}
      />
      <CreationModal
        open={showHouseCreateModal}
        currentCoords={currentCoords}
        handleClose={() => setShowHouseCreateModal(false)}
        handleCreateHouse={handleCreateHouse}
      />
      <DeletingModal
        open={showHouseDeletingModal}
        handleClose={() => setShowHouseDeletingModal(false)}
        currentPin={currentPin}
        handleDeleteHouse={handleDeleteHouse}
      />
      <EditingModal
        open={showHouseEditingModal}
        handleClose={() => setShowHouseEditingModal(false)}
        currentPin={currentPin}
        handleEditHouse={handleEditHouse}
        setShowHouseDeletingModal={setShowHouseDeletingModal}
      />

      {/* BUILING CRUD MODALS */}
      <PlaceBuildingModal
        open={showPlaceBuildingModal}
        handleClose={() => setShowPlaceBuildingModal(false)}
        currentCoords={currentCoords}
        handlePlaceBuilding={handlePlaceBuilding}
      />
      <BuildingDetailModal
        open={showBuildingDetailModal}
        handleClose={() => setShowBuildingDetailModal(false)}
        setShowBuildingEditingModal={setShowBuildingEditingModal}
        currentBuilding={currentBuilding}
      />
      <BuildingEditingModal
        open={showBuildingEditingModal}
        handleClose={() => setShowBuildingEditingModal(false)}
        handleEditBuilding={handleEditBuilding}
        setShowHouseDeletingModal={setShowBuildingDeletingModal}
        currentBuilding={currentBuilding}
      />
      <BuildingDeletingModal
        open={showBuildingDeletingModal}
        handleClose={() => setShowBuildingDeletingModal(false)}
        currentBuilding={currentBuilding}
        handleDeleteBuilding={handleDeleteBuilding}
      />
    </div>
  );
};

export default CesiumWorldMap;
