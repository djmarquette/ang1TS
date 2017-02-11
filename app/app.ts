// app.ts

import { module } from 'angular';
// import {module} from 'angular';
import * as route from 'angular-route';

export var app = module('app',['ngRoute'])

        .config(['$locationProvider', '$routeProvider',
            ($locationProvider: ng.ILocationProvider, $routeProvider:route.$routeProvider) => {
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

