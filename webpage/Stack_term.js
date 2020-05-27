    google.charts.load('current', {
      'packages': ['Bar']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      $.get("https://raw.githubusercontent.com/iiichenW/SDC_data/master/Stack_term.csv",
        function (csvString) {
          var arrayData = $.csv.toArrays(csvString, {
            onParseValue: $.csv.hooks.castToScalar
          });

          var data = new google.visualization.arrayToDataTable(arrayData);

          var options = {
            chart: {
              title: 'Term',
              subtitle: '2012-2018',
            },
            vAxis: {
              format: 'decimal'
            },
            hAxis: {
              format: 'decimal'
            },
            colors: [ '#a0243c'],
            bars: 'horizontal',
            isStacked: true

          };

          var chart = new google.charts.Bar(document.getElementById('Stack_term'));

          chart.draw(data, google.charts.Bar.convertOptions(options));
        })
    }