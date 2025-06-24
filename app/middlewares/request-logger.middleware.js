const logger = require('pino')();

const requestLoggerMiddleware = (req, res, next) => {
    const send = res.send;
    res.send = data => {
        const request = { method: req.method, url: req.originalUrl, headers: req.headers, params: req.params, query: req.query, body: req.body, response: data, statusCode: res.statusCode };
        logger.info(request);
        res.send = send;
        return res.send(data);
    }

    next();
}

module.exports = { requestLoggerMiddleware }