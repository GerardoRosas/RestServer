const Producto = require('../models/producto');


module.exports.obtenerProducto = async (req, res) => {

    const { id } = req.params;

    const producto = await Producto.findById(id);
    res.json(producto)
}

module.exports.obtenerProductos = async  (req, res) => {

    const { desde = 1, limite = 5 } = req.query;
    const query = { estado : true }
   
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde - 1))
            .limit(Number(limite))
    ])  

    res.json({
        total,
        productos
    })
}


module.exports.crearProducto = async (req, res) => {

    const { estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});
    if(productoDB) return res.status(400).json({ msg: `El producto ${categoriaDB} ya existe`})

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await new Producto(data);

    await producto.save();

    res.status(201).json(producto);
}


module.exports.actualizarProducto = async (req, res) => {

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});

    res.json(producto);
}

module.exports.borrarProducto = async (req, res) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado:false }, { new:true });

    res.json(productoBorrado).status(200)
}