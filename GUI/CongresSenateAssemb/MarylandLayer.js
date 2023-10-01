// Create an empty GeoJSON layer for Maryland Congressional districts
const marylandCongressionalDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for Maryland Congressional districts
    weight: 2,
    color: "red",
    fillOpacity: 0,
  },
}).addTo(map);

// Load GeoJSON data for Maryland Congressional districts
fetch("Maryland_Data/maryland-congressional-districts.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Add the GeoJSON data to the layer
    marylandCongressionalDistrictsLayer.addData(data);

    let districtNumber = 1; // Initialize the sequential number

    // Add click event listener to each feature (district)
    marylandCongressionalDistrictsLayer.eachLayer(function (layer) {
      // Assign the sequential number to each district
      layer.feature.properties.DistrictNumber = districtNumber;

      // Add a popup with the district number
      layer.bindPopup(
        `Congressional District ${layer.feature.properties.DistrictNumber}`
      );

      layer.on("click", function (e) {
        // Handle the click event for the district
        const districtProperties = e.target.feature.properties;
      });

      districtNumber++; // Increment the sequential number
    });
  });

// Create an empty GeoJSON layer for Maryland Senate districts
const marylandSenateDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for Maryland Senate districts
    weight: 2,
    color: "green",
    fillOpacity: 0,
  },
}).addTo(map);

// Load GeoJSON data for Maryland Senate districts
fetch("Maryland_Data/maryland-senatorial-districts.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Add the GeoJSON data to the layer
    marylandSenateDistrictsLayer.addData(data);

    let districtNumber = 1; // Initialize the sequential number

    // Add click event listener to each feature (district)
    marylandSenateDistrictsLayer.eachLayer(function (layer) {
      // Assign the sequential number to each district
      layer.feature.properties.DistrictNumber = districtNumber;

      // Add a popup with the district number
      layer.bindPopup(
        `Senate District ${layer.feature.properties.DistrictNumber}`
      );

      layer.on("click", function (e) {
        // Handle the click event for the district
        const districtProperties = e.target.feature.properties;
      });

      districtNumber++; // Increment the sequential number
    });
  });

// Create an empty GeoJSON layer for Maryland Assembly districts
const marylandAssemblyDistrictsLayer = L.geoJSON(null, {
  style: {
    // Define the style for Maryland Assembly districts
    weight: 2,
    color: "blue",
    fillOpacity: 0,
  },
}).addTo(map);

// Load GeoJSON data for Maryland Assembly districts
fetch("Maryland_Data/maryland-assembly-districts.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Add the GeoJSON data to the layer
    marylandAssemblyDistrictsLayer.addData(data);

    let districtNumber = 1; // Initialize the sequential number

    // Add click event listener to each feature (district)
    marylandAssemblyDistrictsLayer.eachLayer(function (layer) {
      // Assign the sequential number to each district
      layer.feature.properties.DistrictNumber = districtNumber;

      // Add a popup with the district number
      layer.bindPopup(
        `Assembly District ${layer.feature.properties.DistrictNumber}`
      );

      layer.on("click", function (e) {
        // Handle the click event for the district
        const districtProperties = e.target.feature.properties;
      });

      districtNumber++; // Increment the sequential number
    });
  });
