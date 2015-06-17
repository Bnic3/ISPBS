 angular
        .module('pbs',['ui.router','smart-table'])
        .controller("mainCtrl", mainCtrl)
        .controller("homeCtrl", homeCtrl)
        .controller("employeesCtrl", employeesCtrl)
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
            .state('employees',{url: "/employees",
                templateUrl: "/partial/partial-employees.html",
                controller:"employeesCtrl"})
            .state('configs',{url: "/configs",
                templateUrl: "/partial/partial-configs.html",
                controller:"homeCtrl"})
    }

    function mainCtrl($scope){
         var vm = $scope;
         vm.mydata= "Ogbeni";
    }

    function homeCtrl($scope, EmployeeService, $q){
        var vm = $scope;
        var model = {};
        model.getEmployees= function(){
            return EmployeeService.allEmployees()
                .success(function (result){
                    model.employees= result;
                })
                .error(function (result) {
                    toastr.error(result.message, 'An Error Occured');
                })

        };

        $q.when(model.getEmployees())
            .then(function(result){
                model.employees= result.data;
            })


        vm.model= model;


    }//end homeCtrl

 function employeesCtrl($scope, EmployeeService,$q){
     var vm = $scope;
     vm.hideStatus= true;
     vm.hideEditBtn=true;
     vm.hideAddBtn= false;

     vm.adduser= {};
     var model = {};


     model.createEmployee= function(data){
         return EmployeeService.createEmployee(data).success(function(result){
             var tmp = result.data;
            toastr.success("Employee successfully created", "Info");
             model.refresh();
         }).error(function(result){})
     }

     model.getEmployees= function(){
         return EmployeeService.allEmployees()
             .success(function (result){
                 model.employees= result;
             })
             .error(function (result) {
                 toastr.error(result.message, 'An Error Occurred');
             })

     };

     $q.when(model.getEmployees())
         .then(function(result){
             model.employees= result.data;
         })

     model.removeEmployee= function(id){
         return EmployeeService.removeEmployee(id)
             .success(function(result){
                 toastr.success("Employee removed successfully","transaction update");
                 model.getEmployees();

             })
             .error(function (result) {
                 toastr.error(result.message, 'An Error Occurred');
             })
     }

    model.editEmployee = function(employee){
        return EmployeeService.editEmployee(employee)
            .success(function(result){
                toastr.info("Employee account was successfully edited","transaction update");
                model.getEmployees();
                model.refresh();
            })
            .error(function (result) {
                toastr.error(result.message, 'An Error Occurred');
            })
    }

     vm.toggle = function() {
         vm.hideStatus = !vm.hideStatus;
     };
     model.refresh = function(){
         model.getEmployees();// refresh
         vm.adduser= {}; //clear
         vm.hideStatus= true; //collapse
         vm.hideEditBtn= true;
         vm.hideAddBtn= false;

     }
     model.prepareEdit= function(employee){
         vm.toggle();
         vm.hideEditBtn= false;
         vm.hideAddBtn= true;
         vm.adduser= employee;

     }
    model.validateForm= function(){
       // if()


    }
    /* model.units= [{name:'Internal IT'},
         {name:'Legal'},
         {name:'HR'},
         {name:'Finance'},
         {name:'Engineering'},
         {name:'Sales'},
         {name:'GSC'},
         {name:'SDM'},
         {name:'Solutions'},
         {name:'Project'}]*/



     vm.model= model;
 }// end employeesCtrl





