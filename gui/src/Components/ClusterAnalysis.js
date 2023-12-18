// Import necessary libraries
import { useState, useEffect } from "react";
import "../CSS/App.css";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import Header from "./Header.js";
import ClusterScatter from "./ClusterScatter.js";
import ClustSumTable from "./ClustSumTable.js";
// import ClusterAssociationScatter from "./ClusterAssociationScatter.js";
import ClusterDetailTable from "./ClusterDetailTable.js";
import { GeoJSON } from "react-leaflet";
import Map from "./Map.js";
import Defaults from "../Helpers/Defaults.js";
const ClusterAnalysis = () => {
  document.body.style.cursor = "default";
  const [selectedComponent, setSelectedComponent] = useState("details"); //details

  const location = useLocation();
  const stateID = location.state.stateID;
  const headerText = location.state.headerText + " > Clusters";
  const currentDistrPlan = location.state.currentDistrPlan;
  const clusterCoords = location.state.clusterCoords;
  // const clusterAssocCoords = location.state.clusterAssocCoords;
  const clusterDetailsList = location.state.clusters;
  const clusterSum = location.state.clusterSum;
  const ensembleName = location.state.ensembleName;
  const ensembleIndex = location.state.ensembleIndex;

  const clusterScatterWidth = window.innerWidth * 0.5;
  const clusterScatterHeight = window.innerHeight;

  useEffect(() => {
    Defaults.changeMapSizeXbyY("100%", "36vw");
  });
  const renderComponent = () => {
    if (selectedComponent === "details") {
      // console.log(clusterNameList)

      return (
        <ClusterDetailTable
          clusterDet={clusterDetailsList}
          stateID={stateID}
          ensembleIndex={ensembleIndex}
          currentDistrPlan={currentDistrPlan}
          headerText={headerText}
        />
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
    }
    // else if (selectedComponent === "assoc") {
    //   return (
    //     <div>
    //       <ClusterAssociationScatter
    //         _coords={clusterAssocCoords}
    //         clusterScatterWidth={clusterScatterWidth}
    //         clusterScatterHeight={clusterScatterHeight}
    //       />
    //     </div>
    //   );
    // }
  };
  const geoData = <GeoJSON data={currentDistrPlan} />;
  const center = Defaults.stateData.center[stateID].latlng;
  const maxBound = Defaults.stateData.maxBound.stateID;
  const zoom = 7;
  return (
    <>
      <div className="app-container">
        <Header headerText={headerText} />
        <div className="main-container">
          <div className="left-container">
            <h2 className="map-title">
              {Defaults.stateData.name[stateID]} District Plan
            </h2>
            <div className="table-map">
              <Map
                geoData={geoData}
                center={center}
                maxBound={maxBound}
                zoom={zoom}
              />
            </div>
            <ClustSumTable
              ensembleName={ensembleName}
              clusterSum={clusterSum}
            />
          </div>

          <div className="right-pane">
            <div className="button-container">
              <button
                className={`control-button`}
                onClick={() => setSelectedComponent("details")}
                disabled={selectedComponent === "details" && "active"}
              >
                Cluster Details
              </button>
              <button
                className={`control-button`}
                onClick={() => setSelectedComponent("scatter")}
                disabled={selectedComponent === "scatter" && "active"}
              >
                Cluster Scatter
              </button>
              {/* <button
                className={`control-button`}
                disabled={selectedComponent === "assoc" && "active"}
                onClick={() => setSelectedComponent("assoc")}
              >
                Cluster Association
              </button> */}
            </div>
            <div className="cluster-data">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClusterAnalysis;
