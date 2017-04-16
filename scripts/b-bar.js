// scatter plot showing number of prizes and number of laureates

var chart_id = "#graph-b";

// add svg canvas
var chart_b = d3.select(chart_id)
                .append("svg")
                .style("height", height + margin.top + margin.bottom)
                .style("width", width + margin.left + margin.right)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// data
d3.json(statsDataPath, function (error, data) {
    'use strict';

    var statsData = data.counts;
    var xDomain = [];
    statsData.forEach(function (d) { return xDomain.push(d.Category); });
    
    x.domain(xDomain);
    y.domain([0, 211]);
    
    chart_b.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    chart_b.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
    
    chart_b.selectAll(".bar")
        .data(statsData)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.Category); })
        .attr("y", function (d) { return y(d["Number of Laureates"]); })
        .attr("height", function (d) { return height - y(d["Number of Laureates"]); })
        .attr("width", x.rangeBand())
        .attr("fill", function (d) { return d3.rgb(categoryScale(d["Category"])).darker(0.1); })
});