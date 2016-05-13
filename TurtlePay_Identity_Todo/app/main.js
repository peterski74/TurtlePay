/* main: startup script creates the 'app' module */
(function() {
    'use strict';
    // app module depends on "Breeze Angular Service"
    angular.module('app', ['breeze.angular', 'ui.router', 'oc.lazyLoad'])

    //app Settings
    .constant('appSettings', {
        language: 'en',
        dateFormat: 'dd/MM/yyyy'
        
        })
   

    // app Router
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            // DASHBOARD STATES AND NESTED VIEWS ========================================
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.view.html',
                controller: 'DashboardCtrl',
                resolve: {
                    dashboard: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'dashboard',
                            files: ['app/dashboard/dashboard.ctrl.js']
                        });
                    }]
                }
            })

            // ORGANISATION STATES AND NESTED VIEWS ========================================
            .state('organisation', {
                url: '/organisation',
                templateUrl: 'app/organisation/organisation.view.html',
                controller: 'OrganisationCtrl',
                resolve: {
                    organisation: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'organisation',
                            files: ['app/organisation/organisation.ctrl.js']
                        });
                    }]
                }
            })


            // GROUPS STATES AND NESTED VIEWS ========================================
            .state('groups', {
                url: '/groups',
                templateUrl: 'app/groups/groups.view.html',
                controller: 'GroupsCtrl as groups',
                resolve: {
                    contacts: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'groups',
                            files: ['app/groups/groups.ctrl.js']
                        });
                    }]
                }
            })
            // GROUPS STATES AND NESTED VIEWS ========================================
            .state('groupsList', {
                url: '/groupsList',
                templateUrl: 'app/groups/groupsList.view.html',
                controller: 'GroupsCtrl as groups',
                resolve: {
                    contacts: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'groups',
                            files: ['app/groups/groups.ctrl.js']
                        });
                    }]
                }
            })
        // MEMBERS STATES AND NESTED VIEWS ========================================
            .state('members', {
                url: '/members',
                templateUrl: 'app/members/members.view.html',
                controller: 'MembersCtrl as members',
                resolve: {
                    contacts: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'members',
                            files: ['app/members/members.ctrl.js']
                        });
                    }]
                }
            })

            // MEMBERS STATES AND NESTED VIEWS ========================================
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/settings/settings.view.html',
                controller: 'SettingsCtrl as settings',
                resolve: {
                    contacts: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'settings',
                            files: ['app/settings/settings.ctrl.js']
                        });
                    }]
                }
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                // we'll get to this in a bit       
            });

    });

})();

