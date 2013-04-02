$(document).ready(function() {
  var $back_image = $('#back'),
      total_height = $back_image.height(),
      total_width = $back_image.width();

  var xScale = d3.scale.linear().domain([0, data.x_max]).range([0, total_width]),
      yScale = d3.scale.linear().domain([0, data.y_max]).range([0, total_height]);

  window.scales = [xScale, yScale];

  var svg = d3.select("#vis").append("svg")
            .attr("width", total_width)
            .attr("height", total_height);

  var face_over = function(d, i) {

      d3.selectAll('g.thumb').remove();

      var xRange = xScale.range(),
          yRange = yScale.range(),
          xpos = xScale(d.locations.x) - d.locations.w/2,
          ypos =  yScale(d.locations.y) - d.locations.h/2,
          thumb_group = d3.select('#vis svg')
            .append('g')
            .attr('class', 'thumb');


      // make sure thumbnail is within the visualisation limits
      if (xpos + d.locations.w > xRange[1]) {
        xpos = xRange[1] - d.locations.w;
      }

      if (xpos < 0) {
        xpos = 0;
      }

      if (ypos + d.locations.h > yRange[1]) {
        ypos = yRange[1] - d.locations.h;
      }

      if (ypos < 0) {
        ypos = 0;
      }


      thumb_group.append('rect')
          .attr("x", xpos)
          .attr("y", ypos)
          .attr("height", d.locations.h)
          .attr('width', d.locations.w);

      thumb_group.append("image")
          .attr("xlink:href", "/static/data/"+ data.group_image + "/" + d.name + "_face.jpeg")
          .attr("x", xpos)
          .attr("y", ypos)
          .attr("height", d.locations.h)
          .attr('width', d.locations.w)
          .on('mouseover', function(nd, ni) {
            cancel_face_out(d, i);
          }, true)
          .on('mouseout', function(nd, ni) {
            face_out(d, i);
          }, true)
          .on('click', function(nd, ni) {
            // go to portrait page, using data from original face tile
            go_to_face(d, i);
          });

    },
    cancel_face_out = function (d, i) {
      if(d.timer) {
        window.clearTimeout(d.timer);
      }
    },
    face_out = function (d, i) {
      cancel_face_out(d, i);
      var timer = window.setTimeout(function() {
        clear_thumb(d, i);
        d.timer = undefined;
        return true;
      }, 1000);
      d.timer = timer;
    },
    clear_thumb = function(d, i) {
      d3.selectAll('g.thumb').remove();
    },
    go_to_face = function(d, i) {
      window.location = "/groups/" +  data.group_image + "/" + d.name + ".html";
    };

  var faces = svg.selectAll('rect')
        .data(data.face_locations)
        .enter().append('rect')
          .attr("x", function(d) { return xScale(d.locations.x); })
          .attr("y", function(d) { return yScale(d.locations.y); })
          .attr("width", function(d) { return xScale(d.locations.w); })
          .attr("height", function(d) { return yScale(d.locations.h); })
          .attr('class', 'face')
        .on('mouseover', face_over, true)
        .on('mouseout', face_out, true)
        .on('click', go_to_face, true);
});