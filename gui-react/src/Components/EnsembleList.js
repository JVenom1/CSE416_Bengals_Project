import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import mNum from "../Helpers/magicNumbers.js";

// Scatter Plot Linear Feature Broken
const EnsembleList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // look in getURL&DataNotes.txt for notes
  // set on homepage using the outline geojsons
  const stateID = location.state.stateID;
  const currentDistrictPlan = location.state.currentDistrictPlan;

  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  const mapMaxBounds = mNum.stateZoomBounds.stateID;
  const mapCenter = mNum.stateCenter[stateID].latlng;
  // retrieve from server on the lucid charts this is the ensemble[]
  const ensemble = [
    {
      cluster: [
        {
          districtPlan: [
            { plan: currentDistrictPlan },
            { plan: currentDistrictPlan },
            { plan: currentDistrictPlan },
          ],

          districtPlanDetail: [
            {
              clusterNum: 0,
              numberOfDistrictPlans: 3,
              averageDistance: 0.88,
              numberOfRep: 5,
              numberOfDem: 15,
            },
          ],
          districtPlanCoordinate: {
            x: [1, 2, 3],
            y: [4, 5, 6],
            color: [true, true, false],
          },
          averageBoundary: { plan: currentDistrictPlan },
        },
        {
          districtPlan: [
            { plan: currentDistrictPlan },
            { plan: currentDistrictPlan },
            { plan: currentDistrictPlan },
          ],

          districtPlanDetail: [
            {
              clusterNum: 0,
              numberOfDistrictPlans: 3,
              averageDistance: 0.88,
              numberOfRep: 5,
              numberOfDem: 15,
            },
          ],
          districtPlanCoordinate: {
            x: [12, 22, 32],
            y: [42, 52, 62],
            color: [true, true, false],
          },
          averageBoundary: { plan: currentDistrictPlan },
        },
      ],
      clusterDetails: [
        {
          clusterNum: 0,
          numberOfDistrictPlans: 3,
          averageDistance: 0.88,
          numberOfRep: 5,
          numberOfDem: 15,
        },
      ],
      clusterCoordinate: {
        x: [10, 20, 30],
        y: [4, 5, 6],
        radius: [10, 15, 20],
      },
      clusterAssociationCoordinate: {
        optimalTransport: { Coords: { x: [1, 2, 3], y: [4, 5, 6] } },
        hammingDistance: { Coords: { x: [3, 4, 5], y: [4, 5, 6] } },
        totalVariation: { Coords: { x: [5, 7, 9], y: [4, 5, 6] } },
      },
      distanceMeasure: {
        optimalTransport: [0.88, 0.56, 0.43],
        hammingDistance: [0.73, 0.59, 0.42],
        totalVariation: [0.45, 0.12, 0.41],
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

  const totalPages = Math.ceil(ensemble.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };
  const goToHomePage = () => {
    navigate("/");
  };
  // button index 0 is ensemble 1
  // need ensemble[buttonIndex].len and ensemble[buttonIndex].cluster.len
  const handleDistMsrClicked = (buttonIndex) => {
    navigate("/Distances", {
      state: {
        stateID: stateID,
        currentDistrictPlan: currentDistrictPlan,
        ensemble: ensemble,
        buttonIndex: buttonIndex,
      },
    });
  };
  const handleClustAnalysis = (buttonIndex) => {
    console.log(buttonIndex);
    navigate("/StateOverview", {
      state: {
        stateID: stateID,
        currentDistrictPlan: currentDistrictPlan,
        ensemble: ensemble[buttonIndex],
        buttonIndex: buttonIndex,
      },
    });
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleEnsembles = ensemble.slice(startIndex, endIndex);

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
      </div>
    </>
  );
};

export default EnsembleList;
