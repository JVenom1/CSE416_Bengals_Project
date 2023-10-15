// Define the coordinates for the boundaries of Wisconsin, Maryland, and North Carolina
var bounds = [
  [50.5, -105.0], // Wisconsin (top-left, slightly adjusted to the left)
  [30.0, -60.0], // Maryland (bottom-right)
];

// Initialize the map
var initMapStyle = {
  center: [39.67, -82.0], // Centered on the average coordinates
  zoom: 6, // Initial zoom level
  minZoom: 6, // Minimum zoom level
  maxBounds: bounds, // Restrict panning within the specified bounds
};
var map = L.map("map", initMapStyle);

// Add a tile layer for the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10, // Adjust the maximum zoom level as needed
}).addTo(map);

// Create GeoJSON data for the boundaries of Wisconsin, Maryland, and North Carolina
var geojsonWisconsinBound = "WisconsinOutline.geojson";
var geojsonMarylandBound = "MarylandOutline.geojson";
var geojsonNorthCarolinaBound = "NCOutline.geojson";

var geojsonWisconsinDistricts = "Data/Wisconson.geojson";
var geojsonMarylandDistricts = "Data/Maryland.geojson";
var geojsonNorthCarolinaDistricts = "Data/NC.geojson";

// Style for the state boundaries (black border)
var boundaryStyle = {
  color: "black",
  weight: 2, // Adjust the border thickness as needed
  fill: false, // No fill color
};

var stateName = {
  wisconsin: "Wisconsin",
  maryland: "Maryland",
  northCarolina: "NorthCarolina",
};
// old state zoom boundary
// lat, long
var stateZoomBounds = {
  Wisconsin: [
    [47, -92.0], // Southwestern corner
    [42.5, -87.0], // Northeastern corner
  ], // Adjust the bounds as needed
  Maryland: [
    [35.5, -79.5], // Southwestern corner
    [40.5, -74.0], // Northeastern corner
  ], // Adjust the bounds as needed
  NorthCarolina: [
    [36.5, -84.0], // Southwestern corner
    [33.5, -75.0], // Northeastern corner
  ], // Adjust the bounds as needed
};
const resetControl = L.control({ position: "topleft" });

// Function to handle reset button click
resetControl.onAdd = function (map) {
  const button = L.DomUtil.create("button", "reset-button");
  button.innerHTML = "Reset Map";

  button.addEventListener("click", function () {
    resetToInitialState();
  });

  return button;
};

resetControl.addTo(map); // Add the reset button to the map

// Function to reset the map to its initial state
function resetToInitialState() {
  // Remove the district layers (if any)
  map.eachLayer(function (layer) {
    if (layer instanceof L.GeoJSON) {
      map.removeLayer(layer);
    }
  });
  // Restore the map to its original dimensions
  map.setView(initMapStyle.center, initMapStyle.zoom);
  document.getElementById("map").style.width = "70%";
  document.getElementById("right-panel").style.width = "30%";

  // Hide the ensemble panel
  document.getElementById("ensemble-panel").style.display = "none";

  // Show the state selection dropdown
  document.getElementById("state-selection").style.display = "block";

  // Refresh the map to adapt to the new size
  changedMapWidthRefresh();

  createStateLayer(geojsonWisconsinBound, stateName.wisconsin);
  createStateLayer(geojsonMarylandBound, stateName.maryland);
  createStateLayer(geojsonNorthCarolinaBound, stateName.northCarolina);
}

function createStateLayer(geojsonURL, stateName) {
  fetch(geojsonURL)
    .then((response) => response.json())
    .then((data) => {
      // Create a GeoJSON layer for the state with a specified style
      var stateLayer = L.geoJSON(data, {
        style: boundaryStyle,
      }).addTo(map);

      // Create a transparent polygon using the GeoJSON geometry for the entire state
      var stateClickable = L.geoJSON(data.features[0].geometry, {
        opacity: 0, // Make it transparent
        fillOpacity: 0, // Make it transparent
      }).addTo(map);

      // Add a hover effect
      stateClickable.on("mouseover", function () {
        // Change the fill color to gray with 20% opacity when hovering
        this.setStyle({ fill: true, fillColor: "gray", fillOpacity: 0.2 });
      });
      stateClickable.on("mouseout", function () {
        // Revert to the original style when the mouse leaves
        this.setStyle({ fill: false });
      });

      // Add a click event to the entire state layer
      stateClickable.on("click", function (e) {
        centerMapOnState(e, stateName);
      });
    });
}

// Create state layers for Wisconsin, Maryland, and North Carolina
createStateLayer(geojsonWisconsinBound, stateName.wisconsin);
createStateLayer(geojsonMarylandBound, stateName.maryland);
createStateLayer(geojsonNorthCarolinaBound, stateName.northCarolina);

document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.getElementById("state-dropdown");
  dropdown.value = ""; // Set the value to an empty string to select the disabled "State" option
});

var dropdown = document.getElementById("state-dropdown");
dropdown.addEventListener("change", function () {
  var selectedOption = dropdown.options[dropdown.selectedIndex];
  var stateName = selectedOption.getAttribute("data-state");
  centerMapOnState(stateName, stateName);
});

function addButtons() {
  // Get the selected state from the dropdown
  var dropdown = document.getElementById("state-dropdown");
  var selectedOption = dropdown.options[dropdown.selectedIndex];
  var stateName = selectedOption.getAttribute("data-state");

  var buttonContainer = document.getElementById("button-container");

  while (buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild);
  }

  // Check if a state is selected
  if (stateName) {
    // Create and append the buttons
    var buttonContainer = document.getElementById("button-container");

    // Create the first button
    var button1 = document.createElement("button");
    button1.textContent = "Button 1";
    button1.addEventListener("click", function () {
      alert("Button 1 clicked for " + stateName);
    });
    buttonContainer.appendChild(button1);
    var button2 = document.createElement("button");
    button2.textContent = "Button 2";
    button2.addEventListener("click", function () {
      alert("Button 2 clicked for " + stateName);
    });
    buttonContainer.appendChild(button2);
  } else {
    while (buttonContainer.firstChild) {
      buttonContainer.removeChild(buttonContainer.firstChild);
    }
  }

  // Listen for changes in the dropdown selection
  var dropdown = document.getElementById("state-dropdown");
  dropdown.addEventListener("change", addButtons);
}

// --------------- Page 2 ----------------------
