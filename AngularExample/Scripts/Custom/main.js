'use strict';
(function () {

    
        //include dependency params as strings in array to survive minification
        angular.module('schedulerequestsapp')
            .controller('home',
            ['schedulerequestservice', '$scope',  function(schedulerequestservice, $scope) {
                    //note syntax and how params are resolved at run time
                    $scope.formSubmit = submit;
                    $scope.formdata = {};
                    //load intitial data
                    getData();
                    function submit() {
                        
                        schedulerequestservice.addData($scope.formdata)
                                .then(function(data) {
                                    console.log(data);
                                    //load intitial data
                                    getData();
                                },
                                    function () { alert("post failed") });
 
                    }

                    function getData() {
                        schedulerequestservice.getDataFromServer()
                        .then(function (res) { $scope.scheduledata = res.data }, function () { alert("webapi call failed") });

                    }

                }
            ]);
    })()