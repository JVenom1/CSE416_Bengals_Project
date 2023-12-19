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
import BoxPlot from "./BoxPlot.js";
const ClusterAnalysis = () => {
  document.body.style.cursor = "default";
  const [selectedComponent, setSelectedComponent] = useState("details"); //details

  const location = useLocation();
  const stateID = location.state.stateID;
  const headerText = location.state.headerText + " > Clusters";
  const currentDistrPlan = location.state.currentDistrPlan;
  const clusterCoordsHd = location.state.clusterCoordsHd;
  const clusterDetailsListHd = location.state.clustersDetsHd;
  const clusterCoordsOp = location.state.clusterCoordsOp;
  const clusterDetailsListOp = location.state.clustersDetsOp;
  const avgPlansHD = location.state.avgPlansHD;
  const avgPlansOP = location.state.avgPlansOP;

  const clusterSum = location.state.clusterSum;
  const ensembleName = location.state.ensembleName;
  const ensembleIndex = location.state.ensembleIndex;
  const distMeas = location.state.distMeas;

  const clusterScatterWidth = window.innerWidth * 0.5;
  const clusterScatterHeight = window.innerHeight;

  const [selectedOptionInternal, setSelectedOptionInternal] =
    useState("Hamming Distance");
  const [selectedDets, setSelectedDets] = useState(clusterDetailsListHd);
  const [selectedCoords, setSelectedCoords] = useState(clusterCoordsHd);

  const handleChange = (e) => {
    if (e.target.value === "Hamming Distance") {
      setSelectedDets(clusterDetailsListHd);
      setSelectedCoords(clusterCoordsHd);
    } else {
      setSelectedDets(clusterDetailsListOp);
      setSelectedCoords(clusterCoordsOp);
    }
    setSelectedOptionInternal(e.target.value);
  };

  useEffect(() => {
    Defaults.changeMapSizeXbyY("100%", "36vw");
  });
  const renderComponent = () => {
    if (selectedComponent === "details") {
      return (
        <>
          <select value={selectedOptionInternal} onChange={handleChange}>
            <option value="Hamming Distance">Hamming Distance</option>
            <option value="Optimal Transport">Optimal Transport</option>
          </select>

          <ClusterDetailTable
            avgPlansHD={avgPlansHD}
            avgPlansOP={avgPlansOP}
            clusterDet={selectedDets}
            stateID={stateID}
            ensembleIndex={ensembleIndex}
            currentDistrPlan={currentDistrPlan}
            headerText={headerText}
          />
        </>
        // <ClusterDetailTable clusterDet={clusterNameList} />
      );
    } else if (selectedComponent === "scatter") {
      // Return the Cluster Scatter component
      return (
        <>
          <select value={selectedOptionInternal} onChange={handleChange}>
            <option value="Hamming Distance">Hamming Distance</option>
            <option value="Optimal Transport">Optimal Transport</option>
          </select>
          <ClusterScatter
            _selectedDets={selectedDets}
            avgPlansHD={avgPlansHD}
            avgPlansOP={avgPlansOP}
            _stateID={stateID}
            _currentDistrPlan={currentDistrPlan}
            _clusterCoords={selectedCoords}
            _clusterScatterWidth={clusterScatterWidth}
            _clusterScatterHeight={clusterScatterHeight}
            _ensembleIndex={ensembleIndex}
            _headerText={headerText}
          />
        </>
      );
    } else if (selectedComponent === "distMeas") {
      return (
        <>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <BoxPlot
              boxPlotData={distMeas.hd}
              title={"Hamming Distance"}
              _width={clusterScatterWidth * 0.5}
              _height={clusterScatterHeight * 0.8}
              style={{ flex: "1", marginRight: "5px" }} // Adjust margins
            />
            <BoxPlot
              boxPlotData={distMeas.op}
              title={"Optimal Transport"}
              _width={clusterScatterWidth * 0.5}
              _height={clusterScatterHeight * 0.8}
              style={{ flex: "1", marginLeft: "5px" }} // Adjust margins
            />
          </div>
        </>
      );
    }
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
              <button
                className={`control-button`}
                disabled={selectedComponent === "distMeas" && "active"}
                onClick={() => setSelectedComponent("distMeas")}
              >
                Distance Measures
              </button>
            </div>
            <div className="cluster-data">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClusterAnalysis;
