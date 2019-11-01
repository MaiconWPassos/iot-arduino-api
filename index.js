/**
 * Metodos de rede
 */
const os = require('os');
const ifaces = os.networkInterfaces();

/**
 * metodos do arduino
 */
const five = require('johnny-five'),
    board = new five.Board({
        port: "COM4"
    });

const PORT = 3333;
/**
 * metodos do servidor
 */
const
    express = require('express'),
    app = express();

board.on('ready', () => {
    let led = new five.Led(13);

   
    app.get('/acende', (req, res) => {
        led.on();
        return res.send('Acendeu');        
    });

    app.get('/apaga', (req, res) => {
        led.off();
        return res.send('Apagou');
    })
});


app.listen(PORT, () => {
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
      
        ifaces[ifname].forEach(function (iface) {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
          }
      
          if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log('Servidor rodando' + ': http://' + alias, iface.address + ':' + PORT);
          } else {
            // this interface has only one ipv4 adress
            console.log('Servidor rodando', iface.address);
          }
          ++alias;
        });
      });
      
});