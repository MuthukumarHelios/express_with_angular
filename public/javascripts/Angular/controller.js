//here angular controller is going to take part

console.log("angular controller");
angular.module('todoController', []).
    controller('maincontroller',['$scope', '$http', 'user', function($scope, $http, user){
       //declaring the data in the empty hash
      console.log(user);
      $scope.formdata = {};
      user.get().success(function(data){
        $scope.user = data;
      });
      //error hander is used but called the get service
      user.get().error(function(data){
        console.log("error occured in get method");
      });
    //meant the register
    $scope.registerUser = function(){
           //create todo check whether the formdata is recieved or not
    if($scope.formdata.name && $scope.formdata.password && $scope.formdata.mobile && $scope.formdata.email !== undefined){
        user.create($scope.formdata).
            success(function (data) {
              console.log("data==> from angular create function", data);
                       $scope.formdata = {};//clear the todo list
                       $scope.user = data;//new todos
                  });
              }
    };
    $scope.loginUser = function(){
      console.log($scope.formdata);
      user.login($scope.formdata).success(function(data){
             $scope.formdata = {};
             //$scope.user = data is the json request from the express controller
             $scope.user = data;
             console.log($scope.user.error);
      if(!$scope.user.error){
           console.log($scope.user);
           console.log("loggged in");
      }
      else{console.log("not success fully logged in");}
      });

    }
  }]);
