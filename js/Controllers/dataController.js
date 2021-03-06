(function() {

    var dataGet = function($http) {
        var getGame = function(gamename) {
            return $http.get("data/get-games-title.php?search=" + encodeURIComponent(gamename))
                .then(function(response) {
                    return response.data.body;
                });
        };

        var getCollection = function(collection, id) {
            return $http.get("data/get-games-collection.php?search=" + encodeURIComponent(collection) + "&id=" + encodeURIComponent(id))
                .then(function(response) {
                    return response.data.body;
                });
        };

        var getPendingReviews = function(){
            return $http.get("data/get-pending-reviews.php")
                .then(function(response) {
                    return response.data;
                });
        };

        var getTotalReviews = function(){
            return $http.get("data/get-total-reviews.php")
                .then(function(response) {
                    return response.data;
                });
        };

        var updateGame = function(form_data){
            return $http.post("data/update-game.php", form_data)
                .then(function(response) {
                    return response.data.body;
                });
        };

        var getNextReview = function(index){
            return $http.post("data/get-next-pending-review.php?index=" + JSON.stringify(index))
                .then(function(response) {
                    return response.data;
                });
        };

        var getPreviousReview = function(index){
            return $http.post("data/get-previous-pending-review.php?index=" + JSON.stringify(index))
                .then(function(response) {
                    return response.data;
                });
        };

        var deleteGame = function(id){
            return $http.post("data/delete-game.php?id=" + id)
                .then(function(response) {
                    return response.data;
                });
        };

        var getPagedGames = function(paginationOptions){
            return $http.get("data/get-paged-games.php?pageNum=" + paginationOptions.pageNumber + "&pageSize=" + paginationOptions.pageSize + "&sort=" + paginationOptions.sort + "&sortCol=" + paginationOptions.sortCol)
                .then(function(response){
                    return response.data;
                });
        };

        var getTotalRecords = function(){
            return $http.get("data/get-total-records.php?")
                .then(function(response){
                    return response.data;
                });
        };

        return {
            getGame: getGame,
            getCollection: getCollection,
            getPendingReviews: getPendingReviews,
            getTotalReviews: getTotalReviews,
            updateGame: updateGame,
            getNextReview: getNextReview,
            getPreviousReview: getPreviousReview,
            deleteGame: deleteGame,
            getPagedGames: getPagedGames,
            getTotalRecords: getTotalRecords
        };
    }

    var module = angular.module("PressPlay");
    module.factory("dataGet", dataGet);

    angular.module('MyModule', [], function($httpProvider) {
      // Use x-www-form-urlencoded Content-Type
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    });
}());
