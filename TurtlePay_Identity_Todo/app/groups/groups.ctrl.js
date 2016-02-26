
/*
Author Ansar Javed
Date 19/02/2016

*/
/* TodoController - the controller for the "todo view" 
 * relies on Angular injector to provide:
 *     $q - promises manager
 *     $timeout - Angular equivalent of 'setTimeout'
 *     dataservice - the application data access service
 *     logger - the application's logging facility
 */

//angular.module('app')
angular.module("groups", [])


.controller('GroupsCtrl', ['$q', '$scope', '$http', '$timeout', 'dataservice', 'logger', function ($q, $scope, $http, $timeout, dataservice, logger) {
    // The controller's API to which the view binds
    //var vm = this;



    $scope.groupsList = [];
    $scope.TotalItems = 0;

    this.group = {};

    getGroups();
    //TotalItems();

    function getGroups(forceRefresh) {
        $http({
            method: 'GET',
            url: 'http://private-75243-groups14.apiary-mock.com/groups'
        }).success(function (_data) {
            getSucceeded(_data);

           // logger.info("Fetched orgs");

        }).error(function (data, status) {
            console.log("Error status : " + status);
        });
    }


    function getSucceeded(data) {
        $scope.groupsList = data;
        $scope.TotalItems = $scope.groupsList.length;
        $scope.loading = false;


    }



    $scope.addGroup = function (group) {

       // alert('adding group')

        $scope.groupsList.push(group);
        $scope.TotalItems = $scope.groupsList.length;

        //$scope.$apply();
        
        
        ////saving to database
        //$http.post('/odata/ProductReviews', this.review).success(function (data, status, headers) {

        //});
        this.group = {};
    };

    function TotalItems() {
        var count = $scope.groupsList.length;
        if (count > 0) {
            return count;
        }
        return 0;
    };




}



]);






