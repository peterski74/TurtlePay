
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
    //$scope.groupsFileredList = [];
    $scope.TotalItems = 0;

    //----------------pagination start--------------
   

    //$scope.itemsPerPage = 5;
    //$scope.currentPage = 0;

    //$scope.prevPage = function () {
    //    if ($scope.currentPage > 0) {
    //        $scope.currentPage--;
    //    }
    //};
    //$scope.prevPageDisabled = function () {
    //    return $scope.currentPage === 0 ? "disabled" : "";
    //};

    //$scope.pageCount = function () {
    //    return Math.ceil($scope.groupsList.length / $scope.itemsPerPage) - 1;
    //};

    //$scope.nextPage = function () {
    //    if ($scope.currentPage < $scope.pageCount()) {
    //        $scope.currentPage++;
    //    }
    //};

    //$scope.nextPageDisabled = function () {
    //    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    //};


    $scope.curPage = 0;
    $scope.pageSize = 6;
   
    $scope.totalPages = $scope.groupsList.length / $scope.pageSize

    $scope.numberOfPages = function () {
        return Math.ceil($scope.groupsList.length / $scope.pageSize);
    };

    $scope.pages = [];
    
     

    //$scope.pager = {};
    ////$scope.setPage = setPage;

    //function GetPager(totalItems, currentPage, pageSize) {
    //    //, currentPage, pageSize
    //    // default to first page
    //    currentPage = 1; //currentPage ||

    //    // default page size is 5
    //    pageSize = 5; //pageSize ||

    //    // calculate total pages
    //    var totalPages = Math.ceil(totalItems / pageSize);

    //    var startPage, endPage;
    //    if (totalPages <= 10) {
    //        // less than 10 total pages so show all
    //        startPage = 1;
    //        endPage = totalPages;
    //    } else {
    //        // more than 3 total pages so calculate start and end pages
    //        if (currentPage <= 6) {
    //            startPage = 1;
    //            endPage = 10;
    //        } else if (currentPage + 4 >= totalPages) {
    //            startPage = totalPages - 9;
    //            endPage = totalPages;
    //        } else {
    //            startPage = currentPage - 5;
    //            endPage = currentPage + 4;
    //        }
    //    }

    //    // calculate start and end item indexes
    //    var startIndex = (currentPage - 1) * pageSize;
    //    var endIndex = startIndex + pageSize;

    //    // create an array of pages to ng-repeat in the pager control
    //    var pages = rang(startPage, endPage);
              
    //    //range(startPage, endPage + 1);
        

    //    // return object with all pager properties required by the view
    //    return {
    //        totalItems: totalItems,
    //        currentPage: currentPage,
    //        pageSize: pageSize,
    //        totalPages: totalPages,
    //        startPage: startPage,
    //        endPage: endPage,
    //        startIndex: startIndex,
    //        endIndex: endIndex,
    //        pages: pages
    //    }
    //};
    
    function rang(startPage, endPage) {
        endPage = endPage + 1
       // var result = [];
        for (var i = startPage; i != endPage; ++i) {
            $scope.pages.push(i)
        }
        //return result;
    };

    //    function setPage(page) {
    //        if (page < 1 || page > $scope.pager.totalPages) {
    //            return;
    //        }
 
    //        // get pager object from service
    //        $scope.pager = GetPager($scope.groupsList, page);
 
    //        // get current page of items
    //        // vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex);
    //        $scope.groupsList = $scope.groupsList.slice(pager.startIndex, pager.endIndex);
    //    };

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

            //setPage(1);
            rang(1, $scope.numberOfPages())

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
    
.filter('pagination', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    };
})
;





