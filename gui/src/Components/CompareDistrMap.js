import { React } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import mNum from "../Helpers/mNum.js";
import "../App.css";

const CompareDistrMap = ({ stateID, currentDistrPlan, selectedPlans, distPlanList }) => {
  const filteredSelectedPlans = distPlanList.filter((plan, index) => selectedPlans[index]);
  console.log(filteredSelectedPlans)
  const getPlan = (index) => {

  }
  return (
    <>
      <MapContainer
        center={mNum.stateCenter[stateID].latlng}
        zoom={5}
        minZoom={4}
        maxBounds={mNum.stateZoomBounds.stateID}
        maxZoom={7}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={currentDistrPlan} />
        {/* {selectedPlans.map((isChecked, index) => (
          isChecked && <GeoJSON key={index} data={()=>getPlan(index)} />
        ))} */}
      </MapContainer>
    </>
  );
};

export default CompareDistrMap;
