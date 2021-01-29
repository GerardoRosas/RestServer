require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.get('/users', (req, res) => {
    res.json('Hola!');
})
app.post('/users', (req, res) => {

    let { nombre, edad } = req.body;
    
    if(nombre === undefined){
        res.status(401).json({
            ok: false,
            msg: 'El usuario no autenticado',

        })
    }else{
        res.json({
            user: {
                nombre, edad
            }
        });
    }
    
})
app.put('/users/:id', (req, res) => {

    const {id} = req.params;
    res.json({
        id,
        msg: 'Hola'
    });
})
app.delete('/users', (req, res) => {
    res.json('Hola!');
})


const port = 4000;

app.listen(process.env.PORT, () => {
    console.log('Server running on port', process.env.PORT);
})