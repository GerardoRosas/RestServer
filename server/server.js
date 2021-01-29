require('./config/config');
const express = require('express');
const conectarDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

//Connect to database
conectarDB();

//Definimos las rutas
app.use('/usuario', require('./routes/usuario'));


app.listen(process.env.PORT, () => {
    console.log('Server running on port', process.env.PORT);
})