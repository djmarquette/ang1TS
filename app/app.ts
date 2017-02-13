// app.ts
/// <reference path="../typings/_shim.d.ts" />

var bbapp = angular.module('bbapp',['ngRoute'])
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
        }])


    class CustomersComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: any;

        constructor() {
            this.bindings = {};
            this.controller = 'CustomersController';
            this.templateUrl = '/app/customers/customers.template.html';
        }
    }

    angular
        .module('app.customers')
        .component('customers', new CustomersComponent());
