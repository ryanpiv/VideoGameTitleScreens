$(document).ready(function(){
  $.getJSON('screens.json', function(data) {
    var output ='';
    for(var i in data.games){
      output+= '<div class="col-lg-1 game-item" ';
      output+= 'style="background-image:url(' + data.games[i].game_still_path + ')"';
      output+= ' data-game-title="' + data.games[i].game_title + '"';
      output+= ' data-game-series-name="' + data.games[i].game_series_name + '"';
      output+= ' data-game-series-sequence="' + data.games[i].game_series_sequence + '"';
      output+= ' data-game-path="' + data.games[i].game_path + '"></div>';
      output+= '</div>';
    }
    $("#games-row").append(output);
  });
});
