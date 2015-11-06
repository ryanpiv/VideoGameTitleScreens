$(document).ready(function()
{
  $.getJSON('screens.json', function(data)
  {
    //var output ='<div id="Container" class="hover-cont"><div class="row">';
    var output ='<div id="Container" class="hover-cont">';
    var count = 0;
    for(var i in data.games)
    {
      output+= '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 mix" data-myorder="' + data.games[i].game_series_name + ' ' + data.games[i].game_series_sequence +'"><div class="game-item hover-out" onmouseover="lowerOpacity(this)" onmouseout="raiseOpacity(this)" ';
      output+= 'style="background-image:url(' + data.games[i].game_still_path + ')"';
      output+= ' data-game-title="' + data.games[i].game_title + '"';
      output+= ' data-game-series-name="' + data.games[i].game_series_name + '"';
      output+= ' data-game-series-sequence="' + data.games[i].game_series_sequence + '"';
      output+= ' data-game-path="' + data.games[i].game_video_path + '"';
      output+= ' data-game-background-color="' + data.games[i].game_background_color + '"';
      output+= ' data-game-formal-name="' + data.games[i].game_formal_name.toUpperCase() + '"';
      output+= ' data-game-audio-path="' + data.games[i].game_audio_path + '">';
      output += '</div><div class="game-title hover-in">' + data.games[i].game_formal_name + '</div></div>';

      count+=3;
      if(count >= 12){
        //output+='</div><div class="row">';
        count = 0;
      }
    }
    output += "</div>";
    $("#games-row").append(output);
  })
  .done(function(){
    //may need to loop through and add css classes here
    //for dom to detect
    $('.mix').click(function(){
      var mydata = $(this).children('.game-item');
      var myobj;

      if(typeof(Storage) !== 'undefined'){
        //code for local Storage
        debugger;
        localStorage.setItem("title", mydata.attr('data-game-title'));
        localStorage.setItem("path", mydata.attr('data-game-path'));
        localStorage.setItem("bg_color", mydata.attr('data-game-background-color'));
        localStorage.setItem("audio_path", mydata.attr('data-game-audio-path'));

        window.open('player.html', '_blank');
      } else {
        //no web storage, begin query string
        myobj = {
          title: mydata.attr('data-game-title'),
          path: mydata.attr('data-game-path'),
          bg_color: mydata.attr('data-game-background-color'),
          audio_path: mydata.attr('data-game-audio-path')
        };
        window.open('player.html'+'?'+$.param(myobj), '_blank');
      }
      //window.open(location.href='player.html/'+$.param(myobj));
      //location.href=$.param(myobj);
      //document.location.search += $.param(myobj);
    });

    $("#Container").mixItUp({
      load:{
        sort: 'default:desc'
      },
      selectors:{
        sort: '.sort'
      }
    });

    var $gamesDivArray = [];
    $('#Container .mix').each(function(){
      $gamesDivArray.push(this);
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

//detect key input on search
$(document).on('keyup', '.input-search', function(){
  //if($('.mix').attr
  var searchTerm = $.trim($('.input-search').val().toUpperCase());
  if(searchTerm === '' || searchTerm === 'undefined') {
    $("#Container > .mix > div").parent().show(); 
    return;
  }
  $("#Container > .mix > div").parent().hide(); 
  $('#Container > .mix > div[data-game-formal-name*="'+searchTerm.toUpperCase()+'"]').parent().show();
});

function settingsClick() {
  $('.settings').css('display', 'block');
}