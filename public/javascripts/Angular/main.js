//inject the whole controller and service from main module
console.log("main file which is the core");
angular.module('app',  ['todoController', 'todoservice']);
