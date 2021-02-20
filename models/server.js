const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();
        

        //Rutas de mi app


        this.routes();

    }

    routes(){
        //Routes config
        const userRoutes = require('../routes/user');


        this.app.use('/api/usuarios', userRoutes);
    }

    middlewares(){
        this.app.use(cors());
        this.app.use( express.static('public'));
        this.app.use( bodyParser.json() );
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    listen(){
        this.app.listen(this.port , () => {
            console.log('Listenning on port',this.port);
        })
    }


}


module.exports = Server;