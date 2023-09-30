// Add markers for North Carolina, Maryland, and Wisconsin
const northCarolinaMarker = L.marker([35.7796, -78.6382]).addTo(map);
const marylandMarker = L.marker([39.0458, -76.6413]).addTo(map);
const wisconsinMarker = L.marker([44.0731, -89.4012]).addTo(map);

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
    latlng: [44.0731, -89.4012],
  },
};

// Function to handle marker click
function onMarkerClick(state) {
  const info = stateInfo[state];
  if (info) {
    // alert(`You selected ${info.name}\n\nDescription: ${info.description}`);
  }
}
const stateNames = {
  northCarolinaMarker: "North Carolina (S/S)",
  marylandMarker: "Maryland (S/S)",
  wisconsinMarker: "Wisconsin (F/C)",
};

northCarolinaMarker.bindTooltip(stateNames.northCarolinaMarker).openTooltip();
marylandMarker.bindTooltip(stateNames.marylandMarker).openTooltip();
wisconsinMarker.bindTooltip(stateNames.wisconsinMarker).openTooltip();

// ------- drop down

// Create a custom control for the dropdown menu
const dropdownControl = L.control({ position: "topleft" });

// Function to handle state selection from dropdown
function onDropdownSelect(state) {
  const info = stateInfo[state];
  if (info) {
    // alert(`You selected ${info.name}\n\nDescription: ${info.description}`);
    map.setView(info.latlng, 8); // Set the map view to the clicked state's coordinates with zoom level 8
  }
}

// Create the dropdown menu
const dropdown = document.createElement("select");
dropdown.id = "state-dropdown";
dropdown.classList.add("form-control");
dropdown.innerHTML = `
  <option value="" disabled selected>Select a state</option>
  <option value="NorthCarolina">North Carolina</option>
  <option value="Maryland">Maryland</option>
  <option value="Wisconsin">Wisconsin</option>
`;

// Event listener for state selection from the dropdown
dropdown.addEventListener("change", function (event) {
  const selectedState = event.target.value;
  if (selectedState) {
    onDropdownSelect(selectedState);
  }
});

// Add the dropdown to the custom control
dropdownControl.onAdd = function () {
  return dropdown;
};

dropdownControl.addTo(map);
