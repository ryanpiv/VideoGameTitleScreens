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
    };
    var onPendingReviewsComplete = function(data){
      $scope.pendingReviews = data.data.length;

      $scope.gamename = data.data[0].game_formal_name;
      $scope.gameseriesname = data.data[0].game_series_name;
      $scope.gameseriessequence = parseInt(data.data[0].game_series_sequence);
      $scope.youtubeIframeSrc = "http://youtube.com/embed/" + data.data[0].game_youtube_link;
      $scope.gameyoutubeurl = "http://youtube.com/watch?v=/" + data.data[0].game_youtube_link;
      $scope.gameyoutubestarttime = parseInt(data.data[0].game_youtube_start_time);
      $scope.gameyoutubeendtime = parseInt(data.data[0].game_youtube_end_time);

      $scope.gamestillpath = data.data[0].game_still_path;
      $scope.gametitle = data.data[0].game_title;
      $scope.gameseriesname = data.data[0].game_series_name;
      $scope.gamevideopath = data.data[0].game_video_path;
      $scope.gamebackgroundcolor = data.data[0].game_background_color;
      $scope.gameformalname = data.data[0].game_formal_name;
      $scope.gameaudiopath = data.data[0].game_audio_path;
      $scope.gameyoutubelink = data.data[0].game_youtube_link;
      $scope.gamevideopathintro = data.data[0].game_video_path_intro;
    };

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
    };

    $scope.clearSearchList = function() {
      $scope.gamesSearch.length = 0;
      angular.element('.gameSearchList').css('display', 'none');
      $scope.gamename = "";
    };

    $scope.findPendingReviews = function() {
      dataGet.getPendingReviews().then(onPendingReviewsComplete, onError);
    };
  }

  app.filter('trusted', ['$sce', function ($sce) {
      return function(url) {
          return $sce.trustAsResourceUrl(url);
      };
  }]);

  app.controller("MainController", MainController);
}());


