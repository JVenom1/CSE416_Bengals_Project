function centerMapOnState(state, stateName) {
  if (typeof state === "string") {
    var stateBounds = stateZoomBounds[state]; // Get the bounds for the selected state
    map.fitBounds(stateBounds);
    afterStateSelectionPage(state);
  } else {
    var stateBounds = state.target.getBounds();
    map.fitBounds(stateBounds);
    afterStateSelectionPage(stateName);
  }
}
function changedMapWidthRefresh() {
  map.invalidateSize();
}

function afterStateSelectionPage(stateName) {
  let mapContainer = document.getElementById("map");
  let rightPan = document.getElementById("right-panel");

  // initial view hide
  document.getElementById("state-selection").style.display = "none";

  //adjust to new view
  mapContainer.style.width = "50%";
  rightPan.style.width = "50%";

  changedMapWidthRefresh(); // Refresh the map to adapt to the new size
  // ensemble create view
  var ensemblePanel = document.getElementById("ensemble-panel");
  ensemblePanel.style.display = "flex";
  districtView(stateName);
  ensembleView(rightPan);
}

// ----------------- left side -----------------
var districtFile = {
  Maryland: geojsonMarylandDistricts,
  Wisconsin: geojsonWisconsinDistricts,
  NorthCarolina: geojsonNorthCarolinaDistricts,
};

let selectedDistrictLayer = null; // Variable to store the selected district layer
let defaultColor = "black";
let defaultWeight = 2;
let boldWeight = defaultWeight + 2;
let activeState = null; // Variable to store the active state

function districtView(stateName) {
  if (activeState && stateName !== activeState) {
    map.removeLayer(activeState);
    activeState = null;
  }
  fetch(districtFile[stateName])
    .then((response) => response.json())
    .then((data) => {
      const stateLayer = L.geoJSON(data, {
        style: {
          color: defaultColor,
          weight: defaultWeight,
        },
        onEachFeature: function (feature, layer) {
          // Bind pop-up with district name
          let districtName = feature.properties.District;

          // Add click event to each district
          layer.on("click", function (e) {
            // Reset the style of the previously selected district, if any
            if (selectedDistrictLayer) {
              selectedDistrictLayer.setStyle({
                weight: defaultWeight,
                color: defaultColor,
              });
            }

            // Highlight the clicked district
            e.target.setStyle({
              weight: boldWeight,
              color: "red",
            });

            // Update the selected district
            selectedDistrictLayer = e.target;
          });

          // Change the style on mouseover
          layer.on("mouseover", function (e) {
            if (e.target !== selectedDistrictLayer) {
              e.target.setStyle({
                weight: boldWeight,
                color: defaultColor,
              });
            }
          });

          // Reset the style on mouseout
          layer.on("mouseout", function (e) {
            // Only reset the style if the district is not the selected one
            if (e.target !== selectedDistrictLayer) {
              e.target.setStyle({
                weight: defaultWeight,
                color: defaultColor,
              });
            }
          });
        },
      }).addTo(map);

      // Update the active state
      activeState = stateLayer;
    });
}

// ---------- right side ------------

// function to display right-panel
var scatterPlot;
function ensembleView(rightPan) {
  // clears previous scatter plot
  if (scatterPlot) {
    scatterPlot.destroy(); // Remove the scatter plot
    scatterPlot = null; // Clear the scatter plot object
    document.getElementById("scatter-plot").innerHTML = ""; // Hide the canvas
  }
  let view1Data = [
    { x: 1, y: 3 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    // Add your data for View 1 here
  ];

  let view2Data = [
    { x: 2, y: 2 },
    { x: 4, y: 6 },
    { x: 6, y: 9 },
    // Add your data for View 2 here
  ];

  // Set up the scatter plot with default data
  let ctx = document.getElementById("scatter-plot").getContext("2d");
  scatterPlot = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "View 1",
          data: view1Data,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
        y: {
          type: "linear",
          position: "left",
        },
      },
    },
  });

  // Event listener for the dropdown menu
  let viewSelector = document.getElementById("view-selector");
  viewSelector.addEventListener("change", (event) => {
    let selectedView = event.target.value;
    let newData = selectedView === "view1" ? view1Data : view2Data;

    scatterPlot.data.datasets[0].data = newData;
    scatterPlot.update();
  });
}
