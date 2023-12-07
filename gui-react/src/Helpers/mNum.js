const mNum = {
  mapCenter: [39.67, -83.0],

  // Define the coordinates for the boundaries of Wisconsin, Maryland, and North Carolina
  mapBounds: [
    [50.5, -105.0], // Wisconsin (top-left, slightly adjusted to the left)
    [30.0, -60.0], // Maryland (bottom-right)
  ],
  // stateZoomBounds ([lat], [long])
  stateZoomBounds: {
    0: [
      [47, -92.0], // Southwestern corner
      [42.5, -87.0], // Northeastern corner
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
  stateCenter: {
    2: {
      latlng: [35.7796, -78.6382],
    },
    1: {
      latlng: [39.0458, -76.6413],
    },
    0: {
      latlng: [44.0731, -89.4012],
    },
  },
  // left map in compare stage
  // (leaflet needs a predetermined width otherwise its 0 for some reason)
  leafLeftStateCenter: {
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
  stateNumbers: {
    WI: 0,
    MD: 1,
    NC: 2,
  },
};

export default mNum;
