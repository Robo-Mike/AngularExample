'use strict';

describe('ScheduleRequestService',
    function () {
        var serviceobj, testResponse, httpBackend;
        beforeEach(angular.mock.module(function ($provide) {
           //note dont need to set up an alternative provide for $http, using httpbackend, but we do need to call inject to get a ref to it
        }));
        //initialise service module
        beforeEach(angular.mock.module('schedulerequestsapp'));
        //including httpbackend service in dependencies tells
        //angular mock to use this rather than the real $http service 
        //schedulerequest service is included just to get ref to the instances used
        beforeEach(angular.mock.inject(
            function(schedulerequestservice, $httpBackend) {
                serviceobj = schedulerequestservice;
                httpBackend = $httpBackend;
            }
        ));
        
        //test
        it("getdata should return data", function () {
            httpBackend
            .whenGET('/ScheduleRequest/List')
            .respond(200, [{ frequency: "daily", urltoschedule: "www.example1.com" },
                        { frequency: "weekly", urltoschedule: "www.example2.com" }]);
            //call UUT
            serviceobj.getDataFromServer().then(function(res) {testResponse = res});
            //synchronous fullfilment of promise
            httpBackend.flush();
            expect(testResponse.data.length).toEqual(2);

        });

        it("add should call ajax request with url encoded data",
            
            function () {
                var testAdd = { frequency: "weekly", urltoschedule: "www.example2.com" };
                httpBackend
                .expectPOST('/ScheduleRequest/Add', 'frequency=weekly&urltoschedule=www.example2.com')
                .respond(200, 'Success :0)');
                
                serviceobj.addData(testAdd);
                httpBackend.flush();
                
            }
        );
    }
);


describe('Request Schedule Home Controller Tests', function () {
    var passPromise = true, mainCtrl, scope, mockService, spyGetData, spyAddData;
    //this call look weird because the function angular.mocks.module actually returns a reference to another function loads module
    beforeEach(angular.mock.module('schedulerequestsapp'));
    //PROVIDE - mock schedulerequestservice registration as module key/ object
    beforeEach(angular.mock.module(function($provide){
        $provide.service('schedulerequestservice', ['$q', function($q){
            function getDataFromServer() {
                var deferred = $q.defer();
                if (passPromise) {
                    //effectively makes this synchronous
                    deferred.resolve({ data:
                        [{frequency: "daily", urltoschedule: "www.example1.com" },
                        {frequency: "weekly",urltoschedule: "www.example2.com"} ]
                });
            } 
            else {
                    return deferred.reject("mocked failure");
                }
                return deferred.promise;
            }
            function addData() {
                var deferred = $q.defer();
                //effectively makes this synchronous sol promise is available immediately
                deferred.resolve();
                return deferred.promise;
            }

           this.addData = addData;
           this.getDataFromServer = getDataFromServer;
        }]);
    }));
    //INJECT intercept controller provider ($controller) and  and create controller to test
    beforeEach(angular.mock.inject(function ($controller,schedulerequestservice) {
        scope = {};
        mockService = schedulerequestservice;
        spyGetData = spyOn(mockService, 'getDataFromServer').and.callThrough();
        spyAddData = spyOn(mockService, 'addData').and.callThrough();
        mainCtrl = $controller('home', {
            schedulerequestservice:mockService,$scope: scope
        });
    }));


    it('should have scope defined', function () {
        expect(scope).toBeDefined();
    });
    it('should callservice', function () {
        expect(spyGetData).toHaveBeenCalled();
    });
    it('submit passes data to service', function () {
        scope.formdata = { frequency: 'daily', urltoschedule: 'www.example.com' };
        scope.formSubmit();
        //add to have been called with
        expect(spyAddData).toHaveBeenCalledWith({ frequency: 'daily', urltoschedule: 'www.example.com' });
    });
});
