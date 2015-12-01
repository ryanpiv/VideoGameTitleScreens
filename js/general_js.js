var clicked = 0;
//controls navbar slideDown when clicked to keep position
//set to 1 to keep click event

//call to settings.js to set cookies if exists
checkSettingsPageLoad();

$(document).ready(function()
{
  $.getJSON('screens.json', function(data)
  {
    //var output ='<div id="Container" class="hover-cont"><div class="row">';
    var output ='<div id="Container-mix" class="hover-cont">';
    //var count = 0;
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
      output+= ' data-game-youtube-start-time="' + data.games[i].game_youtube_start_time + '"';
      output+= ' data-game-path-intro="' + data.games[i].game_video_path_intro + '">';
      output += '</div><div class="game-title hover-in">' + data.games[i].game_formal_name + '</div></div>';

      //count+=3;
      //if(count >= 12){
        //output+='</div><div class="row">';
        //count = 0;
      //}
    }
    output += "</div>";
    $("#games-row").append(output);
  })
  .done(function(){
    $('.mix').click(function(){
      var mydata = $(this).children('.game-item');
      var myobj;

      if(typeof(Storage) !== 'undefined'){
        //code for local Storage
        localStorage.setItem("title", mydata.attr('data-game-title'));
        localStorage.setItem("path", mydata.attr('data-game-path'));
        localStorage.setItem("path_intro", mydata.attr('data-game-path-intro'));
        localStorage.setItem("bg_color", mydata.attr('data-game-background-color'));
        localStorage.setItem("audio_path", mydata.attr('data-game-audio-path'));
        localStorage.setItem("youtube_link", mydata.attr('data-game-youtube-link'));
        localStorage.setItem("youtube_start_time", mydata.attr('data-game-youtube-start-time'));

        if(getCookie("display_type") == "0" || getCookie("display_type") == "undefined" || getCookie("display_type") == ""){
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
          } else if(localStorage.getItem('path') != null || localStorage.getItem('path') != ""){
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
        if(getCookie("display_type") == "0"){
          //open in same window
          if(myobj.youtube_link != null || myobj.youtube_link != ""){
            playerShow(myobj);
          } else if (myobj.path != null || myobj.path != "") {
            playerShow(myobj);
          } else {
            alert("Error: No video available");
            return;
          }
        } else {
          //open in new tab
          if(myobj.youtube_link != null || myobj.youtube_link != ""){
            window.open('player.html'+'?' + $.param(myobj), '_blank');
          } else if(myobj.path != null || myobj.path != "") {
            window.open('player.html' + '?' + $.param(myobj), '_blank');
          } else {
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

    $('input[type=radio][name=settings-video-size]').change(function() {
      //determine how big the video should be
      switch(this.value){
        case '0':
          setCookie("player_size", "0");
          break;
        case '1':
          setCookie("player_size", "1");
          break;
        case '2':
          setCookie("player_size", "2");
          //need to write code for full screen still
          break;
      }
    });
    $('input[type=radio][name=settings-tab]').change(function() {
      switch(this.value){
        case "0":
          setCookie("display_type", "0");
          break;
        case "1":
          setCookie("display_type", "1");
          break;
      }
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

  playerSize();

  Pace.restart();
}

function webm(videoObj){
  var wm_html = '<video style="width:100%; height:100%"';

  if(videoObj != null){
    if(videoObj.path_intro != null || videoObj.path_intro != "" || videoObj.path_intro != "undefined"){
      wm_html += 'id="video_intro" autobuffer autoplay><source src="';
      wm_html += videoObj.path_intro;
      wm_html += '" type="video/webm"></video>';
      wm_html += '<video style="width:100%; height:100%; display:none" id="video" autobuffer loop><source src="';
    } else {
      wm_html += '<video style="width:100%; height:100%;" id="video" autobuffer loop><source src="';
    }
    wm_html += videoObj.path;
    wm_html += '" type="video/webm"></video>';
    wm_html += '<audio style="display:none" preload="auto" autoplay="" loop="" controls=""><source src="';
    wm_html += videoObj.audio_path + '" type="audio/mpeg"></audio>';
  } else {
    if(localStorage.getItem('path_intro') !== "undefined"){
      //localStorage.getItem('path_intro')
      wm_html += 'id="video_intro" autobuffer autoplay onended="intro_ended()"><source src="';
      wm_html += localStorage.getItem('path_intro');
      wm_html += '" type="video/webm"></video>';
      wm_html += '<video style="width:100%; height:100%; display:none" id="video" autobuffer loop><source src="';
    } else {
      wm_html += '<video style="width:100%; height:100%;" id="video" autobuffer autoplay loop><source src="';
    }
    wm_html += localStorage.getItem('path');
    wm_html += '" type="video/webm"></video>';
    wm_html += '<audio style="display:none" preload="auto" autoplay="" loop="" controls=""><source src="';
    wm_html += localStorage.getItem('audio_path') + '" type="audio/mpeg"></audio>';
  }

  $('.player-container').append(wm_html);

  playerSize();

  Pace.restart();
}

function intro_ended(){
  $('#video_intro').css('display','none');
  $('#video').css('display', 'block');
  $('#video').attr('autoplay');
  $('#video').get(0).play();
}

function qualityType(){
  switch(getCookie("quality_type")){
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

function playerSize(){
  $('iframe').removeClass('iframe-small');
  $('video').removeClass('video-small');

  switch(getCookie("player_size")){
    case "0":
      $('video').addClass('video-small');
      $('video').css('margin-top', ($('body').innerHeight() - $('video').height()) / 2 );
      $('iframe').addClass('iframe-small');
      $('iframe').css('top', ($('body').innerHeight() - $('iframe').height()) / 2 );
      break;
    case "1":
      $('iframe').height($('body').height());
      $('iframe').css('top', $('body').innerHeight() - $('iframe').height());
      $('video').height($('body').height());
      $('video').css('top', $('body').innerHeight() - $('video').height());
      break;
    case "2": 
      //need to manipulate youtube URL to be full screen
      break;
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

//detect escape key press
$(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
       //exit all modals
      clicked = 0;
      $('.search-row').stop().slideUp(function(){
        $('.search-row').css('display', 'none');
      });
      $('.modal-cover').fadeOut(300);
      $('.modal-close').fadeOut(300);
      $('.modal-settings').fadeOut(300);
      $('.modal-player').fadeOut(300);
      $('.modal-about').fadeOut(300);
      $('.player-container').children().remove()
      clicked = 0;

      $('body').removeClass('stop-scrolling');
    }
});
//end escape key press

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
  checkSettingsPageLoad();
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

$(window).resize(function(){
  if(getCookie("player_size") == "0"){
    $('iframe').css('top', ($('body').innerHeight() - $('iframe').height()) / 2 );
  } else if(getCookie("player_size") == "1"){
    $('iframe').css('top', $('body').innerHeight() - $('iframe').height());
  }

  if(getCookie("player_size") == "0"){
    $('video').css('top', ($('body').innerHeight() - $('iframe').height()) / 2 );
  } else if(getCookie("player_size") == "1"){
    $('video').css('top', $('body').innerHeight() - $('iframe').height());
  }
});

