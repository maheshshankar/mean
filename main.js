/**
 * Created by vemulma on 2/8/2017.
 */

(function(){
    "use strict";

    var ngModule = 'shopCart';
    var ngDependencies = [];

    var app = angular.module(ngModule, ngDependencies);
    app.controller("myCtrl", function($scope, $http){
        console.log("In CT");
       $scope.registerUser = function(){
           console.log($scope.register);
           $http.post('http://localhost:3390/app/', $scope.register)
               .success(function(data){
                   console.log(data);
               })
               .error(function(data){
                   console.log("NotFound");
               });
           /*registerFactory.insertUser($scope.register).then(function(data){
               $scope.msg = data.message;
           });*/
       };
    });
    /*app.factory('registerFactory',function($scope, $http, $q){
        var service = {};
        var defer = $q.defer();
        service.insertUser = function(resgisterDetails){
          $http.post('/', regsiterDetails)
              .success(function(data){
                  defer.resolve(data);
              })
              .error(function(data){
                  defer.reject(data);
              });
            return defer.promise;
        };
        return service;
    });*/
    angular.bootstrap(document, [ngModule]);

})();