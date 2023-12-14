import { useEffect, useState } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import CompareDistrMap from "./CompareDistrMap";
import DistrictScatter from "./DistrictScatter";
import DistrictSummaryTable from "./DistrictSummaryTable";
import mNum from "../Helpers/mNum";

const DistrictAnalysis = () => {
  document.body.style.cursor = "default";
  const location = useLocation();
  const headerText = location.state.headerText + " > Districts";
  const stateID = location.state.stateID;
  const districtPlan1 = location.state.currentDistrPlan;
  const clusterIndex = location.state.clusterIndex;
  const ensembleIndex = location.state.ensembleIndex;
  const districtCoords = location.state.districtCoords;
  const districtPlanList = location.state.districtPlanList;
  const [districtPlan2, setDistrictPlan2] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };

  useEffect(() => {
    changeMapSizeXbyY("70%", "40vw");
  }, []);

  useEffect(() => {
    setDistrictPlan2(selectedPlan);
  }, [selectedPlan]);

  const handleRestoreMaps = () => {
    setDistrictPlan2(null); // Reset selected plans when restoring maps
    window.location.reload();
  };
  return (
    <>
      <div className="app-container">
        <Header headerText={headerText} />
        <div className="main-container">
          {/* Change Map Split Here for Distr Analysis */}
          <div className="map-container">
            <div style={{ margin: "5px" }}>
              <h2 className="map-title">
                {mNum.stateNumsToPrefix[stateID]} District Plan{" "}
                <button id="restore" value={3} onClick={handleRestoreMaps}>
                  Reset Map
                </button>
              </h2>
            </div>
            <CompareDistrMap
              stateID={stateID}
              currentDistrPlan={districtPlan1}
              selectedPlan={districtPlan2}
            />
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
                _setSelectedPlan={setSelectedPlan}
                _oldPlan={districtPlan2}
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
