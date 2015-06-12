$(document).ready(function(){
  $.getJSON('screens.json', function(data) {
    var output ='';
    for(var i in data.games){
      output+= '<div class="col-lg-1 game-item" ';
      output+= 'style="background-image:url(' + data.games[i].game_still_path + ')"';
      output+= ' data-game-title="' + data.games[i].game_title + '"';
      output+= ' data-game-series-name="' + data.games[i].game_series_name + '"';
      output+= ' data-game-series-sequence="' + data.games[i].game_series_sequence + '"';
      output+= ' data-game-path="' + data.games[i].game_video_path + '"></div>';
      output+= '</div>';
      /*if(output.length % 12 == 0) {
        //force new row
        output+= '</div><div class="row games-row">';
      }*/
    }
    /*if(output.length > 12){
      //complete last added row
      output+= '</div>';
    }*/
    $("#games-row").append(output);
  });
});
//https://jsfiddle.net/ktf6rtwd/3/
