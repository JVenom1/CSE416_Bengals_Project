import { useState, useEffect, useRef } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import CompareDistrMap from "./CompareDistrMap";
import DistrictScatter from "./DistrictScatter";


const DistrictAnalysis = () => {
    const location = useLocation();
    const [selectedScatter, setSelectedScatter] = useState(null);
    const mapOneID = 1;
    const mapTwoID = 2;
    const headerText = location.state.headerText + " > District Analysis";
    const stateID = location.state.stateID;
    const currentDistPlan = location.state.currentDistrPlan;
    const clusterIndex = location.state.clusterIndex;
    const ensembleIndex = location.state.ensembleIndex;
    const districtCoords = location.state.districtCoords;
    const districtPlanList = location.state.districtPlanList;
    const [districtPlan1, setDistrictPlan1] = useState(currentDistPlan);
    const [districtPlan2, setDistrictPlan2] = useState(null); // if error change to []
    const [buttonIndex, setButtonIndex] = useState(0);

    const handleRestoreMaps = () => {
        setDistrictPlan1(currentDistPlan);
        setDistrictPlan2(null) // if error switch to []
    }


    const handleTopMap = () => {
        setButtonIndex(1);
    }
    const handleBottomMap = () => {
        setButtonIndex(2);
    }

    return (
        <><div className="app-container">
            <Header headerText={headerText} />
            <div className="main-container">
                <div className="map-container">
                    <button id="top-map" value={1} onClick={handleTopMap}>Select Top Map</button>
                    <button id="bottom-map" value={2} onClick={handleBottomMap}>Select Bottom Map</button>
                    <CompareDistrMap stateID={stateID} currentDistrPlan={districtPlan1} />
                    <CompareDistrMap stateID={stateID} currentDistrPlan={districtPlan2} />
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
                            _setDistrictPlan1={setDistrictPlan1}
                            _setDistrictPlan2={setDistrictPlan2}
                            _districtPlans={districtPlanList}
                            _buttonIndex={buttonIndex}
                        />
                    </div>

                    <div className="bottom-right">
                        District Summary Table - PLACE HERE
                        {/* Distr Table */}
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}

export default DistrictAnalysis;