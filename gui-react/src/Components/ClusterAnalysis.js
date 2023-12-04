// Import necessary libraries
import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import MagicNumbers from "../Helpers/magicNumbers.js";
import DistrictsScatter from "./DistrictsScatter.js";

// Define the ClusterAnalysis component
const ClusterAnalysis = () => {
  // Initialize state and router hooks
  const navigate = useNavigate();
  const location = useLocation();
  //   const currCluster = location.state.currCluster;
  const currentDistrictPlan = location.state.currentDistrictPlan;

  // Define state ID and map bounds
  const stateID = location.state.stateID;
  const [distPlan1, setDistPlan1] = useState(currentDistrictPlan);
  const [distPlan2, setDistPlan2] = useState(null);
  const mapLeftCenter = MagicNumbers.leafLeftStateCenter[stateID].latlng;
  const [leafLeftStateCenter, setLeafLetStateCenter] = useState(mapLeftCenter);
  const maxBounds = MagicNumbers.stateZoomBounds[stateID];
  const center = MagicNumbers.stateCenter[stateID].latlng;

  const [districtPlans, setDistrictPlans] = useState([]); // List of district plans

  // Use useEffect to handle side effects when the component mounts
  useEffect(() => {
    changeMapSizeXbyY("100%", "25vw");
    setLeafLetStateCenter(center);
  }, []);
  useEffect(() => {
    // Mock data loading (replace with actual data fetching)
    const districtPlans = [
      {
        /* District Plan 1 data */
      },
      {
        /* District Plan 2 data */
      },
      // Add more district plans as needed
    ];

    setDistrictPlans(districtPlans);
  }, []);
  // Function to change map size
  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  const handleScatterPlotClick = (districtPlan) => {
    if (distPlan1 === null) {
      setDistPlan1(districtPlan);
    } else if (distPlan2 === null) {
      setDistPlan2(districtPlan);
    }
  };
  // Function to remove displayed district plans
  const removeDistrictPlans = () => {
    setDistPlan1(null);
    setDistPlan2(null);
  };
  // Function to navigate to the home page
  const goToHomePage = () => {
    navigate("/");
  };

  // Load the distance matrix from "optimal_transport.json"

  return (
    <>
      <div className="mapWrapper">
        <MapContainer
          center={leafLeftStateCenter}
          zoom={6}
          minZoom={6}
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
            <GeoJSON data={distPlan2} />
          </MapContainer>
        ) : null}
        <div className="clusterRight">
          <div className="districtsScatter">
            {/* Pass the list of district plans to the scatter plot component */}
            {districtPlans.length > 0 && (
              <DistrictsScatter
                data={districtPlans}
                onClick={handleScatterPlotClick}
              />
            )}
          </div>
          <div className="districtsTable">
            <DistrictsScatter />
          </div>
        </div>
        {/* Buttons to remove displayed district plans */}
        {((distPlan1 !== null && distPlan1 !== currentDistrictPlan) ||
          distPlan2 !== null) && (
          <div>
            <button onClick={removeDistrictPlans}>Remove District Plans</button>
          </div>
        )}
      </div>
    </>
  );
};

// Export the ClusterAnalysis component
export default ClusterAnalysis;
