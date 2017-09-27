var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index');
});

io.on('connection', function(socket){
	socket.emit('open');
  	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	});
  	socket.on('nickname', function(msg){
    	io.emit('nickname', msg);
  	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});