const mapData = {
  center: [40.614644, -84.135431],
  // center: [39.67, -83.0],
  // Define the coordinates for the boundaries of Wisconsin, Maryland, and North Carolina
  // https://www.latlong.net/
  maxBound: [
    [47.232158, -94.714658], // WI (top-left, slightly adjusted to the left)
    [33.556846, -74.367685], // NC (bottom-right)
  ],

  minZoom: 4,
  maxZoom: 10,
};

const stateData = {
  // stateZoomBounds ([lat], [long])
  maxBound: {
    0: [
      [41.686758, -93.578653], // Southwestern corner
      [47.737014, -83.575266], // Northeastern corner
    ],
    1: [
      [35.5, -79.5],
      [40.5, -74.0],
    ],
    2: [
      [36.5, -84.0],
      [33.5, -75.0],
    ],
  }, // Default State Center Coords
  center: {
    0: {
      latlng: [44.7844, -88.7879],
    },
    1: {
      latlng: [39.0458, -76.6413],
    },
    2: {
      latlng: [35.7796, -78.6382],
    },
  },
  // left map in compare stage
  // (leaflet needs a predetermined width otherwise its 0 for some reason)
  leafLeftCenter: {
    0: {
      latlng: [45.0, -85.4012],
    },
    1: {
      latlng: [38.1, -71.6413],
    },
    2: {
      latlng: [35.629117, -78.887533],
    },
  },
  number: {
    WI: 0,
    MD: 1,
    NC: 2,
  },
  name: {
    0: "Wisconsin Senate State",
    1: "Maryland Senate State",
    2: "North Carolina Federal Congress",
  },
  shortName: {
    0: "Wisconsin",
    1: "Maryland",
    2: "North Carolina",
  },
};
// workaround for leaflet 0px width default
const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
  const leafletContainer = document.querySelector(".leaflet-container");
  leafletContainer.style.width = width;
  leafletContainer.style.height = height;
};
const Defaults = { mapData, stateData, changeMapSizeXbyY };
export default Defaults;
