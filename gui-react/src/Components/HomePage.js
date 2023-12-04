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

import mNum from "../Helpers/magicNumbers";

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
    const stateOutlineID = e.sourceTarget.feature.properties.State;
    const [stateID, currDistPlan] = getCurrDistPlan(stateOutlineID);
    navigate(`/EnsembleList`, {
      state: {
        stateID: stateID,
        currentDistrictPlan: currDistPlan,
      },
    });
  };

  const handleDropDownClick = (e) => {
    const stateOutlineID = e.target.value;
    // current districtplan is the default one
    const [stateID, currDistPlan] = getCurrDistPlan(stateOutlineID);
    navigate(`/EnsembleList`, {
      state: {
        stateID: stateID,
        currentDistrictPlan: currDistPlan,
      },
    });
  };
  const getCurrDistPlan = (stateID) => {
    if (stateID === "WI" || stateID === mNum.stateNumbers.WI) {
      return ["WI", WIPlan]; // retrieve the default plans from the server here
    } else if (stateID === "MD" || stateID === mNum.stateNumbers.MD) {
      return ["MD", MDPlan];
    } else if (stateID === "NC" || stateID === mNum.stateNumbers.NC) {
      return ["NC", NCPlan];
    }
    alert("No Data");
    return null;
  };
  return (
    <>
      <div className={"mapWrapper"}>
        <MapContainer
          center={mNum.mapCenter}
          zoom={5.5}
          minZoom={6}
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
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        <div className="dropdown">
          <p>Please select from the dropdown</p>
          <select onChange={handleDropDownClick}>
            <option disabled selected>
              Select a State
            </option>
            <option value={"WI"}>WI</option>
            <option value={"MD"}>MD</option>
            <option value={"NC"}>NC</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default HomePage;
