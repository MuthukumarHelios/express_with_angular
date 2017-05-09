//this is meant for the express backend controller only
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
//console.log(require("../db.js"));
require('../db.js');
console.log("controller.js");
var user = mongoose.model('user');
//var db = require('../db.js');
exports.display =  function(req, res){
            console.log("inside controller api/todos");
                 user.find(function(err, todo){
                       if(err){
                          res.send(err.status);
                            }
                          else{
                                res.json(todo);//return in json format
                         }
                       });
                      };

exports.create =  function(req, res){
 //this is going to meant for the register function for the login function
  var salt = bcrypt.genSaltSync(10);
       var password = req.body.password;
         var hash = bcrypt.hashSync(password, salt);
          user.create({
                 name: req.body.name,  password: hash, email: req.body.email, mobile: req.body.mobile
                 }, function(err, todo){
                  console.log(todo);
                        if(err) {res.json(err);}
                         else{
                  //after creating this is used to set the dynamic content of the page
                  user.find(function(err, todos){
                      console.log("find",todos);
                         if(err){ res.json("error");}
                            else{ res.json(todos);}
                      });
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
      user.remove({_id:req.body.id}, function(err, rows){
        console.log("inside query");
        if(err){
            console.log("not valid credentials");
          res.json({error:true, message: "not an vaid id"});}
        else{
         console.log("success fully delted in else condition");
          res.json({error: false, message:  "success fully deleted", data: rows});}
      });
  };
