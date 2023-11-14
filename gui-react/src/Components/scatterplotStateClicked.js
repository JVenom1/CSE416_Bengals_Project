import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

// Notes -- Setup Scatter for data
// given data of ensembles 
// run some calculation to determine similiarness between plans
// to form clusters
// on said clusters add onClick={handleClusterClick}
// --- handleClusterClick will bring to new page:
//     "/state/clusterAnalysis" shows ClusterAnalysis.js
//     

const ScatterPlot = () => {
  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const history = useHistory();
  const processData = () => {
    return []
  }
  useEffect(() => {
    // Fetch and analyze your data (replace this with your actual data processing logic)
    const processedData = processData(); // Implement processData function

    // Use processedData to create a dynamic scatter plot
    const dynamicChartData = createDynamicChartData(processedData);
    setChartData(dynamicChartData);
  }, []);

  const createDynamicChartData = (processedData) => {
    // Implement logic to create dynamic chart data based on processedData
    // Might need to iterate over clusters and their points
    // and create annotations for each point with an onClick event
    const options = {
      chart: {
        id: 'scatter',
        animations: {
          enabled: false,
        },
      },
      xaxis: {
        type: 'numeric',
      },
      yaxis: {
        type: 'numeric',
      },
      tooltip: {
        enabled: false,
      },
      annotations: {
        points: processedData.map((point) => ({
          x: point.x,
          y: point.y,
          marker: {
            size: 8,
            fillColor: point.clusterColor,
            onClick: () => handleClusterClick(point.clusterId),
          },
        })),
      },
    };

    const series = [
      {
        name: 'Scatter Plot',
        data: processedData.map((point) => ({ x: point.x, y: point.y })),
      },
    ];

    return { options, series };
  };

  const handleClusterClick = (clusterId) => {
    // Handle the click event, e.g., navigate to "/state/clusterAnalysis"
    history.push(`/state/clusterAnalysis?clusterId=${clusterId}`);
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="scatter"
        height={350}
      />
    </div>
  );
};

export default ScatterPlot;
