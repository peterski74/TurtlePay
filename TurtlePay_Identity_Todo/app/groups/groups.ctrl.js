angular.module("groups", [])

//.filter("asDate", function () {
//    return function (input, scope) {
//        return new Date(input);
//    }
//})

.controller('GroupsCtrl',
        ['$scope', '$http',//, 'breeze', 'datacontext', '$location', '$http', '$modal'
        function ($scope,$http) { //, breeze, datacontext, $location, $http, $modal

            $scope.test = "test x";
            $scope.groupsList = [];
            function getGroups(forceRefresh) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:65207/odata/WebAPIGroups'
                }).success(function (_data) {
                    getSucceeded(_data);
                }).error(function (data, status) {
                    console.log("Error status : " + status);
                });
            }
            getGroups();

            function getSucceeded(data) {
                $scope.groupsList = data.value;
                $scope.loading = false;
            }

        }
        ]);









