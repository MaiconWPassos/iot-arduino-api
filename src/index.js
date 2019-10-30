/**
 * @author Maicon W. Passos <maicon@mwps.com.br>
 */
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    return res.json({
        success: true,
        message: 'success'
    })
});

app.listen(3333);