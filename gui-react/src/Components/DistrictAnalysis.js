import { useState, useEffect, useRef } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import CompareDistrMap from "./CompareDistrMap";


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
    const distanceMatrixOtHdTv = location.state.distanceMatrixOtHdTv;
    const [districtPlan1, setDistrictPlan1] = useState(currentDistPlan);
    const [districtPlan2, setDistrictPlan2] = useState(currentDistPlan); // if error change to []

    const handleMapSelect = (buttonID) => {
        if (buttonID === 1) {
            // map 1 is to be set
        } else {
            // map 2 is to be set
        }
    }
    const handleRestoreMaps = () => {
        setDistrictPlan1(currentDistPlan);
        setDistrictPlan2(null) // if error switch to []
    }
    const handleScatterClick = (event, mapID, selectedDistrPlan) => {
        if (mapID === 1) {
            setDistrictPlan1(selectedDistrPlan)
        }
        else if (mapID === 2) {
            setDistrictPlan2(selectedDistrPlan);
        }
    };
    const Map = (mapID, scatterID) => {
        return (
            <div className={`map ${scatterID === mapID ? 'selected' : ''}`}>
                Map {mapID} with Scatter {scatterID}
            </div>
        );
    }
    const ScatterPlot = ({ districtCoords, scatterID }) => {
        // Implement your ScatterPlot component logic here
        return <div className="scatter-plot"></div>;
    };
    const Table = () => {
        // Implement your Table component logic here
        return <div className="table">Table Component</div>;
    };

    return (
        <><div className="app-container">
            <Header headerText={headerText} />
            <div className="main-container">
                <div className="map-container">
                    <CompareDistrMap stateID={stateID} currentDistrPlan={districtPlan1} />
                    <CompareDistrMap stateID={stateID} currentDistrPlan={districtPlan2} />
                </div>
                <div className="right-pane">
                    <div className="top-right">
                        Districts Scatter - PLACE HERE
                        {/* Distr Scatter */}
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