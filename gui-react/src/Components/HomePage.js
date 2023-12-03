// description comments are used for the combination with server part (can be deleted later by anyone)

import { React } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// Data (server call to grab this data)
import MDOutline from "../Data/StateOutlines/MDOutline.json";
import NCOutline from "../Data/StateOutlines/NCOutline.json";
import WIOutline from "../Data/StateOutlines/WIOutline.json";
// District Data (once stateID retrieved make a server call to grab it, so not all needs to be loaded)
import MDPlan from "../Data/DistrictPlans/MD.json";
import NCPlan from "../Data/DistrictPlans/NC.json";
import WIPlan from "../Data/DistrictPlans/WI.json";

import MagicNumbers from "../Helpers/magicNumbers";

const HomePage = () => {
  const navigate = useNavigate();

  // Handlers
  const handleStateOutline = (geoData) => {
    return (
      <GeoJSON
        data={geoData}
        eventHandlers={{
          click: handleStateClick,
        }}
      />
    );
  };
  // GUI 17
  const goToHomePage = (e) => {
    navigate("/");
  };
  const handleStateClick = (e) => {
    const stateID = e.sourceTarget.feature.properties.State;
    navigate(`/EnsembleList`, {
      state: {
        stateID: stateID,
        currentDistrictPlan: getCurrDistPlan(stateID),
      },
    });
  };

  const handleDropDownClick = (e) => {
    const stateID = e.target.value;
    navigate(`/EnsembleList`, {
      state: {
        stateID: stateID,
        currentDistrictPlan: getCurrDistPlan(stateID),
      },
    });
  };
  const getCurrDistPlan = (stateID) => {
    if (stateID === "WI") {
      return WIPlan;
    } else if (stateID === "MD") {
      return MDPlan;
    } else if (stateID === "NC") {
      return NCPlan;
    }
    console.log("No Data HomePage");
    return null;
  };
  return (
    <>
      <div className={"mapWrapper"}>
        <MapContainer
          center={[39.67, -83.0]}
          zoom={5.5}
          minZoom={6}
          maxBounds={MagicNumbers.mapBounds}
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
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        <div className="dropdown">
          <p>Please select from the dropdown</p>
          <select onChange={handleDropDownClick}>
            <option disabled selected>
              Select a State
            </option>
            <option value="WI">WI</option>
            <option value="MD">MD</option>
            <option value="NC">NC</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default HomePage;
