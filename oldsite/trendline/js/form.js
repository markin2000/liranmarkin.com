var rows;
var notValid = 'The parameters are not valid';
var fewParameters = 'Please write at least 2 points';

function addRow(xvalue, yvalue){
  var row = '<div id="row'+(rows++)+'" class="row ui grid">'+
    '<div class="eight wide column ui input"><input class="xval" type="text" placeholder="Empty" value="'+xvalue+'"></div>'+
    '<div class="eight wide column ui input"><input class="yval" type="text" placeholder="Empty" value="'+yvalue+'"></div>'+
  '</div>';

  $('#content').append(row);
}

$('#add').on('click',function(){
  addRow("","");
});

var start = function(){
  $('.row').remove();
  rows = 0;
  //$('#error_msg').hide();
  if (localStorage.getItem('trendlineData') === null) {
    localStorage.setItem('trendlineData',JSON.stringify([]));
  }
  var points = JSON.parse(localStorage.getItem('trendlineData'));
  $.each(points,function(index,data){
    addRow(data[0],data[1]);
  });
  addRow("","");
}

$('body').ready(function(){
  start();
  console.log("ready");
});

$('#clear').on('click',function(){
  $('.xval,.yval').val("");
  localStorage.setItem('trendlineData',JSON.stringify([]));
  start();
});

var validateForm = function(){
  var ret = true;
  $('#error_msg').html("");
  $('.row').each(function(){
    $(this).children().removeClass('error');
    var xval = $(this).find('.xval');
    var yval = $(this).find('.yval');
    if(!$.isNumeric(xval.val()) && $.isNumeric(yval.val())){
      xval.parent().addClass('error');
      ret = false;
    }
    else if($.isNumeric(xval.val()) && !$.isNumeric(yval.val())){
      yval.parent().addClass('error');
      ret = false;
    }
    else if(!$.isNumeric(xval.val()) && !$.isNumeric(yval.val()) && (xval.val() != "" || yval.val() != "")){
      $(this).children().addClass('error');
      ret = false;
    }
  });
  if(!ret){
    $('#error_msg').html(notValid);
  }
  return ret;
}

$('#send').on('click',function(){
  console.log(validateForm());
  if(validateForm()){
    var points = [];
    $('.row').each(function(){
      var xval = $(this).find('.xval');
      var yval = $(this).find('.yval');
      if($.isNumeric(xval.val()) && $.isNumeric(yval.val())){
        points.push([Number(xval.val()),Number(yval.val())]);
      }
    });
    if(points.length < 2){
      $('#error_msg').html(fewParameters);
      return;
    }
    localStorage.setItem('trendlineData',JSON.stringify(points));
    window.location = './graph.html';
  }
});
