//this is meant for the express backend controller only
var mongoose = require('mongoose');
//console.log(require("../db.js"));
require('../db.js')
var todo1 = mongoose.model('todo1');
//var db = require('../db.js');
exports.display =  function(req, res){
            console.log("inside controller api/todos");
                 todo1.find(function(err, todo){
                       if(err){
                          res.send(err.status);
                            }
                          else{
                                res.json(todo);//return in json format
                         }
                       });
                      };

exports.create =  function(req, res){
  console.log("inside controller");
      todo1.create({
              text: req.body.text
           },
                function(err, todo){
                   if(err) {res.json(err);}
                   else{
                       todo1.find(function(err, todos){
                          console.log(todos);
                      if(err){res.json("error");}
                      else{
                 res.json(todos);
             }
            });
          }
        });
};
// router.get('*', function(req, res){
//
//   res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//
//
// })
