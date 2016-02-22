angular.module("organisation", [])

//.filter("asDate", function () {
//    return function (input, scope) {
//        return new Date(input);
//    }
//})
   
    //test

.controller('OrganisationCtrl',
        ['$scope', //, 'breeze', 'datacontext', '$location', '$http', '$modal'
        function ($scope) { //, breeze, datacontext, $location, $http, $modal

            $scope.organisationID = "1";
            $scope.organisationName = "test org";

        }
        ]);