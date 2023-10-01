function makeTable(path, layer) {
  let initialPath = "Data/";
  path = initialPath + path;
  fetch(path)
    .then((response) => response.json())
    .then((data) => {
      // Add the GeoJSON data to the layer
      layer.addData(data);
      layer.on("click", function (event) {
        const properties = event.layer.feature.properties;
        const propertyTable = document
          .getElementById("property-table")
          .getElementsByTagName("tbody")[0];
        propertyTable.innerHTML = ""; // Clear the table

        // Iterate over the properties and add rows to the table
        for (const propertyName in properties) {
          const propertyValue = properties[propertyName];

          // Create a new row
          const row = propertyTable.insertRow();
          const cell1 = row.insertCell(0); // Property Name column
          const cell2 = row.insertCell(1); // Value column

          // Set the cell values
          cell1.innerHTML = propertyName;
          cell2.innerHTML = propertyValue;
        }
      });
    });
}
