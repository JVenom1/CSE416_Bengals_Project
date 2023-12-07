// description comments are used for the combination with server part (can be deleted later by anyone)
import axios from "axios";
import { useState, React } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// Data (server call to grab this data)
import MDOutline from "../Data/StateOutlines/MDOutline.json";
import NCOutline from "../Data/StateOutlines/NCOutline.json";
import WIOutline from "../Data/StateOutlines/WIOutline.json";
import MDPlan from "../Data/DistrictPlans/MD.json";
import NCPlan from "../Data/DistrictPlans/NC.json";
import WIPlan from "../Data/DistrictPlans/WI.json";
import mNum from "../Helpers/magicNumbers";
// so link is in one location
// https://7df5-130-245-192-6.ngrok-free.app/server/BengalsApi
// http://localhost:8080/server/BengalsAPI
const api = axios.create({
  baseURL: "https://flat-banks-flow.loca.lt/server/BengalsAPI",
});
const HomePage = () => {
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();

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
  // GUI 17
  const goToHomePage = (e) => {
    navigate("/");
  };

  const handleStateSelect = async (e) => {
    let stateOutlineID = null;
    if (e.sourceTarget) {
      // State Select - String of either WI/MD/NC
      stateOutlineID = e.sourceTarget.feature.properties.State;
      setSelectedState(stateOutlineID);
    } else {
      // dropdown
      stateOutlineID = e.target.value;
      setSelectedState(stateOutlineID);
    }
    // current districtplan is the default one
    if (stateOutlineID === "WI") {
      stateOutlineID = 0;
    } else if (stateOutlineID === "MD") {
      stateOutlineID = 1;
    } else {
      stateOutlineID = 2;
    }


    const currDistPlan = await getDistrPlan(stateOutlineID);

    navigate(`/EnsembleList`, {
      state: {
        stateID: stateOutlineID,
        currentDistrictPlan: currDistPlan,
      },
    });
  };

  //GUI-3 Step 1 Retrieve the data
  // const getDistrPlan = async (stateID) => {
  //   try {
  //     if (stateID === "WI" || stateID === mNum.stateNumbers.WI) {
  //       const response = await api.get(`/0/2020plan`);
  //       return ["WI", response.data]; // retrieve the default plans from the server here
  //     } else if (stateID === "MD" || stateID === mNum.stateNumbers.MD) {
  //       const response = await api.get(`/1/2020plan`);
  //       return ["MD", response.data];
  //     } else if (stateID === "NC" || stateID === mNum.stateNumbers.NC) {
  //       const response = await api.get(`/2/2020plan`);
  //       return [mNum.stateNumbers, response.data];
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // };

  const getDistrPlan = async (stateID) => {
    try {

      if (stateID === 0) {
        const response = await api.get('/0/2020plan');
        const WIPlan = response.data;

        return WIPlan; // retrieve the default plans from the server here
      } else if (stateID === 1) {
        return MDPlan;
      } else if (stateID === 2) {
        return NCPlan;
      }


    } catch (error) {
      console.log("Error fetching data:", error);
      return null;
    }
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
          <p>
            Welcome to Bengals!!{" "}
            <p>Please select a state from below or on the map.</p>
          </p>
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
    </>
  );
};

export default HomePage;
