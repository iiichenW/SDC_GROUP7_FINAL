var map = new L.map('map', {
      center: new L.LatLng(20, 0),
      zoom: 3,
      'layers': [
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
          'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL'
        })
      ]
    });
    var yearDropdown = d3.select("#year");
    // Initialize the SVG layer
    map._initPathRoot();
    // Setup svg element to work with
    var svg = d3.select("#map").select("svg"),
      linklayer = svg.append("g"),
      nodelayer = svg.append("g");
    // Load data and set function of map visualizing
    function changeMap() {
      var year = d3.select("#year").property("value");
      var url = `https://raw.githubusercontent.com/iiichenW/SDC_data/master/data${year}_relation.csv`
      d3.json(
        "https://gist.githubusercontent.com/yellowcap/03cd4a6c72f661377f7e/raw/c146f7d256a1d070d63e346d61164f284f8fa73a/nodes.geojson",
        function (nodes) {
          d3.csv(url, function (links) {
            // Setup spatialsankey object
            var spatialsankey = d3.spatialsankey()
              .lmap(map)
              .nodes(nodes.features)
              .links(links);

            // create a tooltip
            var Tooltip = d3.select("#map")
              .append("div")
              .style("position", "absolute")
              .attr("class", "tooltip")
              .style("background-color", "white")
              .style("border", "solid")
              .style("border-width", "2px")
              .style("border-radius", "5px")
              .style("padding", "5px")

            var mouseover = function (d) {
              Tooltip
                .style("opacity", 1)
              d3.select(this)
                .style("stroke", "white")
                .style("fill", "green")
                .style("opacity", 1)

              // Get link data for this node
              var nodelinks = spatialsankey.links().filter(function (link) {
                return link.source == d.id;
              });
              var nodetargets = spatialsankey.links().filter(function (link) {
                return link.target == d.id;
              });

              // Add data to link layer
              var beziers = linklayer.selectAll("path").data(nodelinks);
              link = spatialsankey.link(options);

              // Draw new links
              beziers.enter()
                .append("path")
                .attr("d", link)
                .attr('id', function (d) {
                  return d.id
                })
                .style("stroke-width", spatialsankey.link().width());

              // Remove old links
              beziers.exit().remove();

              // Hide inactive nodes
              var circleUnderMouse = this;
              circs.transition().style('opacity', function () {
                return (this === circleUnderMouse) ? 0.5 : 0;

              });
              // circs.transition().style('opacity', function () {
              //   return (nodetargets) ? 0.7 : 0.1;
              // });

            };
            var mousemove = function (d) {
              Tooltip
                .html(d.id)
                .style("left", (d3.mouse(this)[0] + 70) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
            }

            var mouseout = function (d) {
              Tooltip
                .style("opacity", 0)
              d3.select(this)
                .style("stroke", "none")
                .style("fill", node.fill)
                .style("opacity", 0.5)
              // Remove links
              linklayer.selectAll("path").remove();
              // Show all nodes
              circs.transition().style('opacity', 0.5);
            };

            // Draw nodes
            // Add a scale for bubble size
            var z = d3.scale.linear()
              .domain([1, 10])
              .range([1, 10]);

            var node = spatialsankey.node()

            var myColor = d3.scale.linear()
              .range(["blue", "red"])
              .domain([-10000, 10000])

            var circs = nodelayer.selectAll("circle")
              .data(spatialsankey.nodes())
              .enter()
              .append("circle")
              .attr("cx", node.cx)
              .attr("cy", node.cy)
              .attr("r", node.r)
              //.style("fill",  function(d) { return myColor(d.fill)})
              .style("fill", node.fill)
              .attr("opacity", 0.5)
              .on('mouseover', mouseover)
              .on("mousemove", mousemove)
              .on('mouseout', mouseout);

            // Adopt size of drawn objects after leaflet zoom reset
            var zoomend = function () {
              linklayer.selectAll("path").attr("d", spatialsankey.link());

              circs.attr("cx", node.cx)
                .attr("cy", node.cy);
            };

            map.on("zoomend", zoomend);
          });
        });


      var options = {
        'use_arcs': true,
        'flip': true
      };
      // d3.selectAll("input").forEach(function (x) {
      //   options[x.name] = parseFloat(x.value);
      // })

      d3.selectAll("input").on("click", function () {
        options[this.name] = parseFloat(this.value);
      });
    }
    changeMap();
    yearDropdown.on("change", changeMap);