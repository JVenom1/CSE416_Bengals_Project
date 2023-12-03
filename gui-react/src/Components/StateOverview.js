import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import ScatterPlot from "./ClusterScatter.js";
import MagicNumbers from "../Helpers/magicNumbers.js";

// Outline Data
import MDData from "../Data/StateOutlines/MDOutline.json";
import NCData from "../Data/StateOutlines/NCOutline.json";
import WIData from "../Data/StateOutlines/WIOutline.json";

const StateOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // unwrapped stateID (eg: WI, MD, NC) from previous page
  const stateID = location.state.stateID;

  const state = {
    currentDistrictPlan: location.state.currentDistrictPlan,
    ensembleList: location.state.ensemble,
  };

  // this is dummy data used to test will be replaced by state.ensemble when server is involved

  const goToHomePage = (e) => {
    navigate("/");
  };
  const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
  const clusterScatterHeight = window.innerHeight; // Full height of the screen

  const maxBounds = MagicNumbers.stateZoomBounds.stateID;
  const center = MagicNumbers.stateCenter[stateID].latlng;

  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  useEffect(() => {
    changeMapSizeXbyY("100%", "50vw");
    handleDistrictData();
  }, []);

  const handleDistrictData = () => {
    // set the map view
    if (stateID === "WI") {
      return <GeoJSON data={WIData} />;
    } else if (stateID === "MD") {
      return <GeoJSON data={MDData} />;
    } else if (stateID === "NC") {
      return <GeoJSON data={NCData} />;
    }
  };

  return (
    <>
      <div className="mapWrapper">
        <MapContainer
          center={center}
          zoom={7}
          minZoom={7}
          maxBounds={maxBounds}
          maxZoom={7}
          dragging={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={state.currentDistrictPlan} />
        </MapContainer>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        <div className="clusterScatter">
          <ScatterPlot
            ensemble={state.ensembleList[0]}
            stateID={stateID}
            clusterScatterWidth={clusterScatterWidth}
            clusterScatterHeight={clusterScatterHeight}
          />
        </div>
      </div>
    </>
  );
};

export default StateOverview;
