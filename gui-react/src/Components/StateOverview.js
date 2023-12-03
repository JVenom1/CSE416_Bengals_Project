import { useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import ScatterPlot from "./ClusterScatter.js";
import MagicNumbers from "../Helpers/magicNumbers.js";

const StateOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // unwrapped stateID (eg: WI, MD, NC) from previous page
  const stateID = location.state.stateID;

  const currentDistrictPlan = location.state.currentDistrictPlan;
  const ensembleList = location.state.ensemble;

  // this is dummy data used to test will be replaced by ensembleList when server is involved

  const goToHomePage = (e) => {
    navigate("/");
  };
  const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
  const clusterScatterHeight = window.innerHeight; // Full height of the screen

  const maxBounds = MagicNumbers.stateZoomBounds.stateID;
  const center = MagicNumbers.stateCenter[stateID].latlng;

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
            ensemble={ensembleList[0]}
            stateID={stateID}
            currentDistrictPlan={currentDistrictPlan}
            clusterScatterWidth={clusterScatterWidth}
            clusterScatterHeight={clusterScatterHeight}
          />
        </div>
      </div>
    </>
  );
};

export default StateOverview;
