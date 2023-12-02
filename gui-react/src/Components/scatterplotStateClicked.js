import React, { useRef, useEffect } from "react";
import { Scatter } from "react-chartjs-2";

const ScatterPlot = ({ data, onPointClick }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart before rendering a new one
    if (chartRef.current) {
      chartRef.current.chartInstance.destroy();
    }
  }, [data]);

  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedPoint = data[elements[0].index];
        onPointClick(clickedPoint);
      }
    },
    // Scatter Plot Linear Feature Broken
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
  };

  return (
    <Scatter ref={chartRef} data={{ datasets: [{ data }] }} options={options} />
  );
};

export default ScatterPlot;
