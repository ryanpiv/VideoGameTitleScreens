$(document).ready(function()
{
  $.getJSON('screens.json', function(data)
  {
    var output ='<div class="hover-cont"><div class="row">';
    var count = 0;
    for(var i in data.games)
    {
      output+= '<div class="col-lg-3"><div class="game-item hover-out" onmouseover="lowerOpacity(this)" onmouseout="raiseOpacity(this)" ';
      output+= 'style="background-image:url(' + data.games[i].game_still_path + ')"';
      output+= ' data-game-title="' + data.games[i].game_title + '"';
      output+= ' data-game-series-name="' + data.games[i].game_series_name + '"';
      output+= ' data-game-series-sequence="' + data.games[i].game_series_sequence + '"';
      output+= ' data-game-path="' + data.games[i].game_video_path + '">';
      output += '</div><div class="game-title hover-in">' + data.games[i].game_formal_name + '</div></div>';

      count+=3;
      if(count >= 12){
        output+='</div><div class="row">';
        count = 0;
      }
    }
    output += "</div>";
    $("#games-row").append(output);
  })
  .done(function(){
    //may need to loop through and add css classes here
    //for dom to detect
    $('.col-lg-3').click(function(){
      var mydata = $(this).children('.game-item');
      var test = mydata.attr('data-game-title');
      var myobj = {
        title: mydata.attr('data-game-title'),
        path: mydata.attr('data-game-path')
      };
      window.open('player.html'+'?'+$.param(myobj), '_blank');
      //window.open(location.href='player.html/'+$.param(myobj));
      //location.href=$.param(myobj);
      //document.location.search += $.param(myobj);
    });
  });


});

function lowerOpacity(elem) {
  //$(elem).css("opacity", "0.5");
  $(elem).addClass('hover-class');
  var title = $(elem).next();
  $(title).css("opacity", "1", "important");
}
function raiseOpacity(elem) {
  $(elem).removeClass('hover-class');
  var title = $(elem).next();
  $(title).css("opacity", "0");
}
//https://jsfiddle.net/ktf6rtwd/3/
