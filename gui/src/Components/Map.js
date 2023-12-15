import Defaults from "../Helpers/Defaults.js";
import { MapContainer, TileLayer } from "react-leaflet";

// for later what if geoData is set like where show is an array of true
// and false so u can show the data or not simply by pushing in geoData
// {show[i] && <GeoJSON.../>}
const Map = ({ geoData, center, maxBound, zoom }) => {
  // geoData has to be predefined GeoJSON eg: <GeoJSON data={data}/>

  const handleDiffScreenSizes = (zoom) => {
    const diagonalSize = Math.sqrt(
      window.innerWidth ** 2 + window.innerHeight ** 2
    );
    const avgLaptopSize = 2000; //pixels
    zoom -= diagonalSize < avgLaptopSize ? 1 : 0;
    return zoom;
  };

  // if screen is small eg laptop zoom out 1 level
  zoom = handleDiffScreenSizes(zoom);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={Defaults.mapData.minZoom}
      maxBounds={maxBound}
      maxZoom={Defaults.mapData.maxZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData}
    </MapContainer>
  );
};

export default Map;
