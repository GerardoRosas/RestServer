const path = require('path');
const fs = require('fs');

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const { subirArchivo } = require('../helpers/subir-archivo');

module.exports.cargarArchivo = async (req, res) => {

    try {
        const nombre = await subirArchivo(req.files, ['txt', 'md', 'jpg'], 'imagenes');
        
        res.json({
            nombre
        })
    } catch (error) {
        res.json({
            error
        }).status(400)
    }

}

module.exports.actualizarImagen = async (req, res) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
        break;
        
        default:
            return res.status(500).json({
                msg: 'No validado'
            })
    }

    //Limpiar imagenes previas
    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }

    const nombre = await subirArchivo(req.files, undefined , coleccion);
    modelo.img = nombre;

    await modelo.save()


    res.json(modelo);
}

module.exports.mostrarImagen = async (req, res) => {

    const { id , coleccion } = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
        break;
        
        default:
            return res.status(500).json({
                msg: 'No validado'
            })
    }

    //Limpiar imagenes previas
    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile( pathImagen )
        }
    }

    const imagenError = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(imagenError);

}
