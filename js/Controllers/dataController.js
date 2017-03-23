(function() {

    var dataGet = function($http) {
        var getGame = function(gamename) {
            return $http.get("data/get-games-title.php?search=" + encodeURIComponent(gamename))
                .then(function(response) {
                    return response.data.body;
                });
        };

        var getCollection = function(id) {
            return $http.get("data/get-games-collection.php?search=" + encodeURIComponent(id))
                .then(function(response) {
                    return response.data.body;
                });
        };

        var submitGame = function(gamename) {
            return "";
        };

        return {
            getGame: getGame,
            getCollection: getCollection
        };
    }

    var module = angular.module("PressPlay");
    module.factory("dataGet", dataGet);
}());
