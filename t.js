
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

// all environments
//app.set('port', process.env.PORT || 3001);
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

// rooms which are currently available in chat
var rooms = ['#Kesklinn','#Põhja-Tallinn','#Nõmme'];

// socket
io.sockets.on('connection', function (socket) {
    
    socket.on('news', function (data) { 
      socket.emit('news', { message: data.text, name: data.name, time: data.time });
      socket.broadcast.emit('news', { message: data.text, name: data.name, time: data.time });
     console.log(data);
    });
    
    socket.on('adduser', function(data){ 
        socket.username = data.username; // store the username in the socket session for this client
        socket.room = '#Kesklinn'; // store the room name in the socket session for this client
        usernames[data.username] = data.username; // add the client's username to the global list
        socket.join('#Kesklinn'); // send client to room 1
        socket.emit('news', { message: 'you are connected to <span class="tag">#Kesklinn</span>', name: 'Bender', time: data.time}); // echo to client they've connected
        socket.broadcast.to('#Kesklinn').emit('news', { message: '<strong>'+data.username + '</strong> has now connected to <span class="tag">#Kesklinn</span>', name: 'Bender', time: data.time}); // echo to room 1 that a person has connected to their room
        //socket.emit('updaterooms', rooms, '#Kesklinn');
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