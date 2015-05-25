(function () {
    'use strict';

    angular
        .module('archiveController')
        .controller('archiveController', archiveController);

   // archiveController.$inject = [''];

    /* @ngInject */
    function archiveController() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'archiveController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();