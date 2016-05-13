﻿
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

'use strict';

angular.module("groups", [])

.controller('GroupsCtrl', ['$q', '$scope', '$http', '$timeout', 'dataservice', 'logger', 'appSettings', function ($q, $scope, $http, $timeout, dataservice, logger, appSettings) {
    // The controller's API to which the view binds
    $scope.dateFormat = appSettings.dateFormat;
    $scope.groupsList = [];
    $scope.groupsFilteredList = [];
    $scope.TotalItems = 0;
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.totalPages;

    this.group = {};

    getGroups();

    //----------------pagination start--------------
    //https://github.com/fdietz/recipes-with-angular-js-examples/tree/master/chapter8/recipe2
    //https://github.com/fdietz/recipes-with-angular-js-examples/blob/master/chapter8/recipe2/index.html
    //http://jsfiddle.net/api/post/library/pure/
       

    $scope.filter = function () {
        window.setTimeout(function () { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.totalPages = Math.ceil($scope.groupsFilteredList.length / $scope.itemsPerPage);
        }, 10);
        $scope.range();
    };

    $scope.range = function () {
        var rangeSize = $scope.itemsPerPage; //10 ;//
        $scope.totalPages = Math.ceil($scope.groupsFilteredList.length / $scope.itemsPerPage);
        //rangeSize = $scope.totalPages;



        var ret = [];
        var start;


        start = $scope.currentPage;
        if (start > $scope.totalPages - rangeSize) {
            start = $scope.totalPages - rangeSize;
        }

        for (var i = start; i < start + rangeSize; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.firstPage = function () {
        //if ($scope.currentPage > 0) {
            $scope.currentPage=0;
        //}
    };
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };


    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        //return Math.ceil($scope.TotalItems / $scope.itemsPerPage) - 1;
        return Math.ceil($scope.groupsFilteredList.length / $scope.itemsPerPage);
    };

    $scope.nextPage = function () {
        //$scope.pageCount()
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };
    
    $scope.lastPage = function () {
        //$scope.pageCount()
        
        $scope.currentPage = $scope.pageCount();
        
    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === ($scope.pageCount() -1) ? "disabled" : "";
               

        //return ($scope.currentPage) === ($scope.pageCount() - 1) ? "disabled" : "";
        //$scope.pageCount()$scope.totalPages
    };

    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };



    //----------------pagination end--------------


    

    //TotalItems();

    //function getGroups(forceRefresh) {
    //    $http({
    //        method: 'GET',
    //        url: 'http://localhost:65207/breeze/groups/Groups'
    //        //http://private-75243-groups14.apiary-mock.com/groups
    //    }).success(function (_data) {
    //        getSucceeded(_data);

    //       // logger.info("Fetched orgs");

    //    }).error(function (data, status) {
    //        console.log("Error status : " + status);
    //    });
    //}

    function getGroups() {
        //editEnd();
        // wait for Ng binding to set 'includeArchived' flag, then proceed
        $timeout(getGroupsImpl, 0);

        function getGroupsImpl() {
            dataservice.getGroups()
                .then(querySucceeded);
        }

        function querySucceeded(data) {
            //vm.items = data.results;
            //logger.info("Fetched Todos " +
            //(vm.includeArchived ? "including archived" : "excluding archived"));

            $scope.groupsList = data.results; // data;
            $scope.groupsFilteredList = data.results;
            $scope.TotalItems = $scope.groupsList.length;
            $scope.loading = false;

            //setPage(1);
           // rang(1, $scope.numberOfPages())

        }
    };


    function getSucceeded(data) {
        //console.log(data);
        $scope.groupsList = data[0];
        $scope.TotalItems = $scope.groupsList.length;
        $scope.loading = false;
        //logger.info("Fetched Todos " +
        // (vm.includeArchived ? "including archived" : "excluding archived"));

    };



    $scope.addGroup = function (group) {

        // alert('adding group')
        var newGroup = dataservice.createGroup(group);
        var result = save(true);

        //logger.log("id is", g.entities[0]["Id"]);//newGroup.Id
        //group.Id = g.entities[0]["Id"];//newGroup.Id
        $scope.groupsList.push(newGroup);//group

        $scope.TotalItems = $scope.groupsList.length;

        //$scope.$apply();


        ////saving to database
        //$http.post('/odata/ProductReviews', this.review).success(function (data, status, headers) {

        //});
        this.group = {};
    };
    function save(force) {
        // Save if have changes to save AND
        // if must save OR (save not suspended AND not editing a Todo)
        if (dataservice.hasChanges() && (force)) {
            var res = dataservice.saveChanges();
            return res;
        }
        // Decided not to save; return resolved promise w/ no result
        return $q.when(false);
    }

    function TotalItems() {
        var count = $scope.groupsList.length;
        if (count > 0) {
            return count;
        }
        return 0;
    };




}



])
    
//.filter('pagination', function () {
//    return function (input, start) {
//        start = +start;
//        return input.slice(start);
//    };
//})
//;
.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});







