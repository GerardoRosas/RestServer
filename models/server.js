const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const dbConnection = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Conectar base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares();
        

        //Rutas de mi app
        this.routes();

    }

    async conectarDB(){
        await dbConnection()
    }

    routes(){
        //Routes config
        const userRoutes = require('../routes/user');
        const authRoutes = require('../routes/auth');
        const categoriasRoutes = require('../routes/categorias');
        const productosRoutes = require('../routes/productos');
        const buscarRoutes = require('../routes/buscar');
        const uploadsRoutes = require('../routes/uploads');


        this.app.use('/api/usuarios', userRoutes);
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/categorias', categoriasRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/buscar', buscarRoutes);
        this.app.use('/api/uploads', uploadsRoutes);
    }

    middlewares(){
        this.app.use(cors());
        this.app.use( express.static('public'));
        this.app.use( bodyParser.json() );
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    listen(){
        this.app.listen(this.port , () => {
            console.log('Listenning on port',this.port);
        })
    }


}


module.exports = Server;