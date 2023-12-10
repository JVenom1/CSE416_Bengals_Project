import { React } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import mNum from "../Helpers/mNum.js";
import "../App.css";
import "leaflet/dist/leaflet.css";
const DefaultDistrMap = ({ stateID, currentDistrPlan }) => {
    return <>

        <div style={{ marginBlock: '8px', fontSize: '20px', fontWeight: "bold" }}>{mNum.stateNumsToPrefix[stateID]} District Plan</div>
        <MapContainer
            center={mNum.stateCenter[stateID].latlng}
            zoom={6}
            minZoom={4}
            maxBounds={mNum.stateZoomBounds.stateID}
            maxZoom={7}
            dragging={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {<GeoJSON data={currentDistrPlan} />}
        </MapContainer>

    </>
}
export default DefaultDistrMap;