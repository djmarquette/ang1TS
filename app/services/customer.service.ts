module app.services {
    'use strict';

    export interface ICustomersService {

    }

    export class CustomersService implements ICustomersService {
        static $inject = ['$http', '$q'];
        host: string;

        constructor($http, $q){
            
        }

    }
    angular
        .module('app.services')
        .service('CustomersService', CustomersService);
}
