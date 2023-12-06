import { useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import ScatterPlot from "./ClusterScatter.js";
import mNum from "../Helpers/magicNumbers.js";
import axios from "axios";
import { api } from "./HomePage.js";

const StateOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // unwrapped stateID (eg: WI, MD, NC) from previous page
  const stateID = location.state.stateID;
  const ensembleIndex = location.state.buttonIndex;

  // "/{stateID}/2020plan"
  // const currentDistrictPlan = async (stateID) => {
  //   const response = await axios.get(`${api}/${stateID}/2020plan`);
  //   return response.data;
  // };
  const currentDistrictPlan = location.state.currentDistrictPlan;

  // "/{stateID}/{ensembleIndex}"
  // const currEnsemble = async (stateID) => {
  //   const response = await axios.get(`${api}/${stateID}/${ensembleIndex}`);
  //   return response.data;
  // };
  const currEnsemble = location.state.ensemble;
  const goToHomePage = (e) => {
    navigate("/");
  };
  const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
  const clusterScatterHeight = window.innerHeight; // Full height of the screen

  const maxBounds = mNum.stateZoomBounds.stateID;
  const center = mNum.stateCenter[stateID].latlng;

  useEffect(() => {
    const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
      const leafletContainer = document.querySelector(".leaflet-container");
      leafletContainer.style.width = width;
      leafletContainer.style.height = height;
    };
    changeMapSizeXbyY("100%", "50vw");
  }, []);

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
          <GeoJSON data={currentDistrictPlan} />
        </MapContainer>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        <div className="clusterScatter">
          <ScatterPlot
            currEnsemble={currEnsemble}
            stateID={stateID}
            currentDistrictPlan={currentDistrictPlan}
            clusterScatterWidth={clusterScatterWidth}
            clusterScatterHeight={clusterScatterHeight}
            ensembleIndex={ensembleIndex}
          />
        </div>
      </div>
    </>
  );
};

export default StateOverview;
