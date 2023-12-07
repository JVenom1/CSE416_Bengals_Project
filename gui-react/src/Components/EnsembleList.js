import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import mNum from "../Helpers/magicNumbers.js";
const api = axios.create({
  baseURL: "https://flat-banks-flow.loca.lt/server/BengalsAPI",
});
// Scatter Plot Linear Feature Broken
const EnsembleList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [getStateEnsembleArr, setStateEnsembleArr] = useState([]);
  // look in getURL&DataNotes.txt for notes
  // set on homepage using the outline geojsons
  // stateID has been switched to a number [0,1,2]
  const stateID = location.state.stateID;
  const currentDistrictPlan = location.state.currentDistrictPlan;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/${stateID}/ensemble_details`);
        console.log(response.data);

        setStateEnsembleArr(response.data);
      } catch (err) {
      }
    };
    fetchData();
    changeMapSizeXbyY("100%", "50vw");
  }, [stateID]);

  // workaround for leaflet 0px width default
  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };

  const mapMaxBounds = mNum.stateZoomBounds.stateID;
  const mapCenter = mNum.stateCenter[stateID].latlng;

  // const getStateEnsembleArr = async (stateID) => {
  //   const response = await axios.get(`${api}/${stateID}`);
  //   return response.data;
  // };

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(getStateEnsembleArr.length / itemsPerPage);

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
        buttonIndex: buttonIndex,
      },
    });
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleEnsembles = getStateEnsembleArr.slice(startIndex, endIndex);

  return (
    <>
      <div className="mapWrapper">
        <MapContainer
          center={mapCenter}
          zoom={6}
          minZoom={4}
          maxBounds={mapMaxBounds}
          maxZoom={7}
          dragging={true}
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
                  {ensemble.name}
                </div>
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
      </div>
    </>
  );
};

export default EnsembleList;