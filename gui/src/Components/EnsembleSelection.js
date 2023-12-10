import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ClusterAssociationScatter from "./ClusterAssociationScatter.js";
import EnsembleTable from "./EnsembleTable.js"
import "../App.css";
import "leaflet/dist/leaflet.css";
import DefaultDistrMap from "./DefaultDistrMap.js";
import Header from "./Header.js";

const EnsembleSelection = () => {
  document.body.style.cursor = 'default';
  const location = useLocation();
  const stateID = location.state.stateID;
  const currentDistrPlan = location.state.currDistrPlan;
  const ensembleDetails = location.state.ensembleDetails;
  const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
  const clusterScatterHeight = window.innerHeight;
  const [selectedComponent, setSelectedComponent] = useState("ensemble");
  const headerText = location.state.headerText + " > Ensembles";
  useEffect(() => {
    changeMapSizeXbyY("85%", "40vw");
  }, []);

  // workaround for leaflet 0px width default
  const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  const renderComponent = () => {
    if (selectedComponent === "ensemble") {
      // Return the Ensemble Selection component
      return (
        <div>
          <EnsembleTable headerText={headerText} ensembleDetails={ensembleDetails} ensembleTableWidth={clusterScatterWidth} ensembleTableHeight={clusterScatterHeight} currentDistrPlan={currentDistrPlan} stateID={stateID} />
        </div>
      );
    } else if (selectedComponent === "cluster") {
      // Return the Cluster Association component
      return (
        <>Old Ensemble vs Cluster</>
      );
    }
  };
  return (
    <>
      <div className="app-container">
        <Header headerText={headerText} />
        <div className="main-container">
          <div className="map-container">
            <DefaultDistrMap stateID={stateID} currentDistrPlan={currentDistrPlan} />
          </div>
          <div className="controls-container">
            {/* <div className="button-container">
              <button
                className={`control-button ${selectedComponent === "ensemble" && "active"
                  }`}
                onClick={() => setSelectedComponent("ensemble")}
              >
                Ensemble Selection
              </button>
              <button
                className={`control-button ${selectedComponent === "cluster" && "active"
                  }`}
                onClick={() => setSelectedComponent("cluster")}
              >
                Cluster Association
              </button>
            </div> */}
            <div>
              <EnsembleTable headerText={headerText} ensembleDetails={ensembleDetails} ensembleTableWidth={clusterScatterWidth} ensembleTableHeight={clusterScatterHeight} currentDistrPlan={currentDistrPlan} stateID={stateID} />
            </div>
            {/* <div className="component-container">{renderComponent()}</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnsembleSelection;
