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
  const headerText = location.state.headerText + " > District Analysis";
  const stateID = location.state.stateID;
  const currentDistPlan = location.state.currentDistrPlan;
  const clusterIndex = location.state.clusterIndex;
  const ensembleIndex = location.state.ensembleIndex;
  const districtCoords = location.state.districtCoords;
  const districtPlanList = location.state.districtPlanList;
  const [districtPlan1, setDistrictPlan1] = useState(currentDistPlan);
  const [districtPlan2, setDistrictPlan2] = useState(null); // if error change to []
  const [newDistrictPlan1, setNewDistrictPlan1] = useState(currentDistPlan);
  const [newDistrictPlan2, setNewDistrictPlan2] = useState(null);

  useEffect(() => {
    setDistrictPlan1(newDistrictPlan1);
  }, [newDistrictPlan1])

  useEffect(() => {
    console.log(newDistrictPlan2)
    setDistrictPlan2(newDistrictPlan2);
  }, [newDistrictPlan2])


  const [buttonIndex, setButtonIndex] = useState(0);

  const handleRestoreMaps = () => {
    setDistrictPlan1(currentDistPlan);
    setDistrictPlan2(null); // if error switch to []
  };

  const handleTopMap = () => {
    setButtonIndex(1);
  };
  const handleBottomMap = () => {
    setButtonIndex(2);
  };
  const TwoMaps = () => {
    return (
      <>
        <CompareDistrMap stateID={stateID} currentDistrPlan={districtPlan1} />
        <CompareDistrMap stateID={stateID} currentDistrPlan={districtPlan2} />
      </>
    );
  };

  return (
    <>
      <div className="app-container">
        <Header headerText={headerText} />
        <div className="main-container">
          <div className="map-container">
            <button id="top-map" value={1} onClick={handleTopMap}>
              Select Top Map
            </button>
            <button id="bottom-map" value={2} onClick={handleBottomMap}>
              Select Bottom Map
            </button>
            <button id="restore" value={3} onClick={handleRestoreMaps}>
              Reset Maps
            </button>
            <h2>{mNum.stateNumsToPrefix[stateID]} District Plan</h2>
            <TwoMaps />
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
                _setDistrictPlan1={setNewDistrictPlan1}
                _setDistrictPlan2={setNewDistrictPlan2}
                _districtPlans={districtPlanList}
                _buttonIndex={buttonIndex}
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
