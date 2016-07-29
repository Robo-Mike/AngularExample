(function () {
    'use strict';
    //inject http
    angular.module('schedulerequestsapp').service('schedulerequestservice', ['$http',Main]);
    //.service services are invoked using new, so funcs etc need to be assigned to 'this'
    //.factory services are different need to return object...(bit like constructor vs seaf)
        function Main($http) {
            
                var myscope = this;
                myscope.getDataFromServer = function getDataFromServer() {
                    //IMPORTANT - let controller deal with success/error
                    return $http.get('/ScheduleRequest/List');

                };

            myscope.addData = function addData(data) {
                return $http.post( '/ScheduleRequest/Add',$.param(data),{
                   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    // set the headers so angular passing info as form data (not request payload)
                });
            };
        }


    }
)()


