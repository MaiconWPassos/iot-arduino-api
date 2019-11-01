/**
 * Inicia variaveis de ambiente
 */
const dotenv = require('dotenv');
dotenv.config();

const five = require('johnny-five');
const board = new five.Board({
  port: process.env.PORT_COM
});

const PORT = process.env.PORT || 3333;
const { getIP } = require('./services/ip');

const express = require('express'),
  app = express();

/**
 * @description Quando a placa estiver disponivel criara as rotas do servidor
 */
board.on('ready', () => {
  let led = new five.Led(13);
  let status = false;

app.get('/acende', (req, res) => {
  // led.on();
  status = true
  return res.json({
    status,
    message: 'Acendeu'
  });
});

app.get('/apaga', (req, res) => {
  // led.off();
  status = false;
  return res.json({
    status,
    message: 'Apagou'
  });
});

app.get('/status', (req, res) => {
  // led.off();
  return res.json({
    status,
    message: status ? 'Acesa' : 'Apagado'
  });
});
});

app.listen(PORT, () => getIP(PORT));
