const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Prodcuto = require('../models/producto');

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

const existeCategoria = async (id) => {
    //Verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`La categoria con id ${id} no existe`);
    }
}

const existeProductoPorId = async (id) => {
    //Verificar si la categoria existe
    const existeProducto = await Prodcuto.findById(id);
    if(!existeProducto){
        throw new Error(`La categoria con id ${id} no existe`);
    }
}

const coleccionesPermitidas = async (coleccion = '' , colecciones = []) => {

    const existeColeccion = colecciones.includes(coleccion);
    if(!existeColeccion){
        throw new Error(`La colección ${coleccion} no es permitida`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExists,
    existeUsuarioPorId,
    existeCategoria,
    existeProductoPorId,
    coleccionesPermitidas
}