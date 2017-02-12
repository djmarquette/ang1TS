// app.ts

import * as  angular from 'angular';
//import * as  route from 'angular-route';

export var app = angular.module('app',['ngRoute'])
        .config(['$locationProvider', '$routeProvider',
            ($locationProvider: ng.ILocationProvider, $routeProvider:any) => {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', {
                    template: '<hello></hello>'
                })
                .when('/customers/', {
                    template: '<customers></customers>'
                })
                .when('/orders/', {
                    template: '<orders></orders>'
                })
                .otherwise({ redirectTo: '/' });
        }]);
