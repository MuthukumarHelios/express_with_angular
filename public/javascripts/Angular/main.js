//inject the whole controller and service from main module
//all our config file which is load form here
console.log("main file which is the core");
angular.module('app',  ['todoController', 'ui.router','smart-table']).
config(function($stateProvider, $urlRouterProvider){
      $stateProvider.
      state('users', {
        //used to display the all users
           url: '/',
           templateUrl: '/view/users.html',
           controller:'maincontroller',
      }).state('list',{
      	//this is used to display the particular user details
      	   url: '/list/',
      	   templateUrl: '/view/userDetails.html',
      	   controller: 'subcontroller',//controller always belongs to view not to state
            params: {getval: null}
       }).state('register',{
        //used to register the users
          url:'/register',
          templateUrl: '/view/register.html',
          controller:  'maincontroller'
       }).state('login',{
        //login with user credentials state
       	  url:'/login',
       	  templateUrl:'/view/login.html',
       	  controller:'maincontroller'
       }).state('display_group',{
        //just all available display groups
           url: '/groups',
           templateUrl: '/view/display_group.html',
           controller: 'maincontroller'
       }).state('group_participants',{
           url: '/group_participants',
           templateUrl: '/view/group_participants.html',
           controller: 'group_Ctrl',
           params: {id: null}
       });
      $urlRouterProvider.otherwise('/');
  });
