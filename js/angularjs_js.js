// Code goes here

(function() {
  var app = angular.module("PressPlay", []);

  var MainController = function(
    $scope, dataGet, $interval, $log, $location, $anchorScroll) {

    var onDataComplete = function(data) {
      $scope.gamesSearch = data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data";
    };

    $scope.search = function(gamename){
      $log.info("Searching for " + gamename);
      dataGet.getGame(gamename).then(onDataComplete, onError); 
    };
  }

  app.controller("MainController", MainController);
}());


