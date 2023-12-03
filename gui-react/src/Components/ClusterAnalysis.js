// Import necessary libraries
import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import MagicNumbers from "../Helpers/magicNumbers.js";

// Import GeoJSON data
import WIData from "../Data/StateOutlines/WIOutline.json";

// Define the ClusterAnalysis component
const ClusterAnalysis = () => {
  // Initialize state and router hooks
  const navigate = useNavigate();
  const location = useLocation();
  const currCluster = location.state.currCluster;

  // Define state ID and map bounds
  const stateID = location.state.stateID;
  const distPlan1 = WIData;
  const distPlan2 = WIData;
  const maxBounds = MagicNumbers.stateZoomBounds[stateID];
  const center = MagicNumbers.stateCenter[stateID].latlng;
  const leafLeftCenter = MagicNumbers.leafLeftStateCenter[stateID].latlng;

  // Use useEffect to handle side effects when the component mounts
  useEffect(() => {
    changeMapSizeXbyY("100%", "25vw");
  }, []);

  // Function to change map size
  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };

  // Function to navigate to the home page
  const goToHomePage = () => {
    navigate("/");
  };

  // Return JSX for rendering the component
  return (
    <>
      <div className="mapWrapper">
        <MapContainer
          center={center}
          zoom={6}
          minZoom={6}
          maxBounds={maxBounds}
          maxZoom={6}
          dragging={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Render GeoJSON using the imported data */}
          <GeoJSON data={distPlan1} />
        </MapContainer>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        {distPlan2 !== null ? (
          <MapContainer
            center={leafLeftCenter}
            zoom={6}
            minZoom={6}
            maxBounds={maxBounds}
            maxZoom={6}
            dragging={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={distPlan2} />
          </MapContainer>
        ) : null}
        <div className="clusterRight">
          <div className="districtsScatter"></div>
          <div className="districtsTable"></div>
        </div>
      </div>
    </>
  );
};

// Export the ClusterAnalysis component
export default ClusterAnalysis;
