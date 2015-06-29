(function(window, document, d3, Tweener) {

  var width = 800,
    height = 450;

  var data = [3754, 5288, 4792, 5961, 5244, 9016, 12193, 11994, 11034, 12332, 14638, 14986, 21977, 25944, 32139];

  var x = d3.scale.linear()
    .range([0, width])
    .domain([0, data.length - 1]);

  var y = d3.scale.linear()
    .range([0, height])
    .domain([data[data.length - 1], 0]);

  var line = d3.svg.line()
      .x(function(d, index) { return x(index) })
      .y(function(d) { return y(d) });

  var svg = d3.select('#container').append('svg')
    .attr('id', 'chart')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);


  document.getElementById('start-button').addEventListener('click', function() {
    var chart = document.getElementById('chart');
    chart.style.visibility = 'visible';
    var svgLine = document.querySelector('.line');
    var cashLabel = document.getElementById('label');
    var totalLength = svgLine.getTotalLength();
    var tweenData = { dashOffset: totalLength, dataIndex: 0 };

    Tweener.addTween(tweenData, { 
      dashOffset: 0, 
      dataIndex: data.length - 1,
      onUpdate: function() {
        svgLine.style.strokeDasharray = totalLength;
        svgLine.style.strokeDashoffset = tweenData.dashOffset;
        var floored = Math.floor(tweenData.dataIndex);
        var rest = tweenData.dataIndex - floored;
        var interpolated = data[floored] * (1 - rest) + data[Math.min(data.length - 1, floored + 1)] * rest;
        cashLabel.innerHTML = Math.round(interpolated) + ' kr';

      },
      time: 10,
      transition: 'linear'
    });
  });

})(window, document, window.d3, window.Tweener);
