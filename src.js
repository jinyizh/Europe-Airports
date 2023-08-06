(async () => {
    console.log("hello world!")

    var svg = d3.select("#map").append("svg")
                                .attr("preserveAspectRatio", "xMinYMin meet")
                                .attr("viewBox", "0 0 960 760");

    width = +svg.attr("width"),
    height = +svg.attr("height");

    // location tested on https://www.d3indepth.com/geographic/
    var projection = d3.geoMercator()
                       .center([-25, 73.35])
                       .scale(585)
                       .translate([width / 2, height / 2])



    d3.queue()
	  .defer(d3.json, 'https://raw.githubusercontent.com/amcharts/amcharts4/master/dist/geodata/es2015/json/region/world/europeUltra.json')
	  .defer(d3.json, 'airport_data.geojson')
	  .await(plot);

    function plot(error, europe, airports) {
        if (error) throw error;

        map_data = europe.features.filter(
            function(d) {
                return d.properties;
            }
        )

        airport_data = airports.features.filter(
            function(d) {
                return d.properties;
            }
        )

        // tooltip showing country names
        let tooltip_div = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px');

        // tooltip showing airport names
        let tooltip_site = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('visibility', 'hidden')
        .style('background-color', 'lightblue')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('padding', '5px');

        // draw Europe map
        svg.append("g")
           .selectAll("path")
           .data(map_data)
           .enter()
           .append("path")
           .attr("d", d3.geoPath().projection(projection))
           .on('mouseover', function() {
            tooltip_div.style('visibility', 'visible');
            tooltip_div.style('opacity', 0.8);
           })
           .on('mousemove', function(d) {
            tooltip_div
              .style('top', d3.event.pageY - 10 + 'px')
              .style('left', d3.event.pageX + 10 + 'px')
              .text(`${d.properties.name}`);
              console.log("d.properties.name")
           })
           .on('mouseout', function() {
            d3.select(this).attr('stroke-width', 1);
            tooltip_div.style('visibility', 'hidden');
           })

        // draw airports
        svg.selectAll("circle")
        .data(airport_data) // csv worked bad
        .enter()
        .append("circle")
        .attr("cx", function(d) { 
            return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0]
        })
        .attr("cy", function(d) { 
        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1]
        })
        .attr("r", 1.5)
        .on('mouseover', function() {
            d3.select(this).attr('r', 3);
            tooltip_site.style('visibility', 'visible');
           })
           .on('mousemove', function(d) {
            tooltip_site
              .style('top', d3.event.pageY - 10 + 'px')
              .style('left', d3.event.pageX + 10 + 'px')
              .text(d.properties.name);
           })
           .on('mouseout', function() {
            d3.select(this).attr('r', 1.5);
            tooltip_site.style('visibility', 'hidden');
           })
    }
})();