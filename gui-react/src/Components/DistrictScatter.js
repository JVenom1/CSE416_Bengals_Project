import "../App.css";
import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import api from "../api/posts.js"

const DistrictScatter = ({
    _stateID,
    _ensembleIndex,
    _clusterIndex,
    _width,
    _height,
    _coords,
    _setDistrictPlan1,
    _setDistrictPlan2,
    _districtPlans,
    _buttonIndex,
}) => {
    var districtIndex = null;
    const [districtPlan, setDistrictPlan] = useState(null);
    // api.get(`/${stateID}/${ensembleIndex}/${clusterIndex}/${districtIndex}`)

    const stateID = _stateID;
    const ensembleIndex = _ensembleIndex;
    const clusterIndex = _clusterIndex;
    const districtPlans = _districtPlans;
    const margin = { top: 40, right: 30, bottom: 250, left: 50 };
    const coords = _coords;
    const setDistrictPlan1 = _setDistrictPlan1;
    const setDistrictPlan2 = _setDistrictPlan2;
    const buttonIndex = _buttonIndex;
    const width = _width - margin.left - margin.right;
    const height = _height - margin.top - margin.bottom;
    const mainTitle = "District Scatter";
    const xAxTitle = "Measure 1";
    const yAxTitle = "Measure 2";
    const svgRef = useRef();
    // Use useEffect to handle side effects when the component mounts



    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(coords.x)])
            .range([margin.left, width + margin.left]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(coords.y)])
            .range([height + margin.top, margin.top]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Add X Axis
        svg
            .append('g')
            .attr('transform', `translate(0, ${height + margin.top})`)
            .call(xAxis);

        // Add Y Axis
        svg
            .append('g')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(yAxis);

        // Add Title
        svg
            .append('text')
            .attr('x', width / 2 + margin.left)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '1.5em')
            .text(mainTitle);

        // Add X Axis Label
        svg
            .append('text')
            .attr('x', width / 2 + margin.left)
            .attr('y', height + margin.top + margin.bottom - 200)
            .attr('text-anchor', 'middle')
            .style('dy', '1.5em')  // Adjust the vertical offset as needed
            .text(xAxTitle);


        // Add Y Axis Label
        svg
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2 + margin.top - 70)
            .attr('y', margin.left - 30)
            .attr('text-anchor', 'middle')
            .text(yAxTitle);

        // Add Circles
        svg
            .selectAll('circle')
            .data(coords.x)
            .enter()
            .append('circle')
            .attr('cx', (d) => xScale(d))
            .attr('cy', (d, i) => yScale(coords.y[i]))
            .attr('r', () => 5)
            .attr('available', (d, i) => coords.available[i])
            .attr('district-index', (d, i) => i)
            .on("mouseover", function () {
                // Change cursor to pointer on hover
                d3.select(this).style('cursor', 'pointer');
            })
            .on("mouseout", function () {
                // Reset cursor on mouseout
                d3.select(this).style('cursor', 'default');
            })
            .on("click", (event) => handleScatterPlotClick(event))
            .style('fill', (d, i) => (coords.available[i] ? 'green' : 'grey'));

    }, [width, height, margin, xAxTitle, yAxTitle, mainTitle]);
    const handleScatterPlotClick = (e) => {
        if (e.target.getAttribute('available')) {
            districtIndex = e.target.getAttribute('district-index');
            if (buttonIndex === 1) {
                // setDistrictPlan1()
                alert("button1");
            }
            else if (buttonIndex === 2) {
                // setDistrictPlan2();
                alert("button2");
            }
            else {
                alert("Please Select A Button");
            }
        }
    }
    return <>
        <svg ref={svgRef} width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}></svg>
    </>
}


export default DistrictScatter;