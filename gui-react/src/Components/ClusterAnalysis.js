// Import necessary libraries
import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import mNum from "../Helpers/magicNumbers.js";
import DistrictsScatter from "./DistrictsScatter.js";

// Define the ClusterAnalysis component
const ClusterAnalysis = () => {
  //   Initialize state and router hooks
  const navigate = useNavigate();
  const location = useLocation();
  const currEnsemble = location.state.currEnsemble;
  const cluster = currEnsemble.cluster;
  const districtPlan = cluster["districtPlan"];

  const districtPlanCoordinate = cluster["districtPlanCoordinate"];
  console.log(districtPlanCoordinate);
  // const districtPlanDetail = cluster["districtPlanDetail"];
  // const properties = districtPlanDetail[index].features[index].properties;
  // passed from homepage --> stateOverview --> here (default states plan)
  const currentDistrictPlan = location.state.currentDistrictPlan;

  //   // Define state ID and map bounds
  const stateID = location.state.stateID;
  const [distPlan1, setDistPlan1] = useState(currentDistrictPlan);
  const [distPlan2, setDistPlan2] = useState(null);
  const mapLeftCenter = mNum.leafLeftStateCenter[stateID].latlng;
  const [leafLeftStateCenter, setLeafLetStateCenter] = useState(mapLeftCenter);
  const maxBounds = mNum.stateZoomBounds[stateID];
  const center = mNum.stateCenter[stateID].latlng;

  const [districtPlans, setDistrictPlans] = useState([]); // List of district plans

  // Use useEffect to handle side effects when the component mounts
  useEffect(() => {
    changeMapSizeXbyY("100%", "25vw");
    setLeafLetStateCenter(center);
  }, []);
  useEffect(() => {
    // the districtPlans given a cluster has been clicked
    // districtPlan[0].plan
    setDistrictPlans(districtPlans);
  }, []);
  //   // Function to change map size
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
  const [showDetails, setShowDetails] = useState(false);
  const [distIndex, setDistIndex] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleDetailsButtonClick = (index, item) => {
    setSelectedDistrict(item);
    setShowDetails(true);
    setDistIndex(index);
  };

  const closeDetailsModal = () => {
    setShowDetails(false);
    setDistIndex(0);
    setSelectedDistrict(null);
  };
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
            <DistrictsScatter
              districtPlan={districtPlan}
              districtPlanCoordinate={districtPlanCoordinate}
            />
          </div>
          <div className="districtsTable">
            <table>
              <thead>
                <tr>
                  <th>District Number</th>
                  <th>Number of Rep</th>
                  <th>Number of Dem</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {/* No Data was used because test data files dont have the same property values */}
                {districtPlan.map((item, index) => (
                  <tr key={index}>
                    <td>District {index}</td>
                    <td>
                      {item.plan.features[index].properties[
                        "Republican Votes"
                      ] || "No Data"}
                    </td>
                    <td>
                      {item.plan.features[index].properties["Democrat Votes"] ||
                        "No Data"}
                    </td>
                    <td>
                      {/* Button to show detailed data */}
                      <button
                        onClick={() => handleDetailsButtonClick(index, item)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Buttons to remove displayed district plans */}
          {((distPlan1 !== null && distPlan1 !== currentDistrictPlan) ||
            distPlan2 !== null) && (
            <div>
              <button onClick={removeDistrictPlans}>
                Remove District Plans
              </button>
            </div>
          )}
        </div>
      </div>
      {showDetails && (
        <div className="detailsModal">
          <div className="detailsContent">
            <h2>District Details</h2>
            <ul>
              {Object.entries(
                selectedDistrict.plan.features[distIndex].properties
              ).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
            <button onClick={closeDetailsModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

// Export the ClusterAnalysis component
export default ClusterAnalysis;
