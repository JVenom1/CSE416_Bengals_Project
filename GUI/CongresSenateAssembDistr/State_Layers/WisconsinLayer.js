// // Create an empty GeoJSON layer
// const wisconsinAssemblyDistrictsLayer = L.geoJSON(null, {
//   style: {
//     // Define the style for the assembly districts
//     weight: 2,
//     color: "blue",
//     fillOpacity: 0,
//   },
// }).addTo(map); // Assuming 'map' is your Leaflet map object

// makeTable(
//   "Wisconsin_Data/Wisconsin_Assembly_Districts_(2022).geojson",
//   wisconsinAssemblyDistrictsLayer
// );
// // Create an empty GeoJSON layer for senate districts
// const wisconsinSenateDistrictsLayer = L.geoJSON(null, {
//   style: {
//     // Define the style for senate districts
//     weight: 2,
//     color: "green",
//     fillOpacity: 0,
//   },
// }).addTo(map);

// makeTable(
//   "Wisconsin_Data/Wisconsin_Senate_Districts_(2022).geojson",
//   wisconsinSenateDistrictsLayer
// );
// Create an empty GeoJSON layer for congressional districts
const wisconsinCongressionalDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for congressional districts
    weight: 2,
    color: "red",
    fillOpacity: 0,
  },
}).addTo(map);

makeTable(
  "Wisconsin_Data/Wisconsin_Congressional_Districts_(2022).geojson",
  wisconsinCongressionalDistrictsLayer
);
