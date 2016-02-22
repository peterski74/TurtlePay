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
angular.module("organisation", [])


.controller('OrganisationCtrl', ['$q', '$scope', '$http', '$timeout', 'dataservice', 'logger', function ($q, $scope, $http, $timeout, dataservice, logger) {
    // The controller's API to which the view binds
    //var vm = this;



    $scope.Organisations = [];
    $scope.TotalItems = 0;

    this.Org = {};

    getOrganisations();
    //TotalItems();

    function getOrganisations(forceRefresh) {
        $http({
            method: 'GET',
            url: 'http://private-cff96-organisation1.apiary-mock.com/organisation'
        }).success(function (_data) {
            getSucceeded(_data);

            logger.info("Fetched orgs");

        }).error(function (data, status) {
            console.log("Error status : " + status);
        });
    }


    function getSucceeded(data) {
        $scope.Organisations = data;
        $scope.TotalItems = $scope.Organisations.length;
        $scope.loading = false;


    }



    $scope.addOrganisation = function (org) {

        alert('adding org')

        $scope.Organisations.push(this.Org);



        ////saving to database
        //$http.post('/odata/ProductReviews', this.review).success(function (data, status, headers) {

        //});
        ////this.Org = {};
    };

    function TotalItems() {
        var count = $scope.Organisations.length;
        if (count > 0) {
            return count;
        }
        return 0;
    };













}



]);
