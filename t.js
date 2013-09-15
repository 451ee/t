
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , conf = require('./conf')
  , app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

var date = new Date();

// all environments
app.set('port', conf.general.port);
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

// usernames which are currently connected to the chat
var usernames = {};

// Rooms which are currently available in chat. Is set in conf.js
var rooms = conf.rooms;

// socket
io.sockets.on('connection', function (socket) {
    
    socket.on('news', function (data) { 
      socket.emit('news', { message: data.text, name: data.name, time: data.time });
      socket.broadcast.emit('news', { message: data.text, name: data.name, time: data.time });
     console.log(data);
    });
    
    socket.on('adduser', function(data){ 
        socket.username = data.username; // store the username in the socket session for this client
        socket.room = conf.rooms.room1; // store the room name in the socket session for this client
        usernames[data.username] = data.username; // add the client's username to the global list
        socket.join(conf.rooms.room1); // send client to room 1
        socket.emit('news', { message: 'you are in <span class="tag">'+conf.rooms.room1+'</span>', name: 'Server', time: data.time}); // echo to client they've connected
        socket.broadcast.to(conf.rooms.room1).emit('news', { message: '<strong>'+data.username + '</strong> has now connected to ', name: 'Server', time: data.time}); // echo to room 1 that a person has connected to their room
        socket.emit('updaterooms', rooms, rooms.room1);
        //socket.broadcast.to(conf.rooms.room1).emit('updateusers', usernames);
        //socket.emit('updateusers', usernames);
    });

	socket.on('switchRoom', function(data){ 
		socket.leave(socket.room);
		socket.join(data.newroom); console.log(data);
		//socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
        socket.emit('news', { message: 'you are in <span class="tag">'+data.newroom+'</span>', name: 'Server', time: data.time}); // echo to client they've connected
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = data.newroom;
		socket.broadcast.to(data.newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, data.newroom);
	});
    
    socket.on('getUsers', function(){
        // update list of users in chat, client-side
        socket.emit('getUsers', usernames);
    });    
    
    
    socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        //socket.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.broadcast.to(conf.rooms.room1).emit('news', { message: '<strong>'+socket.username + '</strong> has now disconnected', name: 'Server', time: date.getHours()+':'+date.getMinutes()}); // echo to room 1 that a person has disconnected
        socket.leave(socket.room);
    });

});


app.get('/', function(req, res){
    res.render('index.jade', { 
        conf: conf.general
    });
});


app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});