var clicked = 0;
//controls navbar slideDown when clicked to keep position
//set to 1 to keep click event
var quality_type = 1;
//controls youtube video quality when loading from a youtube source
//0 = 360p/480p/lowest available
//1 = 720p --default value
//2 = 1080p
//3 = 1440p/highest available
var display_type = 0;
//controls to decide if the video opens in a new tab or in the same window
//0 = same window --default
//1 = new tab

$(document).ready(function()
{
  $.getJSON('screens.json', function(data)
  {
    //var output ='<div id="Container" class="hover-cont"><div class="row">';
    var output ='<div id="Container-mix" class="hover-cont">';
    var count = 0;
    for(var i in data.games)
    {
      output+= '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mix" data-myorder="' + data.games[i].game_series_name + ' ' + data.games[i].game_series_sequence +'"><div class="game-item hover-out" onmouseover="lowerOpacity(this)" onmouseout="raiseOpacity(this)" ';
      output+= 'style="background-image:url(' + data.games[i].game_still_path + ')"';
      output+= ' data-game-title="' + data.games[i].game_title + '"';
      output+= ' data-game-series-name="' + data.games[i].game_series_name + '"';
      output+= ' data-game-series-sequence="' + data.games[i].game_series_sequence + '"';
      output+= ' data-game-path="' + data.games[i].game_video_path + '"';
      output+= ' data-game-background-color="' + data.games[i].game_background_color + '"';
      output+= ' data-game-formal-name="' + data.games[i].game_formal_name.toUpperCase() + '"';
      output+= ' data-game-audio-path="' + data.games[i].game_audio_path + '"';
      output+= ' data-game-youtube-link="' + data.games[i].game_youtube_link + '"';
      output+= ' data-game-youtube-start-time="' + data.games[i].game_youtube_start_time + '">';
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
        localStorage.setItem("title", mydata.attr('data-game-title'));
        localStorage.setItem("path", mydata.attr('data-game-path'));
        localStorage.setItem("bg_color", mydata.attr('data-game-background-color'));
        localStorage.setItem("audio_path", mydata.attr('data-game-audio-path'));
        localStorage.setItem("youtube_link", mydata.attr('data-game-youtube-link'));
        localStorage.setItem("youtube_start_time", mydata.attr('data-game-youtube-start-time'));

        if(display_type == 0){
          //open in same window
          if(localStorage.getItem('youtube_link') != "undefined"){
            playerShow(null, 'iframe');
          } else if(localStorage.getItem('path') != null || localStorage.getItem('path') != ""){
            playerShow(null, 'webm');
          }
          else {
            alert("Error: No video available");
            return;
          }
        } else {
          //open in new tab
          if(localStorage.getItem('youtube_link') != "undefined"){
            window.open('player.html', '_blank');
          } else {
            alert("Error: No video available");
            return;
          }
        }
      } else {
        //no web storage, begin query object
        myobj = {
          title: mydata.attr('data-game-title'),
          path: mydata.attr('data-game-path'),
          bg_color: mydata.attr('data-game-background-color'),
          audio_path: mydata.attr('data-game-audio-path'),
          youtube_link: mydata.attr('data-game-youtube-link'),
          youtube_start_time: mydata.attr('data-game-youtube-start-time')
        };
        if(display_type == 0){
          //open in same window
          if(myobj.youtube_link != null || myobj.youtube_link != ""){
            playerShow(myobj);
          } else {
            alert("Error: No video available");
            return;
          }
        } else {
          //open in new tab
          if(myobj.youtube_link != null || myobj.youtube_link != ""){
            window.open('player.html'+'?'+$.param(myobj), '_blank');
          } else{
            alert("Error: No video available");
            return;
          }
        }
      }
      //window.open(location.href='player.html/'+$.param(myobj));
      //location.href=$.param(myobj);
      //document.location.search += $.param(myobj);
    });

    $("#Container-mix").mixItUp({
      load:{
        sort: 'myorder:asc'
      },
      selectors:{
        sort: '.sort'
      }
    });

    var $gamesDivArray = [];
    $('#Container-mix .mix').each(function(){
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

function playerShow(videoObj, videoType) {
  $('.modal-cover').fadeIn(300);
  $('.modal-close').fadeIn(300);
  $('.modal-player').fadeIn(300);
  $('body').addClass('stop-scrolling');

  if(videoType == 'iframe'){
    iframe(videoObj);
  } else {
    webm(videoObj);
  }
}

function iframe(videoObj){
  var if_html = "<iframe width='560' height='315' src=https://www.youtube.com/embed/";
  var if_html_loop = "";
  var if_html_start = "";
  var if_html_end = "";
  var quality_type = qualityType();

  if(videoObj != null){
    if_html += videoObj.youtube_link;
    if_html_loop = videoObj.youtube_link;
    if_html_start = videoObj.youtube_start_time;
  } else {
    if_html += localStorage.getItem('youtube_link');
    if_html_loop = localStorage.getItem('youtube_link');
    if_html_start = localStorage.getItem('youtube_start_time');
  }
  if_html += "?autoplay=1&showinfo=0&controls=0&loop=1&playlist=";
  if_html += if_html_loop;
  if_html += "&start=" + if_html_start;
  if_html += " frameborder=0 allowfullscreen></iframe>";

  $('.player-container').append(if_html);
  $('.player-container').fitVids();

  Pace.restart();
}

function webm(videoObj){
  var wm_html = '<video style="width:100%; height:100%" id="video" autobuffer autoplay loop><source src="';

  if(videoObj != null){
    wm_html += videoObj.path;
    wm_html += '" type="video/webm"></video>';
    wm_html += '<audio style="display:none" preload="auto" autoplay="" loop="" controls=""><source src="';
    wm_html += videoObj.audio_path + '" type="audio/mpeg"></audio>';
  } else {
    wm_html += localStorage.getItem('path');
    wm_html += '" type="video/webm"></video>';
    wm_html += '<audio style="display:none" preload="auto" autoplay="" loop="" controls=""><source src="';
    wm_html += localStorage.getItem('audio_path') + '" type="audio/mpeg"></audio>';
  }

  $('.player-container').append(wm_html);
  Pace.restart();
}

function qualityType(){
  switch(quality_type){
    case 0:
      return "480p";
    case 1:
      return "720p";
    case 2:
      return "1080p";
    case 3:
      return "1440p";
  }
}

//detect key input on search
$(document).on('keyup', '.input-search', function(){
  //if($('.mix').attr
  var searchTerm = $.trim($('.input-search').val().toUpperCase());
  if(searchTerm === '' || searchTerm === 'undefined') {
    $("#Container-mix > .mix > div").parent().show(); 
    return;
  }
  $("#Container-mix > .mix > div").parent().hide(); 
  $('#Container-mix > .mix > div[data-game-formal-name*="'+searchTerm.toUpperCase()+'"]').parent().show();
});
//end input search

//hamburgler
$(document).on('mouseenter', '.ui-hamburger', function(){
  $('.search-row').stop().slideDown(function(){
    $('.search-row').css('display', 'block');
  });
});
$(document).on('mouseleave', '.search-row', function(){
  if(clicked == 0){
    $('.search-row').stop().slideUp(function(){
      $('.search-row').css('display', 'none');
    });
  }
});
$(document).on('click', '.ui-hamburger', function(){
  if(clicked == 0){
    $('.search-row').stop().slideDown(function(){
      $('.search-row').css('display', 'block');
      clicked = 1;
    });
  } else {
    $('.search-row').stop().slideUp(function(){
      $('.search-row').css('display', 'none');
      clicked = 0;
    });
  }
});
//end hamburgler

//sorting
$(document).on('click', '.btn-sort', function(){
  $('.btn-sort').removeClass('sort-active');
  $(this).addClass('sort-active');
});
//end sorting
//close modal
$(document).on('click', '.modal-close', function(){
  $('.modal-cover').fadeOut(300);
  $('.modal-close').fadeOut(300);
  $('.modal-settings').fadeOut(300);
  $('.modal-player').fadeOut(300);
  $('.modal-about').fadeOut(300);
  $('.player-container').children().remove()
  clicked = 0;

  $('body').removeClass('stop-scrolling');
});
$(document).on('click', '.modal-cover', function(){
  $('.modal-cover').fadeOut(300);
  $('.modal-close').fadeOut(300);
  $('.modal-settings').fadeOut(300);
  $('.modal-player').fadeOut(300);
  $('.modal-about').fadeOut(300);
  clicked = 0;
});
//end close modal
//settings
$(document).on('click', '.info-settings', function(){
  $('.modal-cover').fadeIn(300);
  $('.modal-close').fadeIn(300);
  $('.modal-settings').fadeIn(300);
  clicked = 1;
});
//end settings
//about
$(document).on('click', '.info-about', function(){
  $('.modal-cover').fadeIn(300);
  $('.modal-close').fadeIn(300);
  $('.modal-about').fadeIn(300);
  clicked = 1;
});
//end about