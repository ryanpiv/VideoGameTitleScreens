// Code goes here

(function() {
  var app = angular.module("PressPlay", []);

  var MainController = function(
    $scope, 
    dataGet, gameSearchController,
    $interval, $log, $location, $anchorScroll) {

    var onDataComplete = function(data) {
      $scope.gamesSearch = data;
    };
    var onCollectionComplete = function(data){
      $scope.gamecollection = data[0].name;
      $scope.gameseriessequence = data[0].seriesSequence;
    }

    var onError = function(reason) {
      $scope.error = "Could not fetch the data";
    };

    $scope.search = function(gamename){
      //$log.info("Searching for " + gamename);
      angular.element('.gameSearchList').css('display', 'block');
      dataGet.getGame(gamename).then(onDataComplete, onError); 
    };

    $scope.setSearchGame = function(game){
      $scope.gamename = game.name;
      $scope.gamecollection = dataGet.getCollection(game.collection, game.id).then(onCollectionComplete, onError);
      $scope.gamesSearch.length = 0;
      angular.element('.gameSearchList').css('display', 'none');
    }

    $scope.clearSearchList = function() {
      $scope.gamesSearch.length = 0;
      angular.element('.gameSearchList').css('display', 'none');
      $scope.gamename = "";
    }
  }

  app.controller("MainController", MainController);
}());


