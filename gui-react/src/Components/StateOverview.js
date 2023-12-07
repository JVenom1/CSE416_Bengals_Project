import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import ScatterPlot from "./ClusterScatter.js";
import mNum from "../Helpers/mNum.js";
import axios from "axios";
const api = axios.create({
  baseURL: "https://flat-banks-flow.loca.lt/server/BengalsAPI",
});

const StateOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateID = location.state.stateID;
  const buttonIndex = location.state.buttonIndex;
  const currentDistrictPlan = location.state.currentDistrictPlan;

  const goToHomePage = (e) => {
    navigate("/");
  };
  const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
  const clusterScatterHeight = window.innerHeight; // Full height of the screen

  const [getClusterArr, setClusterArr] = useState([]);

  const maxBounds = mNum.stateZoomBounds.stateID;
  const center = mNum.stateCenter[stateID].latlng;

  useEffect(() => {
    const changeMapSizeXbyY = () => {
      const leafletContainer = document.querySelector(".leaflet-container");
      const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
        const leafletContainer = document.querySelector(".leaflet-container");
        leafletContainer.style.width = width;
        leafletContainer.style.height = height;
      };
      changeMapSizeXbyY("100%", "50vw");
    };
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/${stateID}/${buttonIndex}/cluster_details`
        );
        setClusterArr(response.data);
      } catch (err) {}
    };
    fetchData();
  }, [stateID, buttonIndex]);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(getClusterArr.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleEnsembles = getClusterArr.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
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
          <GeoJSON data={currentDistrictPlan} />
        </MapContainer>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        <div className="ensembleSelect">
          <div id="ensembles">
            {visibleEnsembles.map((cluster, index) => (
              <div key={index} className="ensemble">
                <div className="ensemble-header">{cluster.name}</div>
                <p>cluster Size: {cluster.plancount}</p>
                <p>cluster Count: {cluster.averagesplit}</p>
                <p>opportunity districts: {cluster.opportunitydistricts}</p>
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

export default StateOverview;
