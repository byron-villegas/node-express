const productos = require('../data/productos.json');

const getProducts = () => {
    return productos;
}

const productoRepository = {
    getProducts
};

module.exports = productoRepository;