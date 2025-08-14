const HttpStatus = require('../constants/http-status');
const productoService = require('../services/producto.service');

const getProductos = (req, res, next) => {
    const queryKeys = Object.keys(req.query);
    switch (queryKeys[0]) {
        case 'sort':
            productoService.sortByProperty(req.query.sort).then(resp => res.status(HttpStatus.OK).send(resp)).catch(error => next(error));
            break;
        default:
            const property = queryKeys[0];
            const value = req.query[property];

            if (property) {
                productoService.findByPropertyAndValue(property, value).then(resp => res.status(HttpStatus.OK).send(resp)).catch(error => next(error));
                break;
            }

            res.status(HttpStatus.OK).send(productoService.findAll());
            break;
    }
}

const getProductoBySku = (req, res, next) => {
    productoService.findBySku(req.params.sku).then(resp => res.status(HttpStatus.OK).send(resp)).catch(error => next(error));
}

const productoController = {
    getProductos,
    getProductoBySku
};

module.exports = productoController;