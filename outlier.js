// Define the data for the scatterplot
const data = [
  [1, 1, 174],
  [1, 2, 383],
  [1, 3, 824],
  [1, 6, 63],
  [1, 14, 381],
  [2, 1, 322],
  [2, 2, 421],
  [2, 3, 302],
  [2, 31, 322],
  [3, 1, 284],
  [3, 2, 668],
  [3, 3, 757],
  [4, 1, 579],
  [4, 2, 228]
];
// Set up the dimensions and margins of the plot
const margin = {top: 20, right: 20, bottom: 70, left: 70},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

// Create the SVG element and set its dimensions
const svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the scales for the x and y axes
const x = d3.scaleLinear()
  .domain([0, d3.max(data, d => d[0])])
  .range([0, width]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d[1])])
  .range([height, 0]);

// Define a random color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Add the x and y axes to the plot
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g")
  .call(d3.axisLeft(y));

// Add the bubbles to the plot
svg.selectAll("bubble")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", d => x(d[0]))
    .attr("cy", d => y(d[1]))
    .attr("r", 4)
    .style("fill", d => color(Math.random()))
    .on("mouseover", function(d) {
      d3.select(this).attr("r", 20).style("fill", d => color(Math.random()));
    })
    .on("mouseout", function(d) {
      d3.select(this).attr("r", 4).style("fill", d => color(Math.random()));
    });
