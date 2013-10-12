
/**
 * Module dependencies.
 */


var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , conf = require('./conf')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , date = new Date();

if(conf.db.usesDb === true) {
  var ArticleProvider = require('./db').ArticleProvider
  var articleProvider = new ArticleProvider(conf.general.host, 27017)
}

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

// socket
io.sockets.on('connection', function (socket) {
    
    socket.on('news', function (data) { 
        socket.emit('news', { message: data.text, name: data.name, time: data.time });
        socket.broadcast.emit('news', { message: data.text, name: data.name, time: data.time });
        if(conf.db.usesDb === true) {
            articleProvider.save({
                title: data.text,
                author: data.name,
                time: data.time
                }, function(error, docs) {
                // ERROR HANDLING
            });
        }
    });
    
    socket.on('adduser', function(data){ 
        socket.username = data.username; // store the username in the socket session for this client
        usernames[data.username] = data.username; // add the client's username to the global list
        //socket.emit('news', { message: 'you are connected', name: 'Server', time: data.time}); // echo to client they've connected
        socket.broadcast.emit('news', { message: '<strong>'+data.username + '</strong> has connected', name: 'Server', time: data.time}); // echo to room  that a person has connected 
    });
    
    socket.on('getUsers', function(){
        // update list of users in chat, client-side
        socket.emit('getUsers', usernames);
    });    
    
    socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete usernames[socket.username];
        // echo globally that this client has left
        socket.broadcast.emit('news', { message: '<strong>'+socket.username + '</strong> has disconnected', name: 'Server', time: 'bye'});
    });

});

app.get('/', function(req, res){
    if(conf.db.usesDb === true) {
        articleProvider.findLast( function(error,docs){
            res.render('index.jade', { 
                //title: 'Blog',
                articles:docs,
                conf: conf.general
            });
        res.end();
        })
    }
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});