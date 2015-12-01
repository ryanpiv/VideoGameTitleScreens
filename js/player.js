window.onload = function(){
  debugger;
  var title;
  var video;
  var video_youtube;
  var video_youtube_start;
  var color;
  var audio;
  var html = '';

  if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    title = localStorage.getItem('title');
    video = localStorage.getItem('path');
    video_intro = localStorage.getItem('path_intro');
    video_youtube = localStorage.getItem('youtube_link');
    video_youtube_start = localStorage.getItem('youtube_start_time');
    color = localStorage.getItem('bg_color');
    audio = localStorage.getItem('audio_path');
  } else {
    // Sorry! No Web Storage support..
    title = getParameterByName("title");
    video = getParameterByName("path");
    video_intro = getParameterByName("path_intro");
    video_youtube = getParameterByName("youtube_link");
    video_youtube_start = getParameterByName('youtube_start_time');
    color = getParameterByName("bg_color");
    audio = getParameterByName("audio_path");
  }

  if(color === 'undefined' || color === ''){
    color = 'black';
  }
  $('body').css('background-color', color);

  if(video == 'undefined' || video == null){
    html += "<iframe width='560' height='315' src=https://www.youtube.com/embed/";
    html += video_youtube;
    html += "?autoplay=1&showinfo=0&controls=0&loop=1&playlist=";
    html += video_youtube;
    html += "&start=" + video_youtube_start;
    html += " frameborder=0 allowfullscreen></iframe>";
  } else {
    if(video_intro != "" || video_intro != null || video_intro != 'undefined'){
      html += '<video id="video_intro" autobuffer autoplay onended="intro_ended()"><source src="';
      html += video_intro;
      html += '" type="video/webm"></video>';
      html += '<video id="video" style="width:100%; height:100%; display:none" autobuffer loop><source src="';
    } else {
      html += '<video id="video" style="width:100%; height:100%" autobuffer autoplay loop><source src="';
    }
    html += video;
    html += '" type="video/webm"></video>';
    $('#video-container').append(html);

    html = '<audio preload="auto" autoplay="" loop="" controls=""><source src="';
    html+= audio + '" type="audio/mpeg"></audio>';
    $('#audio-container').append(html);

    $('#video').get(0).play();
  }
  //show buffered percentage
  /*
  var videoTags = $('video');
  videoTags[0].addEventListener('progress', function() {
    var loadedPercentage = (this.buffered.end(0) / this.duration) * 100;
    console.log(loadedPercentage);  
  }); */
};

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function(){
  
});

function intro_ended(){
  $('#video_intro').css('display','none');
  $('#video').css('display', 'block');
  $('#video').attr('autoplay');
  $('#video').get(0).play();
}