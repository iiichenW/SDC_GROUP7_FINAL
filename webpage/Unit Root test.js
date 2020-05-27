Highcharts.setOptions({
  colors: ['#428F89','#97282C'],
  fontFamily:'Arial'
});
Highcharts.chart('Unit Root Test', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'The Result of Unit Root Test'
    },
    xAxis: {
        categories: ['lnRevenue','ln Income Index','ln Urban population','ln Corruption Perception Score','ln Education Index','ln International Arrivals']
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Augmented Dickey-Fuller Test',
        data: [600.3792, 675.8385, 1525.7799, 463.6528, 1525.6431, 729.5241]
    }, {
        name: 'Levin-Lin-Chu Test',
        data: [-53.706, -9.938, -9.405, -24.301, -31.275, -37.800]
    }]
});