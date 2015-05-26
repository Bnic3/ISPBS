(function () {
    'use strict';

    angular
        .module('pbs',['ui.router','tableSort'])
        .config(appConfig);

    function appConfig ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home',{url: "/partial/home",
                templateUrl: "/partial/partial-home.html"})
            .state('about',{url: "/partial/about",
                templateUrl: "/partial/partial-about.html"})
            .state('tell',{url: "/partial/tell",
                templateUrl: "/partial/partial-tell.html"})
    }

   /* function mainCtrl($scope){
         var vm = $scope;
         vm.mydata= "Ogbeni";
    }

    function homeCtrl(){
        var vm = $scope;
        vm.items = [
            {Id: "01", Name: "A", Price: "1.00", Quantity: "1"},
            {Id: "02", Name: "B", Price: "10.00", Quantity: "1"},
            {Id: "04", Name: "C", Price: "9.50", Quantity: "10"},
            {Id: "03", Name: "a", Price: "9.00", Quantity: "2"},
            {Id: "06", Name: "b", Price: "100.00", Quantity: "2"},
            {Id: "05",Name: "c", Price: "1.20", Quantity: "2"}
        ];
        vm.noitems = []

    }*/




})();