
const { subirArchivo } = require('../helpers/subir-archivo');

module.exports.cargarArchivo = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg: 'No files were uploaded.'
        });
        return;
    }

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

module.exports.actualizarImagen = (req, res) => {

    const { id, coleccion } = req.params;

    res.json({
        id, coleccion
    })
}
