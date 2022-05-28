import React from "react";
import { Cartographic, Math, defined } from "cesium";

import { ScreenSpaceEvent, ScreenSpaceEventHandler, useCesium } from "resium";
import { ScreenSpaceEventType, sampleTerrainMostDetailed } from "cesium";
import { createWorldTerrain } from "cesium";

export function CesiumEventHandler({ handleContextMenu, setCurrentCoords, terrainProvider}) {
  const { viewer, scene } = useCesium();
  //disable default object picking
  viewer.screenSpaceEventHandler.setInputAction(() => {},
  ScreenSpaceEventType.LEFT_CLICK);
  viewer.screenSpaceEventHandler.setInputAction(() => {},
  ScreenSpaceEventType.RIGHT_CLICK);
  // viewer.screenSpaceEventHandler.setInputAction(()=>{},ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  return (
    <ScreenSpaceEventHandler>
      <ScreenSpaceEvent
        action={(e) => {
          const pickedObject = scene.pick(e.position);
          if (defined(pickedObject) && pickedObject.id !== undefined) {
              return;
          }
          else{
            const cartesian = viewer.camera.pickEllipsoid(
                e.position,
                scene.globe.ellipsoid
              );
              if (cartesian) {
                const cartographic = Cartographic.fromCartesian(cartesian);
                // console.log(cartographic);
                const longitude = Math.toDegrees(cartographic.longitude);
                const latitude = Math.toDegrees(cartographic.latitude);
                sampleTerrainMostDetailed(terrainProvider,[cartographic]).then((updatedPositions) => {
                  // console.log(cartographic.height)
                  setCurrentCoords({latitude: latitude,longitude: longitude, altitude: cartographic.height})
                  handleContextMenu({ position: e.position });
                })
              }
          }
        }}
        type={ScreenSpaceEventType.RIGHT_CLICK}
      />
    </ScreenSpaceEventHandler>
  );
}
