const usuarioRepository = require('../repositories/usuario.repository');

const findAll = () => {
    return usuarioRepository.getUsers();
}

const findByUsernameAndPassword = (username, password) => {
    let usuarios = usuarioRepository.getUsers();
    
    return usuarios.find(usuario => usuario.username === username && usuario.password === password);
}

const usuarioService = {
    findAll,
    findByUsernameAndPassword
};

module.exports = usuarioService;