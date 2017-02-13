// app.ts
var demoapp = angular.module('app', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
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
var app;
(function (app) {
    var customer;
    (function (customer_1) {
        'use strict';
        var CustomersController = (function () {
            function CustomersController(customerService) {
                this.customerService = customerService;
                this.customer = null;
            }
            // initialization logic runs after bindings complete
            CustomersController.prototype.$onInit = function () {
                // load the current and electionCycle legislatures from lookupService
                this.loadCustomers();
            };
            // putting the actual load in its own method in case we want to launch with a "refresh" button
            CustomersController.prototype.loadCustomers = function () {
                var _this = this;
                this.customerService.getCustomers()
                    .then(function (result) {
                    _this.customers = result;
                }).catch(function (error) {
                    console.log(error);
                });
            };
            // load single customer based upon selectedId from list
            CustomersController.prototype.loadCustomer = function (customerId) {
                var _this = this;
                this.customerService.getCustomer(customerId)
                    .then(function (result) {
                    _this.customer = result;
                }).catch(function (error) {
                    console.log(error);
                });
            };
            // save current customer record
            CustomersController.prototype.saveCustomer = function (customer) {
                var _this = this;
                // call service to save record
                this.customerService.saveCustomer(customer).then(function (result) {
                    // update detail region and reload list with new customer
                    _this.customer = result;
                    _this.loadCustomers();
                }).catch(function (error) {
                    console.log(error);
                });
            };
            // delete currently displayed customer
            CustomersController.prototype.deleteCandidate = function (customer) {
                var _this = this;
                this.customerService.deleteCustomer(customer).then(function () {
                    // Clear deleted customer and Reload customer list
                    _this.customer = null;
                    _this.loadCustomers();
                }).catch(function (error) {
                    console.log(error);
                });
            };
            CustomersController.$inject = ['CustomersService'];
            return CustomersController;
        }());
        angular
            .module('app.customer')
            .controller('CustomersController', CustomersController);
    })(customer = app.customer || (app.customer = {}));
})(app || (app = {}));
//
// module definition for customer pages
angular.module('app.customers', []);
var app;
(function (app) {
    var hello;
    (function (hello) {
        'use strict';
        var HelloComponent = (function () {
            function HelloComponent() {
                this.bindings = {};
                this.controller = 'HelloController';
                this.templateUrl = '/app/hello/hello.template.html';
            }
            return HelloComponent;
        }());
        hello.HelloComponent = HelloComponent;
        angular
            .module('app.hello')
            .component('hello', new HelloComponent());
    })(hello = app.hello || (app.hello = {}));
})(app || (app = {}));
var app;
(function (app) {
    var hello;
    (function (hello) {
        'use strict';
        var HelloController = (function () {
            function HelloController() {
            }
            // initialization logic runs after bindings complete
            HelloController.prototype.$onInit = function () {
                this.name = "TLC Brown Bag Attendees";
            };
            return HelloController;
        }());
        angular
            .module('app.hello')
            .controller('HelloController', HelloController);
    })(hello = app.hello || (app.hello = {}));
})(app || (app = {}));
//
// module definition for customer pages
angular.module('app.hello', []);
var app;
(function (app) {
    var models;
    (function (models) {
        'use strict';
        var CustomerModel = (function () {
            function CustomerModel(id, firstName, middleName, lastName) {
                if (id === void 0) { id = 0; }
                if (firstName === void 0) { firstName = ""; }
                if (middleName === void 0) { middleName = ""; }
                if (lastName === void 0) { lastName = ""; }
                this.id = id;
                this.firstName = firstName;
                this.middleName = middleName;
                this.lastName = lastName;
            }
            return CustomerModel;
        }());
        models.CustomerModel = CustomerModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var CustomersService = (function () {
            function CustomersService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            CustomersService.prototype.getCustomers = function () {
                var def = this.$q.defer();
                var customers = [];
                return def.promise;
            };
            CustomersService.prototype.getCustomer = function (customerId) {
                var def = this.$q.defer();
                return def.promise;
            };
            CustomersService.prototype.saveCustomer = function (customer) {
                var def = this.$q.defer();
                return def.promise;
            };
            CustomersService.prototype.deleteCustomer = function (customer) {
                var def = this.$q.defer();
                return def.promise;
            };
            CustomersService.$inject = ['$http', '$q'];
            return CustomersService;
        }());
        services.CustomersService = CustomersService;
        angular
            .module('app.services')
            .service('CustomersService', CustomersService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=app.js.map