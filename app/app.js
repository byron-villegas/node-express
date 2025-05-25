const server = require('./configs/server.config');
const { config } = require('./configs/config');

const { requestLoggerMiddleware } = require('./middlewares/request-logger-middleware');
const { errorMiddleware } = require('./middlewares/error.middleware');
const { errorLoggerMiddleware } = require('./middlewares/error-logger.middleware');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

server.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(requestLoggerMiddleware);

server.use(config.server.context + config.routes.auth, require('./routes/auth.route'));
server.use(config.server.context + config.routes.usuarios, require('./routes/usuario.route'))
server.use(config.server.context + config.routes.productos, require('./routes/producto.route'));

server.use(errorLoggerMiddleware);
server.use(errorMiddleware);

module.exports = server;