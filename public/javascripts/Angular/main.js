//inject the whole controller and service from main module
//all our config file which is load form here 
console.log("main file which is the core");
angular.module('app',  ['todoController', 'ui.router']).
config(function($stateProvider, $urlRouterProvider){
      $stateProvider.
      state('users', {
           url: '/',
           templateUrl: '/view/users.html',
           controller:'maincontroller',
      }).state('list',{
      	//this is used to display the particular user details
      	   url: '/list/',
      	   templateUrl: '/view/userDetails.html',
      	   controller: 'subcontroller',//controller always belongs to view not to state
          params: {getval: null}

       });
      $urlRouterProvider.otherwise('/');
  });