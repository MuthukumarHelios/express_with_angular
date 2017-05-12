console.log("mongo db setup from the server");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
//==>user Collection is meant for the registration form
var user = new Schema({
   countryCode        :Number,
   os                 :String,
   buildVersion       :Number,
   pushNotificationId :String,
   status             :String,
   isOnline           :String,
   lastSeen           :Date,
   name               :String,
   email              :String,
   mobile             :Number,
   password           :String
});
//these db shows the details that show by the group created by users
var Group = new Schema({
     name        :String,
     image       :String,
     groupId     :String,
     createdBy   :Number,
     createdAt   :Date
});
var GroupParticipants = new Schema({
    groupId       :  String,
    joinedAt      :  Date,
    addedBy       :  String,
    participantId :  Number
});
//"user"-->model for accessing schema user
mongoose.model('user', user);
mongoose.model('group', Group);
mongoose.model('group_participants', GroupParticipants);
console.log("after mongoose model");
mongoose.connect('mongodb://localhost/ZoeChat_adminPannel', function (err, db){
  if(err){
           console.log("not connected");
       }
  else{
            console.log("connected with mongodb");
        }
});
