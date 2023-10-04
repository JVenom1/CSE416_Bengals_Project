// Define the coordinates for the boundaries of Wisconsin, Maryland, and North Carolina
var bounds = [
    [50.5, -105.0], // Wisconsin (top-left, slightly adjusted to the left)
    [30.0, -60.0]  // Maryland (bottom-right)
];

// Initialize the map
var map = L.map('map', {
    center: [39.67, -82.0], // Centered on the average coordinates
    zoom: 6, // Initial zoom level
    minZoom: 6, // Minimum zoom level
    maxBounds: bounds // Restrict panning within the specified bounds
});

// Add a tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10, // Adjust the maximum zoom level as needed
}).addTo(map);

// Create GeoJSON data for the boundaries of Wisconsin, Maryland, and North Carolina
var geojsonWisconsin = "WisconsinOutline.geojson";
var geojsonMaryland = "MarylandOutline.geojson";
var geojsonNorthCarolina = "NCOutline.geojson";

// Style for the state boundaries (black border)
var boundaryStyle = {
    color: "black",
    weight: 2, // Adjust the border thickness as needed
    fill: false // No fill color
};

var bounds = {
    "Wisconsin": [[47, -92.0], [42.5, -87.0]], // Adjust the bounds as needed
    "Maryland": [[39.5, -79.5], [37.5, -75.0]],   // Adjust the bounds as needed
    "NorthCarolina": [[36.5, -84.0], [33.5, -75.0]] // Adjust the bounds as needed
};

function centerMapOnStateClick(e) {
    var stateBounds = e.target.getBounds();
    map.fitBounds(stateBounds);
    
}

function centerMapOnState(stateName) {
    var stateBounds = bounds[stateName]; // Get the bounds for the selected state
    map.fitBounds(stateBounds);
}

// Load and parse the GeoJSON data for Wisconsin, and make it clickable with a hover effect
fetch(geojsonWisconsin)
    .then(response => response.json())
    .then(data => {
        // Create a GeoJSON layer for Wisconsin with a specified style
        var wisconsin = L.geoJSON(data, {
            style: boundaryStyle,
        }).addTo(map);

        // Create a transparent polygon using the GeoJSON geometry for the entire state
        var wisconsinClickable = L.geoJSON(data.features[0].geometry, {
            opacity: 0, // Make it transparent
            fillOpacity: 0, // Make it transparent
        }).addTo(map);

        // Add a hover effect
        wisconsinClickable.on('mouseover', function () {
            // Change the fill color to gray with 20% opacity when hovering
            this.setStyle({ fill: true, fillColor: 'gray', fillOpacity: 0.2 });
        });
        wisconsinClickable.on('mouseout', function () {
            // Revert to the original style when the mouse leaves
            this.setStyle({ fill: false });
        });

        // Add a click event to the entire Wisconsin polygon
        wisconsinClickable.on('click', centerMapOnStateClick);
    });

// Load and parse the GeoJSON data for Maryland, and make it clickable
fetch(geojsonMaryland)
    .then(response => response.json())
    .then(data => {
        var maryland = L.geoJSON(data, {
            style: boundaryStyle,
        }).addTo(map);

        var marylandClickable = L.geoJSON(data.features[0].geometry, {
            opacity: 0, // Make it transparent
            fillOpacity: 0, // Make it transparent
        }).addTo(map);

        // Add a hover effect
        marylandClickable.on('mouseover', function () {
            // Change the fill color to gray with 20% opacity when hovering
            this.setStyle({ fill: true, fillColor: 'gray', fillOpacity: 0.2 });
        });
        marylandClickable.on('mouseout', function () {
            // Revert to the original style when the mouse leaves
            this.setStyle({ fill: false });
        });

        // Add a click event to the entire Maryland layer
        marylandClickable.on('click', centerMapOnStateClick);
    });

// Load and parse the GeoJSON data for North Carolina, and make it clickable
fetch(geojsonNorthCarolina)
    .then(response => response.json())
    .then(data => {
        var northCarolina = L.geoJSON(data, {
            style: boundaryStyle,
        }).addTo(map);

        var northCarolinaClickable = L.geoJSON(data.features[0].geometry, {
            opacity: 0, // Make it transparent
            fillOpacity: 0, // Make it transparent
        }).addTo(map);

        // Add a hover effect
        northCarolinaClickable.on('mouseover', function () {
            // Change the fill color to gray with 20% opacity when hovering
            this.setStyle({ fill: true, fillColor: 'gray', fillOpacity: 0.2 });
        });
        northCarolinaClickable.on('mouseout', function () {
            // Revert to the original style when the mouse leaves
            this.setStyle({ fill: false });
        });

        // Add a click event to the entire North Carolina layer
        northCarolinaClickable.on('click', centerMapOnStateClick);
    });

document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.getElementById("state-dropdown");
    dropdown.value = ""; // Set the value to an empty string to select the disabled "State" option
});

var dropdown = document.getElementById("state-dropdown");
dropdown.addEventListener("change", function() {
    var selectedOption = dropdown.options[dropdown.selectedIndex];
    var stateName = selectedOption.getAttribute("data-state");
    centerMapOnState(stateName);
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
        button1.addEventListener("click", function() {
            alert("Button 1 clicked for " + stateName);
        });
        buttonContainer.appendChild(button1);
        var button2 = document.createElement("button");
        button2.textContent = "Button 2";
        button2.addEventListener("click", function() {
            alert("Button 2 clicked for " + stateName);
        });
        buttonContainer.appendChild(button2);
    }
    else {
        while (buttonContainer.firstChild) {
            buttonContainer.removeChild(buttonContainer.firstChild);
        }
    }
}

// Listen for changes in the dropdown selection
var dropdown = document.getElementById("state-dropdown");
dropdown.addEventListener("change", addButtons);