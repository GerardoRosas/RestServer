require('./config/config');
const express = require('express');
const conectarDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

//Connect to database
conectarDB();

//Habilitar la carpeta public
app.use( express.static(path.resolve(__dirname, '../public')));

//Definimos las rutas
app.use('/usuario', require('./routes/usuario'));
app.use('/login', require('./routes/login'));


app.listen(process.env.PORT, () => {
    console.log('Server running on port', process.env.PORT);
})