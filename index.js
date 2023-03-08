'use strict';

// ---------------LAZY MANS CHEAT-SHEET ------------------------------------ //
// socket.broadcast.emit : if i need to broadcast to namespace except sender.
// socket.emit : sends back to sender
// io.of("myNamespace").emit : all clients in namespace
// io.in("room1").emit : all clients in room one
// io.of("myNamespace").to("room1").emit : all clients in room one in namespace
// ------------------------------------------------------------------------- //


const { Server } = require('socket.io');
const chalk = require('chalk');

const server = new Server();

const game = server.of('/game');

game.on('connection', (socket)=>{
  console.log(chalk.blue(socket.id), chalk.green('connected to server'));

  socket.on('CLIENT-CONNECT', (payload)=>{
    console.log(payload);
    if (payload.role === 'Player') {
      console.log('player emit');
      socket.emit('USER-CONNECTED', payload);
    } else if (payload.role === 'Game Master'){
      console.log('GM emit');
      socket.emit('GM-CONNECTED', payload);
    } else {
      throw new Error(chalk.red('No Role'));
    }
  });

  socket.on('', () => {
    console.log('Hello World');
  });

  socket.on('CLUE', (payload) => {
    console.log('PAYLOAD CLUE:', payload);
    socket.broadcast.emit('CLUE', payload);
  });

  socket.on('CORRECT-GUESS', (payload) => {
    console.log('PAYLOAD CORRECT-GUESS:', payload);
    socket.broadcast.emit('CORRECT-GUESS', payload);
  });

  socket.on('WRONG-GUESS', (payload) => {
    console.log('PAYLOAD WRONG-GUESS:', payload);
    socket.broadcast.emit('WRONG-GUESS', payload);
  });

});


server.listen(3001);
