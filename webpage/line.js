google.charts.load('current', {
      'packages': ['line']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      $.get("https://raw.githubusercontent.com/iiichenW/SDC_data/master/Line_source.csv",
        function (csvString) {
          var arrayData = $.csv.toArrays(csvString, {
            onParseValue: $.csv.hooks.castToScalar
          });

          var data = new google.visualization.arrayToDataTable(arrayData);

          var options = {
            chart: {
              title: 'Source',
              subtitle: '2012-2018',
            },
            vAxis: {
              format: 'decimal'
            },
            hAxis: {
              format: 'decimal'
            },
            colors: ['#3b0a16', '#a0243c', "#d26d49"]
          };

          var chart = new google.charts.Line(document.getElementById('line'));

          chart.draw(data, google.charts.Line.convertOptions(options));
        })
    }