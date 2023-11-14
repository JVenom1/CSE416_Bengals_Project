import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// Data
import MDDistricts from "../Data/DistrictPlans/MD.json";
import NCDistricts from "../Data/DistrictPlans/NC.json";
import WIDistricts from "../Data/DistrictPlans/WI.json";

const EnsemblePage = () => {
    return (<></>)
}
export default EnsemblePage;