module app.hello {
    'use strict';

    export class HelloComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: any;

        constructor() {
            this.bindings = {};
            this.controller = 'HelloController';
            this.templateUrl = '/app/hello/hello.template.html';
        }
    }

    angular
        .module('app.hello')
        .component('hello', new HelloComponent());

}
