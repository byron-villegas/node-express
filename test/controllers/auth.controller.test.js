const request = require('supertest');
const { config } = require('../../app/configs/config');
const HttpStatus = require('../../app/constants/http-status');
const app = require('../../app/app');
const usuarios = require('../../app/data/usuarios.json');
const { generateToken } = require('../../app/helpers/jwt.helper');
const Authorization = require('../../app/constants/authorization');

describe('Generar token ok', () => {
    it('Retorna los datos del usuario mas el token', () => {
        const usuario = usuarios[0];
        const { id, nombres, apellidos } = usuario;
        const payload = { id, nombres, apellidos, authorities: Authorization.ROLES, scope: Authorization.SCOPE };
        const token = generateToken(payload);

        return request(app)
            .post(config.server.context + '/auth')
            .send({ username: usuario.username, password: usuario.password })
            .expect(HttpStatus.OK)
            .expect('Content-Type', /json/)
            .expect({ id, nombres, apellidos, accessToken: token });
    });
});

describe('Generar token con request erroneo', () => {
    it('Retorna bad request', () => {
        return request(app)
            .post(config.server.context + '/auth')
            .send({ texto: 'a' })
            .expect(HttpStatus.BAD_REQUEST);
    });
});

describe('Generar token con credenciales invalidas', () => {
    it('Retorna unauthorized', () => {
        const usuario = { username: 'a', password: 'b' };

        return request(app)
            .post(config.server.context + '/auth')
            .send({ username: usuario.username, password: usuario.password })
            .expect(HttpStatus.UNAUTHORIZED);
    });
});