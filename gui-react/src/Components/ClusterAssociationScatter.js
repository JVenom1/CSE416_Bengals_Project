import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ClusterAssociationScatter = ({
    currentState,
    clusterScatterWidth,
    clusterScatterHeight,
}) => {
    const margin = { top: 40, right: 30, bottom: 250, left: 80 };
    const width = clusterScatterWidth - margin.left - margin.right;
    const height = clusterScatterHeight - margin.top - margin.bottom;
    const mainTitle = "Ensemble vs Cluster";
    const xAxTitle = "Ensemble Size";
    const yAxTitle = "Cluster Count";
    const svgRef = useRef();

    const getCoordinates = (state) => {
        let coords = { x: [], y: [] };
        for (let i = 0; i < state.length; i++) {
            coords.x.push(state[i].ensemblesize);
            coords.y.push(state[i].clustercount);
        }
        return coords;
    };

    useEffect(() => {
        const coords = getCoordinates(currentState);
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
            .attr('x', -height / 2 - margin.top)
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
            .attr('r', 5)
            .style('fill', 'blue');
    }, [currentState, width, height, margin, xAxTitle, yAxTitle, mainTitle]);

    return <svg ref={svgRef} viewBox={`0 0 ${clusterScatterWidth} ${clusterScatterHeight}`}></svg>;
};

export default ClusterAssociationScatter;

