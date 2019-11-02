/**
 * Inicia variaveis de ambiente
 */
const dotenv = require('dotenv');
dotenv.config();

const five = require('johnny-five');
const board = new five.Board({
    port: process.env.PORT_COM
});



/**
 * @description Quando a placa estiver disponivel criara as rotas do servidor
 */
board.on('ready', () => {
    let led = new five.Led(13);
    let status = false;

    const PORT = process.env.PORT || 3333;
    const { getIP } = require('./services/ip');

    const express = require('express'),
        app = express();

    const socketio = require('socket.io');

    const server = require('http').createServer(app);
    const io = socketio(server);

    io.on('connection', socket => {
        console.log(`Nova conexao: ${socket.id}`);
        socket.broadcast.emit('status', status);
        
        socket.on('on', (data) => {
            led.on();
            status = true;
            socket.broadcast.emit('status', status);
            console.log(data)
        })


        socket.on('off', (data) => {
            led.off();
            status = false;
            socket.broadcast.emit('status', status);
            console.log(data)
        })

    })
    server.listen(PORT, () => getIP(PORT))
});

