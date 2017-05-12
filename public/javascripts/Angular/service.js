//service which is going to be communicate between api from express
console.log("angular service");
//services are the first to get form the routes
angular.module('todoservice', [])
  .factory('user', ['$http', function($http){
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
          userDetails: function(data){
            console.log(data);
              return $http.get('/userDetails/display/:id', data);
          },
          login: function(data){
            console.log("login service");
            return $http.post('/api/login', data);
          },
           edit: function(data){
             console.log("edit function");
             return $http.post('/api/edit', data);
           },

          delete: function(data){
            console.log("delete services");
            console.log(data);
            return $http.post('/api/delete', data);
          },
        }
  }]);
