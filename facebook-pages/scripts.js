var width = 110,
    height = 110,
    radius = 55;

var color = d3.scale.ordinal()
    .range(["#39b54a", "#fbb03b", "#ed1c24"]);

var arc = d3.svg.arc()
    .outerRadius(30)
    .innerRadius(45);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.people; });

var svg = d3.select("#sentiment").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("data.csv", function(error, data) {

  data.forEach(function(d) {
    d.people = +d.people;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.sentiment); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle");

});