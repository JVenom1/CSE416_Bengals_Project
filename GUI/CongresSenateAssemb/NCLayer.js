// Create an empty GeoJSON layer
const NCAssemblyDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for the assembly districts
    weight: 2,
    color: "blue",
    fillOpacity: 0,
  },
}).addTo(map); // Assuming 'map' is your Leaflet map object

makeTable(
  "NorthCarolina_Data/NCGA_Assem_2022.geojson",
  NCAssemblyDistrictsLayer
);

// Create an empty GeoJSON layer for senate districts
const NCSenateDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for senate districts
    weight: 2,
    color: "green",
    fillOpacity: 0,
  },
}).addTo(map);

makeTable(
  "NorthCarolina_Data/NCGA_Senate_2022.geojson",
  NCSenateDistrictsLayer
);

// Create an empty GeoJSON layer for congressional districts
const NCCongressionalDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for congressional districts
    weight: 2,
    color: "red",
    fillOpacity: 0,
  },
}).addTo(map);

makeTable(
  "NorthCarolina_Data/NCGA_Congress_2019.geojson",
  NCCongressionalDistrictsLayer
);
