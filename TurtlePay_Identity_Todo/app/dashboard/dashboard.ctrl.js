angular.module("dashboard", [])

//.filter("asDate", function () {
//    return function (input, scope) {
//        return new Date(input);
//    }
//})

.controller('DashboardCtrl',
        ['$scope', '$http', //, 'breeze', 'datacontext', '$location', '$http', '$modal'
        function ($scope, $http) { //, breeze, datacontext, $location, $http, $modal

            //$scope.getGroups = getGroups;
            //$scope.getGroups();

            $scope.test = "test HOHO";
            $scope.groupsList = [];

            function getGroups(forceRefresh) {
                $http({
                    method: 'GET',
                    url: 'http://private-9feca-groups14.apiary-mock.com/groups'
                }).success(function (_data) {
                    getSucceeded(_data);
                }).error(function (data, status) {
                    console.log("Error status : " + status);
                });
            }
            getGroups();

            function getSucceeded(data) {
                $scope.groupsList = data;
                $scope.loading = false;
            }

        }
]);