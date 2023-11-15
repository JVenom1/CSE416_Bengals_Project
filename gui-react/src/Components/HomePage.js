import { React, useState } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// Data
import MDOutline from "../Data/StateOutlines/MDOutline.json";
import NCOutline from "../Data/StateOutlines/NCOutline.json";
import WIOutline from "../Data/StateOutlines/WIOutline.json";
// Other Files

const HomePage = () => {
  const navigate = useNavigate();

  // Define the coordinates for the boundaries of Wisconsin, Maryland, and North Carolina
  var bounds = [
    [50.5, -105.0], // Wisconsin (top-left, slightly adjusted to the left)
    [30.0, -60.0], // Maryland (bottom-right)
  ];

  // Style for the state boundaries (#3388ff border)
  // const boundaryStyle = {
  //   color: "#3388ff",
  //   weight: 3, // Adjust the border thickness as needed
  //   fill: true, // fill color
  // };

  // Handlers

  const handleGeoJson = (data) => {
    return (
      <GeoJSON
        data={data}
        eventHandlers={{
          click: handleStateClick,
        }}
      />
    );
  };
  const goToHomePage = (e) => {
    navigate("/");
  };
  const handleStateClick = (e) => {
    let stateID = e.sourceTarget.feature.properties.State;
    navigate(`/State`, { state: { stateID: stateID } });
  };
  const handleDropDownClick = (e) => {
    let stateID = e.target.value;
    navigate(`/State`, { state: { stateID: stateID } });
  };
  return (
    <>
      <div className={"mapWrapper"}>
        <MapContainer
          center={[39.67, -83.0]}
          zoom={5.5}
          minZoom={6}
          maxBounds={bounds}
          maxZoom={10}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {handleGeoJson(WIOutline)}
          {handleGeoJson(MDOutline)}
          {handleGeoJson(NCOutline)}
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
