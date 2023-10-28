import React from "react";
import { useState } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// Data
import MDOutline from "../Data/StateOutlines/MDOutline.json";
import NCOutline from "../Data/StateOutlines/NCOutline.json";
import WIOutline from "../Data/StateOutlines/WIOutline.json";
// Other Files

const HomePage = () => {
  // Define the coordinates for the boundaries of Wisconsin, Maryland, and North Carolina
  var bounds = [
    [50.5, -105.0], // Wisconsin (top-left, slightly adjusted to the left)
    [30.0, -60.0], // Maryland (bottom-right)
  ];

  // Style for the state boundaries (#3388ff border)
  const boundaryStyle = {
    color: "#3388ff",
    weight: 3, // Adjust the border thickness as needed
    fill: true, // fill color
  };

  // Handlers

  function handleGeoJson(data) {
    return (
      <GeoJSON
        data={data}
        eventHandlers={{
          click: handleClick,
        }}
      />
    );
  }

  const handleClick = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className={"homeMapWrapper"}>
        <MapContainer
          center={[39.67, -83.0]}
          zoom={6}
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
        <div className="right-panel">
          <p>Please select from the dropdown</p>
          <select>
            <option value="option WI">WI</option>
            <option value="option MD">MD</option>
            <option value="option NC">NC</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default HomePage;
