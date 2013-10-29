$(document).ready(function() {
  var h = 100,
       w = $('#year-index').width(),
       margin_bottom = 20,
       t_margin = 2,
       t_size = 12;
       chart = d3.select("#year-index")
                       .append("svg")
                       .attr("class", "chart")
                       .attr("height", h + margin_bottom)
                       .attr("width", "100%")
                       ;

  var y = d3.scale.linear()
                  .domain([0, d3.max(year_data, function(x) { return x[1];})])
                  .range([1, h])
                  ;

  var x = d3.scale.ordinal()
                 .domain(year_data)
                 .rangeBands(
                   [0, $("#year-index").width()],
                   0.2)
                 ;

  var c = d3.scale.category20()
                 .domain(year_data)
                 ;

  chart.selectAll("rect")
         .data(year_data)
         .enter().append("rect")
           .attr("x", x)
           .attr('fill', function(d, i) { return c(i);})
           .attr("y", function(d) { return y(y.domain()[1]) - y(d[1]);})
           .attr("width", x.rangeBand())
           .attr("height", function(d) {return y(d[1]);})
         ;

  chart.selectAll("text")
      .data(year_data)
      .enter().append("text")
        .attr('font-size', t_size)
        .attr('font-weight', 'bold')
        .attr("y", function(d) {
          if (y(d[1]) < (t_size + t_margin)) {
            return y(y.domain()[1]) - y(d[1]) - t_margin;
          } else {
            return y(y.domain()[1]) - y(d[1]) + t_size;
          }
        })
        .attr("fill", function(d, i) {
          if (y(d[1]) < (t_size + t_margin)) {
            return c(i);
          } else {
            return "#fff";
          }
        })
        .attr("x", function(d, i) {return x(d) + (x.rangeBand()/2);})
        .attr('text-anchor', 'middle')
        .text(function(d) { return d[1]; })
      ;

    chart.selectAll(".rule")
            .data(year_data)
            .enter().append("text")
              .attr("class", "rule")
              .attr('font-size', t_size)
              .attr('font-weight', 'bold')
              .attr('fill', '#333')
              .attr("x", function(d, i) {return x(d) + (x.rangeBand()/2);})
              .attr("y", function(d) { return y(y.domain()[1]) + t_size;})
              .attr("dy", t_margin)
              .attr("text-anchor", "middle")
              .text(function (d) { return d[0];})
            ;

});