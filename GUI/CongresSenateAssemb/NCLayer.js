// Create an empty GeoJSON layer
const NCAssemblyDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for the assembly districts
    weight: 2,
    color: "blue",
    fillOpacity: 0,
  },
}).addTo(map); // Assuming 'map' is your Leaflet map object

// Load GeoJSON data from the file
fetch("NorthCarolina_Data/NCGA_Assem_2022.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Add the GeoJSON data to the layer
    NCAssemblyDistrictsLayer.addData(data);
    let districtNumber = 1; // Initialize the sequential number

    // Add click event listener to each feature (district)
    NCAssemblyDistrictsLayer.eachLayer(function (layer) {
      // Assign the sequential number to each district
      layer.feature.properties.DistrictNumber = districtNumber;

      // Add a popup with the district number
      layer.bindPopup(
        `Assembly District ${layer.feature.properties.DistrictNumber}`
      );

      layer.on("click", function (e) {
        // Handle the click event for the district
        const districtProperties = e.target.feature.properties;
        // add future analysis here
      });

      districtNumber++; // Increment the sequential number
    });
  });
// Create an empty GeoJSON layer for senate districts
const NCSenateDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for senate districts
    weight: 2,
    color: "green",
    fillOpacity: 0,
  },
}).addTo(map);

// Load GeoJSON data for senate districts
fetch("NorthCarolina_Data/NCGA_Senate_2022.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Add the GeoJSON data to the layer
    NCSenateDistrictsLayer.addData(data);

    let districtNumber = 1; // Initialize the sequential number

    // Add click event listener to each feature (district)
    NCSenateDistrictsLayer.eachLayer(function (layer) {
      // Assign the sequential number to each district
      layer.feature.properties.DistrictNumber = districtNumber;

      // Add a popup with the district number
      layer.bindPopup(
        `Senate District ${layer.feature.properties.DistrictNumber}`
      );

      layer.on("click", function (e) {
        // Handle the click event for the district
        const districtProperties = e.target.feature.properties;

        // add future analysis here
      });

      districtNumber++; // Increment the sequential number
    });
  });
// Create an empty GeoJSON layer for congressional districts
const NCCongressionalDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for congressional districts
    weight: 2,
    color: "red",
    fillOpacity: 0,
  },
}).addTo(map);

// Load GeoJSON data for congressional districts
fetch("NorthCarolina_Data/NCGA_Congress_2019.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Add the GeoJSON data to the layer
    NCCongressionalDistrictsLayer.addData(data);
    let districtNumber = 1; // Initialize the sequential number
    // Add click event listener to each feature (district)
    NCCongressionalDistrictsLayer.eachLayer(function (layer, i) {
      // Assign a sequential number to each district
      layer.feature.properties.DistrictNumber = districtNumber;

      // Add a popup with the district number
      layer.bindPopup(
        `Congressional District ${layer.feature.properties.DistrictNumber}`
      );

      layer.on("click", function (e) {
        // Handle the click event for the district
        const districtProperties = e.target.feature.properties;

        // add future analysis here
      });
      districtNumber++; // Increment the sequential number
    });
  });
