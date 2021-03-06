
module app.customers {
    'use strict';

    export class CustomersComponent implements ng.IComponentOptions {

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

}
