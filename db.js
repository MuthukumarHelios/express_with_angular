console.log("mongo db setup from the server");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//==>user Collection is meant for the registration form
var user = new Schema({
   name: String,
   email:String,
   mobile:Number,
   password: String
});
var product = new Schema({
  serialNo:Number,
  product_name: String,
  product_description: String,
  product_image: String
});
//"user"-->model for accessing schema user
mongoose.model('user', user);
mongoose.model('product', product);
        console.log("after mongoose model");
mongoose.connect('mongodb://localhost/todo1_db', function (err, db){

  if(err){
    console.log("not connected");
  }
  else {
     console.log("connected with mongodb");
   }
});
