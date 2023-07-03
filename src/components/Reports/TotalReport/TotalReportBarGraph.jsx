import React, { useEffect } from 'react';
import * as d3 from 'd3/dist/d3.min';
import './TotalReportBarGraph.css';

const TotalReportBarGraph = props => {
  const svg_id = 'svg-container-' + props.range;

  const drawChart = data => {
    data.sort((a, b) => (a.label > b.label ? 1 : -1));
    const maxValue = Number(data.reduce((p, c) => (p.value - c.value > 0 ? p : c)).value);
    const margin = { top: 10, right: 8, bottom: 15, left: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select('#' + svg_id);
    svg.selectAll('*').remove();
    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(s => s.label))
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, maxValue]);

    var colorScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range(['darksalmon', 'darkslateblue']);

    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    const barGroups = chart
      .selectAll()
      .data(data)
      .enter()
      .append('g');

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', g => xScale(g.label))
      .attr('y', g => yScale(g.value))
      .attr('height', g => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .attr('fill', g => colorScale(g.value))
      .on('mouseenter', function(actual, i) {
        d3.selectAll('.value').attr('opacity', 0);
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6);
        barGroups
          .append('text')
          .attr('class', 'value')
          .attr('x', a => xScale(a.label) + xScale.bandwidth() / 2)
          .attr('y', a => yScale(a.value) + 30)
          .attr('text-anchor', 'middle')
          .text(a => `${a.value}`)
          .style('fill', 'black');
      })
      .on('mouseleave', function() {
        d3.selectAll('.value').attr('opacity', 1);
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1);
        chart.selectAll('.value').remove();
      });
  };

  useEffect(() => {
    if (props.barData.length > 0) {
      drawChart(props.barData);
    }
  }, [props.barData]);

  return (
    <div className="svg-container">
      <svg id={svg_id} className="svg-chart"></svg>
    </div>
  );
};

export default TotalReportBarGraph;
