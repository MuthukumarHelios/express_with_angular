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
                                         error_message:"not present"});}
           else{
                 bcrypt.compare(password, rows.password, function(err, callback){
                      if(err){console.log("error occured while comparing password");
                      res.json({error: true,
                                error_message:"mongo exception"});
                     }
                else if(callback){
                  //if the credential are satisfied
                        res.json({error: callback,
                                  error_message:"success"});
                            }
                     else{
                       res.json({error: callback,
                                error_message:"credentials are not match"}
                              );
                            }
                  });
                }
           });
     console.log("just a login controller form express");
  };
