
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
angular.module("members", [])


.controller('MembersCtrl', ['$q', '$scope', '$http', '$timeout', 'dataservice', 'logger', function ($q, $scope, $http, $timeout, dataservice, logger) {
    // The controller's API to which the view binds
    //var vm = this;



    $scope.MembersList = [];
    $scope.TotalMembers = 0;

    this.member = {};

    getMembers();
    //TotalItems();

    function getMembers(forceRefresh) {
        $http({
            method: 'GET',
            url: 'http://private-cff96-organisation1.apiary-mock.com/organisation'
        }).success(function (_data) {
            getSucceeded(_data);

            logger.info("Fetched members");

        }).error(function (data, status) {
            console.log("Error status : " + status);
        });
    }


    function getSucceeded(data) {
        $scope.MembersList = data;
        $scope.TotalMembers = $scope.MembersList.length;
        $scope.loading = false;


    }



    $scope.addMember = function (member) {

        alert('adding member')

        $scope.MembersList.push(this.member);



        ////saving to database
        //$http.post('/odata/ProductReviews', this.review).success(function (data, status, headers) {

        //});
        ////this.Org = {};
    };

    function TotalMembers() {
        var count = $scope.MembersList.length;
        if (count > 0) {
            return count;
        }
        return 0;
    };




}



]);






