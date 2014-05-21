
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
  
//var bodyParser = require('body-parser');
var app = module.exports = express.createServer();
var mongoose = require('mongoose');

//DB
var mongoose= require('mongoose');
var db = mongoose.createConnection('localhost','tempdb');
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  //app.use(bodyParser.json());
  app.use(express.methodOverride());
  //app.use(app.router);
  app.use('/', routes);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/helloworld', routes.index);
app.get('/home',routes.index);



app.listen(3000, function(){
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
