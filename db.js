console.log("mongo db setup from the server");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todo1 = new Schema({
   text: String
});
//console.log(todo1);
mongoose.model('todo1', todo1);
mongoose.connect('mongodb://localhost/todo1_db', function (err, db){
  if(err){
    console.log("not connected");
  }
  else {
     console.log("connected with mongodb");
   }
});
