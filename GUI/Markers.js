// Add markers for North Carolina, Maryland, and Wisconsin
const northCarolinaMarker = L.marker([35.7796, -78.6382]).addTo(map);
const marylandMarker = L.marker([39.0458, -76.6413]).addTo(map);
const wisconsinMarker = L.marker([43.0731, -89.4012]).addTo(map);

// dummy data
const stateInfo = {
  NorthCarolina: {
    name: "North Carolina",
    description: "This is North Carolina.",
    latlng: [35.7796, -78.6382],
  },
  Maryland: {
    name: "Maryland",
    description: "This is Maryland.",
    latlng: [39.0458, -76.6413],
  },
  Wisconsin: {
    name: "Wisconsin",
    description: "This is Wisconsin.",
    latlng: [43.0731, -89.4012],
  },
};

// Function to handle marker click
function onMarkerClick(state) {
  const info = stateInfo[state];
  if (info) {
    alert(`You selected ${info.name}\n\nDescription: ${info.description}`);
  }
}
const stateNames = {
  northCarolinaMarker: "North Carolina",
  marylandMarker: "Maryland",
  wisconsinMarker: "Wisconsin",
};

northCarolinaMarker.bindTooltip(stateNames.northCarolinaMarker).openTooltip();
marylandMarker.bindTooltip(stateNames.marylandMarker).openTooltip();
wisconsinMarker.bindTooltip(stateNames.wisconsinMarker).openTooltip();
