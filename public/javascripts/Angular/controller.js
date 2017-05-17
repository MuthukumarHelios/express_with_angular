//here angular controller is going to take part
angular.module('todoController', ['todoservice'])
.controller('maincontroller', function($scope, $http, user, $state){
   //declaring the data in the empty hash
       console.log("calling the services inside Main controller", user);
           $scope.formdata = {};
              user.get().success(function(data){
                $scope.user = data;
      });
  //error hander is used but called the get service
       user.get().error(function(data){
         console.log("error occured in get method");
        });
    
$scope.registerUser = function(){
           //create todo check whether the formdata is recieved or not
      if($scope.formdata.name && $scope.formdata.password && $scope.formdata.mobile && $scope.formdata.email !== undefined){
        user.create($scope.formdata).
            success(function (data) {
              console.log("data==> from angular create function", data);
                       $scope.formdata = {};//clear the todo list
                       $scope.userDetails = data;//new todos
                  });
              }
    };
$scope.loginUser = function(){
  console.log($scope.formdata);
    user.login($scope.formdata).success(function(data){
     console.log("just an formdata from the login",$scope.formdata);
       $scope.formdata = {};
           $scope.user = data;
        //checking the json response with error flag with communicating api
                    if(!$scope.user.error){
                         console.log($scope.user);
                          //$window.location.href = '/users';
                              console.log("loggged in");
                             }
                       else{alert("not an valid credential");}
            //empty the form data after click event passed
        $scope.user = {};            
      });
    };
    $scope.userDetails_scope = function(getvals){                   
        //this is just used to navigate to different state
        $state.go("list",{'getval': getvals});     
    }; 
})
.controller('subcontroller',function($scope, $stateParams){
     //this controller is used to get the data from passing params form different state
    $scope.datagot= $stateParams.getval;
});

