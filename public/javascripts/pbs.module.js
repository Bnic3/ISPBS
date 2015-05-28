 angular
        .module('pbs',['ui.router','smart-table'])
        .controller("mainCtrl", mainCtrl)
        .controller("homeCtrl", homeCtrl)
        .config(appConfig);

    function appConfig ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home',{url: "/home",
                templateUrl: "/partial/partial-home.html",
                controller:"homeCtrl" })
            .state('about',{url: "/about",
                templateUrl: "/partial/partial-about.html",
                controller:"aboutController"})
            .state('tell',{url: "/tell",
                templateUrl: "/partial/partial-tell.html",
                controller:"homeCtrl"})
    }

    function mainCtrl($scope){
         var vm = $scope;
         vm.mydata= "Ogbeni";
    }

    function homeCtrl($scope){
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

    }




