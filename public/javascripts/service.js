//service which is going to be communicate between api from express
console.log("angular service");
//services are the first to get form the routes
angular.module('todoservice', [])

  .factory('todo1', ['$http', function($http){
 //service for getting http service
 return{
          get: function() {
                console.log("inside service get function");
            return $http.get('/api/todos');
          },
          create: function(data){
            console.log("data is passing==>", data);
              //just adding the over loaded data to the route postmethod
            return $http.post('/api/todos', data);
          }
        }
  }]);
