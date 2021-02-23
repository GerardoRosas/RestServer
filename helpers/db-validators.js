const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${role} no esta registradio en la base de datos`)
    }
}

const emailExists = async (correo) => {
    //Verificar si el correo existe
    const emailExists = await Usuario.findOne({ correo });
    if(emailExists){
        throw new Error(`El correo ${correo} ya existe en base de datos`);
    } 
}

const existeUsuarioPorId = async (id) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id: ${id} no existe`);
    } 
}

module.exports = {
    esRoleValido,
    emailExists,
    existeUsuarioPorId
}