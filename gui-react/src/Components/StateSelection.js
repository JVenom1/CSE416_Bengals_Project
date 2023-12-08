// description comments are used for the combination with server part (can be deleted later by anyone)
import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Header from "./Header.js";
import api from "../api/posts.js";
import mNum from "../Helpers/mNum.js";
import "../App.css";
import "leaflet/dist/leaflet.css";
// Data
import MDOutline from "../Data/StateOutlines/MDOutline.json";
import NCOutline from "../Data/StateOutlines/NCOutline.json";
import WIOutline from "../Data/StateOutlines/WIOutline.json";

const StateSelection = () => {
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();
  const headerText = "Bengals > State Selection";
  // Handlers
  const handleStateOutline = (geoData) => {
    return (
      <GeoJSON
        data={geoData}
        eventHandlers={{
          click: handleStateSelect,
        }}
      />
    );
  };

  const handleStateSelect = async (e) => {
    let stateID = null;
    if (e.sourceTarget) {
      // State Select - String of either WI/MD/NC
      stateID = e.sourceTarget.feature.properties.State;
      setSelectedState(stateID);
    } else {
      // dropdown
      stateID = e.target.value;
      setSelectedState(stateID);
    }
    // current districtplan is the default one
    if (stateID === "WI") {
      stateID = mNum.stateNumbers.WI;
    } else if (stateID === "MD") {
      stateID = mNum.stateNumbers.MD;
    } else {
      stateID = mNum.stateNumbers.NC;
    }
    const ensemblesAssoc = await getEnsemDetails(stateID);
    const currDistPlan = await getDistrPlan(stateID);
    navigate(`/EnsembleSelection`, {
      state: {
        stateID: stateID,
        headerText: headerText,
        currDistrPlan: currDistPlan,
        ensemblesAssoc: ensemblesAssoc,
      },
    });
  };

  const getEnsemDetails = async (stateID) => {
    try {
      const response = await api.get(`/${stateID}/ensemble_details`);
      const clustAssoc = response.data;
      return clustAssoc;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  const getDistrPlan = async (stateID) => {
    try {
      const response = await api.get(`/${stateID}/2020plan`);
      const currentDistPlan = response.data;
      return currentDistPlan; // retrieve the default plans from the server here
    } catch (error) {
      console.log("Error fetching data:", error);
      return null;
    }
  };

  return (
    <>
      <div className="app-container">
        <Header headerText={headerText} />
        <div className="main-container">
          <div className="map-container">
            <MapContainer
              center={mNum.mapCenter}
              zoom={5}
              minZoom={4}
              maxBounds={mNum.mapBounds}
              maxZoom={10}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {handleStateOutline(WIOutline)}
              {handleStateOutline(MDOutline)}
              {handleStateOutline(NCOutline)}
            </MapContainer>
          </div>
          <div className="welcome-container">
            <div className="welcome-text">
              <h1>Welcome to Bengals</h1>
              <h4>
                Have fun with our cluster analysis on sets of random district
                plans.
              </h4>
            </div>
            <div className="dropdown-menu">
              <h5>Please Select A State From Below Or On The Map</h5>
              <select value={selectedState} onChange={handleStateSelect}>
                <option value="" disabled>
                  Select a State
                </option>
                <option value="WI">WI</option>
                <option value="MD">MD</option>
                <option value="NC">NC</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateSelection;
