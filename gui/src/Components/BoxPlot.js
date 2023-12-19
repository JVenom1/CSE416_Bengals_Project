import React, { useState, useRef } from "react";
import * as d3 from "d3";
import "../CSS/App.css";
const BoxPlot = ({ boxPlotData, title, _width, _height }) => {
  const width = _width;
  const height = _height - 250;
  const [tooltip, setTooltip] = useState(null);

  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const min = boxPlotData.min;
  const q1 = boxPlotData.q1;
  const median = boxPlotData.median;
  const q3 = boxPlotData.q3;
  const max = boxPlotData.max;

  const yScale = d3.scaleLinear().domain([0, 1]).range([chartHeight, 0]);

  const xScale = d3
    .scaleBand()
    .domain(["boxplot"])
    .range([0, chartWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const handleMouseOver = (event, value, label) => {
    setTooltip({ x: event.clientX, y: event.clientY, value, label });
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };

  return (
    <div>
      <svg width={width} height={height - 9}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* X Axis */}
          <g transform={`translate(0, ${chartHeight})`} ref={useRef()}>
            {xAxis && <g ref={(node) => d3.select(node).call(xAxis)} />}
          </g>

          {/* Y Axis */}
          <g ref={useRef()}>
            {yAxis && <g ref={(node) => d3.select(node).call(yAxis)} />}
          </g>

          {/* Box Plot */}
          <g
            transform={`translate(${xScale("boxplot")}, 0)`}
            onMouseOut={handleMouseOut}
          >
            <line
              x1={xScale.bandwidth() / 2}
              x2={xScale.bandwidth() / 2}
              y1={yScale(min)}
              y2={yScale(max)}
              stroke="black"
              strokeWidth={2}
            />
            <rect
              x={0}
              y={yScale(q3)}
              width={xScale.bandwidth()}
              height={yScale(q1) - yScale(q3)}
              stroke="black"
              fill={"#ead4f5"}
              onMouseOver={(event) => handleMouseOver(event, q1, "Q1")}
            />
            <line
              x1={0}
              x2={xScale.bandwidth()}
              y1={yScale(median)}
              y2={yScale(median)}
              stroke="black"
              strokeWidth={2}
            />
            <rect
              x={0}
              y={yScale(median) - 2}
              width={xScale.bandwidth()}
              height={4}
              fill="black"
            />
            <rect
              x={0}
              y={yScale(min)}
              width={xScale.bandwidth()}
              height={4}
              fill="black"
              onMouseOver={(event) => handleMouseOver(event, min, "Min")}
            />
            <rect
              x={0}
              y={yScale(max) - 4}
              width={xScale.bandwidth()}
              height={4}
              fill="black"
              onMouseOver={(event) => handleMouseOver(event, max, "Max")}
            />
            <rect
              x={0}
              y={yScale(q3) - 2}
              width={xScale.bandwidth()}
              height={4}
              fill="black"
              onMouseOver={(event) => handleMouseOver(event, q3, "Q3")}
            />
          </g>

          {/* Title */}
          <text
            x={width / 2}
            y={chartHeight + margin.top + 10}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
          >
            {title}
          </text>

          {/* Tooltip */}
          {tooltip && (
            <text
              x={tooltip.x}
              y={tooltip.y}
              textAnchor="middle"
              fontSize="12"
              fill="black"
            >{``}</text>
          )}
        </g>
      </svg>{" "}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Min</td>
              <td>{min.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Q1</td>
              <td>{q1.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Median</td>
              <td>{median.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>{q3.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Max</td>
              <td>{max.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoxPlot;
