//inject the whole controller and service from main module
console.log("main file which is the core");
angular.module('app',  ['todoController', 'todoservice','ui.router']).
config(['$stateProvider', function($stateProvider) {
      $stateProvider.state('userDetails', {
        url: '/userDetails/:id',
        controller:'maincontroller',
        template: 'userDetails.html',
        params: { id :null, }
      })
      .state('otherwise', {url: '/hello'});
     console.log("stateProvider==>",$stateProvider);
  }]);
