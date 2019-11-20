var express = require('express');
var socket = require('socket.io');



//App setup
var app = express();
var server = app.listen(8080, function(){
    console.log('Listening to requests on port 8081');
});

//Static files
app.use(express.static('public'));


//socket setup
var io = socket(server);


//Redis setup
var redis = require('socket.io-redis');
io.adapter(redis({ host: '10.0.14.252', port: 6379 }));
// // var redis_option={ host: 'torpid-possum-redis-master', port: 6379 };
// var redis_option={ host: 'localhost', port: 6379 };
// var redis = require("redis");

const chatRooms = ['nba','basketball','bedminton'];

io.on('connection',(socket) => {
    console.log('made socket connection', socket.id);

    socket.on('joinRoom',(room)=>{
        socket.join(room);
    });

    socket.on('chat',(data)=>{
        console.log(data);
        //io.sockets.emit('chat',data);
        io.to(data.room).emit('chat',data);
    });

    socket.on('typing',(data)=>{
        io.to(data.room).emit('typing',data);
    });

});
/*



const chatRooms = ['nba','basketball','bedminton'];

io.of('/chat').on('connection',(socket)=>{
    console.log('New user has been connected');
    socket.emit('welcome','hello players yall welcome');

    socket.on('joinRoom',(room)=>{
        if(chatRooms.includes(room)){
            socket.join(room);
            //io.of('/nba').emit('newUser', 'New Player has joined the room');
            io.of('/nba').in(room).emit('newUser', 'New Player has joined the ' + room + ' room');
            return socket.emit('success','You successful joined the '+ room + ' room')
        }else{
            return socket.emit('err','Error, No room named '+ room)
        }
        
    });
});


*/
