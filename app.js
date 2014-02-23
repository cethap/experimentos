/**
 * Module Main.
 */

var express = require('express'),
    app = express(),
    routes = require('./routes'),
    sockets = require('./sockets'),
    server = require('http').createServer(app),
    path = require('path'),
    io = require('socket.io').listen(server);
    //webRTC = require('webrtc.io').listen(server);

server.listen(process.env.PORT || 8888);

//Configuración de express
app.configure(function(){
  //Se configura la ubicacion de las vistas
  app.set('views', __dirname + '/views');
  //Se configura el motor de renderizado de vistas
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  //Se configura la ubicacion de los archivos publicos css/js/fonts/images
  app.use(express.static(path.join(__dirname, 'public')));
});

//Se configura el tipo de arranque de la app 
//ya sea development para desarrollador o production para producción
app.configure('development', function(){
  app.use(express.errorHandler());
});

//Se configuran las rutas
routes.init(app);
//Se configuran los eventos de sockets
sockets.init(io);

// webRTC.rtc.on('chat_msg', function(data, socket) {
//   var roomList = webRTC.rtc.rooms[data.room] || [];

//   for (var i = 0; i < roomList.length; i++) {
//     var socketId = roomList[i];

//     if (socketId !== socket.id) {
//       var soc = webRTC.rtc.getSocket(socketId);

//       if (soc) {
//         soc.send(JSON.stringify({
//           "eventName": "receive_chat_msg",
//           "data": {
//             "messages": data.messages,
//             "color": data.color
//           }
//         }), function(error) {
//           if (error) {
//             console.log(error);
//           }
//         });
//       }
//     }
//   }
// });

