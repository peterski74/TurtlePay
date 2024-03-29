﻿/* main: startup script creates the 'app' module */
(function() {

    // app module depends on "Breeze Angular Service"
    angular.module('app', ['breeze.angular', 'ui.router', 'oc.lazyLoad'])

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

