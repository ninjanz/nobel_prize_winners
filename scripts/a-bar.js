// based on: https://bl.ocks.org/mbostock/3885304

// scatter plot showing number of prizes and number of laureates

var statsDataPath = "data/nobel-prizes/json/stats-prizes.json",
    chart_id = "#graph-a";

// canvas setup
var margin = {top: 25, right: 25, bottom: 25, left: 35},
    width = d3.select(chart_id).node().getBoundingClientRect().width - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// scales
var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
            .range([height, 0]);

// add svg canvas
var chart_a = d3.select(chart_id)
                .append("svg")
                .style("height", height + margin.top + margin.bottom)
                .style("width", width + margin.left + margin.right)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// axes
var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");
var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

// colour scale
var categoryScale = d3.scale.ordinal()
                    .range(["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#f781bf"]);

// data
d3.json(statsDataPath, function (error, data) {
    'use strict';
    
    var statsData = data.counts;
    var xDomain = [];
    statsData.forEach(function (d) { return xDomain.push(d.Category); });
    
    x.domain(xDomain);
    y.domain([0, 110]);
    
    // colour scale
    categoryScale.domain(xDomain);

    chart_a.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    chart_a.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
    
    chart_a.selectAll(".bar")
        .data(statsData)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.Category); })
        .attr("y", function (d) { return y(d["Number of Prizes"]); })
        .attr("height", function (d) { return height - y(d["Number of Prizes"]); })
        .attr("width", x.rangeBand())
        .attr("fill", function (d) { return d3.rgb(categoryScale(d['Category'])).darker(0.1); })
});