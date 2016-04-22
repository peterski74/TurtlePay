
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
        save(true);

        logger.log("id is", newGroup.Id);
        group.Id = newGroup.Id
        $scope.groupsList.push(group);//group
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
            return dataservice.saveChanges();
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






