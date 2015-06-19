window.onload = function(){
  debugger;
  var week1 = getParameterByName("week1");
  var week2 = getParameterByName("week2");
  alert(week1+"   "+week2);
};

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
