/**
 * Created by john.nana on 5/28/2015.
 */
angular.module('pbs')
    .value('EmployeeServiceEndpoint', 'http://localhost:3000/api/employee')
    .service('EmployeeService',employeeService)



function employeeService($http, EmployeeServiceEndpoint){
    function getEmployees(){
        return $http.get(EmployeeServiceEndpoint);
    }

    function createEmployee(employee){
        return $http.post(EmployeeServiceEndpoint, employee)
    }

    function deleteEmployee(id){
        return $http.delete(EmployeeServiceEndpoint,{params:{id:id}})
    }

    function editEmployee(employee){
        return $http.put(EmployeeServiceEndpoint,employee)
    }
    return  {
        allEmployees: getEmployees,
        createEmployee: createEmployee,
        removeEmployee: deleteEmployee,
        editEmployee: editEmployee
    }

}