import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EnsembleTable from "./EnsembleTable.js";
import "../CSS/App.css";
import "leaflet/dist/leaflet.css";
import Defaults from "../Helpers/Defaults.js";
import Header from "./Header.js";
import Map from "./Map.js";
import { GeoJSON } from "react-leaflet";
import ClusterAssociationScatter from "./ClusterAssociationScatter.js";

const EnsembleSelection = () => {
  document.body.style.cursor = "default";
  const [selectedComponent, setSelectedComponent] = useState("table");
  const location = useLocation();
  const stateID = location.state.stateID;
  const currentDistrPlan = location.state.currDistrPlan;
  const ensembleDetails = location.state.ensembleDetails;
  const clusterAssocCoordsHd = location.state.clusterAssocHd;
  // console.log(clusterAssocCoordsHd);
  const clusterAssocCoordsOp = location.state.clusterAssocOp;
  // clusterAssocCoordsOp.y[5] = 50;
  // console.log(clusterAssocCoordsOp);

  const clusterScatterWidth = window.innerWidth * 0.5;
  const clusterScatterHeight = window.innerHeight;
  // console.log(currentDistrPlan);
  const headerText = location.state.headerText + " > Ensembles";
  const [selectedOption, setSelectedOption] = useState("Hamming Distance");
  useEffect(() => {
    Defaults.changeMapSizeXbyY("100%", "36vw");
  }, []);

  useEffect(() => {
    renderComponent();
  }, [selectedOption, selectedComponent]);

  const renderComponent = () => {
    if (selectedComponent === "table") {
      return (
        <EnsembleTable
          headerText={headerText}
          ensembleDetails={ensembleDetails}
          currentDistrPlan={currentDistrPlan}
          stateID={stateID}
        />
      );
    } else if (selectedComponent === "assoc") {
      if (selectedOption === "Hamming Distance") {
        const tableDataHd = clusterAssocCoordsHd.x.map((xValue, index) => ({
          ensembleSize: xValue,
          clusterCount: clusterAssocCoordsHd.y[index],
        }));

        console.log(tableDataHd);
        return (
          <div>
            <ClusterAssociationScatter
              _coords={clusterAssocCoordsHd}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              clusterScatterWidth={clusterScatterWidth}
              clusterScatterHeight={clusterScatterHeight}
            />
            {/* Table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Ensemble Size</th>
                    <th>Cluster Count</th>
                  </tr>
                </thead>
                <tbody>
                  {tableDataHd.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ensembleSize}</td>
                      <td>{row.clusterCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else if (selectedOption === "Optimal Transport") {
        const tableDataOp = clusterAssocCoordsOp.x.map((xValue, index) => ({
          ensembleSize: xValue,
          clusterCount: clusterAssocCoordsOp.y[index],
        }));
        return (
          <div>
            <ClusterAssociationScatter
              _coords={clusterAssocCoordsOp}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              clusterScatterWidth={clusterScatterWidth}
              clusterScatterHeight={clusterScatterHeight}
            />
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Ensemble Size</th>
                    <th>Cluster Count</th>
                  </tr>
                </thead>
                <tbody>
                  {tableDataOp.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ensembleSize}</td>
                      <td>{row.clusterCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }
  };

  const geoData = <GeoJSON data={currentDistrPlan} />;
  const center = Defaults.stateData.center[stateID].latlng;
  const maxBound = Defaults.stateData.maxBound[stateID];
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
            <div className="ensemble-map">
              <Map
                geoData={geoData}
                center={center}
                maxBound={maxBound}
                zoom={zoom}
              />
            </div>
          </div>

          <div className="ensemble-data">
            <div className="button-container">
              <button
                className={`control-button`}
                onClick={() => setSelectedComponent("table")}
                disabled={selectedComponent === "table" && "active"}
              >
                Ensemble Table
              </button>
              <button
                className={`control-button`}
                onClick={() => setSelectedComponent("assoc")}
                disabled={selectedComponent === "assoc" && "active"}
              >
                Cluster Association
              </button>
            </div>
            <div style={{ margin: "30px" }}></div>
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnsembleSelection;
