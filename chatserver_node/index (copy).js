const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
// const http = require("http");
// var express = require('express');
// var socket = require('socket.io');

// const SERVER_PORT = 8080;
// //App setup
// var app = express();
// const server = http.createServer(app);

// server.listen(SERVER_PORT, () => console.info(`Listening on port ${SERVER_PORT}.`));
// //Static files
// app.use(express.static('public'));


// //socket setup
// var io = socket(server);

// //Body parser
// var bodyParser = require('body-parser');



// var redis_option={ host: 'torpid-possum-redis-master', port: 6379 };
var redis_option={ host: 'localhost', port: 6379 };
var redis = require("redis");


// var sub = redis.createClient(redis_option);
// sub.on("error", function (err) {
//     console.log("Error " + err);
// });
// pub = redis.createClient(redis_option);
// pub.on("error", function (err) {
//     console.log("Error " + err);
// });
// var msg_count = 0;

// sub.on("subscribe", function (channel, count) {
//     pub.publish("a nice channel", "I am sending a message.");
//     pub.publish("a nice channel", "I am sending a second message.");
//     pub.publish("a nice channel", "I am sending my last message.");
// });

// sub.on("message", function (channel, message) {
//     console.log("sub channel " + channel + ": " + message);
//     msg_count += 1;
//     if (msg_count === 3) {
//         sub.unsubscribe();
//         sub.quit();
//         pub.quit();
//     }
// });

// sub.subscribe("a nice channel");

wss.on('connection',function (socket) {
    console.log("CONNECTED!!!");


    var sub = redis.createClient(redis_option);
    sub.on("error", function (err) {
        console.log("Error " + err);
    });
    pub = redis.createClient(redis_option);
    pub.on("error", function (err) {
        console.log("Error " + err);
    });

    var room="mystream123";
   
    sub.subscribe(room);
    
    sub.on("message",function (channel, message) {
	socket.send(message);
    });

    socket.on('message',function (msg) {
	pub.publish(room,msg);
    });
    
    socket.on('disconnect',function () {
        sub.unsubscribe();
        sub.quit();
        pub.quit();
    });

    pub.publish(room,"hello it's magic!!");

});

// wss.on('connection',(socket) => {
//     console.log('made socket connection', socket.id);
//     socket.on('chat',(data)=>{
//         io.sockets.emit('chat',data);
//     });

//     socket.on('typing',(data)=>{
//         socket.broadcast.emit('typing',data);
//     });
//     socket.on('new-message', (message) => {
//         //io.emit(message);
//          io.sockets.emit(message);
//     });

// });

// io.on('connection',function (socket) {
//     console.log("CONNECTED!!!");

// });