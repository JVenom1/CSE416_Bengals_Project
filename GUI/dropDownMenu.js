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
