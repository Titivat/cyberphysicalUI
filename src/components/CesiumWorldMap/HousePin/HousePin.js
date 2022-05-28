import React from "react";
import {
  Entity,
  PointGraphics,
  EntityDescription,
  Primitive,
  LabelGraphics,
} from "resium";
import { Cartesian3, Cartesian2, Color , LabelStyle} from "cesium";
import { CONTENT_PATH_NAME } from "../../../constants/apiPath";

export default function HousePin({
    pin,
    setCurrentLocation,
    setCurrentPin,
}) {
  return (
    <Entity
      name={pin.meta.nickname}
      key={pin.meta.nickname}
      position={Cartesian3.fromDegrees(pin.point.coordinates[1], pin.point.coordinates[0], pin.point.coordinates[2])}
      onClick={(e) => {
        setCurrentLocation({
          latitude: pin.point.coordinates[0],
          longitude: pin.point.coordinates[1],
        });
        setCurrentPin(pin)
      }}
      onMouseEnter = {(mousepos,entity) => {
        entity.id.point.pixelSize = 10
        entity.id.point.color = Color.YELLOW
      }}
      onMouseLeave = {(mousepos,entity) => {
        entity.id.point.pixelSize = 7.5
        entity.id.point.color = Color.RED
      }}
    >
      <PointGraphics pixelSize={7.5} color={Color.RED} />
      <LabelGraphics
        distanceDisplayCondition={{near: 0, far:1000}}
        text={pin.meta.nickname}
        pixelOffset={Cartesian2.fromArray([0, -20])}
        outlineWidth={1}
        outlineColor={Color.BLACK}
        style = {LabelStyle.FILL_AND_OUTLINE}
      ></LabelGraphics>
    </Entity>
  );
}
