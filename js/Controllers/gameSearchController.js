(function() {

  var gameSearchController = function($http) {

    var setGame = function(gamename){
      return gamename;
    }

    return {
      setGame: setGame
    };
  }

  var module = angular.module("PressPlay");
  module.factory("gameSearchController", gameSearchController);
}());
