import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import mNum from "../Helpers/mNum.js";
import api from "../api/posts.js";
// testing delete later
const EnsembleList = () => {
  /* data required:
  Current District Plan - GUI 3
  - api.get(`/${stateID}/2020plan`)
  Cluster Association Coords for each of the distance measures - GUI 10
  - api.get(`/${stateID}/${ensembleIndex}/cluster_association_coordinates`);
  Current state data
  function getCurrentDistrPlan(stateID);
  - api.get(`/${stateID}`);
  */

  const navigate = useNavigate();
  const location = useLocation();
  const stateID = location.state.stateID;

  // look in getURL&DataNotes.txt for notes
  // set on homepage using the outline geojsons
  // stateID has been switched to a number [0,1,2]

  const getCurrentDistrPlan = async (stateID) => {
    try {
      const response = await api.get(`/${stateID}/2020plan`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // get largest ensemble size
  const getClusterAssocCoords = async (stateID, ensembleIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/cluster_association_coordinates`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const getStateData = async (stateID) => {
    try {
      const response = await api.get(`/${stateID}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const [currentDistrPlan, setCurrentDistrPlan] = useState([]);
  const [clustAssocCoords, setClustAssocCoords] = useState([]);
  const [stateEnsembleArr, setStateEnsembleArr] = useState([]);

  // Retrieve Data
  useEffect(() => {
    const largestEnsembleIndex = 0; // dont actually know yet
    setCurrentDistrPlan(getCurrentDistrPlan(stateID));
    setClustAssocCoords(getClusterAssocCoords(stateID, largestEnsembleIndex)); // for default only
    setStateEnsembleArr(getStateData(stateID));
    // changeMapSizeXbyY("100%", "40vw"); // test later when server up
  }, [stateID]);

  // workaround for leaflet 0px width default
  const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(stateEnsembleArr.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };
  const goToHomePage = () => {
    navigate("/");
  };
  const handleClusterSelected = (buttonIndex) => {
    // go to navigate('/ClusterAnalysis',{state:{}});
  };
  // chaning below to component instead

  // const handleDistMsrClicked = (buttonIndex) => {
  //   navigate("/Distances", {
  //     state: {
  //       stateID: stateID,
  //       currentDistrictPlan: currentDistrPlan,
  //       buttonIndex: buttonIndex,
  //     },
  //   });
  // };
  // const handleClustAnalysis = (buttonIndex) => {
  //   console.log(buttonIndex);
  //   navigate("/StateOverview", {
  //     state: {
  //       stateID: stateID,
  //       currentDistrictPlan: currentDistrPlan,
  //       buttonIndex: buttonIndex,
  //     },
  //   });
  // };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleEnsembles = stateEnsembleArr.slice(startIndex, endIndex);
  const [selectedComponent, setSelectedComponent] = useState("ensemble");

  const renderComponent = () => {
    if (selectedComponent === "ensemble") {
      // Return the Ensemble Selection component
      return (
        <div>
          {/* {unknown amount of rows}x3 table component goes here */}
          <p>Ensemble Selection Table</p>
        </div>
      );
    } else if (selectedComponent === "cluster") {
      // Return the Cluster Association component
      return (
        <div>
          {/* scatter plot component goes here */}
          <p>Cluster Association Scatter Plot</p>
        </div>
      );
    }
  };
  return (
    <>
      <div className="app-container">
        <div className="header">
          <button onClick={goToHomePage} className="reset-button">
            Reset
          </button>
          <span className="header-text">
            Bengals {">"} Select State {">"} Ensemble Selection and Cluster
            Association
          </span>
        </div>
        <div className="main-container">
          <div className="map-container">
            <h2>StateID District Plan</h2>
            {/* Your map component goes here */}
            <p>Map Component</p>
          </div>
          <div className="controls-container">
            <div className="button-container">
              <button
                className={`control-button ${
                  selectedComponent === "ensemble" && "active"
                }`}
                onClick={() => setSelectedComponent("ensemble")}
              >
                Ensemble Selection
              </button>
              <button
                className={`control-button ${
                  selectedComponent === "cluster" && "active"
                }`}
                onClick={() => setSelectedComponent("cluster")}
              >
                Cluster Association
              </button>
            </div>
            <div className="component-container">{renderComponent()}</div>
          </div>
        </div>
      </div>
      {/* <div className="mapWrapper">
        <MapContainer
          center={mNum.stateCenter[stateID].latlng}
          zoom={6}
          minZoom={4}
          maxBounds={mNum.stateZoomBounds.stateID}
          maxZoom={7}
          dragging={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={currentDistrPlan} />
        </MapContainer>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        <div className="ensembleSelect">
          <div id="ensembles">
            {visibleEnsembles.map((ensemble, index) => (
              <div key={index} className="ensemble">
                <div className="ensemble-header">{ensemble.name}</div>
                <p>Ensemble Size: {ensemble.ensemblesize}</p>
                <p>Cluster Count: {ensemble.clustercount}</p>
                <div className="button-container">
                  <button
                    onClick={() => handleDistMsrClicked(index)}
                    className="button"
                  >
                    Distance Measures
                  </button>
                  <button
                    onClick={() => handleClustAnalysis(index)}
                    className="button"
                  >
                    Cluster Analysis
                  </button>
                </div>
              </div>
            ))}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 0}>
                Prev
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default EnsembleList;
