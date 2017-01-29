var app;
(function (app) {
    var customers;
    (function (customers) {
        'use strict';
        var CustomersComponent = (function () {
            function CustomersComponent() {
                this.bindings = {};
                this.controller = 'CustomersController';
                this.templateUrl = '/app/customers/customers.template.html';
            }
            return CustomersComponent;
        }());
        customers.CustomersComponent = CustomersComponent;
        angular
            .module('app.customers')
            .component('customers', new CustomersComponent());
    })(customers = app.customers || (app.customers = {}));
})(app || (app = {}));
//# sourceMappingURL=customers.component.js.map