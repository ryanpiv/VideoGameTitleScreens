(function() {

  var dataGet = function($http) {
    var getGame = function(gamename) {
      return $http.get("data/get-games-title.php?search=" + encodeURIComponent(gamename))
        .then(function(response) {
          return response.data.body;
        });
    };

    var submitGame = function(gamename){
      return "";
    };
    
    return {
      getGame: getGame
    };
  }

  var module = angular.module("PressPlay");
  module.factory("dataGet", dataGet);
}());
