// ref: http://zeroviscosity.com/d3-js-step-by-step/step-0-intro

// donut chart showing the distribution in winners' gender

var chart_id = "#graph-c",
    width = d3.select(chart_id).node().getBoundingClientRect().width - margin.left - margin.right;

// pie chart elements
var radius = Math.min(width, height) / 2;
var donutWidth = 50;

// legend elements
var legendRectSize = 18,
    legendSpacing = 4;

var genderScale = d3.scale.ordinal()
                    .domain(["male", "female", "org"])
                    .range(["steelblue", "hotpink", "springgreen"]);

var chart_c = d3.select(chart_id)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

var pie = d3.layout.pie()
          .value(function(d) { return d.count; })
          .sort(null);

var tooltip = d3.select(chart_id)            
  .append('div')                             
  .attr('class', 'tooltip');                

tooltip.append('div')                        
  .attr('class', 'label');                   

tooltip.append('div')                        
  .attr('class', 'count');                   

tooltip.append('div')                        
  .attr('class', 'percent');                 


d3.json(statsDataPath, function (error, data) {
    'use strict';
    
    var path = chart_c.selectAll('path')
              .data(pie(data.gender))
              .enter()
              .append('path')
              .attr('d', arc)
              .attr('fill', function (d) { return d3.rgb(genderScale(d.data.label)); });
    
    var legend = chart_c.selectAll('.legend')
                    .data(genderScale.domain())
                    .enter()
                    .append("g")
                    .attr('class', 'legend')
                    .attr('transform', function (d, i) {
                        var height = legendRectSize + legendSpacing;
                        var offset = height * genderScale.domain().length / 2;
                        var horz = -2 * legendRectSize;
                        var vert = i * 1.5 * height - offset;
                        return 'translate(' + horz + ',' + vert + ')';
                    });
    
    legend.append('rect')
        .attr('width', legendRectSize) 
        .attr('height', legendRectSize)  
        .style('fill', genderScale)
        .style('stroke', genderScale);

    legend.append('text')                                     
        .attr('x', legendRectSize + legendSpacing)             
        .attr('y', legendRectSize - legendSpacing)             
        .text(function(d) { return d; });
    
    var total = 910;
    path.on('mouseover', function(d) {
      var percent = Math.round(d.data.count / total * 100);
      tooltip.select('.label').html(d.data.label);
      tooltip.select('.count').html(d.data.count);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'block');
    });
    
    path.on('mouseout', function() {
        tooltip.style('display', 'none');
    });
    
    path.on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY) + 'px')
            .style('left', (d3.event.layerX) + 'px');
    });
});