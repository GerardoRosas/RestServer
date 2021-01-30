const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

//Definimos los unicos valores que pueden ser aceptados en nuestro campo ROLE
//Mandamos los dos tipos y un msg de error
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    email:{
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },

});

//Eliminamos el password en la respuesta hacia el FrontEnd
//Ya que nunca se debe de regresar la contraseña
usuarioSchema.methods.toJSON = function(){
    let user = this;

    let userObj = user.toObject();
    delete userObj.password;

    return userObj
}

//Configuramos para que email sea unico y mande mensaje de error
usuarioSchema.plugin( uniqueValidator, {
    message: '{PATH} debe de ser unico'
} );

module.exports = mongoose.model('Usuarios', usuarioSchema);
