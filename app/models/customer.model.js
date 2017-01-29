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
//# sourceMappingURL=customer.model.js.map