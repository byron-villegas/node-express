const request = require('supertest');
const { config } = require('../../app/configs/config');
const HttpStatus = require('../../app/constants/http-status');
const app = require('../../app/app');

describe('Obtener monsters', () => {
    it('Retorna una lista de monsters', () => {
        return request(app)
            .get(config.server.context + '/monster-hunter/monsters')
            .expect(HttpStatus.OK)
            .expect('Content-Type', /json/);
    });
});
