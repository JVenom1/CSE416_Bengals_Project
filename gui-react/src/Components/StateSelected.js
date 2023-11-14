import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// Data
import MDDistricts from "../Data/DistrictPlans/MD.json";
import NCDistricts from "../Data/DistrictPlans/NC.json";
import WIDistricts from "../Data/DistrictPlans/WI.json";

const StateClicked = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stateID, setStateID] = useState(location.state.stateID);

  const handleDistrictData = (() => {
    // set the map view
    if (stateID === "WI") {
      return (
        <GeoJSON
          data={WIDistricts}
        />);
    }
    else if (stateID === "MD") {
      return (<GeoJSON
        data={MDDistricts}
      />)
    }
    else if (stateID === "NC") {
      return (<GeoJSON
        data={NCDistricts}
      />)
    }
  })

  const geojsonData = handleDistrictData();
  const changeMapSizeXbyY = ((height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  });
  // stateID = Abbr of actual state (eg: WI, MD, NC)
  const stateCenter = {
    NC: {
      latlng: [35.7796, -78.6382],
    },
    MD: {
      latlng: [39.0458, -76.6413],
    },
    WI: {
      latlng: [44.0731, -89.4012],
    },
  };

  // lat, long
  const stateZoomBounds = {
    WI: [
      [47, -92.0], // Southwestern corner
      [42.5, -87.0], // Northeastern corner
    ], // Adjust the bounds as needed
    MD: [
      [35.5, -79.5], // Southwestern corner
      [40.5, -74.0], // Northeastern corner
    ], // Adjust the bounds as needed
    NC: [
      [36.5, -84.0], // Southwestern corner
      [33.5, -75.0], // Northeastern corner
    ], // Adjust the bounds as needed
  };
  const maxBounds = stateZoomBounds.stateID;
  const center = stateCenter[stateID].latlng;

  const handleEnsembleBoxes = () => {
    //implement later
  }

  useEffect(() => {
    changeMapSizeXbyY("100%", "50vw");
    handleDistrictData();
  }, [])
  const goToHomePage = (e) => {
    navigate("/");
  }

  return <>
    <div className="mapWrapper">
      <MapContainer
        center={center}
        zoom={6}
        minZoom={6}
        maxBounds={maxBounds}
        maxZoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geojsonData}
      </MapContainer>
      <button className="home-button" onClick={goToHomePage}>
        Home
      </button>
      <div className="ensembleSelect">
        {/* implement later {handleEnsembleBoxes} */}
        <div id="ensembles">
          <div class="ensemble">
            Ensemble 1
            <div class="button-container">
              <a href="#" class="button">Distance Measures</a>
              <a href="#" class="button">Cluster Analysis</a>
            </div>
          </div>
          <div class="ensemble">
            Ensemble 2
            <div class="button-container">
              <a href="#" class="button">Distance Measures</a>
              <a href="#" class="button">Cluster Analysis</a>
            </div>
          </div>
          <div class="ensemble">
            Ensemble 3
            <div class="button-container">
              <a href="#" class="button">Distance Measures</a>
              <a href="#" class="button">Cluster Analysis</a>
            </div>
          </div>
          <div class="ensemble">
            Ensemble 4
            <div class="button-container">
              <a href="#" class="button">Distance Measures</a>
              <a href="#" class="button">Cluster Analysis</a>
            </div>
          </div>
          <div class="ensemble">
            Ensemble 5
            <div class="button-container">
              <a href="#" class="button">Distance Measures</a>
              <a href="#" class="button">Cluster Analysis</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default StateClicked;
