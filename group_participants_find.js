console.log("used to count the number of participants");
var json   =  require('./group_participants.json');
var json1  =  require('./group_participants_final.json');
var z = [];
//console.log(json.length);
json1.forEach(function(value){
     if(value.groupId === "be663a39-92a0-43a1-bcf2-2363def04d70"){
       z.push(value.userinfo[0]);
        console.log(value.userinfo[0]._id);
      }
   });
   console.log(z);

//console.log(json[0].userinfo[0].mobileNumber);
