// Code goes here

(function() {
    var app = angular.module("PressPlay", []);

    var MainController = function(
        $scope,
        dataGet, gameSearchController,
        $interval, $log, $location, $anchorScroll) {

        $scope.init = function() {
            dataGet.getTotalReviews().then(onTotalReviewsComplete, onError);
            dataGet.getPendingReviews().then(onPendingReviewsComplete, onError);
        };

        var onDataComplete = function(data) {
            $scope.gamesSearch = data;
        };
        var onCollectionComplete = function(data) {
            $scope.gamecollection = data[0].name;
            $scope.gameseriessequence = data[0].seriesSequence;
        };
        var onPendingReviewsComplete = function(data) {
            if (data.length > 0) {
                $scope.currentReview = 1;
                fillGameData(data);
            }
            nextPreviousButtons();
        };
        var onTotalReviewsComplete = function(data) {
            $scope.totalReviews = data[0]['count(*)'];
        };
        var onUpdateGameComplete = function(data) {
            $log.info(data);
            $scope.init();
            nextPreviousButtons();
        };
        var onNextReviewComplete = function(data) {
            $scope.currentReview += 1;
            fillGameData(data);
            nextPreviousButtons();
        };
        var onPreviousReviewComplete = function(data) {
            $scope.currentReview -= 1;
            fillGameData(data);
            nextPreviousButtons();
        };
        var onDeleteGameComplete = function(data) {
            $log.info(data);
            nextPreviousButtons();
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the data";
        };

        $scope.search = function(gamename) {
            //$log.info("Searching for " + gamename);
            angular.element('.gameSearchList').css('display', 'block');
            dataGet.getGame(gamename).then(onDataComplete, onError);
        };

        $scope.setSearchGame = function(game) {
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
            dataGet.getTotalReviews().then(onTotalReviewsComplete, onError);
        };

        $scope.getTotalPendingReviews = function() {
            dataGet.getTotalReviews().then(onTotalReviewsComplete, onError);
        };

        $scope.approveGame = function() {
            var gameObj = {};
            gameObj.gameid = $scope.gameid;
            gameObj.gamename = $scope.gamename;
            gameObj.gameseriesname = $scope.gameseriesname;
            gameObj.gameseriessequence = $scope.gameseriessequence;
            gameObj.gameyoutubeurl = $scope.gameyoutubeurl;
            gameObj.gameyoutubestarttime = $scope.gameyoutubestarttime;
            gameObj.gameyoutubeendtime = $scope.gameyoutubeendtime;

            gameObj.gamestillpath = $scope.gamestillpath;
            gameObj.gametitle = $scope.gametitle;
            gameObj.gameseriesname = $scope.gameseriesname;
            gameObj.gamebackgroundcolor = $scope.gamebackgroundcolor;
            gameObj.gameyoutubelink = formatYoutubeUrl($scope.gameyoutubeurl);

            dataGet.updateGame(gameObj).then(onUpdateGameComplete, onError);
        };

        $scope.previousGame = function() {
            var r = confirm('You will lose any pending changes, are you sure?');
            if (r == true) {
                dataGet.getPreviousReview($scope.currentReview - 2).then(onPreviousReviewComplete, onError);
            }

        };

        $scope.skipGame = function() {
            var r = confirm('You will lose any pending changes, are you sure?');
            if (r == true) {
                dataGet.getNextReview($scope.currentReview).then(onNextReviewComplete, onError);
            }

        };

        $scope.deleteGame = function() {
            var r = confirm('Deleting is not undoable.  Are you sure you want to continue?');
            if (r == true) {
                dataGet.deleteGame($scope.gameid).then(onDeleteGameComplete, onError);
            }
        };

        var fillGameData = function(data) {
            if (data.length > 0) {
                $scope.gameid = data[0].game_id;
                $scope.gamename = data[0].game_formal_name;
                $scope.gameformalname = data[0].game_formal_name;
                $scope.gameseriesname = data[0].game_series_name;
                $scope.gameseriessequence = parseInt(data[0].game_series_sequence);
                $scope.youtubeIframeSrc = "http://youtube.com/embed/" + data[0].game_youtube_link;
                $scope.gameyoutubeurl = "http://youtube.com/watch?v=" + data[0].game_youtube_link;
                $scope.gameyoutubestarttimeminutes = Math.floor(parseInt(data[0].game_youtube_start_time) / 60);
                $scope.gameyoutubestarttimeseconds = parseInt(data[0].game_youtube_start_time) % 60;
                $scope.gameyoutubeendtimeminutes = Math.floor(parseInt(data[0].game_youtube_end_time) / 60);
                $scope.gameyoutubeendtimeseconds = (parseInt(data[0].game_youtube_end_time) % 60);

                $scope.gamestillpath = data[0].game_still_path;
                $scope.gametitle = data[0].game_title;
                $scope.gameseriesname = data[0].game_series_name;
                $scope.gamevideopath = data[0].game_video_path;
                $scope.gamebackgroundcolor = data[0].game_background_color;
                $scope.gameaudiopath = data[0].game_audio_path;
                $scope.gameyoutubelink = data[0].game_youtube_link;
                $scope.gamevideopathintro = data[0].game_video_path_intro;
            } else {
                $scope.gameid = '';
                $scope.gamename = '';
                $scope.gameformalname = '';
                $scope.gameseriesname = '';
                $scope.gameseriessequence = '';
                $scope.youtubeIframeSrc = '';
                $scope.gameyoutubeurl = '';
                $scope.gameyoutubestarttime = '';
                $scope.gameyoutubeendtime = '';

                $scope.gamestillpath = '';
                $scope.gametitle = '';
                $scope.gameseriesname = '';
                $scope.gamevideopath = '';
                $scope.gamebackgroundcolor = '';
                $scope.gameaudiopath = '';
                $scope.gameyoutubelink = '';
                $scope.gamevideopathintro = '';
            }
        }

        var nextPreviousButtons = function() {
            if ($scope.currentReview == 1) {
                //disable the next button
                angular.element('#pendingGamePrevious').prop('disabled', true);
            } else {
                //enable the next button
                angular.element('#pendingGamePrevious').prop('disabled', false);
            }

            if ($scope.currentReview == $scope.totalReviews) {
                //disable the previous button
                angular.element('#pendingGameSkip').prop('disabled', true);
            } else {
                //enable the previous button
                angular.element('#pendingGameSkip').prop('disabled', false);
            }
        };

        $scope.setGameStillPath = function(img){
          $scope.gamestillpath = img;
        };

        $scope.createYoutubeURL = function(url){
          if(!url){
            url = $scope.gameyoutubeurl;
          }
          if(checkValidYoutubeUrl(url) == true){
            url = formatYoutubeUrl(url);
            url = 'http://youtube.com/watch?v=' + url + '&t=';
            if($scope.gameyoutubestarttimeminutes != 0){
              url += $scope.gameyoutubestarttimeminutes + 'm';
            }
            if($scope.gameyoutubestarttimeseconds){
              url += $scope.gameyoutubestarttimeseconds + 's';
            }
          }
          $scope.gameyoutubeurl = url;
          return url;
        };
    }

    app.filter('trusted', ['$sce', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    app.controller("MainController", MainController);


}());
