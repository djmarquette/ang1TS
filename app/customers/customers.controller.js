var app;
(function (app) {
    var customer;
    (function (customer) {
        'use strict';
        var _this = this;
        var CustomersController = (function () {
            function CustomersController(customerService, $mdDialog, $rootScope) {
                this.customerService = customerService;
                this.$mdDialog = $mdDialog;
                this.$rootScope = $rootScope;
                this.customer = null;
                this.$rootScope = $rootScope;
            }
            // initialization logic runs after bindings complete
            CustomersController.prototype.$onInit = function () {
                // load the current and electionCycle legislatures from lookupService
                this.loadCustomers();
            };
            return CustomersController;
        }());
        CustomersController.$inject = ['CustomersService'];
        // putting the actual load in its own method in case we want to launch with a "refresh" button
        loadCustomers();
        void {
            this: .CustomersService.getCustomers()
                .then(function (result) {
                _this.customers = result;
            })
        };
        // load single customer based upon selectedId from list
        loadCustomer(customerId, number);
        void {
            this: .customerService.getCandidate(customerId)
                .then(function (result) {
                _this.customer = result;
            }).catch(function (error) {
                var dialogPreset = _this.$mdDialog.alert();
                dialogPreset.theme("error");
                dialogPreset.title(error.errors[0].field);
                dialogPreset.textContent(error.errors[0].message); // error contains an errors object array
                dialogPreset.ok("Close");
                _this.$mdDialog.show(dialogPreset);
            })
        };
        // save current customer record
        saveCandidate(customer, app.models.CandidateModel);
        void {
            // prep customer record for saving
            var: addressHelper, common: .helpers.AddressHelper.TheAddressHelper
                = new common.helpers.AddressHelper.TheAddressHelper(null, this.addressTypes, null),
            customer: .addressBook = addressHelper.formatPhoneFields(customer.addressBook),
            customer: .addressBook = addressHelper.removeAddressPlaceholderRecords(customer.addressBook),
            // call service to save record
            this: .customerService.saveCandidate(customer).then(function (result) {
                // update detail region and reload list with new customer
                _this.customer = result;
                _this.loadCandidates();
            }).catch(function (error) {
                var dialogPreset = _this.$mdDialog.alert();
                dialogPreset.theme("error");
                dialogPreset.title(error.errors[0].field);
                dialogPreset.textContent(error.errors[0].message); // error contains an errors object array
                dialogPreset.ok("Close");
                _this.$mdDialog.show(dialogPreset);
            })
        };
        // delete currently displayed customer
        deleteCandidate(customer, app.models.CandidateModel);
        void {
            this: .customerService.deleteCandidate(customer).then(function () {
                // Clear deleted customer and Reload customer list
                _this.customer = null;
                _this.loadCandidates();
            }).catch(function (error) {
                var dialogPreset = _this.$mdDialog.alert();
                dialogPreset.theme("error");
                dialogPreset.title(error.errors[0].field);
                dialogPreset.textContent(error.errors[0].message); // error contains an errors object array
                dialogPreset.ok("Close");
                _this.$mdDialog.show(dialogPreset);
            })
        };
        editModeChanged(editMode, boolean);
        void {
            this: .isEditMode = editMode,
            this: .$rootScope.$broadcast('setEditMode', editMode)
        };
        // link displayed customer with member selected from dialog
        linkToMember(customer, app.models.CandidateModel, memberMciId, number);
        void {
            this: .customerService.linkToMember(customer, memberMciId)
                .then(function () {
                _this.loadCandidate(customer.id);
            })
                .catch(function (error) {
                var dialogPreset = _this.$mdDialog.alert();
                dialogPreset.theme("error");
                dialogPreset.title(error.errors[0].field);
                dialogPreset.textContent(error.errors[0].message); // error contains an errors object array
                dialogPreset.ok("Close");
                _this.$mdDialog.show(dialogPreset);
            })
        };
    })(customer = app.customer || (app.customer = {}));
})(app || (app = {}));
angular
    .module('app.customer')
    .controller('CandidateController', CandidateController);
//# sourceMappingURL=customers.controller.js.map