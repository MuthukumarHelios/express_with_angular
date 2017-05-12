console.log("app.js file");
//db.js represents the total db schema
require('./db.js');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var index = require('./routes/index');
var users = require('./routes/users');
var multer = require('multer');
var app = express();
var path = require('path');

var controller = require('./routes/controller.js')
var methodOverride  =  require('method-override');
// view engine setup
 app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//meant for form data multipart
app.use(multer().array());
//--->multer .single is depreciated for getting the details form the collection from postman
//app.use(multer().single());
var upload = multer({ dest:'uploads/'});
app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', index);
//app.use('/users', users);
//go along with routes here for the express
app.get('/api/todos'   ,              controller.display);//with find method in index.js controoler
app.get('/users', function(req, res){
  res.sendFile(path.join(__dirname, './', 'views', 'users.html'));
});
app.get('/userDetails/display/:id', controller.userDetails);
app.get('/userDetails/:id', function(req, res){
  res.sendFile(path.join(__dirname, './', 'views', 'userDetails.html'));
});
app.post('/api/todos'  ,    controller.create);
app.get('/register', function (req, res){
      console.log("general file to display register angular");
       res.sendFile(path.join(__dirname, './', 'views', 'register.html'));
    });

app.post('/api/login'   ,             controller.login);
app.get('/login',  function(req, res){
  res.sendFile(path.join(__dirname, './', 'views', 'login.html'));
});

app.post('/api/delete'  ,             controller.delete);
app.post('/api/edit',                 controller.edit);

app.post('/api/group/create',         controller.createGroup);

app.post('/api/group/participants',   controller.createParticipants);
//image upload test using the multer package
//the below 2 routes are not working for file upload
app.post('/file',    upload.single('avatar'),         controller.file_uploads);
app.get('/file_show', function(req, res){
  res.sendFile(path.join(__dirname, './', 'views', 'file.html'));
});

//display the dynamic html files
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
