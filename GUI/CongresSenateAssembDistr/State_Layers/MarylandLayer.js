// Create an empty GeoJSON layer for Maryland Congressional districts
const marylandCongressionalDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for Maryland Congressional districts
    weight: 2,
    color: "red",
    fillOpacity: 0,
  },
}).addTo(map);
makeTable(
  "Maryland_Data/maryland-congressional-districts.geojson",
  marylandCongressionalDistrictsLayer
);

// Create an empty GeoJSON layer for Maryland Senate districts
const marylandSenateDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for Maryland Senate districts
    weight: 2,
    color: "green",
    fillOpacity: 0,
  },
}).addTo(map);

makeTable(
  "Maryland_Data/maryland-senatorial-districts.geojson",
  marylandSenateDistrictsLayer
);

// Create an empty GeoJSON layer for Maryland Assembly districts
const marylandAssemblyDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for Maryland Assembly districts
    weight: 2,
    color: "blue",
    fillOpacity: 0,
  },
}).addTo(map);

makeTable(
  "Maryland_Data/maryland-assembly-districts.geojson",
  marylandAssemblyDistrictsLayer
);
