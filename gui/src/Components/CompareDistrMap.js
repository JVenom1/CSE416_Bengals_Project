import { React, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import mNum from "../Helpers/mNum.js";
import "../App.css";

const CompareDistrMap = ({ stateID, currentDistrPlan, selectedPlan }) => {
  const [forceRerender, setForceRerender] = useState(true);
  const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  useEffect(() => {
    // Toggle the value of forceRerender to trigger a re-render
    setForceRerender((prevState) => !prevState);
    // changeMapSizeXbyY("80%", "40vw");
  }, [selectedPlan, currentDistrPlan]);

  console.log(selectedPlan);

  useEffect(() => {
    changeMapSizeXbyY("80%", "40vw");
  }, [forceRerender]);
  return (
    <>
      <MapContainer
        key={forceRerender}
        center={mNum.stateCenter[stateID].latlng}
        zoom={5}
        minZoom={4}
        maxBounds={mNum.stateZoomBounds.stateID}
        maxZoom={7}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={currentDistrPlan} />
        {selectedPlan !== null ? (
          <GeoJSON style={{ color: "orange" }} data={selectedPlan} />
        ) : null}
      </MapContainer>
    </>
  );
};

export default CompareDistrMap;
