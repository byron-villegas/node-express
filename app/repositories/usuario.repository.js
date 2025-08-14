const usuarios = require('../data/usuarios.json');

const getUsers = () => {
    return usuarios;
}

const usuarioRepository = {
    getUsers
};

module.exports = usuarioRepository;