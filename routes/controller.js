var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
require('../db.js');
console.log("controller.js");
var user                = mongoose.model('user');
var group               = mongoose.model('group');
var group_participants  = mongoose.model('group_participants');
exports.display =  function(req, res){
            console.log("inside controller api/todos");
                 user.find(function(err, todo){
                       if(err){
                          res.send("db exceptions");
                            }
                          else{
                                res.json(todo);//return in json format
                         }
                       });
              };

exports.create =  function(req, res){
 //this is going to meant for the register function for the login function
  console.log('just a create function');
  var salt = bcrypt.genSaltSync(10);
       var password = req.body.password;
         var hash   = bcrypt.hashSync(password, salt);
         console.log("before mongo query");
          user.create({
                name: req.body.name,  password: hash, email: req.body.email, mobile: req.body.mobile, participantId: req.body.participantId
                 }, function(err, todo){
                  console.log(todo);
                        if(err) {res.json(err);}
                         else{
                  //after creating this is used to set the dynamic content of the page
                  user.find(function(err, todos){
                      console.log("find",todos);
                         if(err){res.json("error");}
                            else{res.json(todos);}
                      });
                    }
                });
         };
exports.userDetails = function(req, res){
   console.log("user details");
   console.log(req.params.id);
   user.findById({_id:req.params.id}, function(err, users){
     console.log(users);
     if(err){
     console.log("_id is not present in the db");
      res.json("cannot find a particular id in db");
    }
     else{
         res.json(users);
      }
   });
};
exports.login = function(req, res){
  var password = req.body.password;
     user.findOne({email: req.body.email}, function(err, rows){
          console.log(rows);
        if(err){res.json("error occured==> in db");}
         else if(rows == null){res.json({error: true,
                                         message:"not a valid credentials"});}
           else{
                 bcrypt.compare(password, rows.password, function(err, callback){
                  if(err){
                    console.log("error occured while comparing password");
                       //comparing some other exceptions
                               res.json({error: true,
                                message:"not a valid credentials"});
                     }
                   else if(callback){
                  //if the credential are satisfied
                        console.log(callback);
                         console.log("after the callback");
                        res.json({error: !callback,
                                  message:"login succesful"});
                            }
                     else{
                       //after compare the result is not match
                       res.json({error: !callback,
                                message:"not a valid credentials"});
                            }
                  });
                }
           });
     console.log("just a login controller form express");
  };
exports.delete = function(req, res){
    console.log("just a delete controller");
      user.findById({_id: req.body.id}, function(err, rows){
        console.log(rows);
      console.log("inside query");
        if(err){
          res.json({error:true, message: "not an vaid id"});
              }
          else if(rows == null){
            res.json({error:true, message: "not an vaid id"});
          }
          else{
                rows.remove(function(err, rows1){
                   if(err){
                     res.json({error:true, message: "not an vaid id"});
                  }
               else{
                      res.json({error: false, message:"success fully deleted",id: rows1.id});
                   }
                });
            }
        });
  };
exports.edit = function(req, res){
  console.log("edit action in the users");
    user.findById(req.body.id , function(err, rows){
     console.log(rows);
       if(err){res.json("error occured");}
          else if(rows == null){res.json("not an valid id");}
           else{
            rows.name = req.body.name;
               rows.save(function(err, rows1){
                console.log(rows1);
                 if(err){res.json("not saved error occured");}
                   else {
                  console.log(rows1._id);
                     res.json({error: true, message:"succesfully saved", data: rows1});}
               });
            }
        });
};

//the api is used to create a group for the particular user with groups
exports.createGroup = function(req, res){
  console.log("createGroup==>");
    group.create({
        name: req.body.name, groupId: req.body.groupId, participantId: req.body.participantId
        }, function(err, rows){
      console.log(rows);
                if(err) {res.json("mongo exceptions");}
        else{res.json(rows);}
      });
};

exports.createParticipants = function(req, res){
  console.log("create Participants");
  group_participants.create({
    groupId: req.body.groupId, addedBy: req.body.addedBy, participantId:req.body.participantId
      }, function(err, rows){
             console.log(rows);
      if(err){res.json("error occured");}

    else{
       group_participants.find(function(err, rows1){
           console.log(rows1);
        if(err){res.json("its an db error")}
                else{res.json(rows1)}
          });
       }
      });
};
//just to display a particular groups
exports.display_groups = function(req, res){
   console.log("just display a users");
     group.find(function(err, groups){
           console.log(groups);
     if(err){
          res.json("not find in db");
      } else{res.json(groups);}
   });
};
exports.group_participants = function(req, res){
  console.log("just display participants")
  group_participants.aggregate(
  {$lookup: { from: "users", localField: "participantId", foreignField: "participantId",
     as:"users_docs"}},{$match: {participantId:+req.body.id}}, function(err, participants){
                        console.log("inside aggregation");
          if(err){res.json("db exceptions");}
                     else{ console.log(participants);res.json(participants);}
    });
};
