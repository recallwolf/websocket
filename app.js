var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index');
});

var onlineUser = [];
var num = 0;

io.on('connection', function(socket){
	socket.on('online',function(msg){
		num++;
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
  	socket.on('sendfile', function(nickname,file,filename){
      var rawPath = './public/files/' + filename;
  		var filePath = path.resolve(__dirname, rawPath);
      console.log(filePath);
  		fs.writeFileSync(filePath, file, 'binary');
  		io.emit('sendfile', nickname, filename);
  	});
  	socket.on('disconnect', function(){
  		num--;
  		if(socket.name != null){
  			if(onlineUser!=[]&&num >= 0){
  				var index = onlineUser.findIndex(function(value){
  					return  value.nickname === socket.name;
  				});
  				onlineUser.splice(index, 1);
  				console.log(onlineUser);
  			}
			socket.broadcast.emit('userleft', socket.name,onlineUser,num);
		}
  	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});