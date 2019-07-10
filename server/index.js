//@Author William E. Velázquez Amarra - williamvelazquez.isc@gmail.com
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

const PORT = 3000;

// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname,'../client')));
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Register events on socket connection
io.on('connection', function(socket){ 
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});

// Listen application request on port 3000
http.listen(PORT, function(){
  console.log(`listening on port ${PORT}`);
});