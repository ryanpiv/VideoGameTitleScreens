// Code goes here

(function() {
    var app = angular.module("PressPlay", ['ui.grid', 'ui.grid.pagination', 'ui.grid.selection']);

    var MainController = function(
        $scope,
        dataGet, gameSearchController,
        $interval, $log, $location, $anchorScroll, uiGridConstants) {

        $scope.pageHeader = 'Pending Reviews';

        $scope.gridColumns = [
            { field: 'game_id', name: 'ID' },
            { field: 'game_title', name: 'Title' },
            { field: 'game_formal_name', name: 'Formal Name' },
            { field: 'game_series_name', name: 'Series Name' },
            { field: 'game_series_sequence', name: 'Sequence' },
            { field: 'game_youtube_link', name: 'Youtube Link' },
            { field: 'game_youtube_start_time_minutes', name: 'Start Minutes' },
            { field: 'game_youtube_start_time_seconds', name: 'Start Seconds' },
            { field: 'game_needs_review', name: 'Needs Review' }
        ];

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 10,
            sort: null,
            sortCol: null
        };

        $scope.init = function() {
            $('.overlay').show();
            dataGet.getTotalReviews().then(onTotalReviewsComplete, onError);
            dataGet.getPendingReviews().then(onPendingReviewsComplete, onError);

            //grid stuff
            $scope.gridPagedGames = {
                columnDefs: $scope.gridColumns,
                enablePaginationControls: true,
                paginationPageSize: paginationOptions.pageSize,
                totalItems: dataGet.getTotalRecords().then(onTotalRecordsComplete, onError),
                paginationPageSizes: [10, 25, 50],
                useExternalPagination: true,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                data: dataGet.getPagedGames(paginationOptions).then(onPagedGridComplete, onError),
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                        if (sortColumns.length == 0) {
                            paginationOptions.sort = null;
                        } else {
                            paginationOptions.sort = sortColumns[0].sort.direction;
                            paginationOptions.sortCol = sortColumns[0].colDef.field;
                            dataGet.getPagedGames(paginationOptions).then(onPagedGridComplete, onError);
                            dataGet.getTotalRecords().then(onTotalRecordsComplete, onError);
                        }
                    });
                    gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                        paginationOptions.pageNumber = newPage;
                        paginationOptions.pageSize = pageSize;
                        dataGet.getPagedGames(paginationOptions).then(onPagedGridComplete, onError);
                        dataGet.getTotalRecords().then(onTotalRecordsComplete, onError);
                    });
                    /*gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                        $log.info('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
                        $scope.$apply();
                    });*/
                    gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                        fillGameData([row.entity]);
                        activateEditMode(row.entity.game_formal_name);
                    });
                }
            };
        };

        $scope.clearAll = function() {
            $scope.gridApi.selection.clearSelectedRows();
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
            $('.overlay').hide();
        };
        var onTotalReviewsComplete = function(data) {
            $scope.totalReviews = data[0]['count(*)'];
        };
        var onUpdateGameComplete = function(data) {
            $log.info(data);
            $scope.init();
            nextPreviousButtons();
            $('.overlay').hide();
        };
        var onNextReviewComplete = function(data) {
            $scope.currentReview += 1;
            fillGameData(data);
            nextPreviousButtons();
            $('.overlay').hide();
        };
        var onPreviousReviewComplete = function(data) {
            $scope.currentReview -= 1;
            fillGameData(data);
            nextPreviousButtons();
            $('.overlay').hide();
        };
        var onDeleteGameComplete = function(data) {
            $log.info(data);
            nextPreviousButtons();
            $('.overlay').hide();
        };
        var onPagedGridComplete = function(data) {
            $scope.gridPagedGames.data = data;
        };
        var onTotalRecordsComplete = function(data) {
            $scope.gridPagedGames.totalItems = parseInt(data);
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
            $('.overlay').show();
            dataGet.getPendingReviews().then(onPendingReviewsComplete, onError);
            dataGet.getTotalReviews().then(onTotalReviewsComplete, onError);
        };

        $scope.getTotalPendingReviews = function() {
            dataGet.getTotalReviews().then(onTotalReviewsComplete, onError);
        };

        $scope.getTotalRecords = function() {
            dataGet.getTotalRecords().then(onTotalRecordsComplete, onError);
        };

        $scope.getPagedGames = function(pageNumber, pageSize) {
            dataGet.getPagedGames(pageNumber, pageSize).then(onPagedGridComplete, onError);
        };

        $scope.approveGame = function() {
            $('.overlay').show();

            var form_data = new FormData();
            var file_data = $('#imgInp').prop('files')[0];
            form_data.append('file', file_data);

            form_data.append('gameid', $scope.gameid);
            form_data.append('gamename', $scope.gamename);
            form_data.append('gameseriesname', $scope.gameseriesname);
            form_data.append('gameseriessequence', $scope.gameseriessequence);
            form_data.append('gameyoutubestarttimeminutes', $scope.gameyoutubestarttimeminutes);
            form_data.append('gameyoutubestarttimeseconds', $scope.gameyoutubestarttimeseconds);
            form_data.append('gameyoutubeendtimeminutes', $scope.gameyoutubestarttimeminutes);
            form_data.append('gameyoutubeendtimeseconds', $scope.gameyoutubestarttimeseconds);
            form_data.append('gametitle', $scope.gametitle);
            //gyturl = user input field
            //gyulink = $scope data
            form_data.append('gameyoutubelink', formatYoutubeUrl($scope.gameyoutubeurl));

            $.ajax({
                url: "data/update-game.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: "POST"
            }).success(function(result) {
                displayNotification('Success');
                $('.overlay').hide();
            }).error(function(xhr, status, errorThrown) {
                displayNotification('An error has occurred: ' + xhr.responseText, 'error');
                $('.overlay').hide();
            });

            //dataGet.updateGame(form_data).then(onUpdateGameComplete, onError);
        };

        $scope.previousGame = function() {
            var r = confirm('You will lose any pending changes, are you sure?');
            if (r == true) {
                $('.overlay').show();
                dataGet.getPreviousReview($scope.currentReview - 2).then(onPreviousReviewComplete, onError);
            }

        };

        $scope.skipGame = function() {
            var r = confirm('You will lose any pending changes, are you sure?');
            if (r == true) {
                $('.overlay').show();
                dataGet.getNextReview($scope.currentReview).then(onNextReviewComplete, onError);
            }

        };

        $scope.deleteGame = function() {
            var r = confirm('Deleting is not undoable.  Are you sure you want to continue?');
            if (r == true) {
                $('.overlay').show();
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
                $scope.gamestillpathinput = 'default.jpg';

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
                $scope.gamestillpathinput = '';

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

        var activateEditMode = function(gameName) {
            $('#pendingGamePreviousCol').css('display', 'none');
            $('#pendingGameSkipCol').css('display', 'none');
            $('#spanCurrentReviewTracker').css('display', 'none');
            $scope.pageHeader = 'Editing ' + gameName;

            $('#enablePendingReviewsCol').css('display', 'block');
        };
        $scope.callActivateEditMode = function(gameName) {
            activateEditMode(gameName);
        };

        var activateReviewMode = function() {
            $('#pendingGamePreviousCol').css('display', 'block');
            $('#pendingGameSkipCol').css('display', 'block');
            $('#spanCurrentReviewTracker').css('display', 'block');
            $scope.pageHeader = 'Pending Reviews';

            dataGet.getTotalReviews().then(onTotalReviewsComplete, onError);
            dataGet.getPendingReviews().then(onPendingReviewsComplete, onError);
            $scope.clearAll();

            $('#enablePendingReviewsCol').css('display', 'none');
        };
        $scope.callActivateReviewMode = function() {
            activateReviewMode();
        };

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
