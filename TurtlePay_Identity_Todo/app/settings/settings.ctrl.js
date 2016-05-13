/*
Author Ansar Javed
Date 12/05/2016
*/
/* 
 * relies on Angular injector to provide:
 *     $q - promises manager
 *     $timeout - Angular equivalent of 'setTimeout'
 *     dataservice - the application data access service
 *     logger - the application's logging facility
 */

angular.module("settings", [])

.controller('SettingsCtrl', ['$q', '$scope', '$http', '$timeout', 'dataservice', 'logger', function ($q, $scope, $http, $timeout, dataservice, logger) {
    // The controller's API to which the view binds

    //$scope.groupsList = [];
    //$scope.groupsFilteredList = [];
    //$scope.TotalItems = 0;
    //$scope.itemsPerPage = 5;
    //$scope.currentPage = 0;
    //$scope.totalPages;

    this.Settings = {};

    getSettings();


    function getSettings() {
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



]);







