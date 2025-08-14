const ErrorMessage = require('../constants/error-message');
const ErrorNegocioException = require('../exceptions/error-negocio.exception');
const ErrorTecnicoException = require('../exceptions/error-tecnico.exception');
const productoRepository = require('../repositories/producto.repository');

const findAll = () => {
    return productoRepository.getProducts();
}

const findBySku = (sku) => new Promise((resolve) => {
    if (!sku.match(/^\d+$/)) {
        throw new ErrorNegocioException(ErrorMessage.CODIGO_SKU_DEBE_SER_NUMERO_ENTERO, ErrorMessage.MENSAJE_SKU_DEBE_SER_NUMERO_ENTERO);
    }

    let productos = productoRepository.getProducts();

    const producto = productos.find(producto => producto.sku == parseInt(sku));

    if (!producto) {
        throw new ErrorNegocioException(ErrorMessage.CODIGO_PRODUCTO_NO_ENCONTRADO, ErrorMessage.MENSAJE_PRODUCTO_NO_ENCONTRADO);
    }

    resolve(producto);
});

const findByPropertyAndValue = (property, value) => new Promise((resolve) => {
    let productos = productoRepository.getProducts();

    const producto = productos[0];
    
    if (!producto[property]) {
        throw new ErrorNegocioException(ErrorMessage.CODIGO_PROPIEDAD_NO_ENCONTRADA, ErrorMessage.MENSAJE_PROPIEDAD_NO_ENCONTRADA);
    }

    if ((typeof producto[property]) === 'number' && isNaN(parseInt(value))) {
        throw new ErrorTecnicoException(ErrorMessage.CODIGO_FORMATO_DE_VALOR_NO_PERMITIDO_PARA_LA_PROPIEDAD, ErrorMessage.MENSAJE_FORMATO_DE_VALOR_NO_PERMITIDO_PARA_LA_PROPIEDAD);
    }

    const productosFiltrados = productos.filter(producto => {
        if ((typeof producto[property]) === 'number' && !isNaN(parseInt(value))) {
            return producto[property] == value;
        } else {
            return producto[property].toUpperCase().includes(value.toUpperCase());
        }
    });

    resolve(productosFiltrados);
});

const sortByProperty = (property) => new Promise((resolve) => {
    let productos = productoRepository.getProducts();

    const propiedad = property.includes('-') || property.includes('+') ? property.substring(1).trim() : property.trim();

    if (!productos[0][propiedad]) {
        throw new Error('Propiedad no encontrada');
    }

    let sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
    }

    const productosOrdenados = productos.sort((x, y) => {
        let result = (x[propiedad] < y[propiedad]) ? -1 : (x[propiedad] > y[propiedad]) ? 1 : 0;
        return result * sortOrder;
    });

    resolve(productosOrdenados);
});

const productoService = {
    findAll,
    findBySku,
    findByPropertyAndValue,
    sortByProperty
};

module.exports = productoService;