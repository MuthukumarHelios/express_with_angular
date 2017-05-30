//service which is going to be communicate between api from express
console.log("angular service");
//services are the first to get form the states
angular.module('todoservice', [])
  .factory('user', ['$http','$stateParams', function($http, $stateParams){
 return{
            get: function() {
            console.log("inside service get function");
            return $http.get('/api/todos');
           },
        //very essential to pass a data in the function overloading
          create: function(data){
              console.log("data is passing==>", data);
                  return $http.post('/api/todos', data);
          },
          login: function(data){
            console.log("login service", data);
            return $http.post('/api/login', data);
          },
           edit: function(data){
             console.log("edit function");
                  return $http.post('/api/edit', data);
           },
          delete: function(data){
            console.log("delete services");
            return $http.post('/api/delete', data);
          },
          //the below api is meant for group creation api with users return all the group
        display_group: function(data){
           //this is meant for the display services of all group details
               return $http.post('/api/group/display',data);
          },
          active_users: function(data){
            return $http.post('/api/active_users', data);
          },
          //just going to display the  group participants
        }
  }]);
