
module app.customer {
    'use strict';

    export interface ICustomersController {
        loadCustomers: models.ICustomerModel[];

    }

    class CustomersController implements ICustomersController {
        static $inject = ['CustomersService'];


        customers: models.ICustomerModel[];
        customer: models.ICustomerModel = null;
        loadCustomers(): models.ICustomerModel[];


        constructor(private customerService: services.ICustomerService,
            private $mdDialog: angular.material.IDialogService,
            private $rootScope: ng.IRootScopeService) {
            this.$rootScope = $rootScope;
        }

        // initialization logic runs after bindings complete
        $onInit(): void {
            // load the current and electionCycle legislatures from lookupService
            this.loadCustomers();
            }).catch(error => {
                var dialogPreset: angular.material.IPresetDialog<angular.material.IAlertDialog> = this.$mdDialog.alert();
                dialogPreset.theme("error");
                dialogPreset.title(error.errors[0].field);
                dialogPreset.textContent(error.errors[0].message);  // error contains an errors object array
                dialogPreset.ok("Close");
                this.$mdDialog.show(dialogPreset);
            });
        }

        // putting the actual load in its own method in case we want to launch with a "refresh" button
        loadCustomers(): void {
            this.CustomersService.getCustomers()
                .then((result) => {
                    this.customers = result;
                });
        }

        // load single customer based upon selectedId from list
        loadCustomer(customerId: number): void {
            this.customerService.getCandidate(customerId)
                .then((result) => {
                    this.customer = result;
                }).catch(error => {
                    var dialogPreset: angular.material.IPresetDialog<angular.material.IAlertDialog> = this.$mdDialog.alert();
                    dialogPreset.theme("error");
                    dialogPreset.title(error.errors[0].field);
                    dialogPreset.textContent(error.errors[0].message);  // error contains an errors object array
                    dialogPreset.ok("Close");
                    this.$mdDialog.show(dialogPreset);
                });
        }

        // save current customer record
        saveCandidate(customer: models.CandidateModel): void {

            // prep customer record for saving
            var addressHelper: common.helpers.AddressHelper.TheAddressHelper
                = new common.helpers.AddressHelper.TheAddressHelper(null,
                    this.addressTypes,
                    null);
            customer.addressBook = addressHelper.formatPhoneFields(customer.addressBook);
            customer.addressBook = addressHelper.removeAddressPlaceholderRecords(customer.addressBook);

            // call service to save record
            this.customerService.saveCandidate(customer).then((result) => {
                // update detail region and reload list with new customer
                this.customer = result;
                this.loadCandidates();
            }).catch(error => {
                var dialogPreset: angular.material.IPresetDialog<angular.material.IAlertDialog> = this.$mdDialog.alert();
                dialogPreset.theme("error");
                dialogPreset.title(error.errors[0].field);
                dialogPreset.textContent(error.errors[0].message);  // error contains an errors object array
                dialogPreset.ok("Close");
                this.$mdDialog.show(dialogPreset);
            });
        }

        // delete currently displayed customer
        deleteCandidate(customer: models.CandidateModel): void {
            this.customerService.deleteCandidate(customer).then(() => {
                // Clear deleted customer and Reload customer list
                this.customer = null;
                this.loadCandidates();
            }).catch(error => {
                var dialogPreset: angular.material.IPresetDialog<angular.material.IAlertDialog> = this.$mdDialog.alert();
                dialogPreset.theme("error");
                dialogPreset.title(error.errors[0].field);
                dialogPreset.textContent(error.errors[0].message);  // error contains an errors object array
                dialogPreset.ok("Close");
                this.$mdDialog.show(dialogPreset);
            });
        }

        editModeChanged(editMode: boolean): void {
            this.isEditMode = editMode;
            this.$rootScope.$broadcast('setEditMode', editMode);
        }


        // link displayed customer with member selected from dialog
        linkToMember(customer: models.CandidateModel, memberMciId: number): void {
            this.customerService.linkToMember(customer, memberMciId)
                .then(() => {
                    this.loadCandidate(customer.id);
                })
                .catch(error => {
                    var dialogPreset:
                        angular.material.IPresetDialog<angular.material.IAlertDialog> = this.$mdDialog.alert();
                    dialogPreset.theme("error");
                    dialogPreset.title(error.errors[0].field);
                    dialogPreset.textContent(error.errors[0].message);  // error contains an errors object array
                    dialogPreset.ok("Close");
                    this.$mdDialog.show(dialogPreset);
                });
        }
    }

    angular
        .module('app.customer')
        .controller('CandidateController', CandidateController);
}
