console.log("mongo db setup from the server");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//todo1 ==>user
var user = new Schema({
   name: String,
   email:String,
   mobile:Number,
   password: String
});
//console.log(todo1);
mongoose.model('user', user);
        console.log("after mongoose model");
mongoose.connect('mongodb://localhost/todo1_db', function (err, db){

  if(err){
    console.log("not connected");
  }
  else {
     console.log("connected with mongodb");
   }
});
