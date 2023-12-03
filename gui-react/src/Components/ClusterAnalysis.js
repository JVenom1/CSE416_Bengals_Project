import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import magicNumbers from "../Helpers/magicNumbers.js";
import miscFunc from "../Helpers/miscFunctions.js";

const ClusterAnalysis = () => {
  useEffect(() => {
    changeMapSizeXbyY("100%", "25vw");
  });
  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.data;
  const stateID = "WI";
  const mapMaxBounds = magicNumbers.stateZoomBounds.stateID;
  const mapCenter = magicNumbers.stateCenter[stateID].latlng;
  const goToHomePage = (e) => {
    navigate("/");
  };
  return (
    <>
      <div className="mapWrapper">
        <MapContainer
          center={mapCenter}
          zoom={6}
          minZoom={6}
          maxBounds={mapMaxBounds}
          maxZoom={6}
          dragging={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <GeoJSON data={state.currentDistrictPlan} /> */}
        </MapContainer>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        <MapContainer
          center={mapCenter}
          zoom={6}
          minZoom={6}
          maxBounds={mapMaxBounds}
          maxZoom={6}
          dragging={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <GeoJSON data={state.currentDistrictPlan} /> */}
        </MapContainer>
        <div className="clusterRight"></div>
      </div>
    </>
  );
};

export default ClusterAnalysis;
