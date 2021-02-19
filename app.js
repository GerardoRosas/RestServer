require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send({
        msg: 'Hola Mundo'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Listenning on port', process.env.PORT);
})