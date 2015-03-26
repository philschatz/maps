var map = d3.select('.js-map'),
    width = 800,
    height = 800

var path = d3.geo.path()
  .projection(null)

var svg = map.append('svg')
  .attr('width', width)
  .attr('height', height)

region = prompt("Which region? n ne nw central sw far-ne far-se", 'all');
d3.json("data/" + region + ".json", function(err, pdx) {
// Hardcoded bg median income extents from the entire Portland area
var extent = [1368.33492, 207549.87568],
    extentr = [1302.11322, 145312.92241]

window.MAX = 0;
window.MIN = 0;

var color = d3.scale.linear()
  .domain(extent)
  // .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
  .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
  .interpolate(d3.interpolateCubehelix)

  svg.selectAll('.blockgroups')
    .data(topojson.feature(pdx, pdx.objects.blockgroups).features)
  .enter().append('path')
    .attr('class', 'blockgroups')
    .attr('d', path)
    .style('fill', function(d) {
      //return color(d.properties.bmio)
      var c = Math.round((d.properties.bmio - extent[0]) / (extent[1] - extent[0]) * 8) * 2;
      window.MAX = Math.max(window.MAX, d.properties.commuteDistance);
      window.MIN = Math.min(window.MIN, d.properties.commuteDistance);
      // var c = Math.round(d.properties.renters * 8) * 2;
      // var c = Math.round(d.properties.density * 16);
      // var c = Math.round(d.properties.commuteDistance / 13.54 * 16);
      c = '' + c.toString(16);
      return '#' + c + c + c + c + c + c;
    })

  svg.append('path')
    .datum(topojson.feature(pdx, pdx.objects.parks))
    .attr('class', 'parks')
    .attr('d', path)

  svg.append('path')
    .datum(topojson.feature(pdx, pdx.objects.rivers))
    .attr('class', 'rivers')
    .attr('d', path)

  svg.append('path')
    .datum(topojson.feature(pdx, pdx.objects.streets))
    .attr('class', 'streets')
    .attr('d', path)

  svg.append('path')
    .datum(topojson.feature(pdx, pdx.objects.buildings))
    .attr('class', 'buildings')
    .attr('d', path)

  svg.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(500, 585) rotate(-28.5)')
    .text('Sandy Boulevard')
})
