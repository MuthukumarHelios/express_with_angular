//here angular controller is going to take part

console.log("angular controller");
angular.module('todoController', []).
    controller('maincontroller',['$scope', '$http', 'todo1', function($scope, $http, todo1){
       //declaring the data in the empty hash
      console.log(todo1);
      $scope.formdata = {};
      todo1.get().success(function(data){
        $scope.todo1 = data;
      });
      todo1.get().error(function(data){
        console.log("error occured in get method");
      });

    $scope.createTodo = function(){
           //create todo check whether the formdata is recieved or not
      console.log($scope.formdata.text);
      if($scope.formdata.text !== undefined){
              todo1.create($scope.formdata).
                success(function (data) {
                  console.log("data==> from angular create function",data);
                           $scope.formdata = {};//clear the todo list
                            $scope.todo1 = data;//new todos
                      });
      }
    };
  }]);
