// Calculate the center point between the three states
const centerLat = (35.7796 + 39.0458 + 43.0731) / 3;
const centerLng = (-78.6382 + -76.6413 + -89.4012) / 3;
defaultLoc = [centerLat, centerLng];
defaultZoom = 6;

const usaBounds = L.latLngBounds(
  L.latLng(24.0, -130.0), // Southwest corner of the extended bounds
  L.latLng(49.5, -60.0) // Northeast corner of the extended bounds
);

const map = L.map("map-container", {
  maxBounds: usaBounds, // Set the maximum bounds to the extended bounds
}).setView(defaultLoc, defaultZoom); // Centered between North Carolina, Maryland, and Wisconsin with zoom level 6

const maxZoom = 8; // Set your maximum zoom level
const minZoom = 5; // Set your maximum zoom-out level

// It is what it is
const tileLayer = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: maxZoom,
    minZoom: minZoom,
  }
).addTo(map);

//

// Wisonsin Layer

//
