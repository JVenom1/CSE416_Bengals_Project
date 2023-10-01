// // Load the GeoJSON data for your districts
// fetch("Data/GenerateDummyData/NCOutline.geojson")
//   .then((response) => response.json())
//   .then((boundaryData) => {
//     // Process the GeoJSON data here
//     generateRandomDistricts(boundaryData);
//   });

// function generateRandomDistricts(boundaryData) {
//   // Extract the boundary geometry from the GeoJSON data
//   const boundary = boundaryData.features[0].geometry;

//   // Define the number of districts and random seed for reproducibility
//   const numDistricts = 5; // Change this to the desired number of districts
//   const randomSeed = 42; // Change this for different random results

//   // Generate random points within the boundary
//   const randomPoints = generateRandomPointsWithinBoundary(
//     boundary,
//     numDistricts,
//     randomSeed
//   );

//   // Now you have an array of random points, you can use any algorithm to group them into districts
//   // For simplicity, let's create a GeoJSON FeatureCollection with these points as centroids
//   const districtFeatures = randomPoints.map((point, index) => ({
//     type: "Feature",
//     properties: {
//       district_id: index + 1, // Assign unique district IDs
//     },
//     geometry: {
//       type: "Point",
//       coordinates: point,
//     },
//   }));

//   const districtCollection = {
//     type: "FeatureCollection",
//     features: districtFeatures,
//   };

//   // You can save districtCollection as a GeoJSON file or use it for further processing
//   console.log(districtCollection);
// }

// function generateRandomPointsWithinBoundary(boundary, numPoints, seed) {
//   // You can use any method to generate random points within a polygon
//   // Here's a simple example using a bounding box approach
//   const [minX, minY, maxX, maxY] = turf.bbox(boundary);
//   const randomPoints = [];

//   for (let i = 0; i < numPoints; i++) {
//     const x = Math.random() * (maxX - minX) + minX;
//     const y = Math.random() * (maxY - minY) + minY;
//     randomPoints.push([x, y]);
//   }

//   return randomPoints;
// }
