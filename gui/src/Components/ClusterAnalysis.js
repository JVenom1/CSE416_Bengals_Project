// Import necessary libraries
import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import Header from "./Header.js";
import DefaultDistrMap from "./DefaultDistrMap.js";
import ClusterScatter from "./ClusterScatter.js";
import ClustSumTable from "./ClustSumTable.js";
import ClusterAssociationScatter from "./ClusterAssociationScatter.js";
import ClusterDetailTable from "./ClusterDetailTable.js";


const ClusterAnalysis = () => {
    document.body.style.cursor = 'default';
    const [selectedComponent, setSelectedComponent] = useState("details");//details
    const location = useLocation();
    const stateID = location.state.stateID;
    const headerText = location.state.headerText + " > Cluster Analysis";
    const currentDistrPlan = location.state.currentDistrPlan;
    const clusterCoords = location.state.clusterCoords;
    const clusterAssocCoords = location.state.clusterAssocCoords;
    const clusterNameList = location.state.clusters;
    const clusterSum = location.state.clusterSum;
    const ensembleName = location.state.ensembleName;
    const ensembleIndex = location.state.ensembleIndex;

    const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
    const clusterScatterHeight = window.innerHeight;

    const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
        const leafletContainer = document.querySelector(".leaflet-container");
        leafletContainer.style.width = width;
        leafletContainer.style.height = height;
    };
    useEffect(() => {
        changeMapSizeXbyY("66%", "40vw");
    })
    const renderComponent = () => {
        if (selectedComponent === "details") {
            // console.log(clusterNameList)

            return (<>Cluster Details -- isn't details per cluster aka district plans?</>
                // <ClusterDetailTable clusterDet={clusterNameList} />
            );
        } else if (selectedComponent === "scatter") {
            // Return the Cluster Scatter component

            return (
                <ClusterScatter
                    _stateID={stateID}
                    _currentDistrPlan={currentDistrPlan}
                    _clusterCoords={clusterCoords}
                    _clusterScatterWidth={clusterScatterWidth}
                    _clusterScatterHeight={clusterScatterHeight}
                    _ensembleIndex={ensembleIndex}
                    _headerText={headerText}
                />

            );
        } else if (selectedComponent === "assoc") {
            return (<div>
                <ClusterAssociationScatter _coords={clusterAssocCoords} clusterScatterWidth={clusterScatterWidth} clusterScatterHeight={clusterScatterHeight} />
            </div>)
        }
    };
    return <>
        <div className="app-container">
            <Header headerText={headerText} />
            <div className="main-container">
                <div className="map-container">
                    <DefaultDistrMap stateID={stateID} currentDistrPlan={currentDistrPlan} />
                    <ClustSumTable
                        ensembleName={ensembleName}
                        clusterSum={clusterSum} />
                </div>

                <div className="controls-container">
                    <div className="button-container">
                        <button
                            className={`control-button ${selectedComponent === "details" && "active"
                                }`}
                            onClick={() => setSelectedComponent("details")}
                        >
                            Cluster Details
                        </button>
                        <button
                            className={`control-button ${selectedComponent === "scatter" && "active"
                                }`}
                            onClick={() => setSelectedComponent("scatter")}
                        >
                            Cluster Scatter
                        </button>
                        <button
                            className={`control-button ${selectedComponent === "assoc" && "active"
                                }`}
                            onClick={() => setSelectedComponent("assoc")}
                        >
                            Cluster Association
                        </button>

                    </div>
                    <div className="component-container">{renderComponent()}</div>

                </div>
            </div>
        </div>

    </>
};

export default ClusterAnalysis;