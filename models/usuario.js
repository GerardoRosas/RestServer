const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false
    }
});

//Quitamos campos antes de mandar la respuesta
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();

    return user;

}


module.exports = model('Usuario', UsuarioSchema);