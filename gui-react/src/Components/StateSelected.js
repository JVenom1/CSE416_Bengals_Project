import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
const StateClicked = () => {
  var stateName = {
    wisconsin: "Wisconsin",
    maryland: "Maryland",
    northCarolina: "NorthCarolina",
  };
  // lat, long
  var stateZoomBounds = {
    Wisconsin: [
      [47, -92.0], // Southwestern corner
      [42.5, -87.0], // Northeastern corner
    ], // Adjust the bounds as needed
    Maryland: [
      [35.5, -79.5], // Southwestern corner
      [40.5, -74.0], // Northeastern corner
    ], // Adjust the bounds as needed
    NorthCarolina: [
      [36.5, -84.0], // Southwestern corner
      [33.5, -75.0], // Northeastern corner
    ], // Adjust the bounds as needed
  };
  function changeMapSizeXbyY(height = "100%", width = "70vw") {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  }

  return <></>;
};

export default StateClicked;
