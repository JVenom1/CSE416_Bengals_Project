import { useEffect, useState } from "react";
import "../CSS/App.css";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import CompareDistrMap from "./CompareDistrMap";
import DistrictScatter from "./DistrictScatter";
import DistrictSummaryTable from "./DistrictSummaryTable";
import DistrInitSummary from "./DistrInitSummary.js";
import Defaults from "../Helpers/Defaults.js";

const DistrictAnalysis = () => {
  document.body.style.cursor = "default";
  const location = useLocation();
  const headerText = location.state.headerText + " > Districts";
  const stateID = location.state.stateID;
  const districtPlan1 = location.state.currentDistrPlan;
  const clusterIndex = location.state.clusterIndex;
  const ensembleIndex = location.state.ensembleIndex;
  const districtCoordsHd = location.state.districtCoordsHd;
  const districtPlanListHd = location.state.districtPlanListHd;
  const districtCoordsOp = location.state.districtCoordsOp;
  const districtPlanListOp = location.state.districtPlanListOp;
  const distrInitalSummary = location.state.distrInitalSummary;
  const [districtPlan2, setDistrictPlan2] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedOptionInternal, setSelectedOptionInternal] =
    useState("Hamming Distance");
  const [selectedDistrictPlanList, setSelectedDistrictPlanList] =
    useState(districtPlanListHd);
  const [selectedCoords, setSelectedCoords] = useState(districtCoordsHd);
  // console.log(districtPlanList);
  const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  const handleChange = (e) => {
    // console.log("Selected value:", e.target.value);
    if (e.target.value === "Hamming Distance") {
      console.log("hd");
      setSelectedDistrictPlanList(districtPlanListHd);
      setSelectedCoords(districtCoordsHd);
    } else {
      console.log("op");
      setSelectedDistrictPlanList(districtPlanListOp);
      setSelectedCoords(districtCoordsOp);
    }
    setSelectedOptionInternal(e.target.value);
  };
  useEffect(() => {
    changeMapSizeXbyY("100%", "36vw");
  }, []);

  useEffect(() => {
    setDistrictPlan2(selectedPlan);
    console.log(districtPlan2);
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
          <div className="left-container">
            <h2 className="map-title">
              {Defaults.stateData.name[stateID]} District Plan{" "}
              <button id="restore" value={3} onClick={handleRestoreMaps}>
                Reset Map
              </button>
            </h2>
            <CompareDistrMap
              stateID={stateID}
              currentDistrPlan={districtPlan1}
              selectedPlan={districtPlan2}
            />
            {/* <div className="solo-table-container"> */}
            <DistrInitSummary distrDet={distrInitalSummary} />
            {/* </div> */}
          </div>

          <div className="right-pane">
            <div className="top-right">
              <DistrictScatter
                _stateID={stateID}
                _ensembleIndex={ensembleIndex}
                _clusterIndex={clusterIndex}
                _width={window.innerWidth / 2}
                _height={window.innerHeight / 2 + 150}
                _coords={selectedCoords}
                _districtPlans={selectedDistrictPlanList}
                _setSelectedPlan={setSelectedPlan}
                _oldPlan={districtPlan2}
              />
            </div>

            <div className="bottom-right">
              <select value={selectedOptionInternal} onChange={handleChange}>
                <option value="Hamming Distance">Hamming Distance</option>
                <option value="Optimal Transport">Optimal Transport</option>
              </select>
              <DistrictSummaryTable distPlanList={selectedDistrictPlanList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistrictAnalysis;
