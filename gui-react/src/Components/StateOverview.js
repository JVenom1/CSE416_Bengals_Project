import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import ScatterPlot from "./scatterplotStateClicked";
import magicNumbers from "../Helpers/magicNumbers.js";
import miscFunc from "../Helpers/miscFunctions.js";

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
    ensemble: [], // get ensemble list on server
  };

  // this is dummy data used to test will be replaced by state.ensemble when server is involved
  // list of predetermined ensemble sizes where getEnsemble will be a single one depending on the size
  const ensembleList = [
    {
      cluster: [],
      clusterDetails: [],
      clusterCoordinate: {
        x: [1, 2, 3],
        y: [4, 5, 6],
        radius: [10, 15, 20],
      },
      clusterAssociationCoordinate: { x: [], y: [] },
      distanceMeasure: {
        optimalTransport: [],
        hammingDistance: [],
        totalVariation: [],
      },
    },
    {
      cluster: [],
      clusterDetails: [],
      clusterCoordinate: {
        x: [4, 5, 6],
        y: [7, 50, 75],
        radius: [11, 13, 2],
      },
      clusterAssociationCoordinate: { x: [], y: [] },
      distanceMeasure: {
        optimalTransport: [],
        hammingDistance: [],
        totalVariation: [],
      },
    },
  ];
  const goToHomePage = (e) => {
    navigate("/");
  };
  const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
  const clusterScatterHeight = window.innerHeight; // Full height of the screen

  const maxBounds = magicNumbers.stateZoomBounds.stateID;
  const center = magicNumbers.stateCenter[stateID].latlng;
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
            ensemble={ensembleList[0]}
            clusterScatterWidth={clusterScatterWidth}
            clusterScatterHeight={clusterScatterHeight}
          />
        </div>
      </div>
    </>
  );
};

export default StateOverview;
