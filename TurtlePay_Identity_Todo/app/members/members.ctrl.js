angular.module("members", [])

//.filter("asDate", function () {
//    return function (input, scope) {
//        return new Date(input);
//    }
//})

.controller('MembersCtrl',
        ['$scope', //, 'breeze', 'datacontext', '$location', '$http', '$modal'
        function ($scope) { //, breeze, datacontext, $location, $http, $modal

            $scope.test = "test";

        }
]);