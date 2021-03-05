
const { subirArchivo } = require('../helpers/subir-archivo');

module.exports.cargarArchivo = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg: 'No files were uploaded.'
        });
        return;
    }

    const nombre = await subirArchivo(req.files);

    res.json({
        nombre
    })
}
