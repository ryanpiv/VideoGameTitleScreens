window.onload = function(){
  debugger;
  var title;
  var video;
  var color;
  var audio;
  var html = '';

  if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    title = localStorage.getItem('title');
    video = localStorage.getItem('path');
    color = localStorage.getItem('bg_color');
    audio = localStorage.getItem('audio_path');
  } else {
    // Sorry! No Web Storage support..
    title = getParameterByName("title");
    video = getParameterByName("path");
    color = getParameterByName("bg_color");
    audio = getParameterByName("audio_path");
  }

  if(color === 'undefined' || color === ''){
    color = 'black';
  }
  $('body').css('background-color', color);

  html += '<video id="video" autobuffer autoplay loop><source src="';
  html += video;
  html += '" type="video/webm"></video>';
  $('#video-container').append(html);

  html = '<audio preload="auto" autoplay="" loop="" controls=""><source src="';
  html+= audio + '" type="audio/mpeg"></audio>';
  $('#audio-container').append(html);

  
  //show buffered percentage
  /*
  var videoTags = $('video');
  videoTags[0].addEventListener('progress', function() {
    var loadedPercentage = (this.buffered.end(0) / this.duration) * 100;
    console.log(loadedPercentage);  
  }); */

  $('#video').get(0).play();
};

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function(){
  
});

