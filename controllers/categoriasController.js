const Categoria = require('../models/categoria');


module.exports.obtenerCategoria = async (req, res) => {
    
    const { id } = req.params;

    const categoria = await Categoria.findById(id);
    res.json(categoria)

}

module.exports.obtenerCategorias = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query;
    const query = { estado : true }
   
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde - 1))
            .limit(Number(limite))
    ])  

    res.json({
        total,
        categorias
    })
}

module.exports.crearCategoria = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB) return res.status(400).json({ msg: `La categoria ${categoriaDB} ya existe`})

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);

}

module.exports.actualizarCategoria = async (req, res) => {

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});

    res.json(categoria);

}

module.exports.borrarCategoria = async (req, res) => {

    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado:false }, { new:true });

    res.json(categoriaBorrada).status(200)

}
