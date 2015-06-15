$(document).ready(function()
{
  $.getJSON('screens.json', function(data)
  {
    var output ='<div class="hover-cont">';
    for(var i in data.games)
    {
      output+= '<div class="game-item hover-out" onmouseover="lowerOpacity(this)" onmouseout="raiseOpacity(this)" ';
      output+= 'style="background-image:url(' + data.games[i].game_still_path + ')"';
      output+= ' data-game-title="' + data.games[i].game_title + '"';
      output+= ' data-game-series-name="' + data.games[i].game_series_name + '"';
      output+= ' data-game-series-sequence="' + data.games[i].game_series_sequence + '"';
      output+= ' data-game-path="' + data.games[i].game_video_path + '"></div>';
      output += '<div class="game-title hover-in">' + data.games[i].game_formal_name + '</div>';
      /*if(output.length % 12 == 0) {
        //force new row
        output+= '</div><div class="row games-row">';
      }*/
    }
    /*if(output.length > 12){
      //complete last added row
      output+= '</div>';
    }*/
    output += "</div>";
    $("#games-row").append(output);
  })
  .done(function(){
    //may need to loop through and add css classes here
    //for dom to detect
  });
});

function lowerOpacity(elem) {
  //$(elem).css("opacity", "0.5");
  $(elem).addClass('hover-class');
  var title = $(elem).next();
  $(title).css("opacity", "1");
}
function raiseOpacity(elem) {
  $(elem).removeClass('hover-class');
  var title = $(elem).next();
  $(title).css("opacity", "0");
}
//https://jsfiddle.net/ktf6rtwd/3/
