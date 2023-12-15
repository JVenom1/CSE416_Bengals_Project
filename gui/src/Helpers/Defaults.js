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
    2: {
      latlng: [35.7796, -78.6382],
    },
    1: {
      latlng: [39.0458, -76.6413],
    },
    0: {
      latlng: [44.7844, -88.7879],
    },
  },
  // left map in compare stage
  // (leaflet needs a predetermined width otherwise its 0 for some reason)
  leafLeftCenter: {
    2: {
      latlng: [34.9165, -74.6382],
    },
    1: {
      latlng: [38.1, -71.6413],
    },
    0: {
      latlng: [45.0, -85.4012],
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
};
// workaround for leaflet 0px width default
const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
  const leafletContainer = document.querySelector(".leaflet-container");
  leafletContainer.style.width = width;
  leafletContainer.style.height = height;
};
const Defaults = { mapData, stateData, changeMapSizeXbyY };
export default Defaults;

// Old mNum ---- Delete After Organization
// const mNum = {
//   mapCenter: [39.67, -83.0],

//   // Define the coordinates for the boundaries of Wisconsin, Maryland, and North Carolina
//   mapBounds: [
//     [50.5, -105.0], // Wisconsin (top-left, slightly adjusted to the left)
//     [30.0, -60.0], // Maryland (bottom-right)
//   ],
//   // stateZoomBounds ([lat], [long])
//   stateZoomBounds: {
//     0: [
//       [47, -92.0], // Southwestern corner
//       [42.5, -87.0], // Northeastern corner
//     ],
//     1: [
//       [35.5, -79.5],
//       [40.5, -74.0],
//     ],
//     2: [
//       [36.5, -84.0],
//       [33.5, -75.0],
//     ],
//   }, // Default State Center Coords
//   stateCenter: {
//     2: {
//       latlng: [35.7796, -78.6382],
//     },
//     1: {
//       latlng: [39.0458, -76.6413],
//     },
//     0: {
//       latlng: [44.0731, -89.4012],
//     },
//   },
//   // left map in compare stage
//   // (leaflet needs a predetermined width otherwise its 0 for some reason)
//   leafLeftStateCenter: {
//     2: {
//       latlng: [34.9165, -74.6382],
//     },
//     1: {
//       latlng: [38.1, -71.6413],
//     },
//     0: {
//       latlng: [45.0, -85.4012],
//     },
//   },
//   stateNumbers: {
//     WI: 0,
//     MD: 1,
//     NC: 2,
//   },
//   stateNumsToPrefix: {
//     0: "Wisconsin Senate State",
//     1: "Maryland Senate State",
//     2: "North Carolina Federal Congress",
//   },
// };
