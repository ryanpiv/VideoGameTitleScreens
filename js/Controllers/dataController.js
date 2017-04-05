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

        var updateGame = function(game){
            return $http.post("data/update-game.php", JSON.stringify(game))
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

        return {
            getGame: getGame,
            getCollection: getCollection,
            getPendingReviews: getPendingReviews,
            getTotalReviews: getTotalReviews,
            updateGame: updateGame,
            getNextReview: getNextReview
        };
    }

    var module = angular.module("PressPlay");
    module.factory("dataGet", dataGet);

    angular.module('MyModule', [], function($httpProvider) {
      // Use x-www-form-urlencoded Content-Type
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    });
}());
