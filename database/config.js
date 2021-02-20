const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('BD Conectada');


    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la base de datos');
    }
}


module.exports = dbConnection;