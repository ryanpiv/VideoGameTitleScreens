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
            if (typeof data != 'undefined') {
                $scope.gamecollection = data[0].name;
                $scope.gameseriessequence = data[0].seriesSequence;
                $scope.gameseriesname = data[0].name;
            } else {
                $scope.gamecollection = '';
                $scope.gameseriessequence = '';
                $scope.gameseriesname = '';
            }

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

            gameObj.gameyoutubestarttimeminutes = $scope.gameyoutubestarttimeminutes;
            gameObj.gameyoutubestarttimeseconds = $scope.gameyoutubestarttimeseconds;
            gameObj.gameyoutubeendtimeminutes = $scope.gameyoutubeendtimeminutes;
            gameObj.gameyoutubeendtimeseconds = $scope.gameyoutubeendtimeseconds;

            gameObj.gamestillpath = $scope.gamestillpath;
            gameObj.gamestillpathdata = $scope.gamestillpathdata;
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
                $scope.gameyoutubestarttimeminutes = parseInt(data[0].game_youtube_start_time_minutes);
                $scope.gameyoutubestarttimeseconds = parseInt(data[0].game_youtube_start_time_seconds);
                $scope.gameyoutubeendtimeminutes = parseInt(data[0].game_youtube_end_time_minutes);
                $scope.gameyoutubeendtimeseconds = parseInt(data[0].game_youtube_end_time_seconds);
                $scope.gamestillpath = data[0].game_still_path;

                //shit i dont think i need
                $scope.gametitle = data[0].game_title;
                $scope.gamevideopath = data[0].game_video_path;
                $scope.gamebackgroundcolor = data[0].game_background_color;
                $scope.gameaudiopath = data[0].game_audio_path;
                $scope.gameyoutubelink = data[0].game_youtube_link;
                $scope.gamevideopathintro = data[0].game_video_path_intro;

                $scope.createYoutubeURL();
            } else {
                $scope.gameid = '';
                $scope.gamename = '';
                $scope.gameformalname = '';
                $scope.gameseriesname = '';
                $scope.gameseriessequence = '';
                $scope.youtubeIframeSrc = '';
                $scope.gameyoutubeurl = '';
                $scope.gameyoutubestarttimeminutes = '';
                $scope.gameyoutubestarttimeseconds = '';
                $scope.gameyoutubeendtimeminutes = '';
                $scope.gameyoutubeendtimeseconds = '';
                $scope.gamestillpath = '';

                //shit i dont think i need
                $scope.gametitle = '';
                $scope.gameseriesname = '';
                $scope.gamevideopath = '';
                $scope.gamebackgroundcolor = '';
                $scope.gameaudiopath = '';
                $scope.gameyoutubelink = '';
                $scope.gamevideopathintro = '';
            }
            $scope.gamestillpathdata = '';
            //this is always null as it only ever gets filled when the file input changes
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

        $scope.setGameStillPath = function(input) {
            //$scope.gamestillpath = img;
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function(e) {
                $scope.gamestillpathdata = e.target.result;
            }
            $scope.gamestillpath = input.files[0].name;
        };

        $scope.createYoutubeURL = function(url) {
            var embedUrl;
            var embedStartTime = 0;
            if (!url) {
                url = $scope.gameyoutubeurl;
            }


            if (checkValidYoutubeUrl(url) == true) {
                url = formatYoutubeUrl(url);
                embedUrl = 'http://youtube.com/embed/' + url;
                url = 'http://youtube.com/watch?v=' + url;
                
                if (!(isNaN($scope.gameyoutubestarttimeminutes)) || !(isNaN($scope.gameyoutubestarttimeseconds))) {
                    url += '&t=';
                    if (!(isNaN($scope.gameyoutubestarttimeminutes))) {
                        if ($scope.gameyoutubestarttimeminutes != 0 || parseInt($scope.gameyoutubestarttimeminutes) > 0) {
                            url += $scope.gameyoutubestarttimeminutes + 'm';
                            embedStartTime = $scope.gameyoutubestarttimeminutes * 60;
                        }
                    }
                    if (!(isNaN($scope.gameyoutubestarttimeseconds))) {
                        if ($scope.gameyoutubestarttimeseconds != 0 || parseInt($scope.gameyoutubestarttimeseconds) > 0) {
                            url += $scope.gameyoutubestarttimeseconds + 's';
                            embedStartTime += $scope.gameyoutubestarttimeseconds;
                        }
                    }
                }
                if (embedStartTime != 0) {
                    embedUrl += '?start=' + embedStartTime;
                }
            }
            $scope.gameyoutubeurl = url;
            $scope.youtubeIframeSrc = embedUrl;
            return url;
        };

        $scope.preventNegativeInput = function($event) {
            var e = $event;
            if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
                return false;
            }
        };
    }

    app.filter('trusted', ['$sce', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    app.controller("MainController", MainController);


}());
