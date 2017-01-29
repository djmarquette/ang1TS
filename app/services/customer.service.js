var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var CustomersService = (function () {
            function CustomersService($http, $q) {
            }
            return CustomersService;
        }());
        CustomersService.$inject = ['$http', '$q'];
        services.CustomersService = CustomersService;
        angular
            .module('app.services')
            .service('CustomersService', CustomersService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=customer.service.js.map