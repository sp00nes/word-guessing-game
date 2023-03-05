'use strict';

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

});


server.listen(3001);
