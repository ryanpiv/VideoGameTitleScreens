window.onload = function(){
  debugger;
  var title = getParameterByName("title");
  var video = getParameterByName("path");
  //var audio = getParameterByName("audio_path");
  alert(title+"   "+video);
  //get video from file system here using provided query string paths
  //json is already parsed on index to speed up loading times.
  //no need to parse twice
};

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*$(document).ready(function(){

});*/
