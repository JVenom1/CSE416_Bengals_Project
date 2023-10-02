// Define the data variables
var mdData, wcData, ncData;

// Load Maryland GeoJSON Data
console.log("Fetching Maryland data...");
fetch("Data/GenerateDummyData/MarylandOutlineMultiplePlans.geojson")
  .then((response) => response.json())
  .then((data) => {
    createScatterPlot(data);
  })
  .catch((error) => {
    console.error("Error loading GeoJSON data:", error);
  });

// Function to create the scatter plot
function createScatterPlot(data) {
  // Define the width and height of the plot
  const width = 600;
  const height = 400;

  // Create an SVG element for the plot
  const svg = d3
    .select("#scatter-plot")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Extract the features (districts) from the GeoJSON data
  const features = data.features;

  // Define scales for x and y axes
  const xScale = d3
    .scaleLinear()
    .domain([1, d3.max(features, (d) => d.properties.PlanID)]) // Adjust the domain as needed
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(features, (d) => d.properties.Population)]) // Adjust the domain as needed
    .range([height, 0]);

  // Create circles for each data point
  svg
    .selectAll("circle")
    .data(features)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.properties.PlanID))
    .attr("cy", (d) => yScale(d.properties.Population))
    .attr("r", 4) // Adjust the radius as needed
    .attr("fill", "blue"); // Adjust the fill color as needed

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append("g").call(d3.axisLeft(yScale));

  // Add labels and titles as needed
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + 30)
    .attr("text-anchor", "middle")
    .text("Plan ID");

  svg
    .append("text")
    .attr("x", -height / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Population");
}
