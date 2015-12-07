angular.module("settings", [])

//.filter("asDate", function () {
//    return function (input, scope) {
//        return new Date(input);
//    }
//})

.controller('SettingsCtrl',
        ['$scope', //, 'breeze', 'datacontext', '$location', '$http', '$modal'
        function ($scope) { //, breeze, datacontext, $location, $http, $modal

            $scope.test = "test";

        }
]);