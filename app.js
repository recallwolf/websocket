var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index');
});

var onlineUser = [];
  		

io.on('connection', function(socket){
	socket.on('online',function(msg){
		io.emit('online', msg);
	});
  	socket.on('chat message', function(msg,nickname){
    	io.emit('chat message', msg,nickname);
  	});
  	socket.on('onlineuser', function(nickname){
  		onlineUser.push({nickname: nickname});
    	io.emit('onlineuser',onlineUser);
  	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});