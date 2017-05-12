//here angular controller is going to take part
console.log("angular controller");
angular.module('todoController', [])
.controller('maincontroller',['$scope', '$http', 'user', function($scope, $http, user){
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
//meant the regist
///console.log(userDetails);
$scope.userDetails_scope = function(){
  console.log($scope.fromdata);
  user.userDetails().success(function(data){
     console.log(data);
     console.log($scope.formdata.id);
     $scope.users = data;
   });
};
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
      else{console.log($scope.user.message);}
      });
    };
//delete function
$scope.deleteUser = function(){
    console.log("delete user action form the controller");
    console.log($scope.formdata);
       user.delete($scope.formdata).success(function(data){
        console.log(data);
        $scope.formdata = {};
        $scope.user = data;
      });
  };

$scope.editUser = function(){
  console.log("edit users from the scope");
    user.edit($scope.formdata).success(function(data){
      console.log(data);
          console.log($scope.formdata.name);
        if($scope.formdata.name!== undefined){console.log("success fully edited");
                 $scope.formdata = {};
                 $scope.user = data;
           }
      else{
      console.log("not successfullly edited");
         }
       });
  };
}]);
