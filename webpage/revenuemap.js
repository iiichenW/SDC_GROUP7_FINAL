  var map = new L.map('map', {
      center: new L.LatLng(20, 0),
      zoom: 3,
      'layers': [
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
          'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL'
        })
      ]
    });
    // Initialize the SVG layer
    map._initPathRoot()

    var yearDropdown = d3.select("#year");

    function changeMap() {
      var year = d3.select("#year").property("value");
      //Adding Some Color
      function getColor(d) {
        return d > 50000 ? '#800026' :
          d > 25000 ? '#BD0026' :
          d > 10000 ? '#E31A1C' :
          d > 5000 ? '#FC4E2A' :
          d > 1500 ? '#FD8D3C' :
          d > 500 ? '#FEB24C' :
          d > 100 ? '#FED976' :
          '#fff0b0';
      }

      function style(feature) {
        if (year == "2012") {
          return {
            fillColor: getColor(feature.properties.year2012),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          }
        } else if (year == "2013") {
          return {
            fillColor: getColor(feature.properties.year2013),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          }
        } else if (year == "2014") {
          return {
            fillColor: getColor(feature.properties.year2014),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          }
        } else if (year == "2015") {
          return {
            fillColor: getColor(feature.properties.year2015),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          }
        } else if (year == "2016") {
          return {
            fillColor: getColor(feature.properties.year2016),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          }
        } else if (year == "2017") {
          return {
            fillColor: getColor(feature.properties.year2017),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          }
        } else if (year == "2018") {
          return {
            fillColor: getColor(feature.properties.year2018),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          }
        }
      }

      // Adding Interaction
      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
        info.update(layer.feature.properties);
      }

      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }

      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      }
      var geojson;

      geojson = L.geoJson(countriesData, {
        style: style
      }).addTo(map);;

      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
      }

      geojson = L.geoJson(countriesData, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);
    }

    //Custom Info Control
    var info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    // info.update = function (props) {
    //   this._div.innerHTML = '<h4>Luxury Market Value</h4>' + (props ?
    //     '<b>' + props.ADMIN + '</b><br />' + props.year2012+ ' million dollars' :
    //     'Hover over a state');
    // }

    info.update = function (props) {
      if (d3.select("#year").property("value") == "2012") {
        this._div.innerHTML = '<h4>Luxury Market Value</h4>' + (props ?
          '<b>' + props.ADMIN + '</b><br />' + props.year2012 + ' million dollars' :
          'Hover over a state')
      } else if (d3.select("#year").property("value") == "2013") {
        this._div.innerHTML = '<h4>Luxury Market Value</h4>' + (props ?
          '<b>' + props.ADMIN + '</b><br />' + props.year2013 + ' million dollars' :
          'Hover over a state')
      } else if (d3.select("#year").property("value") == "2014") {
        this._div.innerHTML = '<h4>Luxury Market Value</h4>' + (props ?
          '<b>' + props.ADMIN + '</b><br />' + props.year2014 + ' million dollars' :
          'Hover over a state')
      } else if (d3.select("#year").property("value") == "2015") {
        this._div.innerHTML = '<h4>Luxury Market Value</h4>' + (props ?
          '<b>' + props.ADMIN + '</b><br />' + props.year2015 + ' million dollars' :
          'Hover over a state')
      } else if (d3.select("#year").property("value") == "2016") {
        this._div.innerHTML = '<h4>Luxury Market Value</h4>' + (props ?
          '<b>' + props.ADMIN + '</b><br />' + props.year2016 + ' million dollars' :
          'Hover over a state')
      } else if (d3.select("#year").property("value") == "2017") {
        this._div.innerHTML = '<h4>Luxury Market Value</h4>' + (props ?
          '<b>' + props.ADMIN + '</b><br />' + props.year2017 + ' million dollars' :
          'Hover over a state')
      } else if (d3.select("#year").property("value") == "2018") {
        this._div.innerHTML = '<h4>Luxury Market Value</h4>' + (props ?
          '<b>' + props.ADMIN + '</b><br />' + props.year2012 + ' million dollars' :
          'Hover over a state')
      }
    }



    info.addTo(map);

    changeMap();
    yearDropdown.on("change", changeMap);