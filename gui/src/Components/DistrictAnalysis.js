import { useEffect, useState } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import CompareDistrMap from "./CompareDistrMap";
import DistrictScatter from "./DistrictScatter";
import DistrictSummaryTable from "./DistrictSummaryTable";
import mNum from "../Helpers/mNum";
import { select } from "d3";

const DistrictAnalysis = () => {
  document.body.style.cursor = "default";
  const location = useLocation();
  const headerText = location.state.headerText + " > District Analysis";
  const stateID = location.state.stateID;
  const districtPlan1 = location.state.currentDistrPlan;
  const clusterIndex = location.state.clusterIndex;
  const ensembleIndex = location.state.ensembleIndex;
  const districtCoords = location.state.districtCoords;
  const districtPlanList = location.state.districtPlanList;

  const [scatterClickedIndex, setScatterClickedIndex] = useState(null)
  const [selectedPlans, setSelectedPlans] = useState([]);

  useEffect(() => {

  }, [scatterClickedIndex])


  useEffect(() => {
    changeMapSizeXbyY("80%", "40vw");
  }, [])
  const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };


  const handleRestoreMaps = () => {
    setSelectedPlans([]); // Reset selected plans when restoring maps
  };
  const handleCheckboxChange = (index) => {
    // Handle checkbox change
    const updatedSelectedPlans = [...selectedPlans];
    updatedSelectedPlans[index] = !selectedPlans[index];
    setSelectedPlans(updatedSelectedPlans);
  };



  return (
    <>
      <div className="app-container">
        <Header headerText={headerText} />
        <div className="main-container">
          <div className="map-container">
            {/* <button id="top-map" value={1} onClick={handleTopMap}>
              Select Top Map
            </button>
            <button id="bottom-map" value={2} onClick={handleBottomMap}>
              Select Bottom Map
            </button> */}

            <h2>
              {/* <button id="restore" value={3} onClick={handleRestoreMaps}>
                Reset Map
              </button> */}
              {mNum.stateNumsToPrefix[stateID]} District Plan </h2>
            <CompareDistrMap stateID={stateID} currentDistrPlan={districtPlan1} selectedPlans={selectedPlans} distPlanList={districtPlanList} />
          </div>

          <div className="right-pane">
            <div className="top-right">
              <DistrictScatter
                _stateID={stateID}
                _ensembleIndex={ensembleIndex}
                _clusterIndex={clusterIndex}
                _width={window.innerWidth / 2}
                _height={window.innerHeight / 2 + 90}
                _coords={districtCoords}
                _districtPlans={districtPlanList}
                _setDistrictPlan={setSelectedPlans}
                _selectedPlans={selectedPlans}
                _scatterClickedIndex={setScatterClickedIndex}
              />
            </div>

            <div className="bottom-right">
              <DistrictSummaryTable distPlanList={districtPlanList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistrictAnalysis;
