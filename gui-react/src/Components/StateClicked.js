import { useState, useEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

// District Data
import MDData from "../Data/DistrictPlans/MD.json";
import NCData from "../Data/DistrictPlans/NC.json";
import WIData from "../Data/DistrictPlans/WI.json";

// Outline Data
// import MDData from "../Data/StateOutlines/MDOutline.json";
// import NCData from "../Data/StateOutlines/NCOutline.json";
// import WIData from "../Data/StateOutlines/WIOutline.json";

const StateClicked = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  useEffect(() => {
    changeMapSizeXbyY("100%", "50vw");
    handleDistrictData();
  }, []);

  // state Centers
  const stateCenter = {
    NC: {
      latlng: [35.7796, -78.6382],
    },
    MD: {
      latlng: [39.0458, -76.6413],
    },
    WI: {
      latlng: [44.0731, -89.4012],
    },
  };
  // stateZoomBounds ([lat], [long])
  const stateZoomBounds = {
    WI: [
      [47, -92.0], // Southwestern corner
      [42.5, -87.0], // Northeastern corner
    ], // Adjust the bounds as needed
    MD: [
      [35.5, -79.5], // Southwestern corner
      [40.5, -74.0], // Northeastern corner
    ], // Adjust the bounds as needed
    NC: [
      [36.5, -84.0], // Southwestern corner
      [33.5, -75.0], // Northeastern corner
    ], // Adjust the bounds as needed
  };

  // Get Data Districts
  const handleDistrictData = () => {
    // set the map view
    if (stateID === "WI") {
      return <GeoJSON data={WIData} />;
    } else if (stateID === "MD") {
      return <GeoJSON data={MDData} />;
    } else if (stateID === "NC") {
      return <GeoJSON data={NCData} />;
    }
  };

  // leaflet map size change
  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  const goToHomePage = () => {
    navigate("/");
  };

  // stateID = Abbr of actual state (eg: WI, MD, NC)
  const navigate = useNavigate();
  const location = useLocation();
  const stateID = location.state.stateID;
  const geojsonData = handleDistrictData();
  const maxBounds = stateZoomBounds.stateID;
  const center = stateCenter[stateID].latlng;

  const generateRandomCoordinate = () => Math.floor(Math.random() * 100);
  // length is the list of plans in said cluster (DUMMY DATA)
  const initialDataSet = [
    {
      length: 10,
      x: generateRandomCoordinate(),
      y: generateRandomCoordinate(),
      data: [null, { x: 20, y: 30 }, null],
    },
    {
      length: 15,
      x: generateRandomCoordinate(),
      y: generateRandomCoordinate(),
      data: [{ x: 40, y: 50 }, null, { x: 60, y: 70 }],
    },
    {
      length: 20,
      x: generateRandomCoordinate(),
      y: generateRandomCoordinate(),
      data: [null, { x: 80, y: 90 }, { x: 100, y: 110 }],
    },
  ];
  const [data, setData] = useState(initialDataSet);

  // Function to handle click on a data point
  const handlePointClick = (point) => {
    setSelectedPoint(point);
    // Logic to load new data set based on the selected point
    // You can call a function here to fetch and set new data
  };

  return (
    <>
      <div className="mapWrapper">
        <MapContainer
          center={center}
          zoom={6}
          minZoom={6}
          maxBounds={maxBounds}
          maxZoom={10}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geojsonData}
        </MapContainer>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
        <div className="clusterScatter">
          {data.map((point, index) => (
            <div
              key={index}
              className={`scatterPoint ${
                selectedPoint === point ? "selected" : ""
              }`}
              style={{ width: point.length, height: point.length }}
              onClick={() => handlePointClick(point)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StateClicked;
