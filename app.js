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
var num = 0;

io.on('connection', function(socket){
	num++;
	socket.on('online',function(msg){
		socket.name = msg;
		io.emit('online', msg,num);
	});
  	socket.on('chat message', function(msg,nickname){
    	io.emit('chat message', msg,nickname);
  	});
  	socket.on('onlineuser', function(nickname){
  		onlineUser.push({nickname: nickname});
    	io.emit('onlineuser',onlineUser);
  	});
  	socket.on('disconnect', function(){
  		if(onlineUser!=[]&&num >= 0){
  			num--;
  			var index = onlineUser.findIndex(function(value){
  				return  value.nickname === socket.name;
  			});
  			onlineUser.splice(index, 1);
  			console.log(onlineUser);
  		}
  		socket.broadcast.emit('userleft', socket.name,onlineUser,num);
  	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});