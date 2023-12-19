import { React, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Defaults from "../Helpers/Defaults.js";
import "../CSS/App.css";

const CompareDistrMap = ({ stateID, currentDistrPlan, selectedPlan }) => {
  const [forceRerender, setForceRerender] = useState(true);
  useEffect(() => {
    // Toggle the value of forceRerender to trigger a re-render
    setForceRerender((prevState) => !prevState);
    // changeMapSizeXbyY("80%", "40vw");
  }, [selectedPlan, currentDistrPlan]);
  const getWinnerColor = (plan) => {
    if (plan) {
      return "red";
    } else {
      return "blue";
    }
  };
  const winnerColor = getWinnerColor(selectedPlan);
  // console.log(selectedPlan);
  let zoom = 7;
  const handleDiffScreenSizes = (zoom) => {
    const diagonalSize = Math.sqrt(
      window.innerWidth ** 2 + window.innerHeight ** 2
    );
    const avgLaptopSize = 2000; //pixels
    zoom -= diagonalSize < avgLaptopSize ? 1 : 0;
    return zoom;
  };

  // if screen is small eg laptop zoom out 1 level
  zoom = handleDiffScreenSizes(zoom);
  useEffect(() => {
    Defaults.changeMapSizeXbyY("100%", "36vw");
  }, [forceRerender]);
  return (
    <>
      <div className="only-map">
        <MapContainer
          key={forceRerender}
          center={Defaults.stateData.center[stateID].latlng}
          zoom={zoom}
          minZoom={4}
          maxBounds={Defaults.stateData.maxBound.stateID}
          maxZoom={7}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={currentDistrPlan} />
          {selectedPlan !== null ? (
            <GeoJSON style={{ color: winnerColor }} data={selectedPlan} />
          ) : null}
        </MapContainer>
      </div>
    </>
  );
};

export default CompareDistrMap;
