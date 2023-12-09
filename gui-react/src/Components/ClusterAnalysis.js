// Import necessary libraries
import { useState, useEffect, useRef } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import Header from "./Header.js";
import DefaultDistrMap from "./DefaultDistrMap.js";
import ClusterScatter from "./ClusterScatter.js";
import ClustSumTable from "./ClustSumTable.js";
import DistanceMatrix from "./DistanceMatrix.js";


const ClusterAnalysis = () => {
    const [selectedComponent, setSelectedComponent] = useState("scatter");//summary
    const location = useLocation();
    const stateID = location.state.stateID;
    const headerText = location.state.headerText + " > Cluster Analysis";
    const currentDistrPlan = location.state.currentDistrPlan;
    const clusterCoords = location.state.clusterCoords;
    const clusterSum = location.state.clusterSum;
    const ensembleName = location.state.ensembleName;
    const ensembleIndex = location.state.ensembleIndex;
    const matrixList = location.state.distanceMatrixObj;

    const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
    const clusterScatterHeight = window.innerHeight;

    const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
        const leafletContainer = document.querySelector(".leaflet-container");
        leafletContainer.style.width = width;
        leafletContainer.style.height = height;
    };
    useEffect(() => {
        changeMapSizeXbyY("85%", "40vw");
    })
    const renderComponent = () => {
        if (selectedComponent === "summary") {
            // Return the ClustSumTable Selection component
            return (
                <div>
                    <ClustSumTable
                        ensembleName={ensembleName}
                        clusterSum={clusterSum} />
                    <DistanceMatrix matrixList={matrixList} />
                </div>
            );
        } else if (selectedComponent === "scatter") {
            // Return the Cluster Scatter component

            return (
                <div>
                    <ClusterScatter
                        _stateID={stateID}
                        _currentDistrPlan={currentDistrPlan}
                        _clusterCoords={clusterCoords}
                        _clusterScatterWidth={clusterScatterWidth}
                        _clusterScatterHeight={clusterScatterHeight}
                        _ensembleIndex={ensembleIndex}
                        _headerText={headerText}
                    />
                </div>
            );
        }
    };
    return <>
        <div className="app-container">
            <Header headerText={headerText} />
            <div className="main-container">
                <DefaultDistrMap stateID={stateID} currentDistrPlan={currentDistrPlan} />
                <div className="controls-container">
                    <div className="button-container">

                        <button
                            className={`control-button ${selectedComponent === "scatter" && "active"
                                }`}
                            onClick={() => setSelectedComponent("scatter")}
                        >
                            Cluster Scatter
                        </button>
                        <button
                            className={`control-button ${selectedComponent === "summary" && "active"
                                }`}
                            onClick={() => setSelectedComponent("summary")}
                        >
                            Cluster Summary & Distance Matrix
                        </button>
                    </div>
                    <div className="component-container">{renderComponent()}</div>

                </div>
            </div>
        </div>

    </>
};

export default ClusterAnalysis;