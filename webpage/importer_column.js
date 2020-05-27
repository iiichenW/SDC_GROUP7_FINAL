  google.charts.load('current', {
      'packages': ['bar']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      $.get("https://raw.githubusercontent.com/iiichenW/SDC_data/master/Chart_importer.csv",
        function (csvString) {
          var arrayData = $.csv.toArrays(csvString, {
            onParseValue: $.csv.hooks.castToScalar
          });

          var data = new google.visualization.arrayToDataTable(arrayData);

          var options = {
            chart: {
              title: 'Importer',
              subtitle: 'Continent: 2012-2018',
            },
            vAxis: {
              format: 'decimal'
            },
            hAxis: {
              format: 'decimal'
            },
            colors: ['#3b0a16', '#a0243c', "#d26d49"]
          };

          var chart = new google.charts.Bar(document.getElementById('Importer'));

          chart.draw(data, google.charts.Bar.convertOptions(options));
        })
    }