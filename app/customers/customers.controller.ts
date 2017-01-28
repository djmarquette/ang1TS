
module app.candidate {
    'use strict';

    export interface ICustomersController {

    }

    class CustomersController implements ICustomersController {
        static $inject = ['CustomersService'];


        customers: models.ICustomerModel[];
        candidate: models.ICustomerModel = null;


        constructor(private candidateService: services.ICandidateService,
            private lookupService: services.ILookupService,
            private $mdDialog: angular.material.IDialogService,
            private $rootScope: ng.IRootScopeService) {
            this.$rootScope = $rootScope;
        }

        // initialization logic runs after bindings complete
        $onInit(): void {
            // load the current and electionCycle legislatures from lookupService
            this.lookupService.getCurrentLegislature().then((result) => {
                this.currentLegislature = result;
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

        // putting the actual load in its own method in case we want to launch with a "refresh" button
        loadCandidates(): void {
            this.candidateService.getCandidates(this.currentLegislature.electionCycleLegislature)
                .then((result) => {
                    this.candidates = result;
                });
        }

        // load single candidate based upon selectedId from list
        loadCandidate(candidateId: number): void {
            this.candidateService.getCandidate(candidateId)
                .then((result) => {
                    this.candidate = result;
                }).catch(error => {
                    var dialogPreset: angular.material.IPresetDialog<angular.material.IAlertDialog> = this.$mdDialog.alert();
                    dialogPreset.theme("error");
                    dialogPreset.title(error.errors[0].field);
                    dialogPreset.textContent(error.errors[0].message);  // error contains an errors object array
                    dialogPreset.ok("Close");
                    this.$mdDialog.show(dialogPreset);
                });
        }

        // save current candidate record
        saveCandidate(candidate: models.CandidateModel): void {

            // prep candidate record for saving
            var addressHelper: common.helpers.AddressHelper.TheAddressHelper
                = new common.helpers.AddressHelper.TheAddressHelper(null,
                    this.addressTypes,
                    null);
            candidate.addressBook = addressHelper.formatPhoneFields(candidate.addressBook);
            candidate.addressBook = addressHelper.removeAddressPlaceholderRecords(candidate.addressBook);

            // call service to save record
            this.candidateService.saveCandidate(candidate).then((result) => {
                // update detail region and reload list with new candidate
                this.candidate = result;
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

        // delete currently displayed candidate
        deleteCandidate(candidate: models.CandidateModel): void {
            this.candidateService.deleteCandidate(candidate).then(() => {
                // Clear deleted candidate and Reload candidate list
                this.candidate = null;
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


        // link displayed candidate with member selected from dialog
        linkToMember(candidate: models.CandidateModel, memberMciId: number): void {
            this.candidateService.linkToMember(candidate, memberMciId)
                .then(() => {
                    this.loadCandidate(candidate.id);
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
        .module('app.candidate')
        .controller('CandidateController', CandidateController);
}
