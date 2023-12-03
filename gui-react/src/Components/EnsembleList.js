import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import MagicNumbers from "../Helpers/magicNumbers.js";

// Scatter Plot Linear Feature Broken
const EnsembleList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // look in getURL&DataNotes.txt for notes
  const stateID = location.state.stateID;
  const currentDistrictPlan = location.state.currentDistrictPlan;

  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  const mapMaxBounds = MagicNumbers.stateZoomBounds.stateID;
  const mapCenter = MagicNumbers.stateCenter[stateID].latlng;
  // retrieve from server
  const ensemblesData = [
    {
      cluster: [1],
      clusterDetails: ["hi", "hi"],
      clusterCoordinate: {
        x: [30, 20, 10],
        y: [4, 5, 6],
        radius: [10, 15, 20],
      },
      clusterAssociationCoordinate: { x: [1, 2, 3], y: [4, 5, 6] },
      distanceMeasure: {
        optimalTransport: [3],
        hammingDistance: [2],
        totalVariation: [1],
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

  useEffect(() => {
    changeMapSizeXbyY("100%", "50vw");
  }, []);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(ensemblesData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };
  const goToHomePage = () => {
    navigate("/");
  };
  const handleDistMsrClicked = () => {
    navigate("/Distances");
  };
  const handleClustAnalysis = () => {
    navigate("/StateOverview", {
      state: {
        stateID: stateID,
        currentDistrictPlan: currentDistrictPlan,
        ensemble: ensemblesData,
      },
    });
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleEnsembles = ensemblesData.slice(startIndex, endIndex);

  return (
    <>
      <div className="mapWrapper">
        <MapContainer
          center={mapCenter}
          zoom={7}
          minZoom={7}
          maxBounds={mapMaxBounds}
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
        <div className="ensembleSelect">
          <div id="ensembles">
            {visibleEnsembles.map((ensemble, index) => (
              <div key={index} className="ensemble">
                <div className="ensemble-header">
                  Ensemble {startIndex + index + 1}
                </div>
                <div className="button-container">
                  <button onClick={handleDistMsrClicked} className="button">
                    Distance Measures
                  </button>
                  <button onClick={handleClustAnalysis} className="button">
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
      </div>
    </>
  );
};

export default EnsembleList;
