// Create a custom control for the reset button
const resetControl = L.control({ position: "bottomleft" });

// Function to handle reset button click
resetControl.onAdd = function (map) {
  const button = L.DomUtil.create("button", "reset-button");
  button.innerHTML = "Reset Map";

  button.addEventListener("click", function () {
    map.setView(defaultLoc, defaultZoom); // Re-center the map view between the three states and set zoom level to 6
  });
  return button;
};

resetControl.addTo(map); // Add the reset button to the map

// Function to handle state click
function onStateClick(state) {
  const info = stateInfo[state];

  // Set the map view to the clicked marker's coordinates with zoom level 7
  map.setView(info.latlng, 8);
}

// Add click event listeners to the markers
northCarolinaMarker.on("click", () => onStateClick("NorthCarolina"));
marylandMarker.on("click", () => onStateClick("Maryland"));
wisconsinMarker.on("click", () => onStateClick("Wisconsin"));
