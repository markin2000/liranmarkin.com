if (localStorage.getItem('trendlineData') === null) {
    localStorage.setItem('trendlineData',JSON.stringify([]));
}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  var arr = [['x','y']];
  var sums = {
    xy: 0,
    sigmax: 0,
    sigmay: 0,
    sigmax2: 0,
    l: 0
  };
  var item = JSON.parse(localStorage.getItem('trendlineData'));
  $.each(item,function(index,value){
    arr.push(value);
    sums.xy += value[0]*value[1];
    sums.sigmax += value[0];
    sums.sigmay += value[1];
    sums.sigmax2 += value[0]*value[0];
    sums.l++;
  });
  var data = google.visualization.arrayToDataTable(arr);

  var options = {
    height: 500,
    legend: 'none',
    trendlines: {
      0: {
        color: 'purple',
        lineWidth: 1,
        type: 'linear'
      }
    }
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

  
  var a = (sums.l*sums.xy-sums.sigmax*sums.sigmay)/(sums.l*sums.sigmax2-(sums.sigmax*sums.sigmax));
  var b = (sums.sigmax2*sums.sigmay-sums.sigmax*sums.xy)/(sums.l*sums.sigmax2-(sums.sigmax*sums.sigmax));
  chart.draw(data, options);
  $('#equation').html("y = "+a.toFixed(3)+"x + "+b.toFixed(3));
}