var express = require('express');
var socket = require('socket.io')

//App setup
var app = express();
var server = app.listen(8080, function(){
    console.log('Listening to requests on port 8080');
});

//Static files
app.use(express.static('public'));


//socket setup
var io = socket(server);


io.on('connection',(socket) => {
    console.log('made socket connection', socket.id);
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    });

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    });

});