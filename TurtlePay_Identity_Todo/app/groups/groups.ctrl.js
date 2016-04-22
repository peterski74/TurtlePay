
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
    $scope.groupsFileredList = [];
    $scope.TotalItems = 0;

    //----------------pagination start--------------
    $scope.currentPage = 1
    $scope.numPerPage = 10
    $scope.maxPageSize = 5;

    //$scope.makeTodos = function () {
    //    $scope.todos = [];
    //    for (i = 1; i <= 1000; i++) {
    //        $scope.todos.push({ text: 'todo ' + i, done: false });
    //    }
    //};
    //$scope.makeTodos();

    $scope.numPages = function () {
        return Math.ceil($scope.groupsList.length / $scope.numPerPage);
    };

    $scope.$watch('currentPage + numPerPage', function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;

        $scope.groupsList = $scope.groupsList.slice(begin, end);
    });

    //----------------pagination end--------------





    this.group = {};

    getGroups();
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
            $scope.TotalItems = $scope.groupsList.length;
            $scope.loading = false;


        }
    };


    function getSucceeded(data) {
        //console.log(data);
        $scope.groupsList = data[0];
        $scope.TotalItems = $scope.groupsList.length;
        $scope.loading = false;
        //logger.info("Fetched Todos " +
               // (vm.includeArchived ? "including archived" : "excluding archived"));

    }



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



]);






