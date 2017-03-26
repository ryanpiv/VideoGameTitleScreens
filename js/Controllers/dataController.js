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
                    return response;
                });
        };

        return {
            getGame: getGame,
            getCollection: getCollection,
            getPendingReviews: getPendingReviews
        };
    }

    var module = angular.module("PressPlay");
    module.factory("dataGet", dataGet);
}());
