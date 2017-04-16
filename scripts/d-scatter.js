var prizesPath = "data/nobel-prizes/json/newData.json",
    chart_id = "#graph-d",
    margin = {top: 10, right: 25, bottom: 10, left: 40},
    heightD = 200 - margin.top - margin.bottom,
    width = d3.select(chart_id).node().getBoundingClientRect().width - margin.left - margin.right;

// scales
var xScatter = d3.scale.linear().range([margin.left, width]),
    yScatter = d3.scale.linear().range([heightD, 0]);

// scale the range of the data
xScatter.domain([1901, 2016]);
yScatter.domain([10, 100]);

// axes
var xAxisScatter = d3.svg.axis().scale(xScatter)
            .orient("bottom");
var yAxisScatter = d3.svg.axis().scale(yScatter)
            .orient("left");


d3.json(prizesPath, function (error, data) {
    'use strict';
    
    var cats = [];
    for (var cat in data) {
        if (data.hasOwnProperty(cat)) {
            cats.push(cat);
            d3.select(chart_id)
                .append("svg")
                .attr("id", cat)
                .style("width", width + margin.left + margin.right)
                .style("height", heightD + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }
    }
    
    for (var cat = 0; cat<cats.length; cat++) {
        var curr_chart = d3.select('#' + cats[cat]);
        
        for (var i = 0; i < data[cats[cat]].length; i++) {
            for (var j = 0; j < data[cats[cat]][i]['laureates'].length; j++) { 
                
                 curr_chart.append("circle")
                        .attr("r", 2.5)       
                        .attr("cx", function (d) { return xScatter(parseInt(data[cats[cat]][i]['year'])) ; })
                        .attr("cy", function (d) { return yScatter(data[cats[cat]][i]['laureates'][j]['age']); })
                        .attr("fill", categoryScale(cats[cat]));
                
                if (data[cats[cat]][i]['laureates'][j]['gender'] == 'female') {
                    curr_chart.append("circle")
                            .attr("r", 3.5)       
                            .attr("cx", function (d) { return xScatter(parseInt(data[cats[cat]][i]['year'])) ; })
                            .attr("cy", function (d) { return yScatter(data[cats[cat]][i]['laureates'][j]['age']); })
                            .style("stroke", d3.rgb("orange"))
                            .style("stroke-width", 2)
                            .attr("fill", "none");
                }
             }
        }
                        
        // add the X Axis
        curr_chart.select("g")
            .attr("transform", "translate(0," + heightD + ")")
            .call(xAxisScatter);

        // add the Y Axis
        curr_chart.append("g")
            .attr("transform", "translate(" + margin.right + ",0)")
            .call(yAxisScatter);
    }
    
});