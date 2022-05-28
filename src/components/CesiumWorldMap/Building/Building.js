import React from "react";
import {
  Entity,
  PointGraphics,
  EntityDescription,
  Primitive,
  ModelGraphics,
} from "resium";
import { Transforms, HeadingPitchRoll, Math } from "cesium";
import { Cartesian3, Cartesian2, Color, LabelStyle } from "cesium";
import { CONTENT_PATH_NAME } from "../../../constants/apiPath";

export default function Building({
  building,
  setCurrentLocation,
  setCurrentBuilding,
  setShowBuildingDetailModal
}) {
  console.log(building)
  const position = Cartesian3.fromDegrees(
    building.point.coordinates[1],
    building.point.coordinates[0],
    building.point.coordinates[2]
  );
  return (
    <Entity
      name={building.meta.nickname}
      key={building.meta.nickname}
      orientation={Transforms.headingPitchRollQuaternion(
        position,
        new HeadingPitchRoll(
          Math.toRadians(building.rotation[0]),
          Math.toRadians(building.rotation[1]),
          Math.toRadians(building.rotation[2])
        )
      )}
      position={position}
      onClick={(e) => {
        // setCurrentLocation({
        //   latitude: building.point.coordinates[0],
        //   longitude: building.point.coordinates[1],
        // });
        setShowBuildingDetailModal(true)
        setCurrentBuilding(building)
      }}
    >
      <ModelGraphics
        distanceDisplayCondition={{ near: 0, far: 4000 }}
        uri={CONTENT_PATH_NAME + building.meta.avatar}
      ></ModelGraphics>
    </Entity>
  );
}
