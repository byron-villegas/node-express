const HttpStatus = require('../constants/http-status');
const usuarioService = require('../services/usuario.service');

const getUsuarios = (req, res, next) => {
    res.status(HttpStatus.OK).send(usuarioService.findAll());
}

const usuarioController = {
    getUsuarios
};

module.exports = usuarioController;