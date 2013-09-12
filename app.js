
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
//  , server = http.createServer(app)
//  , io = require('socket.io').listen(server)
//, io = require('socket.io').listen(theServer)
 // , fs = require('fs')
  , path = require('path')
  , app = express();

//var theServer = http.createServer(app);


var server = http.createServer(app);
var io = require('socket.io').listen(server);

// 
/*
var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);
*/

// all environments
//app.set('port', process.env.PORT || 3001);
app.set('port', 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// socket

io.sockets.on('connection', function (socket) {
  //socket.emit('news', { hello: 'Hello, yes this is dog!' });
  socket.on('news', function (data) {
      socket.emit('news', { message: data.text, name: data.name, time: data.time });
      socket.broadcast.emit('news', { message: data.text, name: data.name, time: data.time });
     console.log(data);
    //socket.send(data.text);
    //socket.emit('news', { hello: data.my });
  });
});

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});