(function () {
    'use strict';

    angular
        .module('pbs')
        .controller('homeController', homeController);

    homeController.$inject = [''];

    /* @ngInject */
    function homeController() {
        /* jshint validthis: true */
        var vm = this;

         vm.mydata= "Ogbeni";

    }
})();
/*
.controller("mainctrl", function($scope){
    $scope.mydata = "My Scope";

})*/
