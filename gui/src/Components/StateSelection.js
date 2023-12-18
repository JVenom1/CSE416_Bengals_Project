// Imports
import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { GeoJSON } from "react-leaflet";
// Files
import Header from "./Header.js";
import api from "../api/posts.js";
import Defaults from "../Helpers/Defaults.js";
import Map from "./Map.js";
// CSS
import "../CSS/App.css";
import "leaflet/dist/leaflet.css";
// Data
import MDOutline from "../Data/StateOutlines/MDOutline.json";
import NCOutline from "../Data/StateOutlines/NCOutline.json";
import WIOutline from "../Data/StateOutlines/WIOutline.json";

const StateSelection = () => {
  const [selectedState, setSelectedState] = useState(""); // For Dropdown
  const navigate = useNavigate();
  const headerText = "States";

  // Handlers
  const handleStateOutline = (geoDataArr) => {
    const displayGeo = [];
    geoDataArr.forEach((geoData) => {
      displayGeo.push(
        <GeoJSON
          data={geoData}
          eventHandlers={{
            click: handleStateSelect,
          }}
        />
      );
    });
    return displayGeo;
  };

  const handleStateSelect = async (e) => {
    const getEnsembleDetails = async (stateID) => {
      try {
        return (await api.get(`/${stateID}/ensemble_details`)).data;
      } catch (error) {
        // axios official console.log()'s
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        return null;
      }
    };
    const getClusterAssoc = async (stateID) => {
      try {
        return (await api.get(`/${stateID}/cluster_association_coordinates`))
          .data;
      } catch (error) {
        // axios official console.log()'s
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        return null;
      }
    };
    const getCurrDistrPlan = async (stateID) => {
      try {
        return (await api.get(`/${stateID}/2020plan`)).data;
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        return null;
      }
    };

    let stateID = null;
    // String of either WI/MD/NC
    if (e.sourceTarget) {
      // State Select
      stateID = e.sourceTarget.feature.properties.State;
      setSelectedState(stateID);
    } else {
      // Dropdown
      stateID = e.target.value;
      setSelectedState(stateID);
    }
    // change it to the correct number
    stateID = Defaults.stateData.number[stateID];

    document.body.style.cursor = "wait";
    const ensembleDetails = await getEnsembleDetails(stateID);
    const currDistPlan = await getCurrDistrPlan(stateID);
    const clusterAssoc = await getClusterAssoc(stateID);
    navigate(`/EnsembleSelection`, {
      state: {
        stateID: stateID,
        headerText: headerText,
        currDistrPlan: currDistPlan,
        ensembleDetails: ensembleDetails,
        clusterAssoc: clusterAssoc,
      },
    });
  };
  const geoData = handleStateOutline([WIOutline, MDOutline, NCOutline]);
  const center = Defaults.mapData.center;
  const maxBound = Defaults.mapData.maxBound;
  const zoom = 6;
  return (
    <>
      <div className="app-container">
        <Header headerText={headerText} />
        <div className="main-container">
          <div className="home-map">
            <Map
              geoData={geoData}
              center={center}
              maxBound={maxBound}
              zoom={zoom}
            />
          </div>
          <div className="welcome-container">
            <div className="welcome-text">
              <h1 style={{ fontSize: "50px" }}>Welcome to Bengals</h1>
              <h2 style={{ fontSize: "25px" }}>
                Have Fun With Our Cluster Analysis On Sets Of Random District
                Plans.
              </h2>
            </div>
            <div className="dropdown-menu">
              <h4 style={{ fontSize: "20px" }}>
                Please Select A State From Below Or On The Map
              </h4>
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
